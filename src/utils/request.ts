import axios from 'axios'
import {
    getToken,
    TOKEN_KEY
} from '@/utils/common'
import {
    Message
} from 'element-ui'
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
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
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
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service