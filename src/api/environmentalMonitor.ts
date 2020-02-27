import request from '@/utils/request.ts'

export function equipmentTypeList() {
    return request({
        url: '/mam/environment/common/equipmentType',
        method: 'get'
    })
}

export function listDetailData(data: any){
    return request({
        url: '/mam/environmentDetail/measobjs/list',
        method: 'post',
        data
    })
}
