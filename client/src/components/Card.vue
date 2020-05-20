<template>
  <div
    class="bg-white shadow-md rounded p-6"
  >
    <h1 class="text-gray-700 text-2xl text-center font-bold mb-2">{{ title }}</h1>
    <div class="block mx-auto bg-gray-400 h-1 w-12 mb-6"></div>

    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String
    }
  }
}
</script>
