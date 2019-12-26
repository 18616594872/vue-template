import axios from 'axios'
import {
    getToken
} from './common'
import {
    Message
} from 'element-ui'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API
})

// request interceptor
service.interceptors.request.use(
    (config: any) => {

        if (getToken()) {
            config.headers.common['Authorization'] = getToken()
        }
        return config
    },
    (error: any) => {
        console.log(error)
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    (response: any) => {
        const res: any = response.data

        if (res.code != 200) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })

            if (res.code === 503 || res.code === 500) {
                // to re-login
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    (error: any) => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service