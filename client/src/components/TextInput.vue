<template>
  <div>
    <label
      class="block text-gray-700 text-sm font-semibold mb-1"
      :for="id"
      v-if="showLabel"
    >{{ label }}</label>

    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:border-gray-700"
      type="text"
      :id="id"
      :placeholder="label"
      :value="value"
      v-on:input="updateValue($event.target.value)"
    >
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    id: {
      type: String
    },
    label: {
      type: String,
      required: true
    },
    showLabel: {
      type: Boolean,
      default: true
    },
    value: {
      type: String
    },
    required: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    updateValue: function (value) {
      this.$emit('input', value)
    }
  }
}
</script>
