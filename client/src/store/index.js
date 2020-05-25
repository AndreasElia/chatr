import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isConnected: false,
    user: {},
    rooms: [],
    messages: []
  },
  mutations: {
    setUser (state, data) {
      state.user = data
    },
    setRooms (state, data) {
      state.rooms = data
    },
    setMessage (state, data) {
      state.messages = [...state.messages, data]
    },
    reset (state) {
      this.isConnected = false
      this.user = {}
      this.rooms = []
      this.messages = []
    }
  },
  actions: {
    'SOCKET_rooms' ({ commit, dispatch }, data) {
      console.log('rooms', data)

      commit('setRooms', data)
    },
    'SOCKET_message' ({ commit, dispatch }, data) {
      console.log('message', data)

      commit('setMessage', data)
    },
    socketEmit (_, { action, payload }) {
      return this._vm.$socket.emit(action, payload)
    },
    async register ({ commit, dispatch }, data) {
      const { id } = await dispatch('socketEmit', {
        action: 'register',
        payload: data
      })

      commit('setUser', { id, ...data })
    }
  },
  modules: {
  }
})
