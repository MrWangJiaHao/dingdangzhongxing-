export let PFSRequest1 = {
    state: {
        PFSqueryData1: [],
    },
    mutations: {
        PFSqueryData1(state, payload) {
            state.PFSqueryData1 = payload
        },
        delPFSqueryData1(state, payload) {
            state.PFSqueryData1.forEach((v, i) => {
                if (i === payload) {
                    state.PFSqueryData1.splice(i, 1)
                }
            })
        }
    },
    actions: {
        PFSRequestAct1(store, data) {
            store.commit("PFSqueryData1", data)
        },
        delPFSRequestAct1(store, data) {
            store.commit("delPFSqueryData1", data)
        }
    },
    getters: {

    },
    modules: {

    }
}