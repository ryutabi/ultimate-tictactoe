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
          <cell-game />
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
  })
}
</script>

<style lang="scss" scoped>
</style>
