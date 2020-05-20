<template>
  <div class="p-8" id="app">
    <div class="flex justify-center space-x-4 mb-8">
      <router-link class="text-purple-700 text-sm font-bold" to="/">Home</router-link>
      <router-link class="text-purple-700 text-sm font-bold" to="/chat">Chat</router-link>
      <router-link class="text-purple-700 text-sm font-bold" to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  ready () {
    this.socket.on('join', () => {
      console.log(44444)
    })
  },
  created () {
    window.onbeforeunload = () => {
      this.$socket.emit('leave', 'foo')
    }
  }
}
</script>
