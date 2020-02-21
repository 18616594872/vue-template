import request from '@/utils/request'

export function tableList() {
    return request({
        url: '/oam/enery/table',
        method: 'get'
    })
}

export function energyConsumptionDataList() {
    return request({
        url: '/oam/enery/tunnelEnergyConsumptionData',
        method: 'get'
    })
}

export function energyAverageECDataList() {
    return request({
        url: '/oam/enery/averageEC',
        method: 'get'
    })
}

export function energyPeriodECDataList() {
    return request({
        url: '/oam/enery/periodEC',
        method: 'get'
    })
}

