import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';

// Configuration provided by User
const firebaseConfig = {
  apiKey: "AIzaSyCvNwwjKwFKrzJlHt40VLfrBir4Wa7WdD8",
  authDomain: "les-innovations-factory.firebaseapp.com",
  projectId: "les-innovations-factory",
  storageBucket: "les-innovations-factory.firebasestorage.app",
  messagingSenderId: "516525639041",
  appId: "1:516525639041:web:da726fc57de211d3ac5480",
  measurementId: "G-86VDXYRT4D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const functions = getFunctions(app);

// Connect to Emulators in Development
// Connect to Emulators in Development
// DEBUG: Unconditional Connection
console.log("Attempting to connect to Emulator at:", window.location.hostname);
connectFunctionsEmulator(functions, window.location.hostname, 5001);
// connectFirestoreEmulator(db, window.location.hostname, 8080);

// --- LEAD PERSISTENCE ---

export async function saveToFirebase(data) {
  try {
    const email = data.contact.email || "unknown_" + Date.now();
    const userRef = doc(db, "leads", email);
    await setDoc(userRef, {
        ...data,
        lastUpdated: new Date()
    }, { merge: true });
    
    console.log('Saved to Firestore:', email);
    return true;
  } catch (error) {
    console.error("Error saving to Firestore:", error);
    return false;
  }
}

// --- CLOUD FUNCTIONS ---

export async function analyzeRequirementsAI(context) {
    try {
        const analyzeFn = httpsCallable(functions, 'analyzeRequirements');
        const result = await analyzeFn(context);
        return result.data;
    } catch (error) {
        console.error("AI Function Error:", error);
        return null; 
    }
}

export async function submitToHighLevel(data) {
    try {
        const submitFn = httpsCallable(functions, 'processWizardSubmission');
        await submitFn(data);
        return true;
    } catch (error) {
         console.error("CRM Sync Error:", error);
         return false;
    }
}
