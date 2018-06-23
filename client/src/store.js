import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  collections: [],
  user: null
}

const getters = {
  currentUser: state => state.user,
  collections: state => state.collections
}

const mutations = {
  LOG_IN(state, username) {
    state.user = username
  },
  SET_COLLECTIONS(state, collections) {
    state.collections = collections
  }
}

const actions = {
  logIn: ({ commit }, username) => {
    commit('LOG_IN', username)
  },
  setCollections: ({ commit }, collections) => {
    commit('SET_COLLECTIONS', collections)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
