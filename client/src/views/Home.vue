<template>
  <div class="w-full md:max-w-md mx-auto">
    <card title="Registration">
      <form @submit.prevent="submit">
        <text-input class="mb-4" v-model="username" label="Username" id="username" />
        <button-input class="w-full" type="submit">Join Chatr</button-input>
      </form>
    </card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import TextInput from '@/components/TextInput.vue'
import ButtonInput from '@/components/ButtonInput.vue'

export default {
  name: 'Home',
  components: {
    Card,
    TextInput,
    ButtonInput
  },
  data () {
    return {
      username: ''
    }
  },
  methods: {
    submit () {
      this.ready = true
      this.color = ~~(360 * Math.random())

      this.$socket.emit('register', {
        username: this.username,
        color: this.color
      })

      this.$router.push('rooms')
    }
  }
}
</script>
