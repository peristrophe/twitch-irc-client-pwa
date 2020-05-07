import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import router from './router'

import axios from "axios"
import base64url from "base64url"

Vue.prototype.$http = axios
Vue.prototype.$base64url = base64url
Vue.prototype.$playSound = (src, volume = 1.0) => {
  var audio = new Audio(src)
  audio.volume = volume
  audio.play()
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
