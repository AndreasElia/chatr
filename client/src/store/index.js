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
      console.log('setUser', data)

      state.user = data
    },
    setRooms (state, data) {
      console.log('setRooms', data)

      state.rooms = data
    },
    setMessages (state, data) {
      console.log('setMessages', data)

      state.messages = data
    },
    setMessage (state, data) {
      console.log('setMessage', data)

      state.messages.push({
        user: state.user.name,
        message: data
      })
    },
    reset (state) {
      console.log('reset')

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
    'SOCKET_messages' ({ commit, dispatch }, data) {
      console.log('messages', data)

      commit('setMessages', data)
    },
    'SOCKET_message' ({ commit, dispatch }, data) {
      console.log('message', data)

      commit('setMessage', data)
    },
    socketEmit (_, { action, payload }) {
      return this._vm.$socket.emit(action, payload)
    },
    async register ({ commit, dispatch }, data) {
      console.log('register', data)

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
