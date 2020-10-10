export let storageLocalAdminRequest = {
    state: {
        storageLocalAdminRequestData: {}
    },
    mutations: {
        SLqueryData(state, payload) {
            state.storageLocalAdminRequestData = payload
        }
    },
    actions: {
        SLadminRequest(store, data) {
            store.commit("SLqueryData", data)
        }
    },
    getters: {

    },
    modules: {

    }
}