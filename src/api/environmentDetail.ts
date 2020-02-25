import request from '@/utils/request.ts'

export function equipmentTypeDataList() {
    return request({
        url: '/mam/environmentDetail/equipmentTypeDetailData',
        method: 'get'
    })
}

