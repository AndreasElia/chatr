import Vue from 'vue'
import App from './App.vue'

import '@/assets/css/tailwind.css'

import router from './router'
import store from './store'

import VueSocketIO from 'vue-socket.io'
// import socketio from 'socket.io-client'

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
  vuex: {
    store,
    actionPrefix: 'SOCKET_'
  },
  options: {}
}))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
