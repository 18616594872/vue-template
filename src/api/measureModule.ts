import request from '@/utils/request'

export function listMeasTriggerCount() {
    return request({
        url: '/mam/extreme-datas',
        method: 'get'
    })
}

