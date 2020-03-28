<template>
  <div>
    <h1 class="title">
      Ultimate Tictactoe
    </h1>
    <div class="ultimate_game__container">
      <div
        class="ultimate_game__player_navigation"
        :class="isActiveCircle"
      >
        ◯
      </div>
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
        class="ultimate_game__player_navigation"
        :class="isActiveCross"
      >
        ✕
      </div>
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
      player: state => state.board.player,
      gameWinner: state => state.board.gameWinner
    }),
    isActiveCircle() {
      if (this.isGameOver) {
        return { 'circle--active': false }
      }
      if (this.player === 1) {
        return { 'circle--active': true }
      } else {
        return { 'circle--active': false }
      }
    },
    isActiveCross() {
      if (this.isGameOver) {
        return { 'cross--active': false }
      }
      if (this.player === -1) {
        return { 'cross--active': true }
      } else {
        return { 'cross--active': false }
      }
    },
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
.title {
  font-family: Shadows Into Light;
  text-align: center;
  font-size: 8rem;
  margin-bottom: 2rem;
}

.ultimate_game {
  &__container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__player_navigation {
    border: .1rem solid #333;
    border-radius: .5rem;
    padding: 2.4rem 3.6rem;
    font-size: 3rem;
    margin: 0 5rem;
    opacity: .3;
  }

  &__result__container {
    position: absolute;
    width: 100rem;
    text-align: center;
  }

  &__result {
    font-size: 10rem;
    font-weight: bold;
  }

  &--over {
    opacity: .3;
  }
}

.circle--active {
  opacity: 1;
  background-color: rgba(238, 0, 17, .2);
}

.cross--active {
  opacity: 1;
  background-color: rgba(0, 17, 238, .2);
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
