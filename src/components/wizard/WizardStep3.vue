<template>
  <div class="wizard-step">
    <h3>Estimador Inteligente</h3>
    <p class="text-muted">Antes de invertir en software, descubre si tu idea es viable
y cuánto sentido tiene desarrollarla. 
<br>
Nuestra IA analizará las necesidades para generar una estimación preliminar.</p>
    
    <div class="mb-4 analysis-box p-3 bg-light border rounded">
       <label class="form-label fw-bold">Describa su Proyecto</label>
       <textarea 
          v-model="store.projectDescription" 
          class="form-control mb-3" 
          rows="5" 
          placeholder="Ej: Necesito una app tipo Uber para paseadores de perros..."
       ></textarea>
       <div class="d-flex justify-content-between align-items-center">
          <button type="button" class="btn btn-outline-secondary" @click="prevStep">
              <i class="bi bi-arrow-left"></i> Volver
          </button>
          <button class="btn btn-identity shadow-sm" @click="analyzeRequirements" :disabled="analyzing">
            <span v-if="analyzing" class="spinner-border spinner-border-sm me-2"></span>
            <i v-else class="bi bi-stars me-2"></i>
            {{ analyzing ? 'Analizando...' : 'Analizar Requerimientos' }}
          </button>
       </div>
    </div>

    <!-- Requirements List -->
    <div v-if="store.requirements.length > 0" class="requirements-list mb-5 fade-in-up">
      <h5 class="mb-3 text-identity text-center text-md-start">Propuesta de Valor y Alcance</h5>
      
      <!-- Psychological Pricing Display -->
      <div class="mb-4 bg-white border rounded shadow-sm overflow-hidden">
        <div class="p-4 text-center">
            <h6 class="text-muted text-uppercase fw-bold letter-spacing-1 mb-2 small">Inversión estimada para tu proyecto</h6>
            
            <div class="d-flex justify-content-center align-items-center gap-2 flex-wrap">
              <span class="text-muted fs-5">Rango sugerido:</span>
              <span class="fs-3 fw-bold text-dark text-nowrap">
                  ${{ Math.round(store.totalEstimate * 0.65) }} - ${{ Math.round(store.totalEstimate * 1.25) }}
              </span>
            </div>
            
            <div class="mt-3 d-inline-block px-4 py-2 bg-light rounded-pill border border-identity">
                <div class="d-flex align-items-baseline justify-content-center gap-2">
                    <span class="text-muted small">Específico:</span>
                    <span class="fs-4 fw-bold text-identity">${{ store.totalEstimate }}</span>
                    <small class="text-muted fs-7">USD</small>
                </div>
            </div>
            <!-- Budget Compatibility Component -->
            <div class="w-100 mt-4 px-3" v-if="budgetCompatibility.show">
                <div class="d-flex justify-content-between align-items-end mb-1">
                    <span class="small fw-bold text-muted">Compatibilidad con tu presupuesto</span>
                    <span class="small fw-bold" :class="budgetCompatibility.colorClass">{{ budgetCompatibility.percentage }}%</span>
                </div>
                <div class="progress" style="height: 10px; background-color: #e9ecef;">
                    <div 
                        class="progress-bar rounded-pill" 
                        role="progressbar" 
                        :style="{ width: budgetCompatibility.percentage + '%', backgroundColor: budgetCompatibility.colorHex }"
                    ></div>
                </div>
                <!-- Smart Message -->
                <p class="mt-2 small mb-0 text-muted fst-italic">
                    <i class="bi me-1" :class="budgetCompatibility.icon"></i>
                    {{ budgetCompatibility.message }}
                </p>
            </div>
            <div class="d-flex justify-content-center gap-4 text-muted small mt-3 flex-wrap">
                <span><i class="bi bi-check-circle-fill text-success me-1"></i>Sin compromiso</span>
                <span><i class="bi bi-tag-fill text-warning me-1"></i>Precio Ajustable</span>
            </div>
        </div>
      </div>

      <div class="mb-5">
          <p class="text-muted small mb-2"><i class="bi bi-info-circle me-1"></i> Desglose de inversión por beneficio:</p>
          <RequirementCard 
             v-for="req in store.requirements" 
             :key="req.id" 
             :req="req"
             @toggle="store.toggleRequirement(req.id)"
          />
      </div>

       <!-- Social Proof -->
       <div class="text-center mb-5">
           <p class="text-muted fst-italic small">
               "Más de 25 empresas en Ecuador ya usan esta metodología para validar su inversión antes de gastar un centavo."
           </p>
       </div>

        <!-- Soft CTA (Ahora solo visible si hay requerimientos) -->
        <div class="text-center pb-5">
            <h4 class="mb-3">¿Te hace sentido este presupuesto?</h4>
            <p class="mb-5 text-muted mx-auto" style="max-width: 600px;">
                Revisemos estos números juntos. Te explicaremos:
                <br>• Qué incluye realmente cada módulo
                <br>• Dónde podemos optimizar costos
                <br>• Priorizar lo que más valor te da
            </p>
            
            <div class="d-flex justify-content-center gap-3">
                <button type="button" class="btn btn-outline-secondary px-4" @click="prevStep">
                    <i class="bi bi-arrow-left"></i> Ajustar
                </button>
                <button type="button" class="btn btn-identity btn-lg px-5 shadow-lg fw-bold" @click="finishWizard" :disabled="finishing">
                    <span v-if="finishing" class="spinner-border spinner-border-sm me-2"></span>
                    {{ finishing ? 'Procesando...' : '¡Hablemos!' }}
                </button>
            </div>
            <div class="mt-4">
                 <small class="text-muted text-uppercase" style="font-size: 0.7em;">Esto es un sistema automatizado; hable con un asesor.</small>
            </div>
        </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useWizardStore } from '@/stores/wizard';
