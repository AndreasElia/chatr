<template>
  <card title="Rooms">
    <div class="grid grid-cols-3 gap-4">
      <button class="flex flex-col border-2 hover:border-gray-700 focus:outline-none hover:bg-gray-100 rounded-lg p-4 pointer" @click="join(room)" v-for="(room, index) in rooms" :key="index">
        <strong class="font-semibold text-gray-700 text-sm">{{ room.name }}</strong>

        <div>
          <span class="inline-block rounded-full bg-green-500 w-2 h-2"></span>
          <span class="text-gray-500 text-xs ml-2">0 online</span>
        </div>
      </button>
    </div>
  </card>
</template>

<script>
import { mapState } from 'vuex'
import Card from '@/components/Card.vue'

export default {
  name: 'RoomsIndex',
  components: {
    Card
  },
  computed: {
    ...mapState(['user', 'rooms'])
  },
  methods: {
    join (room) {
      this.$socket.emit('join', room.slug)

      this.$router.push(`/rooms/${room.slug}`)
    }
  }
}
</script>
