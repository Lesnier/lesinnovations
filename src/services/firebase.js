import axios from 'axios';

// API URL (Default to Production, override with VITE_API_URL in .env)
const API_URL = import.meta.env.VITE_API_URL || "http://admin.lesinnovations.tech/api";


// --- LARAVEL API ---

export async function analyzeRequirementsAI(context) {
    try {
        console.log("Calling Laravel API: analyze", context);
        const response = await axios.post(`${API_URL}/wizard/analyze`, context);
        return response.data;
    } catch (error) {
        console.error("AI API Error:", error);
        return null; 
    }
}

export async function submitToHighLevel(data) {
    try {
        console.log("Calling Laravel API: submit", data);
        const response = await axios.post(`${API_URL}/wizard/submit`, data);
        return response.data; // { success: true }
    } catch (error) {
         console.error("Submission API Error:", error);
         return { success: false, error: error.message };
    }
}
