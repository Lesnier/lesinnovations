<template>
  <!-- ======= Quote Cta Section ======= -->
  <section id="quote-cta" class="quote-cta-section">
    <div class="container" data-aos="zoom-in">
      <div class="quote-card d-flex align-items-center justify-content-between flex-column flex-md-row">
        <div class="quote-text text-center text-md-start mb-4 mb-md-0">
          <h3>¿Tienes una idea en mente?</h3>
          <p>Cotiza tu proyecto con nosotros y descubre cómo podemos ayudarte a hacerlo realidad.</p>
        </div>
        <router-link class="btn btn-identity py-3 px-5 rounded-pill shadow-sm fw-bold" to="/wizard">
           Cotizar Ahora
        </router-link>
      </div>
    </div>
  </section>
  <!-- End Quote Cta Section -->
</template>

<script setup>
</script>

<style scoped>
.quote-cta-section {
  padding: 60px 0;
  background-color: transparent;
}

.quote-card {
  background: #ffffff;
  padding: 40px 50px;
  border-radius: 15px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
  border-left: 5px solid #f39c3e;
}

.quote-text h3 {
  font-size: 28px;
  font-weight: 700;
  color: #151515;
  margin-bottom: 5px;
  font-family: "Raleway", sans-serif;
}

.quote-text p {
  color: #444444;
  margin: 0;
  font-size: 16px;
  font-family: "Open Sans", sans-serif;
}

/* Ensure button text is readable */
.btn-identity {
  font-size: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #fff;
  white-space: nowrap;
}
</style>
