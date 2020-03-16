import request from '@/utils/request'

export function listMonitorData() {
    return request({
        url: '/mam/dataOverview/monitor/list',
        method: 'get'
    })
}

