import request from '@/utils/request.ts'

export function listMeasTriggerCount() {
    return request({
        url: '/mam/extreme-datas',
        method: 'get'
    })
}

