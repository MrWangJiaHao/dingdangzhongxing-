import Vue from 'vue'
import Vuex from 'vuex'
import { getUserTypeshuju, getWarehoseConfig } from "../api/api";
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
  },
  //获取子仓姓名
  async getWarehoseConfig({ commit }) {
    let data = await getWarehoseConfig()
    commit("GETWAREHOUSECONFIG", data)
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
  },
  GETWAREHOUSECONFIG(state, data) {
    state.warehouseConfig = data.result
  }
}
let state = {
  editUser: {},
  userTypeArr: [],
  systemTime: false,
  warehouseConfig: []
}
import { loginRequest } from "../views/login/login"
import {CWAdminRequest} from '../views/warehoseConfig/childWarehouseAdmin'
import {storageLocalAdminRequest} from '../views/warehoseConfig/storageLocalAdmin'
import {PFSRequest} from '../components/productForm/productFormStore'
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: { loginRequest,CWAdminRequest,storageLocalAdminRequest,PFSRequest }
})