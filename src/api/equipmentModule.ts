import request from '@/utils/request'

export function getEquipmetStatus() {
    return request({
        url: '/omm/equipments/status-percentage',
        method: 'get'
    })
}

export function listEquipmentData() {
    return request({
        url: '/omm/equipments/overview',
        method: 'get'
    })
}