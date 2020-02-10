import request from '@/utils/request'

export function getNavBarNum() {
    return request({
        url: '/um/mamPage/navBar',
        method: 'get'
    })
}

