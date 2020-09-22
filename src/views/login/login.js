
import {login} from "@/api/api.js"

export let loginRequest = {
  state: {
    loginData:{}
  },
  mutations: {
    loginData(state,payload){
     state.loginData=payload
    }
 },
 actions: {
   loginRequest(store){
     login().then((ok)=>{
       store.commit("loginData",ok.data.result)
     })
   }
 },
    getters:{
    
    },
    modules: {
      
    }
  }
  