<template>
  <card>
    <div class="flex justify-between items-center">
      <strong class="font-semibold text-gray-700 text-sm">{{ room.name }}</strong>

      <div>
        <span class="inline-block rounded-full bg-green-500 w-2 h-2"></span>
        <span class="text-gray-500 text-xs ml-2">{{ room.online }} online</span>
      </div>
    </div>

    <div class="my-6 h-64 overflow-y-scroll" ref="chat">
      <div class="text-gray-500" v-for="(message, index) in messages" :key="index">
        <span class="font-semibold">{{ message.user }}</span>: {{ message.message }}
      </div>
    </div>

    <form class="w-full" @submit.prevent="submit">
      <text-input v-model="message" id="message" label="Message" :show-label="false" />
    </form>
  </card>
</template>

<script>
import { mapState } from 'vuex'
import Card from '@/components/Card.vue'
import TextInput from '@/components/TextInput.vue'

export default {
  name: 'RoomsShow',
  props: ['slug'],
  components: {
    Card,
    TextInput
  },
  computed: {
    ...mapState(['user', 'messages', 'room'])
  },
  watch: {
    messages () {
      setTimeout(() => {
        if (this.$refs.chat) {
          this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
        }
      }, 0)
    }
  },
  data () {
    return {
      message: null
    }
  },
  created () {
    window.addEventListener('beforeunload', () => {
      this.$socket.emit('offline', { user: this.user.name })
    })

    this.$socket.emit('room', this.room)
  },
  methods: {
    submit () {
      this.$socket.emit('message', { message: this.message })

      this.message = null
    }
  }
}
</script>
