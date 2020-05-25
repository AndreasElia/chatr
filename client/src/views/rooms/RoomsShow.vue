<template>
  <card>
    <div class="flex justify-between items-center">
      <strong class="font-semibold text-gray-700 text-sm">Room name</strong>

      <div>
        <span class="inline-block rounded-full bg-green-500 w-2 h-2"></span>
        <span class="text-gray-500 text-xs ml-2">0 online</span>
      </div>
    </div>

    <div class="my-6">
      <span class="text-gray-500">messages</span>
    </div>

    <form class="w-full" @submit.prevent="submit">
      <text-input v-model="message" id="message" label="Message" :show-label="false" />
    </form>
  </card>
</template>

<script>
import Card from '@/components/Card.vue'
import TextInput from '@/components/TextInput.vue'

export default {
  name: 'RoomsShow',
  props: ['id'],
  components: {
    Card,
    TextInput
  },
  data () {
    return {
      message: null
    }
  },
  methods: {
    submit () {
      this.message = null
    }
  }
}
</script>
