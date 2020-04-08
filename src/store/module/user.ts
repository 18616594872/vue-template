import {
    UserState,
    UserInfo
} from '@/types/views/user.interface'
import {
    GetterTree,
    MutationTree,
    ActionTree
} from 'vuex'
import {
    login,
    getInfo,
    logout
} from '@/api/user'
import {
    setToken,
    getToken,
    removeToken,
    TOKEN_KEY
} from '@/utils/common'
import router, {
    resetRouter
} from '@/router'

const state: UserState = {
    token: getToken(TOKEN_KEY),
    name: '',
    routelist: [],
    permissions: ['contract_list:search']
}

// 更改state
const mutations: MutationTree < UserState > = {
    // 更新state都用该方法
    SET_TOKEN: (state: UserState, token: string) => {
        state.token = token
    },
    SET_NAME: (state: UserState, name: string) => {
        state.name = name
    },
    SET_ROUTLIST: (state: UserState, routeList: string) => {
        state.routelist = routeList.split(',')
    }
}

const actions: ActionTree < UserState, any > = {
    // user login
    login({
            commit
        },
        userInfo: UserInfo) {
        const {
            userName,
            passWord
        } = userInfo
        return new Promise((resolve: any, reject: any) => {
            login({
                userName,
                passWord
            }).then((response: any) => {

                const {
                    code,
                    data,
                } = response.data

                if (code === 200 && Object.prototype.toString.call(data) === '[object Object]') {

                    commit('SET_TOKEN', data.token)
                    setToken(TOKEN_KEY, data.token)
                    resolve(data)

                } else {
                    reject(data)
                }
            }).catch((error: any) => {
                reject(error)
            })
        })
    },
    // get user info
    getInfo({
        commit,
        state: UserState
    }) {
        return new Promise((resolve: any, reject: any) => {
            getInfo(state.token).then((response: any) => {

                const {
                    code,
                    data,
                } = response.data;

                if (code === 200) {
                    const {
                        name,
                        routeList
                    } = data[0]

                    commit('SET_NAME', name)
                    commit('SET_ROUTLIST', routeList)
                    resolve(data)
                }


            }).catch((error: any) => {
                reject(error)
            })
        })
    },
    // user logout
    logout({
        commit,
        state: UserState,
        dispatch
    }) {
        return new Promise((resolve, reject) => {
            logout().then((result: any) => {
                commit('SET_TOKEN', '')
                commit('SET_QUEUENAME', [])
                commit('SET_NAME', '')
                commit('SET_ROUTLIST', '')
                removeToken(TOKEN_KEY)
                resetRouter()

                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
}

export default {
    state,
    mutations,
    actions
}