<template>
  <div class="ultimate_game__container">
    <table
      :class="{'ultimate_game--over': isGameOver}"
      frame="void"
    >
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
    <div
      v-if="isGameOver"
      class="ultimate_game__result__container"
      :class="resultClasses"
    >
      <p class="ultimate_game__result">
        {{ gameResult }}
      </p>
    </div>
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
      isGameDraw: state => state.board.isGameDraw,
      gameWinner: state => state.board.gameWinner
    }),
    gameResult() {
      return !this.gameWinner ? '引き分け' :
             this.gameWinner === 1 ? ' ◯ の勝ち' :
             this.gameWinner === -1 ? ' ✕ の勝ち' :
             ''
    },
    resultClasses() {
      return !this.gameWinner ? {'result--draw': this.isGameOver} :
             this.gameWinner === 1 ? {'result--circle': this.isGameOver} :
             this.gameWinner === -1 ? {'result--cross': this.isGameOver} :
             ''
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
.ultimate_game {
  &__container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__result__container {
    position: absolute;
    width: 100rem;
    text-align: center;
  }

  &__result {
    font-size: 10rem;
  }

  &--over {
    opacity: .3;
  }
}

.result--draw {
  color: #fafafa;
  background-color: #999;
}

.result--circle {
  color: #ee0011;
  background-color: rgba(238, 0, 17, .2);
}

.result--cross {
  color: #0010ed;
  background-color: rgba(0, 17, 238, .2);
}

</style>
