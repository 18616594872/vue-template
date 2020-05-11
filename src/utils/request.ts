import axios from 'axios'
import {
    getToken,
    TOKEN_KEY
} from '@/utils/common'
import store from '@/store'
import router from '@/router'
import Vue from 'vue'

const AUTHORIZATION: string = 'Authorization'
const Log = Vue.prototype.Log

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API
})

// request interceptor
service.interceptors.request.use(
    (config: any) => {

        if (getToken(TOKEN_KEY)) {
            config.headers.common[AUTHORIZATION] = getToken(TOKEN_KEY)
        }
        return config
    },
    (error: any) => {
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    (response: any) => {
        const res: any = response.data

        if (response.status !== 200) {
            
        } else {
            if (res.code === 503 || res.data === 500) {
                store.dispatch('logout').then(() => {
                    location.reload();
                });
                router.push({
                    path: '/VMLogin'
                })
            } else {
                return response
            }
        }
    },
    (error: any) => {
        Log.error(error) // for debug
        return Promise.reject(error)
    }
)

export default service