<template>
  <div class="flex justify-center items-center">
    <!-- Chat room -->
    <div class="w-full md:max-w-md mx-auto">
      <card title="Chat room">
        <ul class="h-64 overflow-y-scroll mb-4">
          <li v-for="(message, index) in messages" :key="index">
            <span class="font-semibold" :style="'color: hsla(' + message.color + ', 70%, 80%, 1)'">{{ message.username }}</span>: {{ message.message }}
          </li>
        </ul>

        <form @submit.prevent="submit">
          <div class="flex flex-col">
            <text-input class="mb-4" v-model="message" label="Message" :show-label="false" id="message" />
            <button-input class="w-full" type="submit">Send Message</button-input>
          </div>
        </form>
      </card>
    </div>
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
      message: '',
      messages: []
    }
  },
  methods: {
    submit () {
      if (!this.message) return

      var messageData = {
        username: this.username,
        color: this.color,
        message: this.message
      }

      this.messages.push(messageData)
      this.$socket.emit('new-message', messageData)
      this.message = ''
    }
  }
}
</script>
