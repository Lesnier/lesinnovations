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
         <p class="lead">Agenda una breve sesión estratégica con nosotros.</p>
      </div>
      
      <!-- HighLevel Calendar Embed -->
      <div class="shadow-lg bg-white rounded iframe-container">
          <iframe 
            :src="calendarUrl" 
            style="width: 100%; height: 100%; border:none; overflow: hidden; touch-action: pan-y;" 
            scrolling="yes"
            id="wKykQnWpsBQu1VANnjjc_1769372592531"
          ></iframe>
      </div>
      <!-- Load GHL Script dynamically if needed -->

    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useWizardStore } from '@/stores/wizard';

const store = useWizardStore();
const iframeHeight = ref('1550px'); // Default backup height

const calendarUrl = computed(() => {
    const baseUrl = "https://api.leadconnectorhq.com/widget/booking/wKykQnWpsBQu1VANnjjc";
    
    // Extract Name
    const fullName = store.contact.fullName || "";
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const params = new URLSearchParams();
    if (firstName) params.append("first_name", firstName);
    if (lastName) params.append("last_name", lastName);
    if (store.contact.email) params.append("email", store.contact.email);
    
    // Clean phone number: remove spaces, dashes, parentheses, AND plus sign
    if (store.contact.phone) {
        // Remove everything that is not a digit
        const cleanPhone = store.contact.phone.replace(/\D/g, ''); 
        params.append("phone", cleanPhone);
    }

    // Attempt to set language based on location
    const country = (store.location.countryCode || "").toUpperCase();
    let lang = "es"; // Default to Spanish
    
    if (["US", "GB", "CA", "AU", "NZ", "IE"].includes(country)) {
        lang = "en";
    } else if (["BR", "PT"].includes(country)) {
        lang = "pt";
    } else if (["FR", "BE", "CH"].includes(country)) {
        lang = "fr";
    } else if (["DE", "AT", "CH"].includes(country)) {
        lang = "de";
    }
    
    params.append("lang", lang);
    
    return `${baseUrl}?${params.toString()}`;
});

function handleResizeMessage(event) {
  // No useful events detected from GHL widget. 
  // Keeping this empty or removing listener entirely is cleaner.
}

onMounted(() => {
  // window.addEventListener('message', handleResizeMessage);
});

onUnmounted(() => {
  // window.removeEventListener('message', handleResizeMessage);
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

.iframe-container {
  width: 100%;
  height: v-bind(iframeHeight); /* Dynamic height */
  overflow: hidden; 
  /* Removed specific touch-action to let browser decide, as GHL might need it */
  padding: 18px 18px;
}

@media (min-width: 768px) {
  .iframe-container {
     height: 950px; 
     padding: 0px 0px;
  }
}

.scheduler-header a {
   color: #f39c3e; /* Identity Orange */
}
</style>
