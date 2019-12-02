export const state = () => ({
  isStarted: false,
  boardState: [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
  ],
  player: 1,
  activeCellId: null
})

export const mutations = {
  GAME_START(state) {
    state.isStarted = true
  },
  CHANGE_PLAYER(state) {
    state.player *= -1
  },
  UPDATE_ACTIVE_CELL_ID(state, id) {
    state.activeCellId = id
  }
}

export const actions = {
  gameStart({ commit }) {
    commit('GAME_START')
  },
  changePlayer({ commit }) {
    commit('CHANGE_PLAYER')
  },
  updateActiveCellId({ commit }, id) {
    commit('UPDATE_ACTIVE_CELL_ID', id)
  }
}
