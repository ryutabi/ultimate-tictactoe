export const state = () => ({
  isStarted: false,
  isClickAbleAnywhere: false,
  mainBoard: [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
  ],
  player: 1,
  activeCellId: ''
})

export const mutations = {
  INIT_GAME(state) {
    state.isStarted = true
    state.isClickAbleAnywhere = false
  },
  CHANGE_PLAYER(state) {
    state.player *= -1
  },
  UPDATE_ACTIVE_CELL_ID(state, id) {
    state.activeCellId = id
  },
  CHECK_CELL_CLICK_ABLE(state, id) {
    if (state.mainBoard[id] !== 0) {
      state.isClickAbleAnywhere = true
      state.activeCellId = ''
    }
  },
  UPDATE_GAME_BOARD(state, data) {
    state.mainBoard[data.cellId] = data.result
  }
}

export const actions = {
  initGame({ commit }) {
    commit('INIT_GAME')
  },
  changePlayer({ commit }) {
    commit('CHANGE_PLAYER')
  },
  updateActiveCellId({ commit }, id) {
    commit('UPDATE_ACTIVE_CELL_ID', id)
  },
  checkCellClickAble({ commit }, id) {
    commit('CHECK_CELL_CLICK_ABLE', id)
  },
  updateGameBoard({ commit }, data) {
    commit('UPDATE_GAME_BOARD', data)
  }
}