import RequirementCard from './RequirementCard.vue';
import { analyzeRequirementsAI, submitToHighLevel } from '@/services/firebase';

const store = useWizardStore();
const router = useRouter();
const analyzing = ref(false);

async function analyzeRequirements() {
  console.log("Analyze clicked. Description:", store.projectDescription);
  if (!store.projectDescription) {
      console.warn("Description empty, aborting.");
      return;
  }
  
  analyzing.value = true;
  store.requirements = []; // Clear previous

  try {
      console.log("Calling Cloud Function analyzeRequirementsAI...");
      const results = await analyzeRequirementsAI({
        description: store.projectDescription,
        services: store.objectives.services,
        goals: store.objectives.goals,
        timeline: store.objectives.timeline,
        budget: store.objectives.budget,
        location: store.location
      });
      console.log("Cloud Function returned:", results);
      
      if (results && Array.isArray(results)) {
          results.forEach(req => {
              store.addRequirement(req.text, req.value);
          });
      } else {
          // Fallback if AI fails or returns invalid format
          store.addRequirement('Análisis Manual Requerido', 0);
      }
  } catch (e) {
      console.error(e);
      store.addRequirement('Error al conectar con IA', 0);
  } finally {
      analyzing.value = false;
  }
}

function prevStep() {
  store.currentStep = 2;
}

const finishing = ref(false);

// Budget Compatibility Logic
const budgetCompatibility = computed(() => {
    // 1. Extract Max Budget from string (e.g. "$5,000 - $10,000" -> 10000)
    const budgetStr = store.objectives.budget || "";
    // Match all numbers, remove non-digits
    const numbers = budgetStr.match(/(\d+[\d,.]*)/g);
    
    if (!numbers || numbers.length === 0) {
        return { show: false };
    }

    // Parse numbers (handling commas/dots if needed, assuming simple clean for now)
    const cleanNumbers = numbers.map(n => parseInt(n.replace(/[,.]/g, '')));
    const maxBudget = Math.max(...cleanNumbers);

    if (maxBudget === 0) return { show: false };

    const estimate = store.totalEstimate;
    // Calculate Ratio (How much of the estimate fits in the budget?)
    // Actually, "Compatibility" usually implies "How close is the estimate to the budget?"
    // If Estimate (12k) > Budget (10k), Compat is 10k/12k = 83%
    // If Estimate (8k) < Budget (10k), Compat is 100% (Fully covered)
    
    let ratio = 0;
    if (estimate > 0) {
        ratio = maxBudget / estimate;
    }

    const percentage = Math.min(100, Math.round(ratio * 100));

    // Determine State
    // State A: Green (>= 90%) - "Aligned"
    // State B: Yellow (70-89%) - "Close"
    // State C: Gray (< 70%) - "Phased approach needed"
    
    let colorClass, colorHex, message, icon;

    if (percentage >= 90) {
        // Green
        colorClass = "text-success";
        colorHex = "#198754"; // Bootstrap success
        message = "Esta estimación está alineada con el rango de inversión que indicaste.";
        icon = "bi-check-circle-fill text-success";
    } else if (percentage >= 70) {
        // Yellow/Orange (Soft)
        colorClass = "text-warning-emphasis"; // Darker yellow for text readability
        colorHex = "#ffc107"; // Bootstrap warning
        message = "Estamos muy cerca de tu rango ideal. En la reunión vemos cómo ajustarlo.";
        icon = "bi-exclamation-circle-fill text-warning";
    } else {
        // Gray (Safe) - NEVER RED
        colorClass = "text-secondary";
        colorHex = "#adb5bd"; // Gray 500
        message = "El alcance actual supera el rango indicado, pero puede replantearse por fases, negociarse o ajustarse.";
        icon = "bi-info-circle-fill text-secondary";
    }

    return {
        show: true,
        percentage,
        colorClass,
        colorHex,
        message,
        icon
    };
});

async function finishWizard() {
  finishing.value = true;
  
  // Track Final Conversion Click
  if (window.gtag) {
      window.gtag('event', 'wizard_completion_click', {
          event_category: 'conversion',
          event_label: 'Clicked Hablemos',
          value: store.totalEstimate
      });
  }
  
  try {
      // 1. Prepare Payload using Store State
      const payload = {
          contact: store.contact,
          objectives: store.objectives,
          requirements: store.requirements.filter(r => r.included),
          totalEstimate: store.totalEstimate,
          description: store.projectDescription,
          location: store.location
      };

      // 2. Send to Backend (Firestore + GHL + Sheets)
      await submitToHighLevel(payload);
      
      // 3. Navigate even if sync had warnings (handled by backend return)
      router.push('/scheduling');
  } catch (e) {
      console.error("Error finalizing:", e);
      // Fallback
      router.push('/scheduling');
  } finally {
      finishing.value = false;
  }
}
</script>
