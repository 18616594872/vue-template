import request from '@/utils/request'

export function moniterDataList() {
    return request({
        url: '/oam/operation/moniter/data',
        method: 'get'
    })
}

export function customerDataList() {
    return request({
        url: '/oam/operation/customer',
        method: 'get'
    })
}

export function energyDataList() {
    return request({
        url: '/oam/operation/energy',
        method: 'get'
    })
}

export function spaceDataList() {
    return request({
        url: '/oam/operation/space',
        method: 'get'
    })
}