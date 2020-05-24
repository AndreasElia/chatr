import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isConnected: false
  },
  mutations: {
  },
  actions: {
    'SOCKET_error' (state, server) {
      console.log('error')
    },
    'SOCKET_success' (state, server) {
      console.log('success')
    },
    'SOCKET_info' (state, server) {
      console.log('info')
    }
  },
  modules: {
  }
})
