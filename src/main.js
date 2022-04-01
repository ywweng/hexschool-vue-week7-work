import { createApp } from 'vue'

import 'bootstrap'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import Swal from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import App from './App.vue'
import router from './router'

// vee-validate
import { defineRule, Form, Field, ErrorMessage, configure } from 'vee-validate'
import { loadLocaleFromURL, localize } from '@vee-validate/i18n'
import { required, email, min, max, numeric } from '@vee-validate/rules'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)
defineRule('numeric', numeric)

loadLocaleFromURL(
  'https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json'
)

configure({
  generateMessage: localize('zh_TW'),
  validateOnInput: true
})

// custom alert
// const Toast = {
//   toast: true,
//   position: 'top-end',
//   showConfirmButton: false,
//   timer: 3000
// }

createApp(App)
  .use(router)
  .use(VueAxios, axios)
  .use(Swal)
  .component('Loading', Loading)
  .component('VForm', Form)
  .component('VField', Field)
  .component('ErrorMessage', ErrorMessage)
  .mount('#app')
