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
      {{ cellGameResult }}
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
import { isWinJudge, isDrawJudge } from '~/assets/game'
import Square from '~/components/Square'

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
    winPlayer: null
  }),
  computed: {
    ...mapState({
      isStarted: state => state.board.isStarted,
      isGameOver: state => state.board.isGameOver,
      isClickAbleAnywhere: state => state.board.isClickAbleAnywhere,
      mainBoard: state => state.board.mainBoard,
      player: state => state.board.player,
      activeCellId: state => state.board.activeCellId,
    }),
    isActive() {
      return this.cellId === this.activeCellId
    },
    cellGameResult() {
      return this.isDraw ? '△' :
             this.winPlayer === 1 ? '○' :
             this.winPlayer === -1 ? '✕' :
             ''
    },
    resultClasses() {
      return this.isDraw ? 'tryangle' :
             this.winPlayer === 1 ? 'circle' :
             this.winPlayer === -1 ? 'cross' :
             ''
    },
    activeClasses() {
      return this.player === 1 ? {'active--circle': this.isActive} :
             this.player === -1 ? {'active--cross': this.isActive} :
             ''
    }
  },
  methods: {
    ...mapActions('board', [
      'initGame',
      'changePlayer',
      'updateActiveCellId',
      'checkCellClickAble',
      'updateMainBoard',
      'gameOver'
    ]),
    getId(x, y) {
      return x * this.field + y
    },
    clickMark(id) {
      // ゲームが終了していたら
      if (this.isGameOver) {
        return
      }
      // 初めてのクリック or どこでもクリックできる状態なら
      if (!this.isStarted || this.isClickAbleAnywhere) {
        this.initGame()
      } else if (
        // セルゲームが終わっている
        this.isOver ||
        // すでにマークされている
        this.board[id] !== 0 ||
        // クリックしたセルID と今クリックできるセルIDが違う
        this.cellId !== this.activeCellId
      ) {
        return
      }

      this.board[id] = this.player
      this.$forceUpdate()

      // 引き分け判定
      this.drawJudge()
      // 勝敗判定
      if (isWinJudge(this.board)) {
        this.cellGameJudgment()
      }

      // クリックできるセルIDを更新
      this.updateActiveCellId(id)
      // セルIDがクリックできる状態か確認
      this.checkCellClickAble(id)

      // プレイヤーをチェンジ
      this.changePlayer()
    },
    drawJudge() {
      if (isDrawJudge(this.board)) {
        this.isDraw = true
        this.isOver = true
        // board.js に引き分けを追加
        const resultData = {
          cellId: this.cellId,
          result: 9
        }
        this.updateMainBoard(resultData)
        this.ultimateJudgment()
      }
    },
    cellGameJudgment() {
      this.winPlayer = this.player
      this.isOver = true
      
      // board.js に結果を追加
      const resultData = {
        cellId: this.cellId,
        result: this.player
      }
      this.updateMainBoard(resultData)
      this.ultimateJudgment()
    },
    // 最終判定
    ultimateJudgment() {
      // 引き分け時
      if (isDrawJudge(this.mainBoard)) {
        console.log('drawです！')
      }

      // 勝敗判定
      if (isWinJudge(this.mainBoard)) {
        this.gameOver(this.player)
        console.log('Game Over')
      }
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
    font-size: 15rem;
  }
}

td {
  border: .1rem solid #333;
  height: 5rem;
  width: 5rem;
  font-size: 3rem;
}

.circle {
  color: #ee0011;
}

.cross {
  color: #0010ed;
}

.tryangle {
  color: #10ed00;
}

.active--circle {
  background-color: rgba(238, 0, 17, .2);
}

.active--cross {
  background-color: rgba(0, 17, 238, .2);
}

</style>
