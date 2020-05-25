<template>
  <card title="Rooms">
    <alert v-if="!rooms.length">
      No rooms found.
    </alert>

    <div class="grid grid-cols-3 gap-4">
      <a class="flex flex-col border-2 hover:border-gray-700 hover:bg-gray-100 rounded-lg p-4" :href="'/rooms/' + room.slug" v-for="(room, index) in rooms" :key="index">
        <strong class="font-semibold text-gray-700 text-sm">{{ room.name }}</strong>

        <div>
          <span class="inline-block rounded-full bg-green-500 w-2 h-2"></span>
          <span class="text-gray-500 text-xs ml-2">0 online</span>
        </div>
      </a>
    </div>
  </card>
</template>

<script>
import { mapState } from 'vuex'
import Card from '@/components/Card.vue'
import Alert from '@/components/Alert.vue'

export default {
  name: 'RoomsIndex',
  components: {
    Card,
    Alert
  },
  computed: {
    ...mapState(['user', 'rooms'])
  }
}
</script>
