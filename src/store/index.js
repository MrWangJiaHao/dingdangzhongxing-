import Vue from 'vue'
import Vuex from 'vuex'
import { getUserTypeshuju } from "../api/api";
Vue.use(Vuex)

let actions = {
  editUser({ commit }, data) {
    commit("GET_EDIT_USER", data)
  },
  clearEditUser({ commit }) {
    commit("CLEAR_EDIT_USER")
  },
  async getusertype({ commit }) { //获取用户角色
    let data = await getUserTypeshuju()
    commit("GET_USER_TYPR", data)
  },
  clearsystemSettingtime({ commit }) {
    commit("SHAHCHUSYSTEMTIME")
  }
}
let mutations = {
  GET_EDIT_USER(state, data) {
    state.editUser = data
  },
  CLEAR_EDIT_USER(state) {
    state.editUser = {}
  },
  GET_USER_TYPR(state, data) {
    state.userTypeArr = data.result
  },
  SHAHCHUSYSTEMTIME(state) {
    state.systemTime = true
  }
}

let state = {
  editUser: {},
  userTypeArr: [],
  systemTime: false
}
import { loginRequest } from "../views/login/login"
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: { loginRequest }
})