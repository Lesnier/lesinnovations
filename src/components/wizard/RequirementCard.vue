<template>
  <div class="card mb-2 shadow-sm border-0 requirement-card overflow-hidden" :class="{ 'excluded': !req.included }">
    <div class="d-flex align-items-stretch">
      <!-- Content Section -->
      <div class="p-3 flex-grow-1 d-flex align-items-center">
        <div class="badge bg-identity rounded-pill me-3 px-3 py-2 price-badge">
             ${{ adjustedValue }}
        </div>
        <h6 class="mb-0 text-dark">{{ req.text }}</h6>
      </div>

      <!-- Toggle Section (Full Height) -->
      <button 
         class="btn border-0 rounded-0 px-4 d-flex align-items-center justify-content-center transition-colors"
         :class="req.included ? 'bg-success-subtle text-success' : 'bg-light text-muted'"
         @click="$emit('toggle')"
         title="Activar/Desactivar este módulo"
         style="min-width: 110px;"
      >
        <div class="d-flex flex-column align-items-center">
            <i class="bi fs-4 mb-1" :class="req.included ? 'bi-check-circle-fill' : 'bi-circle'"></i>
            <span class="small fw-bold">{{ req.included ? 'Incluido' : 'Opcional' }}</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useWizardStore } from '@/stores/wizard';

const props = defineProps(['req']);
const store = useWizardStore();

const adjustedValue = computed(() => {
    return Math.round(props.req.value * store.location.multiplier);
});
</script>

<style scoped>
.requirement-card {
    transition: all 0.3s ease;
}
.excluded .price-badge {
    background-color: #6c757d !important; /* Secondary color for excluded */
    opacity: 0.5;
}
.excluded h6 {
    text-decoration: line-through;
    opacity: 0.6;
}
.transition-colors {
    transition: background-color 0.2s, color 0.2s;
}
.bg-success-subtle {
    background-color: #d1e7dd;
}
</style>
