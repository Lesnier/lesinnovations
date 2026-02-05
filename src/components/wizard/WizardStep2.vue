<template>
  <div class="wizard-step">
    <h3>Objetivos y Alcance</h3>
    <form @submit.prevent="nextStep">
      
      <!-- Services -->
      <div class="mb-5">
        <label class="form-label fw-bold mb-3 fs-5">¿Qué tipo de servicio le interesa principalmente? <span class="text-muted fw-normal fs-6">(Selección Múltiple)</span></label>
        <div class="row g-3">
          <div class="col-md-6" v-for="service in servicesOptions" :key="service">
             <label class="option-card h-100 d-flex align-items-center p-3 border rounded cursor-pointer position-relative"
                    :class="{ 'selected': store.objectives.services.includes(service) }">
                <input class="form-check-input visually-hidden" type="checkbox" :value="service" v-model="store.objectives.services">
                <div class="check-icon me-3">
                    <i class="bi" :class="store.objectives.services.includes(service) ? 'bi-check-circle-fill text-identity' : 'bi-circle text-muted'"></i>
                </div>
                <span class="fw-medium">{{ service }}</span>
             </label>
          </div>
        </div>
      </div>

      <!-- Goals -->
      <div class="mb-5">
        <label class="form-label fw-bold mb-3 fs-5">¿Cuál es el principal objetivo de este proyecto?</label>
        <div class="row g-3">
          <div class="col-md-6" v-for="goal in goalsOptions" :key="goal">
             <label class="option-card h-100 d-flex align-items-center p-3 border rounded cursor-pointer position-relative"
                    :class="{ 'selected': store.objectives.goals.includes(goal) }">
                <input class="form-check-input visually-hidden" type="checkbox" :value="goal" v-model="store.objectives.goals">
                 <div class="check-icon me-3">
                    <i class="bi" :class="store.objectives.goals.includes(goal) ? 'bi-check-circle-fill text-identity' : 'bi-circle text-muted'"></i>
                </div>
                <span class="fw-medium">{{ goal }}</span>
             </label>
          </div>
        </div>
      </div>

       <!-- Timeline -->
       <div class="mb-5">
        <label class="form-label fw-bold mb-3 fs-5">¿Tienes un plazo estimado?</label>
        <select class="form-select form-select-lg" v-model="store.objectives.timeline" required>
          <option value="" disabled>Seleccione una opción</option>
          <option value="Urgente (1-2 meses)">Urgente (1-2 meses)</option>
          <option value="Próximos (3-6 meses)">Próximos (3-6 meses)</option>
          <option value="Solo recopilando información">Solo recopilando información</option>
          <option value="No definido aún">No definido aún</option>
        </select>
      </div>

      <!-- Budget -->
       <div class="mb-5">
        <label class="form-label fw-bold mb-3 fs-5">¿Cuál es tu rango de inversión?</label>
        <div class="row g-3">
           <div class="col-md-6" v-for="budget in budgetOptions" :key="budget">
             <label class="option-card h-100 d-flex align-items-center p-3 border rounded cursor-pointer position-relative"
                    :class="{ 'selected': store.objectives.budget === budget }">
               <input class="form-check-input visually-hidden" type="radio" :value="budget" v-model="store.objectives.budget" required>
                <div class="check-icon me-3">
                   <i class="bi" :class="store.objectives.budget === budget ? 'bi-record-circle-fill text-identity' : 'bi-circle text-muted'"></i>
                </div>
               <span class="fw-medium">{{ budget }}</span>
             </label>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-between mt-5">
         <button type="button" class="btn btn-outline-secondary px-4 py-2" @click="prevStep">
          <i class="bi bi-arrow-left"></i> Atrás
        </button>
        <button type="submit" class="btn btn-identity fw-bold px-5 py-2">
          Siguiente <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.option-card {
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: #fff;
    min-height: 70px; /* Ensure touch usage */
}

.option-card:hover {
    background-color: #f8f9fa;
    border-color: #f39c3e !important;
}

.option-card.selected {
    border-color: #f39c3e !important;
    background-color: #fff9f0; /* Slight orange tint */
    box-shadow: 0 0 0 1px #f39c3e;
}

.check-icon i {
    font-size: 1.5rem;
}
</style>

<script setup>
import { useWizardStore } from '@/stores/wizard';

const store = useWizardStore();

const servicesOptions = [
  'Desarrollo de software/aplicación a medida',
  'Sitio web o e-commerce',
  'Estrategia de marketing digital + ventas automatizadas',
  'Redes sociales y contenido',
  'Transformación de negocio con IA',
  'Otros'
];

const goalsOptions = [
  'Lanzar un nuevo Producto',
  'Mejorar procesos internos',
  'Aumentar ventas y conversiones',
  'Captar más clientes potenciales',
  'Mejorar presencia digital'
];

const budgetOptions = [
  'Menos de $5,000 USD',
  '$5,000 - $15,000 USD',
  '$15,000 - $30,000 USD',
  'Más de $30,000 USD'
];

function nextStep() {
  if (window.gtag) {
      window.gtag('event', 'wizard_objectives_submitted', {
          event_category: 'engagement',
          event_label: 'Step 2 Complete',
          services: store.objectives.services.join(','),
          goals: store.objectives.goals.join(','),
          budget: store.objectives.budget,
          timeline: store.objectives.timeline
      });
  }
  store.currentStep = 3;
  store.saveProgress();
}

function prevStep() {
  if (window.gtag) {
      window.gtag('event', 'wizard_back_click', {
          event_category: 'navigation',
          event_label: 'Back from Step 2'
      });
  }
  store.currentStep = 1;
}
</script>
