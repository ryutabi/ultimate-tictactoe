export const state = () => ({
  player: 1,
})

export const mutations = {
  CHANGE_PLAYER(state) {
    state.player *= -1
  }
}

export const actions = {
  changePlayer({ commit }) {
    commit('CHANGE_PLAYER')
  }
}
