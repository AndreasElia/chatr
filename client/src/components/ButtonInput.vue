<template>
  <button
    class="bg-purple-500 hover:bg-purple-700 text-sm text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    :type="type"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ButtonInput',
  props: {
    type: {
      type: String
    }
  }
}
</script>
