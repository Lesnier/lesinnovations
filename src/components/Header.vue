<template>
  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top">
    <div class="container d-flex align-items-center justify-content-lg-between">
      <h1 class="logo me-auto me-lg-0">
        <a href="/"><img src="/assets/img/logo.png" style="max-height: 50px" alt="Logo Airways" /></a>
      </h1>

      <nav id="navbar" class="navbar order-last order-lg-0" :class="{ 'navbar-mobile': isMobileNavOpen }">
        <ul>
          <li><a class="nav-link scrollto active" href="#hero" @click="handleNavClick($event)">inicio</a></li>
          <li><a class="nav-link scrollto" href="#about" @click="handleNavClick($event)">Nosotros</a></li>
          <li><a class="nav-link scrollto" href="#services" @click="handleNavClick($event)">Servicios</a></li>
          <li><a class="nav-link scrollto" href="#portfolio" @click="handleNavClick($event)">Portafolio</a></li>
          <li><a class="nav-link scrollto" href="#team" @click="handleNavClick($event)">Tecnologías</a></li>
          <li><a class="nav-link scrollto" href="#contact" @click="handleNavClick($event)">Contacto</a></li>
        </ul>
        <i 
          class="bi mobile-nav-toggle" 
          :class="isMobileNavOpen ? 'bi-x' : 'bi-list'" 
          @click="toggleMobileNav"
        ></i>
      </nav>
      <!-- .navbar -->

      <router-link to="/wizard" class="get-started-btn scrollto">Cotizar Ahora</router-link>
    </div>
  </header>
  <!-- End Header -->
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const isMobileNavOpen = ref(false);

function toggleMobileNav() {
  isMobileNavOpen.value = !isMobileNavOpen.value;
}

function closeMobileNav() {
  isMobileNavOpen.value = false;
}

function handleNavClick(e) {
  closeMobileNav();
  if (route.path !== '/') {
    e.preventDefault();
    const hash = e.currentTarget.getAttribute('href');
    if (hash) {
      router.push({ path: '/', hash: hash });
    }
  }
}
</script>
