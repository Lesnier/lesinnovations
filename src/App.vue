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
  title: 'Les Innovations - Agency',
  meta: [
    { name: 'description', content: 'Les Innovations ofrece soluciones de software a medida con tecnología de vanguardia. Nos especializamos en desarrollo de software, inteligencia artificial, aplicaciones móviles, realidad aumentada y más. Con más de 10 años de experiencia, convertimos visiones en éxitos.' },
    { name: 'keywords', content: 'soluciones de software, desarrollo de software, inteligencia artificial, aplicaciones móviles, realidad aumentada, VR, AR, MR, inteligencia de negocio, consultoría, desarrollo web, front end, back end, devops, cloud, base de datos, analítica' },
    { name: 'author', content: 'Les Innovations' },
    { name: 'robots', content: 'index, follow' },
    // Open Graph
    { property: 'og:title', content: 'Les Innovations - Soluciones a Medida, Innovación sin Límites' },
    { property: 'og:description', content: 'Convertimos visiones en éxitos mediante software innovador y a medida. Descubre nuestras soluciones de software a medida, inteligencia artificial, aplicaciones móviles, y más.' },
    { property: 'og:image', content: 'https://admirable-heliotrope-b89c6b.netlify.app/assets/img/services/Les_Innovation.png' },
    { property: 'og:url', content: 'https://admirable-heliotrope-b89c6b.netlify.app/' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Les Innovations' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Les Innovations - Soluciones a Medida, Innovación sin Límites' },
    { name: 'twitter:description', content: 'Convertimos visiones en éxitos mediante software innovador y a medida. Descubre nuestras soluciones de software a medida, inteligencia artificial, aplicaciones móviles, y más.' },
    { name: 'twitter:image', content: 'https://admirable-heliotrope-b89c6b.netlify.app/assets/img/services/Les_Innovation.png' }
  ]
})

onMounted(() => {
  // Initial load
  reInitMain();
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
