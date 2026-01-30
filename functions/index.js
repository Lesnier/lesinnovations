const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { OpenAI } = require("openai");
const axios = require('axios');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const cors = require('cors')({origin: true});
const path = require('path');
// Fix Dotenv path (it defaults to CWD, we need explicit path to functions/.env if running from root)
require('dotenv').config({ path: path.resolve(__dirname, '.env') }); 
// Firebase Functions (v3.18.0+) loads .env automatically, but explicit load is safer for emulators if issues arise. 

// Debug Emulator State
console.log("Environment Check:", {
    FIRESTORE_EMULATOR_HOST: process.env.FIRESTORE_EMULATOR_HOST,
    GCLOUD_PROJECT: process.env.GCLOUD_PROJECT,
    FIREBASE_CONFIG: process.env.FIREBASE_CONFIG
});

admin.initializeApp(); // Let Firebase auto-detect config (including emulator)
const db = admin.firestore();

// --- CONFIGURATION ---
// In production, use functions.config().openai.key
// For now, prompt user to set it up or use a placeholder
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || functions.config().openai?.key;

// Initialize OpenAI Lazy inside function
// const openai = new OpenAI({ ... }); // Moved inside function

/**
 * Cloud Function: analyzeRequirements
 * Uses OpenAI to parse project description into priced requirements.
 */
