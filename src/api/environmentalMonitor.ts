import request from '@/utils/request.ts'

export function equipmentTypeList() {
    return request({
        url: '/mam/environment/equipmentType',
        method: 'get'
    })
}

