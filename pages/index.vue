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

const winIds = [
  // vertical
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  // horizontal
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  // diagonal
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]]
]

export default {
  components: {
    Square
  },
  data:() => ({
    isStarted: true,
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
      if (!this.isStarted || this.board[_i][_j] !== 0) {
        return
      }
      this.board[_i][_j] = this.player
      this.$forceUpdate()
      this.judge()
      this.changePlayer()
    },
    changePlayer() {
      this.player *= -1
    },
    judge() {
      const boardState = winIds.map(x => x.map(y => this.board[y[0]][y[1]]))
      boardState.forEach(arr => {
        const num = arr.reduce((x, y) => x + y)
        const win = Math.abs(num) === 3 ? true : false
        if (win) {
          this.isStarted = false
          console.log(`${this.player} の勝ち`)
          return
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 16rem;
  height: 16rem;
  display: flex;
  align-items: center;
  border: .1rem solid #000;
}

table {
  border-collapse: collapse;
}

td {
  border: .2rem solid #000;
  height: 5rem;
  width: 5rem;
  text-align: center;
  font-size: 3rem;
  user-select: none;
}
</style>
