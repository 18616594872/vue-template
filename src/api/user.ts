import request from '@/utils/request'
import { UserInfo } from '@/types/views/user.interface'

export function login(data: UserInfo) {
    return request({
        url: '/auth/shiro/login',
        method: 'post',
        data
    })
}

export function getInfo(token: any) {
    return request({
        url: `/auth/shiro/login`,
        method: 'get',
        params: {
            token
        }
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}   