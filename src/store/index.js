import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
let actions = {
  editUser({ commit }, data) {
    commit("GET_EDIT_USER", data)
  },
  clearEditUser({ commit }) {
    commit("CLEAR_EDIT_USER")
  }
}

let mutations = {
  GET_EDIT_USER(state, data) {
    state.editUser = data
  },
  CLEAR_EDIT_USER(state) {
    state.editUser = {}
  }
}

let state = {
  editUser: {}
}
import { loginRequest } from "../views/login/login"
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: { loginRequest }
})