<template>
  <!-- Dark Header Background matching WizardView -->
  <div class="scheduler-header">
    <div class="container">
      <div>
        <h2>Agendar Reunión</h2>
        <ol>
          <li><router-link to="/">Inicio</router-link></li>
          <li>Agendar</li>
        </ol>
      </div>
    </div>
  </div>

  <section class="inner-page">
    <div class="container text-center">
      <div class="mb-5">
         <h3>Tu estimación está lista.</h3>
         <p class="lead">Para confirmar el presupuesto y alcance, agenda una breve sesión estratégica con nosotros.</p>
      </div>
      
      <!-- HighLevel Calendar Embed -->
      <div class="ratio ratio-16x9 shadow-lg bg-white rounded" style="max-height: 700px; height: 700px;">
          <iframe 
            :src="calendarUrl" 
            style="width: 100%; height: 100%; border:none; overflow: hidden;" 
            scrolling="no"
            id="wKykQnWpsBQu1VANnjjc_1769372592531"
          ></iframe>
      </div>
      <!-- Load GHL Script dynamically if needed -->

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useWizardStore } from '@/stores/wizard';

const store = useWizardStore();

const calendarUrl = computed(() => {
    const baseUrl = "https://api.leadconnectorhq.com/widget/booking/wKykQnWpsBQu1VANnjjc";
    
    // Extract Name
    const fullName = store.contact.fullName || "";
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const params = new URLSearchParams();
    if (firstName) params.append("firstName", firstName);
    if (lastName) params.append("lastName", lastName);
    if (store.contact.email) params.append("email", store.contact.email);
    if (store.contact.phone) params.append("phone", store.contact.phone);
    
    // Add "skip contact info" trigger if supported or just pre-fill
    // GHL typically uses these standard params.
    
    return `${baseUrl}?${params.toString()}`;
});
</script>

<style scoped>
/* Copied from WizardView for consistency */
.scheduler-header {
  background-color: #151515; /* Match footer dark */
  padding-top: 100px; /* Account for fixed header height */
  padding-bottom: 20px;
  color: #fff;
}

.scheduler-header h2 {
  font-size: 26px;
  font-weight: 300;
}

.scheduler-header ol {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 14px;
}

.scheduler-header ol li + li {
  padding-left: 10px;
}

.scheduler-header ol li + li::before {
  display: inline-block;
  padding-right: 10px;
  color: #fff;
  content: "/";
}

.scheduler-header a {
   color: #f39c3e; /* Identity Orange */
}
</style>
