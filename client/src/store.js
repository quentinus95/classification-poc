import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  collections: [],
  user: null
}

const getters = {
  currentUser: state => state.user
}

const mutations = {

}

const actions = {

}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
