import {
    MutationTree
} from 'vuex'

const state: any = {
    leftTreeRouters: []
}

const mutations: MutationTree < any > = {
    SET_TREEROUTRES: (state: any, leftTreeRouters: any) => {
        state.leftTreeRouters = leftTreeRouters
    }
}

export default {
    state,
    mutations
}