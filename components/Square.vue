<template>
  <td
    @click="handleClick"
    :class="palyerClasses"
  >
    {{ mark }}
  </td>
</template>

<script>
export default {
  props: {
    state: {
      type: Number,
      default: 0,
      validator(num) {
        return [0, 1, -1].includes(num)
      }
    }
  },
  computed: {
    mark() {
      if (this.state === 1) {
        return '◯'
      }
      if (this.state === -1) {
        return '✕'
      }
      return ''
    },

  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style></style>
