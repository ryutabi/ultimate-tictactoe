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
    <p
      v-if="isGameOver"
      class="result"
    >
      {{ result }}
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CellGame from '~/components/CellGame'

export default {
  components: {
    CellGame
  },
  data:() => ({
    field: 3
  }),
  computed: {
    ...mapState({
      isGameOver: state => state.board.isGameOver,
      gameWinner: state => state.board.gameWinner
    }),
    result() {
      return `${this.gameWinner}の勝ち`
    }
  },
  methods: {
    getId(x, y) {
      return x * this.field + y
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
