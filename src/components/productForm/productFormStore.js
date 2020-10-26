export let PFSRequest = {
    state: {
        PFSqueryData: [],
    },
    mutations: {
        PFSqueryData(state, payload) {
            state.PFSqueryData = payload
        },

        delPFSqueryData(state, payload) {
            state.PFSqueryData.forEach((v, i) => {
                if (i === payload) {
                    state.PFSqueryData.splice(i, 1)
                }
            })
        },

    },
    actions: {
        PFSRequestAct(store, data) {
            store.commit("PFSqueryData", data)
        },
        delPFSRequestAct(store, data) {
            store.commit("delPFSqueryData", data)
        },

    },
    getters: {

    },
    modules: {

    }
}