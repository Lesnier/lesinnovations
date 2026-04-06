<template>
  <Header />
  <router-view></router-view>
  <Footer />
  <div id="preloader"></div>
  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';
import { initMain } from './utils/main';

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

const route = useRoute();

useHead({
  title: 'Les Innovations | Agencia de Desarrollo de Software a Medida e IA',
  meta: [
    { name: 'description', content: 'Les Innovations es una agencia B2B experta en desarrollo de software a medida, aplicaciones móviles empresariales (iOS/Android), integración de Inteligencia Artificial (IA) y plataformas corporativas (ERP/CRM). Convertimos visiones en éxitos.' },
    { name: 'keywords', content: 'desarrollo de software a medida, agencia de inteligencia artificial, desarrollo de aplicaciones corporativas, desarrollo de apps B2B, consultoría IT, modernización de sistemas empresariales, desarrollo ERP CRM, empresa de desarrollo de software, automatización de procesos con IA, VR para negocios, les innovations, software ecuador, transformación digital' },
    { name: 'author', content: 'Les Innovations' },
    { name: 'robots', content: 'index, follow' },
    // Open Graph
    { property: 'og:title', content: 'Les Innovations | Agencia de Desarrollo de Software a Medida e IA' },
    { property: 'og:description', content: 'Agencia B2B experta en software a medida, IA, apps móviles y plataformas empresariales ERP/CRM. Convertimos visiones en éxitos.' },
    { property: 'og:image', content: 'https://lesinnovations.tech/assets/img/services/Les_Innovation.png' },
    { property: 'og:url', content: 'https://lesinnovations.tech/' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Les Innovations' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Les Innovations | Agencia de Software a Medida e IA' },
    { name: 'twitter:description', content: 'Potencia tu empresa con software a medida, IA, apps móviles y plataformas ERP/CRM. Consultoría IT experta. Contáctanos.' },
    { name: 'twitter:image', content: 'https://lesinnovations.tech/assets/img/services/Les_Innovation.png' }
  ]
})

import { useWizardStore } from '@/stores/wizard';

// ... other imports

onMounted(async () => {
  // Initial load
  reInitMain();
  
  // Restore wizard progress
  const wizardStore = useWizardStore();
  await wizardStore.loadProgress();
});

// Watch for route changes to re-initialize scripts (scroll, isotope, etc) if needed
watch(route, () => {
   setTimeout(() => {
     reInitMain();
   }, 300); // Wait for transition
});

function reInitMain() {
  setTimeout(() => {
    initMain();
  }, 100);
}
</script>

<style scoped>
/* Scoped styles if any */
</style>
