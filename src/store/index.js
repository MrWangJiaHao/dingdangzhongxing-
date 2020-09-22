import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import {loginRequest} from "../views/login/login"
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {loginRequest}
})