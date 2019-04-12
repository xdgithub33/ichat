import accountApi from '../../api/accout'

const actions = {
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      accountApi.login(data).then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        },
      )
    })
  },
}
const state = {}
const getters = {}
const mutations = {}

export default {
  state,
  getters,
  mutations,
  actions,
}
