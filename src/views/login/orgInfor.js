export let orgInfor = {
    state: {
        orgInforData: []
    },
    mutations: {
        orgInforData(state, payload) {
            state.orgInforData = payload
        }
    },
    actions: {
        orgInforRequest(store, data) {
            store.commit("orgInforData", data)
        }
    },
    getters: {

    },
    modules: {

    }
}