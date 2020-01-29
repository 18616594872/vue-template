import request from '@/utils/request.ts'

export function listTunnelIntroductionData(data: any) {
    return request({
        url: '/common/tunnels/conditions',
        method: 'post',
        data
    })
}

export function listEquipmentStatisticsData() {
    return request({
        url: '/omm/equipments/statistics',
        method: 'get'
    })
}

export function getGlendaleFlyRoute(tunnelId: any) {
    return request({
        url: `common/tunnels/${tunnelId}/tunnel-points`,
        method: 'get'
    })
}