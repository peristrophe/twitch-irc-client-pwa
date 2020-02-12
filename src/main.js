import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$scheme = {
  main: "indigo lighten-2",
  fore: "white",
}

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
