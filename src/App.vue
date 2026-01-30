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
import { initMain } from './utils/main';

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

const route = useRoute();

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
