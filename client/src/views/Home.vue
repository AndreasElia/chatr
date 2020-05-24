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
import { mapActions } from 'vuex'
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
      username: '',
      color: null
    }
  },
  methods: {
    ...mapActions(['register']),

    submit () {
      if (this.$socket.disconnected) {
        console.log('not connected to server')
        return
      }

      this.color = ~~(360 * Math.random())

      this.register({
        username: this.username,
        color: this.color
      })

      this.$router.push('/rooms')
    }
  }
}
</script>
