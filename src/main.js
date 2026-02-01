
import './assets/overrides.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'

import App from './App.vue'
import router from './router'



// import VueGtag from "vue-gtag";

const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(router)
app.use(head)

// Google Analytics
// app.use(VueGtag, {
//   config: { id: "G-86VDXYRT4D" }
// }, router); // Passing router for auto-tracking

app.mount('#app')
