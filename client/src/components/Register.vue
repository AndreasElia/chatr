<template>
  <div class="w-full md:max-w-md mx-auto">
    <card title="Registration">
      <form @submit.prevent="submit">
        <text-input class="mb-4" v-model="username" label="Username" id="username" />
        <text-input class="mb-4" v-model="room" label="Room" id="room" />
        <button-input class="w-full" type="submit">Join Chat</button-input>
      </form>
    </card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import TextInput from '@/components/TextInput.vue'
import ButtonInput from '@/components/ButtonInput.vue'

export default {
  name: 'Chat',
  components: {
    Card,
    TextInput,
    ButtonInput
  },
  data () {
    return {
      username: '',
      room: ''
    }
  },
  created () {
    this.$socket.on('error', (data) => {
      console.log('error', data)
    })
  },
  methods: {
    submit () {
      this.ready = true
      this.color = ~~(360 * Math.random())

      this.$socket.emit('message', {
        username: this.username,
        room: this.room,
        color: this.color
      })

      this.$router.push('chat')

      console.log('fired')
    }
  }
}
</script>
