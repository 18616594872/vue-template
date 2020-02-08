import request from '@/utils/request'

export function listAlarmData() {
    return request({
        url: '/omm/equipments/alarm',
        method: 'get'
    })
}

export function listPlanData() {
    return request({
        url: '/em/plans/list',
        method: 'get'
    })
}