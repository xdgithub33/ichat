import CONST from '../const'
const state = {
  title: '',
  active: 0,
}
const mutations = {}
const actions = {}
const getters = {
  active(state, getter) {
    return state.active
  },
  title(state, getter) {
    return state.title
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
