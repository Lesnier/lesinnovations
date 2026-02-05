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
  title: 'Les Innovations - Soluciones a Medida de Software e IA',
  meta: [
    { name: 'description', content: 'Les Innovations convierte visiones en éxitos. Especialistas en desarrollo de software, inteligencia artificial (IA), aplicaciones móviles y transformación digital. Consultoría experta en Ecuador y el mundo.' },
    { name: 'keywords', content: 'les innovations, desarrollo de software, inteligencia artificial, ia, software ecuador, aplicaciones móviles, realidad aumentada, transformación digital, consultoría tecnológica, web development' },
    { name: 'author', content: 'Les Innovations' },
    { name: 'robots', content: 'index, follow' },
    // Open Graph
    { property: 'og:title', content: 'Les Innovations - Soluciones Software e Inteligencia Artificial' },
    { property: 'og:description', content: 'Expertos en convertir ideas en realidad. Desarrollo de software a medida, IA, Apps y estrategias digitales de alto impacto.' },
    { property: 'og:image', content: 'https://lesinnovations.tech/assets/img/services/Les_Innovation.png' },
    { property: 'og:url', content: 'https://lesinnovations.tech/' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Les Innovations' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Les Innovations - Software a Medida e IA' },
    { name: 'twitter:description', content: 'Potencia tu negocio con software innovador y estrategias de IA. Contáctanos.' },
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
