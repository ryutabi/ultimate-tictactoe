<template>
  <div class="game__container">
    <table frame="void">
      <tr
        v-for="(n, i) in field"
        :key="i"
      >
        <td
          v-for="(m, j) in field"
          :key="j"
        >
          <cell-game :cell-id="getId(i, j)" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import CellGame from '~/components/CellGame'

export default {
  components: {
    CellGame
  },
  data:() => ({
    field: 3
  }),
  methods: {
    getId(x, y) {
      return x * this.field + y
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
