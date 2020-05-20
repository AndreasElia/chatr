import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isConnected: false,
    socketMessage: ''
  },
  mutations: {
    SOCKET_CONNECT (state) {
      console.log(1)
      state.isConnected = true
    },
    SOCKET_DISCONNECT (state) {
      console.log(1)
      state.isConnected = false
    },
    SOCKET_MESSAGE (state, message) {
      console.log(1)
      state.socketMessage = message
    }
  },
  actions: {
  },
  modules: {
  }
})
