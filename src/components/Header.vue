<template>
  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top">
    <div class="container d-flex align-items-center justify-content-lg-between">
      <h1 class="logo me-auto me-lg-0">
        <a href="/"><img src="/assets/img/logo.png" style="max-height: 50px" alt="Logo Airways" /></a>
      </h1>

      <nav id="navbar" class="navbar order-last order-lg-0" :class="{ 'navbar-mobile': isMobileNavOpen }">
        <ul>
          <li><a class="nav-link scrollto active" href="#hero" @click="closeMobileNav">inicio</a></li>
          <li><a class="nav-link scrollto" href="#about" @click="closeMobileNav">Nosotros</a></li>
          <li><a class="nav-link scrollto" href="#services" @click="closeMobileNav">Servicios</a></li>
          <li><a class="nav-link scrollto" href="#portfolio" @click="closeMobileNav">Portafolio</a></li>
          <li><a class="nav-link scrollto" href="#team" @click="closeMobileNav">Tecnologías</a></li>
          <li><a class="nav-link scrollto" href="#contact" @click="closeMobileNav">Contacto</a></li>
        </ul>
        <i 
          class="bi mobile-nav-toggle" 
          :class="isMobileNavOpen ? 'bi-x' : 'bi-list'" 
          @click="toggleMobileNav"
        ></i>
      </nav>
      <!-- .navbar -->
    </div>
  </header>
  <!-- End Header -->
</template>

<script setup>
import { ref } from 'vue';

const isMobileNavOpen = ref(false);

function toggleMobileNav() {
  isMobileNavOpen.value = !isMobileNavOpen.value;
}

function closeMobileNav() {
  isMobileNavOpen.value = false;
}
</script>