exports.analyzeRequirements = functions
    .runWith({ timeoutSeconds: 120 }) // Increase timeout to 2 minutes for AI
    .https.onCall(async (data, context) => {
  // CORS is automatically handled by onCall, but we log for debugging
  console.log("analyzeRequirements called", data);

  const description = data.description;
  const location = data.location || {};
  const hourlyRate = location.hourlyRate || 50;
  
  if (!description) {
      throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a "description" argument.');
  }

  // OpenAI loaded at top-level
  
  // Reload key if needed
  const apiKey = process.env.OPENAI_API_KEY || functions.config().openai?.key;

  if (!apiKey) {
      console.error("OpenAI API Key missing");
      return [
        { text: "Error: API Key de OpenAI no configurada", value: 0, included: true }
      ];
  }

  const openai = new OpenAI({ apiKey: apiKey });

  try {
    const prompt = `
      ROL:
      Actúa como un Arquitecto de Soluciones de Software Senior y Project Manager con experiencia en estimación de costos basada en esfuerzo.
      
      CONTEXTO DEL PROYECTO:
      -----------------------
      Descripción: "${data.description}"
      Servicios Solicitados: ${data.services ? data.services.join(', ') : 'N/A'}
      Objetivos de Negocio: ${data.goals ? data.goals.join(', ') : 'N/A'}
      Presupuesto Indicativo: ${data.budget || 'N/A'}
      Tiempo Objetivo: ${data.timeline || 'N/A'}
      
     TAREA:
Desglosa la solicitud del usuario en una lista de 12 a 40 requerimientos funcionales de alto nivel para cumplir los objetivos. Debes estimar el esfuerzo en HORAS HOMBRE para cada ítem.

METODOLOGÍA DE ESTIMACIÓN:
1. Analiza la complejidad técnica de cada requerimiento.
2. Asigna una cantidad de horas realista (Desarrollo + Pruebas unitarias).
3. Calcula el precio multiplicando las horas por la TASA BASE.
4. TASA BASE A UTILIZAR: ${hourlyRate} USD/hora. (Si no se especifica, usa $50 USD/h por defecto).

REGLAS DE FORMATO Y REDACCIÓN:
1. El "text" debe ser un BENEFICIO o ENTREGABLE TANGIBLE para el cliente (No uses jerga técnica oscura).
   - Malo: "Creación de endpoints API REST"
   - Bueno: "Conexión segura para intercambio de datos"
   
2. ESTRUCTURA DEL DESGLOSE (Categorías sugeridas):
   - Frontend / Experiencia de Usuario
   - Backend / Lógica de Negocio
   - Integraciones (APIs, Pagos, Terceros)
   - Marketing / Contenidos (Solo si el usuario lo pidió)

3. ÍTEMS OBLIGATORIOS (Deben ir AL FINAL de la lista):
   Debes estimar las horas para estos ítems transversales basándote en el tamaño del proyecto (usualmente un % del total de desarrollo):
   - "QA - Aseguramiento de la Calidad y Pruebas" (Aprox 15-20% del tiempo de dev)
   - "Infraestructura y Configuración DevOps" (Configuración de servidores, CI/CD)
   - "Gestión de Proyecto y Comunicación" (Reuniones, demos, seguimiento)
   - "Análisis Funcional y Documentación Técnica"
      
     SALIDA (JSON ARRAY):
        Responde ÚNICAMENTE con un JSON array válido. No incluyas texto antes ni después.
        Formato:
        [
        { 
            "text": "Título del Entregable", 
            "hours": 10, 
            "rate": 50, 
            "value": 500, 
            "category": "Backend",
            "included": true 
        },
        ...
        ]
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "Eres un arquitecto de software experto en cotizaciones." }, { role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const content = completion.choices[0].message.content;
    const jsonStart = content.indexOf('[');
    const jsonEnd = content.lastIndexOf(']');
    const jsonString = content.substring(jsonStart, jsonEnd + 1);
    
    return JSON.parse(jsonString);

  } catch (error) {
    console.error("OpenAI Error:", error);
    // Return graceful error instead of crashing
    return [
         { text: "Error al generar estimados con IA", value: 0, included: false }
    ];
  }
});

/**
 * Cloud Function: processWizardSubmission
 * Syncs data to Firestore, GHL, and Sheets.
 */
/**
 * Cloud Function: processWizardSubmission
 * Syncs data to Firestore, GHL, and Sheets.
 */
exports.processWizardSubmission = functions
    .runWith({ timeoutSeconds: 120 }) // Increase timeout to 2 minutes for External APIs
    .https.onCall(async (data, context) => {
    // Dependencies loaded at top-level
    console.log("Process Wizard Submission v1.2-FIXED starting...");

    const { contact, objectives, requirements, totalEstimate } = data;
    const email = contact.email;

    try {
        // 1. Save to Firestore (Backup)
        if (email) {
            await db.collection('leads').doc(email).set({
                ...data,
                processedAt: new Date().toISOString()
            }, { merge: true });
        }

        // 2. Sync to GoHighLevel (Create Contact & Opportunity)
        // Requires GHL_API_KEY in .env
        const GHL_API_KEY = process.env.GHL_API_KEY;
        if (GHL_API_KEY) {
            // Create Contact (V2 API)
            // Docs: https://highlevel.stoplight.io/docs/integrations/00bf39a19fc22-create-contact
            // Using logic for V2 because token starts with 'pit-'
            
            // Clean key (remove accidental newlines from copy-paste)
            const cleanKey = GHL_API_KEY.trim();
            console.log("GHL Using Key:", cleanKey.substring(0, 10) + "..."); // Debug: Check if env updated
            const locationId = process.env.GHL_LOCATION_ID;

            const payload = {
                email: contact.email,
                phone: contact.phone,
                firstName: contact.fullName.split(' ')[0],
                lastName: contact.fullName.split(' ').slice(1).join(' '),
                name: contact.fullName,
                companyName: contact.companyName,
                tags: ["wizard-est", "website-lead"],
                customFields: [
                   // Map custom fields if needed
                ]
            };

            // Agency/User tokens require locationId explicitly
            if (locationId) {
                payload.locationId = locationId.trim();
            }

            let contactId;

            // 1. Search for Contact First
            try {
                const searchParams = {
                    locationId: locationId,
                    query: contact.email
                };
                console.log("PAYLOAD [GHL Contact Search]:", JSON.stringify(searchParams, null, 2));
                const searchRes = await axios.get('https://services.leadconnectorhq.com/contacts/', {
                    params: searchParams,
                    headers: { 
                        'Authorization': `Bearer ${cleanKey}`,
                        'Version': '2021-07-28'
                    }
                });

                if (searchRes.data.contacts && searchRes.data.contacts.length > 0) {
                    contactId = searchRes.data.contacts[0].id;
                    console.log("GHL: Contact Found:", contactId);
                } else {
                    console.log("GHL: Contact not found. Creating new one...");
                    // Create Contact
                    const ghlResponse = await axios.post('https://services.leadconnectorhq.com/contacts/', payload, {
                        headers: { 
                            'Authorization': `Bearer ${cleanKey}`,
                            'Version': '2021-07-28'
                        }
                    });
                    contactId = ghlResponse.data.contact.id;
                    console.log("GHL: Contact Created:", contactId);
                }
            } catch (error) {
                console.error("GHL Contact Sync Error:", error.message);
                if (error.response) console.error("Details:", JSON.stringify(error.response.data, null, 2));
            }

            // 2. Create Opportunity (if we have contactId and Pipeline ID)
            const PIPELINE_ID = process.env.GHL_PIPELINE_ID;
            console.log(`DEBUG Check: contactId=${contactId}, PIPELINE_ID=${PIPELINE_ID}`);
            
            if (contactId && PIPELINE_ID) {
                let newLeadStage = null;
                
                // A. Debug Read Permissions (Get Pipeline)
                try {
                    console.log("PAYLOAD [GHL Pipeline Read]:", JSON.stringify({ locationId: locationId }, null, 2));
                    // Fetch ALL pipelines and filter locally (V2 API behavior)
                    const pipelineRes = await axios.get(`https://services.leadconnectorhq.com/opportunities/pipelines/`, {
                        params: { locationId: locationId },
                        headers: { 
                            'Authorization': `Bearer ${cleanKey}`,
                            'Version': '2021-07-28'
                        }
                    });
                    
                    const pipelines = pipelineRes.data.pipelines || [];
                    const targetPipeline = pipelines.find(p => p.id === PIPELINE_ID);
                    
                    // Handle potential nested stages structure if observed
                    const rawStages = targetPipeline ? targetPipeline.stages : [];
                    const stages = rawStages.flat().filter(s => s && s.name); // Normalize if it's [[stage]]

                    console.log("GHL Target Pipeline Found:", targetPipeline ? "YES" : "NO");
                    console.log("GHL Stages:", JSON.stringify(stages, null, 2));
                    
                    newLeadStage = stages.find(s => s.name === "New Lead") || stages[0];
                    console.log("GHL New Lead Stage:", JSON.stringify(newLeadStage, null, 2));
                } catch (readErr) {
                    console.error("GHL READ Error (Check opportunities.readonly):", readErr.message);
                    if (readErr.response) console.error("GHL READ Error Details:", JSON.stringify(readErr.response.data, null, 2));
                }

                // B. Debug Write Permissions (Create Opp)
                if (newLeadStage) {
                    try {
                        const opportunityPayload = {
                            pipelineId: PIPELINE_ID,
                            locationId: locationId,
                            name: contact.fullName || contact.companyName || "New Lead",
                            contactId: contactId,
                            pipelineStageId: newLeadStage.id,
                            status: "open",
                            monetaryValue: totalEstimate || 0
                        };
                        console.log("PAYLOAD [GHL Opportunity Create]:", JSON.stringify(opportunityPayload, null, 2));

                        await axios.post('https://services.leadconnectorhq.com/opportunities/', opportunityPayload, {
                            headers: { 
                                'Authorization': `Bearer ${cleanKey}`,
                                'Version': '2021-07-28'
                            }
                        });
                        console.log("GHL Opportunity Created in Stage:", newLeadStage.name);
                    } catch (writeErr) {
                        console.error("GHL WRITE Error (Check opportunities.write):", writeErr.message);
                        if (writeErr.response) console.error("Details:", writeErr.response.data);
                    }
                }
            }

                // 3. Create Note with Wizard Results
                try {
                    const noteBody = `
Resultados del Wizard:
---------------------
Servicios: ${objectives.services ? objectives.services.join(', ') : 'N/A'}
Objetivos: ${objectives.goals ? objectives.goals.join(', ') : 'N/A'}
Presupuesto: ${objectives.budget || 'N/A'}
Tiempo Objetivo: ${objectives.timeline || 'N/A'}

Descripción del Proyecto:
${data.description || 'N/A'}

Requerimientos Estimados:
${requirements ? requirements.map(r => `- ${r.text}: $${r.value}`).join('\n') : 'N/A'}

Total Estimado: $${totalEstimate}
`.trim();

                    const notePayload = {
                        body: noteBody
                    };
                    // optionally add userId if we had one
                    // notePayload.userId = ... 

                    console.log("PAYLOAD [GHL Note Create]:", JSON.stringify(notePayload, null, 2));

                    await axios.post(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, notePayload, {
                        headers: { 
                            'Authorization': `Bearer ${cleanKey}`,
                            'Version': '2021-07-28'
                        }
                    });
                    console.log("GHL Note Created");
                } catch (noteErr) {
                    console.error("GHL Note Error:", noteErr.message);
                    if (noteErr.response) console.error("Details:", JSON.stringify(noteErr.response.data, null, 2));
                }
            }
        
        // 3. Sync to Google Sheets (with Timeout)
        // Requires GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY
        const SHEET_ID = process.env.GOOGLE_SHEET_ID;
        if (SHEET_ID && process.env.GOOGLE_PRIVATE_KEY) {
            try {
                // Initialize Auth - Google Spreadsheet v4 pattern
                const { JWT } = require('google-auth-library');
                
                // Format private key correctly
                const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
                
                const serviceAccountAuth = new JWT({
                    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                    key: privateKey,
                    scopes: [
                        'https://www.googleapis.com/auth/spreadsheets',
                    ],
                });

                const syncSheets = async () => {
                   const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
                   await doc.loadInfo();
                   const sheet = doc.sheetsByIndex[0];

                   // Force load headers ALWAYS to ensure local cache is ready
                   await sheet.loadHeaderRow();
                   
                   const headerRow = ['Date', 'Name', 'Email', 'Phone', 'Company', 'Estimate', 'Service', 'Goals', 'Budget', 'Timeline', 'Description', 'Requirements'];

                   // Auto-initialize headers if new sheet
                   if (!sheet.headerValues || sheet.headerValues.length === 0) {
                       console.log("Sheets: Initializing headers...");
                       await sheet.setHeaderRow(headerRow);
                       // Reload to update local cache of headers
                       await sheet.loadHeaderRow(); 
                   }

                   const rowData = {
                       Date: new Date().toISOString(),
                       Name: contact.fullName,
                       Email: contact.email,
                       Phone: contact.phone,
                       Company: contact.companyName,
                       Estimate: totalEstimate,
                       Service: objectives.services.join(', '),
                       Goals: objectives.goals ? objectives.goals.join(', ') : '',
                       Budget: objectives.budget || '',
                       Timeline: objectives.timeline || '',
                       Description: data.description || '',
                       Requirements: requirements.map(r => `${r.text} ($${r.value})`).join('\n')
                   };

                   try {
                       // Try adding directly
                       console.log("PAYLOAD [Sheets Add Row]:", JSON.stringify(rowData, null, 2));
                       await sheet.addRow(rowData);
                   } catch (addErr) {
                       // Check for specific header error
                       if (addErr.message && (addErr.message.includes("No values in the header row") || addErr.message.includes("header"))) {
                           console.log("Sheets: Headers missing or mismatch, forcing creation and retrying...");
                           await sheet.setHeaderRow(headerRow);
                           await sheet.addRow(rowData); // Retry
                       } else {
                           throw addErr; // Re-throw other errors
                       }
                   }
                   return "Sheets synced";
                };

                // Race against a 3-second timeout so user doesn't wait forever
                const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Sheets Timeout")), 3000));
                
                await Promise.race([syncSheets(), timeoutPromise]);
                
            } catch (err) {
                 console.error("Sheets Sync Warning (Non-critical):", err.message);
                 // Do not throw, allow function to succeed
            }
        } else {
             console.log("Skipping Sheets Sync: No Credentials");
        }

        return { success: true };

    } catch (error) {
        console.error("Submission Processing Error:", error);
        // We return success true to frontend so UI doesn't break even if backend sync fails partialy
        // Use alerts/monitoring in production
        return { success: true, warning: 'Partial sync failure' };
    }
});
