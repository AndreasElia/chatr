<template>
  <div
    class="bg-white shadow-md rounded p-6"
  >
    <h1 class="text-gray-700 text-2xl text-center font-semibold mb-6">{{ title }}</h1>

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
