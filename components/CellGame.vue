<template>
  <div class="cell_game__container">
    <div
      v-if="isOver"
      class="cell_game__result"
      :class="resultClasses"
    >
      {{ result }}
    </div>
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
    isOver: false,
    isDraw: false,
    field: 3,
    board: [
      0, 0, 0,
      0, 0, 0,
      0, 0, 0
    ],
    player: 1
  }),
  computed: {
    result() {
      if (this.isDraw) return '△'
      return this.player === 1 ? '○' : '✕'
    },
    resultClasses() {
      if (this.isDraw) return 'tryangle'
      if (this.player === 1) return 'circle'
      if (this.player === -1) return 'cross'
      return ''
    }
  },
  methods: {
    getId(x, y) {
      return x * this.field + y
    },
    drawMark(id) {
      if (this.isOver || this.board[id] !== 0) {
        return
      }
      this.board[id] = this.player
      this.$forceUpdate()
      this.isWinJudge() ? this.isOver = true : this.player *= -1
    },
    isWinJudge() {
      const sumNums = winIds.map(ids => ids.reduce((x, y) => x + this.board[y], 0))
      if (this.isDrawJudge(sumNums)) {
        this.isDraw = true
        this.isOver = true
        return
      }
      const isWin = sumNums.some(num => Math.abs(num) === 3)
      return isWin
    },
    isDrawJudge(nums) {
      return nums.every(num => num !== 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.cell_game {
  &__container {
    width: 16rem;
    height: 16rem;
    margin: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  &__result {
    position: absolute;
    font-size: 16rem;
  }
}

td {
  border: .1rem solid #000;
  height: 5rem;
  width: 5rem;
  font-size: 3rem;
}
</style>
