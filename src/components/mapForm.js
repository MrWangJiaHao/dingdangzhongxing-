export let fromDataRequest = {
    state: {
        fromData: []
    },
    mutations: {
        fromData(state, payload) {
            state.fromData = payload
        },
    },
    actions: {
        fromDataAct(store, data) {
            store.commit("fromData", data)
        }
    },
    getters: {

    },
    modules: {

    }
}