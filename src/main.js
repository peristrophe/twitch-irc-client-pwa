import Vue from 'vue'
import App from '@/App.vue'
import '@/registerServiceWorker'
import vuetify from '@/plugins/vuetify';
import router from '@/router'

import Auth from "@/utils/auth"

Vue.prototype.$auth = Auth

Vue.prototype.$scheme = {
  main: "grey lighten-4",
  fore: "white",
}

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
