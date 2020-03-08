import request from '@/utils/request'

export function listcontrolEquip() {
    return request({
        url: '/mam/machanical/controlequipType',
        method: 'get'
    })
}

export function listEquipStatus(){
    return request({
        url: '/mam/machanical/controlequipStatus',
        method: 'get'
    })
}

