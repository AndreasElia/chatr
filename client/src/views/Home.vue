<template>
  <div class="w-full md:max-w-md mx-auto">
    <card title="Registration">
      <form @submit.prevent="submit">
        <text-input class="mb-4" v-model="form.username" label="Username" id="username" />
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
      form: {
        username: '',
        color: 1
      },
      jwt: null
    }
  },
  sockets: {
    auth: function (response) {
      this.jwt = response.jwt
    }
  },
  methods: {
    submit () {
      if (this.$socket.disconnected) {
        console.log('not connected to server')
        return
      }

      this.form.color = ~~(360 * Math.random())

      this.$socket.emit('authenticate', this.form)

      console.log('emitted')
    }
  }
}
</script>
