export let PFSRequest = {
    state: {
        PFSqueryData: [],
        PFSqueryData1: [],
    },
    mutations: {
        PFSqueryData(state, payload) {
            state.PFSqueryData = payload
        },
        PFSqueryData1(state, payload) {
            state.PFSqueryData1 = payload
        },
        delPFSqueryData(state, payload) {
            state.PFSqueryData.forEach((v, i) => {
                if (i === payload) {
                    state.PFSqueryData.splice(i, 1)
                }
            })
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
        PFSRequestAct(store, data) {
            store.commit("PFSqueryData", data)
        },
        delPFSRequestAct(store, data) {
            store.commit("delPFSqueryData", data)
        },
        
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