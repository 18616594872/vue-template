import request from '@/utils/request.ts'

export function listTunnelInfo(data: any) {
    return request({
        url: '/oam/contract/payType',
        method: 'post',
        data
    })
}

export function listEuqipData(data: any) {
    return request({
        url: '/oam/contract/payType',
        method: 'post',
        data
    })
}