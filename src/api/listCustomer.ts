import request from '@/utils/request'

export function customerDataList() {
    return request({
        url: '/oam/customer',
        method: 'get'
    })
}

