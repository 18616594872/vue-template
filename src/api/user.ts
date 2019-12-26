import request from '@/utils/request.ts'
import { UserInfo } from '@/types/views/user.interface.ts'

export function login(data: UserInfo) {
    return request({
        url: '/auth/shiro/login',
        method: 'post',
        data
    })
}

export function getInfo() {
    return request({
        url: `/auth/shiro/login/admin`,
        method: 'get'
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}   