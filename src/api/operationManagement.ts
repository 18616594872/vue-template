import request from '@/utils/request'

export function moniterDataList() {
    return request({
        url: '/um/operation/moniter/data',
        method: 'get'
    })
}

export function customerDataList() {
    return request({
        url: '/um/operation/customer',
        method: 'get'
    })
}

export function energyDataList() {
    return request({
        url: '/um/operation/energy',
        method: 'get'
    })
}

export function spaceDataList() {
    return request({
        url: '/um/operation/space',
        method: 'get'
    })
}