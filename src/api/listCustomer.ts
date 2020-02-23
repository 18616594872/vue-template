import request from '@/utils/request.ts'

export function customerDataList() {
    return request({
        url: '/oam/customer',
        method: 'get'
    })
}

