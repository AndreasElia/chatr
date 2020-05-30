<template>
  <div class="w-full md:max-w-md mx-auto">
    <card title="Registration">
      <form @submit.prevent="submit">
        <text-input class="mb-4" v-model="name" label="Name" id="name" />
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
      name: null
    }
  },
  methods: {
    ...mapActions(['register']),

    submit () {
      this.register({ name: this.name })

      this.$router.push('/rooms')
    }
  }
}
</script>
