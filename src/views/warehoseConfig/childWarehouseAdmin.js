export let CWAdminRequest = {
    state: {
        queryData: {}
    },
    mutations: {
        queryData(state, payload) {
            state.queryData = payload
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