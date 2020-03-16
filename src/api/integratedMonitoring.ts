import request from '@/utils/request'

export function listAverageGesInfo() {
    return request({
        url: '/mam/integrated/average',
        method: 'get'
    })
}

export function listObjData() {
    return request({
        url: '/mam/integrated/objData',
        method: 'get'
    })
}