import Vue from 'vue'
import Vuex from 'vuex'
import * as Actions from './actions'
import * as Getters from './getters'
import ShoppingMall from './modules/shoppingMall'
import Home from './modules/home'

Vue.use(Vuex)

export default new Vuex.Store({
  Actions,
  Getters,
  modules: {
    Home,
    ShoppingMall,
  },
})
