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
          :state="board[getId(i, j)]"
          @click="drawMark(getId(i, j))"
        />
      </tr>
    </table>
  </div>
</template>

<script>
import Square from '~/components/Square'

const winIds = [
  // vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // diagonal
  [0, 4, 8],
  [2, 4, 6]
]

export default {
  components: {
    Square
  },
  data:() => ({
    isStarted: true,
    field: 3,
    board: [
      0, 0, 0,
      0, 0, 0,
      0, 0, 0
    ],
    player: 1
  }),
  methods: {
    getId(x, y) {
      return x * this.field + y
    },
    drawMark(id) {
      if (!this.isStarted || this.board[id] !== 0) {
        return
      }
      this.board[id] = this.player
      this.$forceUpdate()
      this.judge()
      this.changePlayer()
    },
    changePlayer() {
      this.player *= -1
    },
    judge() {
      const sumNum = winIds.map(ids => ids.reduce((x, y) => x + this.board[y], 0))
      const isWin = sumNum.some(num => num === 3)
      if (isWin) {
        this.isStarted = false
        console.log(`${this.player} の勝ち`)
        return
      }
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
