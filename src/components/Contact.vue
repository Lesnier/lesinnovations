<template>
  <!-- ======= Contact Section ======= -->
  <section id="contact" class="contact">
    <div class="container" data-aos="fade-up">
      <div class="section-title">
        <h2>Contáctanos</h2>
        <p>Contáctanos</p>
      </div>

      <!-- <div>
        <iframe style="border: 0; width: 100%; height: 270px" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621" frameborder="0" allowfullscreen></iframe>
      </div> -->

      <div class="row">
        <div class="col-md-3">
          <div class="info">
            <div class="email">
              <i class="bi bi-geo-alt"></i>
              <h4>Ubicación:</h4>
              <p>Sector Kennedy, Quito, Ecuador</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="info">
            <div class="email">
              <i class="bi bi-envelope"></i>
              <h4>Email:</h4>
              <p>lesinnov@gmail.com</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="info">
            <div class="phone">
              <i class="bi bi-share"></i>
              <h4>Redes Sociales:</h4>
              <div style="font-size: 12px; padding-left: 60px;">
                <a href="https://www.facebook.com/lesinnovations" target="_blank" title="Facebook">
                  Facebook -
                </a>
                <a href="https://www.instagram.com/lesinnovations" target="_blank" title="Instagram">
                  Instagram -
                </a>
                <a href="https://www.linkedin.com/company/lesinnovations" target="_blank" title="LinkedIn">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="info">
            <div class="phone">
              <i class="bi bi-whatsapp"></i>
              <h4>Whatsapp:</h4>
              <a href="https://wa.link/08ug55" target="_blank"><p>+593 99 882 63 07</p></a>
            </div>
          </div>
        </div>

        <!-- <div class="col-lg-8 mt-5 mt-lg-0">
          <form action="forms/contact.php" method="post" role="form" class="php-email-form">
            <div class="row">
              <div class="col-md-6 form-group">
                <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" required />
              </div>
              <div class="col-md-6 form-group mt-3 mt-md-0">
                <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" required />
              </div>
            </div>
            <div class="form-group mt-3">
              <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" required />
            </div>
            <div class="form-group mt-3">
              <textarea class="form-control" name="message" rows="5" placeholder="Message" required></textarea>
            </div>
            <div class="my-3">
              <div class="loading">Loading</div>
              <div class="error-message"></div>
              <div class="sent-message">Your message has been sent. Thank you!</div>
            </div>
            <div class="text-center"><button type="submit">Send Message</button></div>
          </form>
        </div> -->
      </div>
    </div>
  </section>
  <!-- End Contact Section -->
</template>

<script setup>
</script>

<style scoped>
.social-links-contact {
  display: flex;
  gap: 12px;
  margin-top: 4px;
}

.social-links-contact a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(29, 78, 216, 0.1);
  color: #1d4ed8;
  font-size: 1.1rem;
  transition: background 0.3s ease, color 0.3s ease, transform 0.2s ease;
  text-decoration: none;
}

.social-links-contact a:hover {
  background: #1d4ed8;
  color: #fff;
  transform: translateY(-3px);
}

.social-links-contact a[title="Instagram"]:hover {
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
  color: #fff;
}

.social-links-contact a[title="LinkedIn"]:hover {
  background: #0077b5;
  color: #fff;
}
</style>
