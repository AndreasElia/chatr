import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isConnected: false,
    user: {},
    rooms: []
  },
  mutations: {
    setUser (state, data) {
      state.user = data
    },
    setRooms (state, data) {
      state.rooms = data
    }
  },
  actions: {
    'SOCKET_rooms' ({ commit, dispatch }, data) {
      commit('setRooms', data)
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
