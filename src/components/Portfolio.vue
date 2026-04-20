<template>
  <!-- ======= Portfolio Section ======= -->
  <section id="portfolio" class="portfolio">
    <div class="container" data-aos="fade-up">
      <div class="section-title">
        <h2>Portafolio</h2>
        <p>Nuestro Portafolio</p>
      </div>

      <div
        ref="portfolioContainer"
        class="row portfolio-container"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div class="col-lg-4 col-md-6 portfolio-item filter-app">
          <div class="portfolio-wrap shadow">
            <img src="/assets/img/portfolio/portfolio-1.jpg" class="img-fluid" alt="Proyecto 1" />
          </div>
        </div>

        <div class="col-lg-4 col-md-6 portfolio-item filter-web">
          <div class="portfolio-wrap shadow">
            <img src="/assets/img/portfolio/portfolio-2.jpg" class="img-fluid" alt="Proyecto 2" />
          </div>
        </div>

        <div class="col-lg-4 col-md-6 portfolio-item filter-app">
          <div class="portfolio-wrap shadow">
            <img src="/assets/img/portfolio/portfolio-3.jpg" class="img-fluid" alt="Proyecto 3" />
          </div>
        </div>

        <div class="col-lg-4 col-md-6 portfolio-item filter-card">
          <div class="portfolio-wrap shadow">
            <img src="/assets/img/portfolio/portfolio-4.jpg" class="img-fluid" alt="Proyecto 4" />
          </div>
        </div>

        <div class="col-lg-4 col-md-6 portfolio-item filter-web">
          <div class="portfolio-wrap shadow">
            <img src="/assets/img/portfolio/portfolio-5.jpg" class="img-fluid" alt="Proyecto 5" />
          </div>
        </div>

        <div class="col-lg-4 col-md-6 portfolio-item filter-app">
          <div class="portfolio-wrap shadow">
            <img src="/assets/img/portfolio/portfolio-6.jpg" class="img-fluid" alt="Proyecto 6" />
          </div>
        </div>

        <div class="col-lg-4 col-md-6 portfolio-item filter-card">
          <div class="portfolio-wrap shadow">
            <img src="/assets/img/portfolio/portfolio-7.jpg" class="img-fluid" alt="Proyecto 7" />
          </div>
        </div>

        <div class="col-lg-4 col-md-6 portfolio-item filter-card">
          <div class="portfolio-wrap shadow">
            <img src="/assets/img/portfolio/portfolio-8.jpg" class="img-fluid" alt="Proyecto 8" />
          </div>
        </div>

        <div class="col-lg-4 col-md-6 portfolio-item filter-web">
          <div class="portfolio-wrap shadow">
            <img src="/assets/img/portfolio/portfolio-9.jpg" class="img-fluid" alt="Proyecto 9" />
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Portfolio Section -->
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Isotope from 'isotope-layout'
import imagesLoaded from 'imagesloaded'

const portfolioContainer = ref(null)
let iso = null

onMounted(() => {
  if (!portfolioContainer.value) return

  // Usar imagesLoaded garantiza que Isotope calcule alturas reales
  // y no cero (que era el bug en producción al primer load)
  imagesLoaded(portfolioContainer.value, () => {
    iso = new Isotope(portfolioContainer.value, {
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows',
    })
  })
})

onUnmounted(() => {
  if (iso) {
    iso.destroy()
    iso = null
  }
})
</script>
