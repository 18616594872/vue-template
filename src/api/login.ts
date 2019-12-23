import request from '@/utils/request.ts'

export function getInfo(token: any) {
    return request({
        url: '/user/info',
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