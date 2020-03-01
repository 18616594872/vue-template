import request from '@/utils/request'

export function listTunnelInfo() {
    return request({
        url: '/um/mamPage/navBar',
        method: 'get'
    })
}
