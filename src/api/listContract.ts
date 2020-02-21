import request from '@/utils/request.ts'

export function getPayType() {
    return request({
        url: '/oam/contract/payType',
        method: 'get'
    })
}

export function getContractStatus() {
    return request({
        url: '/oam/contract/contractType',
        method: 'get'
    })
}

export function contractDatagrid() {
    return request({
        url: '/oam/contract/contractTypeGrid',
        method: 'get'
    })
}

