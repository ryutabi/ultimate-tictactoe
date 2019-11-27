<template>
  <div class="container">
    <table frame="void">
      <tr
        v-for="(n, i) in field"
        :key="i"
      >
        <square
          v-for="(m, j) in field"
          :key="j"
          :state="board[i][j]"
          @click="drawMark(i, j)"
        />
      </tr>
    </table>
  </div>
</template>

<script>
import Square from '~/components/Square'

export default {
  components: {
    Square
  },
  data:() => ({
    field: 3,
    board: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ],
    player: 1
  }),
  methods: {
    drawMark(_i, _j) {
      if (this.board[_i][_j] !== 0) {
        return
      }
      this.board[_i][_j] = this.player
      this.changePlayer()
      this.$forceUpdate()
    },
    changePlayer() {
      this.player *= -1
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  border: .1rem solid #000;
}

table {
  border-collapse: collapse;
}

td {
  border: .3rem solid #000;
  height: 6rem;
  width: 6rem;
  text-align: center;
  font-size: 3rem;
  user-select: none;
}
</style>
