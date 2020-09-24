// import { login } from "@/api/api.js"

export let loginRequest = {
  state: {
    loginData: []
  },
  mutations: {
    loginData(state, payload) {
      state.loginData = payload
    }
  },
  actions: {
    loginRequest(store, data) {
      store.commit("loginData", data)
    }
  },
  getters: {

  },
  modules: {

  }
}