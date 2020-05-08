import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import router from './router'

import axios from "axios"
import base64url from "base64url"

Vue.prototype.$http = axios
Vue.prototype.$base64url = base64url
Vue.prototype.$config = {
  clientId: process.env.VUE_APP_TWITCH_CLIENT_ID,
}

Vue.prototype.$scheme = {
  main: "grey lighten-4",
  fore: "white",
}

Vue.prototype.$userProfile = {
  id: "",
  loginName: "justinfan12345",
  displayName: "Anonymous User",
  picture: "",
  pass: "",
  idToken: ""
}

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
