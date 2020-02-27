import request from '@/utils/request.ts'

export function equipmentTypeDataList(data: any) {
    return request({
        url: '/mam/environmentDetail/equipmentTypeDetailData',
        method: 'post',
        data
    })
}

