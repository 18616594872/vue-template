import request from '@/utils/request.ts'

export function equipmentTypeList() {
    return request({
        url: '/mam/environment/common/equipmentType',
        method: 'get'
    })
}

