import request from '@/utils/request.ts'

export function listInspectData() {
    return request({
        url: '/omm/equipments/maintenance',
        method: 'get'
    })
}
export function getInspectNum() {
    return request({
        url: '/omm/equipments/comprehensive-compared',
        method: 'get'
    })
}

