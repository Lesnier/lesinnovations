<template>
  <div class="wizard-step">
    <h3>Información General</h3>
    <form @submit.prevent="nextStep">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Nombre Completo</label>
          <input v-model="store.contact.fullName" type="text" class="form-control" required placeholder="Ej: Juan Pérez">
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Nombre de tu Empresa</label>
          <input v-model="store.contact.companyName" type="text" class="form-control" required placeholder="Ej: Mi Empresa S.A.">
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Correo Electrónico</label>
          <input v-model="store.contact.email" type="email" class="form-control" required placeholder="juan@ejemplo.com">
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Teléfono / WhatsApp</label>
          <input v-model="store.contact.phone" type="tel" class="form-control" required placeholder="+593 99 999 9999">
        </div>
      </div>
      
      <div class="d-flex justify-content-end mt-4">
        <button type="submit" class="btn btn-identity fw-bold px-4">
          Siguiente <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useWizardStore } from '@/stores/wizard';

const store = useWizardStore();

function nextStep() {
  store.currentStep = 2;
  store.saveProgress();
}
</script>
