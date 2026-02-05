import { defineStore } from 'pinia';
import { detectUserLocation } from '@/services/geolocation';
// import { saveToFirebase } from '@/services/firebase'; // To be implemented

export const useWizardStore = defineStore('wizard', {
  state: () => ({
    // Steps Flow
    currentStep: 1,
    
    // Step 1: Contact
    contact: {
      fullName: '',
      companyName: '',
      email: '',
      phone: ''
    },

    // Step 2: Objectives
    objectives: {
      services: [], // Array of strings
      goals: [],    // Array of strings
      timeline: '',
      budget: ''
    },

    // Step 3: Estimator
    projectDescription: '',
    requirements: [], // Array of objects { id, text, value, included: true }
    
    // Global & Meta
    location: {
      countryCode: '',
      countryName: '',
      multiplier: 0.6
    },
    ipAddress: '',
  }),

  getters: {
    totalEstimate(state) {
      // Sum the already-rounded adjusted values to ensure 
      // the total matches the sum of the cards displayed to the user.
      return state.requirements
        .filter(req => req.included)
        .reduce((sum, req) => {
           // Value is already adjusted by Backend
           return sum + (Number(req.value) || 0);
        }, 0);
    }
  },

  actions: {
    async initLocation() {
      if (!this.location.countryCode) {
        const locData = await detectUserLocation();
        this.location = locData;
      }
    },

    async loadProgress() {
      const saved = localStorage.getItem('wizard_progress');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Merge saved state into current state
          this.$patch(parsed);
          
          // Validation: Ensure currentStep is valid
          if (!this.currentStep || this.currentStep < 1 || this.currentStep > 3) {
             console.warn('Invalid step loaded, resetting to 1');
             this.currentStep = 1;
          }

          console.log('Wizard progress loaded from localStorage');
        } catch (e) {
          console.error('Failed to load wizard progress', e);
          // Reset on error
          this.currentStep = 1;
        }
      }
    },

    async saveProgress() {
      // Save current state to localStorage
      try {
        localStorage.setItem('wizard_progress', JSON.stringify(this.$state));
        console.log('Wizard progress saved to localStorage');
      } catch (e) {
        console.error('Failed to save wizard progress', e);
      }
      
      // Placeholder for Firebase persistence
      // console.log('Saving progress to Firebase...', this.$state);
      // await saveToFirebase(this.$state);
    },

    addRequirement(text, baseValue) {
      this.requirements.push({
        id: Date.now() + Math.random().toString(36).substr(2, 9),
        text,
        value: baseValue,
        included: true
      });
      this.saveProgress();
    },

    toggleRequirement(id) {
       const req = this.requirements.find(r => r.id === id);
       if (req) {
         req.included = !req.included;
       }
    }
  }
});
