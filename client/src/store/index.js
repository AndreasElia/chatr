import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isConnected: false,
    user: {},
    room: {},
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

      state.isConnected = true

      state.rooms = data
    },
    setRoom (state, data) {
      console.log('setRoom', data)

      state.room = data.room
      state.messages = data.messages
    },
    setMessage (state, data) {
      console.log('setMessage', data)

      state.messages.push({
        user: data.user,
        message: data.message
      })
    },
    setOnline (state, data) {
      console.log('setOnline', data)

      state.messages.push({
        user: 'Bot',
        message: `${data.user} has joined the room`
      })

      state.room.online = data.count
    },
    setOffline (state, data) {
      console.log('setOffline', data)

      state.messages.push({
        user: 'Bot',
        message: `${data.user} has left the room`
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
    'SOCKET_room' ({ commit, dispatch }, data) {
      console.log('room', data)

      commit('setRoom', data)
    },
    'SOCKET_message' ({ commit, dispatch }, data) {
      console.log('message', data)

      commit('setMessage', data)
    },
    'SOCKET_online' ({ commit, dispatch }, data) {
      console.log('online', data)

      commit('setOnline', data)
    },
    'SOCKET_offline' ({ commit, dispatch }, data) {
      console.log('offline', data)

      commit('setOffline', data)
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
