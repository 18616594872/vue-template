import request from '@/utils/request'

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
        url: '/oam/contract/grid/contractTypeGrid',
        method: 'get'
    })
}

