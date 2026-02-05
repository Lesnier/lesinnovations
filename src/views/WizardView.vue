<template>
  <!-- Dark Header Background for this view -->
  <div class="wizard-header">
    <div class="container">
      <div>
        <h2>Estimador de Proyectos</h2>
        <ol>
          <li><router-link to="/">Inicio</router-link></li>
          <li>Estimador</li>
        </ol>
      </div>
    </div>
  </div>

  <section class="inner-page wizard-container">
    <div class="container">
      
      <!-- Progress Bar -->
      <div class="wizard-progress mb-5">
        <div class="progress" style="height: 5px;">
          <div 
             class="progress-bar identity-bg" 
             role="progressbar" 
             :style="{ width: progressPercentage + '%' }"
          ></div>
        </div>
        <div class="d-flex justify-content-between mt-2 steps-labels">
            <span :class="{'fw-bold identity-text': store.currentStep >= 1}">1. Contacto</span>
            <span :class="{'fw-bold identity-text': store.currentStep >= 2}">2. Objetivos</span>
            <span :class="{'fw-bold identity-text': store.currentStep >= 3}">3. Estimación</span>
        </div>
      </div>

      <!-- Steps -->
      <div class="row justify-content-center">
        <div class="col-lg-10">
           <Transition name="fade" mode="out-in">
             <WizardStep1 v-if="store.currentStep === 1" />
             <WizardStep2 v-else-if="store.currentStep === 2" />
             <WizardStep3 v-else-if="store.currentStep === 3" />
           </Transition>
        </div>
      </div>
      
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import { useWizardStore } from '@/stores/wizard';
import WizardStep1 from '@/components/wizard/WizardStep1.vue';
import WizardStep2 from '@/components/wizard/WizardStep2.vue';
import WizardStep3 from '@/components/wizard/WizardStep3.vue';

const store = useWizardStore();

const progressPercentage = computed(() => {
    return (store.currentStep / 3) * 100;
});

onMounted(() => {
    store.initLocation();
    
    // Track Wizard Start
    if (window.gtag) {
        window.gtag('event', 'wizard_start', {
            event_category: 'engagement',
            event_label: 'Started Wizard'
        });

        // Track Step 1 explicitly on load if currentStep is 1
        if (store.currentStep === 1) {
           window.gtag('event', 'wizard_step_view', {
              step: 1,
              step_name: 'Contact Info'
           });
        }
    }
});

// Scroll to top when step changes
watch(() => store.currentStep, (newStep) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (window.gtag) {
        let stepName = '';
        if (newStep === 1) stepName = 'Contact Info';
        if (newStep === 2) stepName = 'Objectives';
        if (newStep === 3) stepName = 'Estimator';

        window.gtag('event', 'wizard_step_view', {
            step: newStep,
            step_name: stepName
        });
    }
});
</script>

<style scoped>
/* Header styling to match Footer dark bg and handle fixed nav overlap */
.wizard-header {
  background-color: #151515; /* Match footer dark */
  padding-top: 100px; /* Account for fixed header height */
  padding-bottom: 20px;
  color: #fff;
}

.wizard-header h2 {
  font-size: 26px;
  font-weight: 300;
}

.wizard-header ol {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 14px;
}

.wizard-header ol li + li {
  padding-left: 10px;
}

.wizard-header ol li + li::before {
  display: inline-block;
  padding-right: 10px;
  color: #fff;
  content: "/";
}

.wizard-header a {
   color: #f39c3e; /* Identity Orange */
}

/* Container */
.wizard-container {
    min-height: 70vh;
}

/* Colors */
.identity-bg {
    background-color: #f39c3e !important;
}
.identity-text {
    color: #f39c3e !important;
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
