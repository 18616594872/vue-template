import request from '@/utils/request.ts'

export function listMonitorData() {
    return request({
        url: '/mam/dataOverview/monitor/list',
        method: 'get'
    })
}

