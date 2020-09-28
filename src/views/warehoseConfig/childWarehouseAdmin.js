export let CWAdminRequest = {
    state: {
        queryData: {}
    },
    mutations: {
        queryData(state, payload) {
            state.loginData = payload
        }
    },
    actions: {
        CWAdminRequest(store, data) {
            store.commit("queryData", data)
        }
    },
    getters: {

    },
    modules: {

    }
}