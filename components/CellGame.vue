<template>
  <div
    class="cell_game__container"
    :class="activeClasses"
  >
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
          @click="clickMark(getId(i, j))"
        />
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
  props: {
    cellId: {
      type: Number,
      required: true
    }
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
    winPlayer: ''
  }),
  computed: {
    ...mapState({
      isStarted: state => state.board.isStarted,
      player: state => state.board.player,
      activeCellId: state => state.board.activeCellId
    }),
    isActive() {
      return this.cellId === this.activeCellId
    },
    result() {
      if (this.isDraw) return '△'
      return this.winPlayer === 1 ? '○' : '✕'
    },
    resultClasses() {
      if (this.isDraw) {
        return 'tryangle'
      }
      if (this.winPlayer === 1) {
        return 'circle'
      }
      if (this.winPlayer === -1) {
        return 'cross'
      }
      return ''
    },
    activeClasses() {
      if (this.player === 1) {
        return {
        'active--circle': this.isActive
        }
      }
      if (this.player === -1) {
        return {
          'active--cross': this.isActive
        }
      }
      return ''
    }
  },
  methods: {
    ...mapActions('board', [
      'gameStart',
      'changePlayer',
      'updateActiveCellId'
    ]),
    getId(x, y) {
      return x * this.field + y
    },
    clickMark(id) {
      if (!this.isStarted) {
        this.gameStart()
      } else if (
        this.isOver ||
        this.board[id] !== 0 ||
        this.cellId !== this.activeCellId
      ) {
        return
      }
      
      this.updateActiveCellId(id)
      this.board[id] = this.player
      this.$forceUpdate()
      this.isWinJudge() ? this.gameResult() : this.changePlayer()
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
    },
    gameResult() {
      this.winPlayer = this.player
      this.isOver = true
    }
  }
}
</script>

<style lang="scss" scoped>
.cell_game {
  &__container {
    width: 18rem;
    height: 18rem;
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

.active--circle {
  background-color: #ffbfcb;
}

.active--cross {
  background-color: #bffff3;
}
</style>
