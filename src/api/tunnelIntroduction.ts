import request from '@/utils/request.ts'

export function listTunnelIntroductionData() {
    return request({
        url: '/common/tunnels/conditions',
        method: 'get'
    })
}

export function listEquipmentStatisticsData() {
    return request({
        url: '/omm/equipments/statistics',
        method: 'get'
    })
}