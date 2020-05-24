<template>
  <div class="w-full md:max-w-2xl mx-auto">
    <card title="Rooms">
      <alert v-if="!rooms.length">
        No rooms found.
      </alert>

      <div class="grid grid-cols-3 gap-4">
        <a class="flex flex-col border-2 hover:border-gray-700 hover:bg-gray-100 rounded-lg p-4" href="#" v-for="(room, index) in rooms" :key="index">
          <strong class="font-semibold text-gray-700 text-sm">{{ room.name }}</strong>

          <div>
            <span class="inline-block rounded-full bg-green-500 w-2 h-2"></span>
            <span class="text-gray-500 text-xs ml-2">13 online</span>
          </div>
        </a>
      </div>
    </card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import Alert from '@/components/Alert.vue'

export default {
  name: 'Rooms',
  components: {
    Card,
    Alert
  },
  data () {
    return {
      rooms: []
    }
  }
}
</script>
