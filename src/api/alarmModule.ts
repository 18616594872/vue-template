import request from '@/utils/request'

export function listYearAndMonthAlarmCount() {
    return request({
        url: 'mam/year/month/alarm',
        method: 'get'
    })
}

export function listNewAlarms() {
    return request({
        url: 'mam/alarms/part',
        method: 'get'
    })
}
export function listAlarmCount() {
    return request({
        url: 'mam/tunnels/alarm-count',
        method: 'get'
    })
}
  
