import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import router from './router'

import axios from "axios"
import base64url from "base64url"

Vue.prototype.$http = axios
Vue.prototype.$base64url = base64url

Vue.prototype.$scheme = {
  main: "indigo lighten-2",
  fore: "white",
}

Vue.prototype.$idToken = {}
Vue.prototype.$accessToken = ''
Vue.prototype.$userProfile = {
  id: "",
  loginName: "justinfan12345",
  displayName: "Anonymous User",
  picture: "",
}

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
