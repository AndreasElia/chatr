<template>
  <div class="flex justify-center items-center">
    <chat-room />
  </div>
</template>

<script>
import ChatRoom from '@/components/ChatRoom.vue'

export default {
  name: 'Chat',
  components: {
    ChatRoom
  },
  created () {
    this.$socket.on('join', (data) => {
      // add message to messages saying user has joined
    })

    this.$socket.on('join-error', (data) => {
      this.error = data
    })

    this.$socket.on('new-message', (data) => {
      // add message to messages
    })

    this.$socket.on('leave', (data) => {
      // user left
    })
  }
}
</script>
