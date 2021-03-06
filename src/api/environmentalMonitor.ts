import request from '@/utils/request'

export function equipmentTypeList(data: any) {
    return request({
        url: '/mam/environment/common/equipmentType',
        method: 'post',
        data
    })
}

export function listDetailData(data: any){
    return request({
        url: '/mam/environmentDetail/measobjs/list',
        method: 'post',
        data
    })
}

export function equipmentTypeDataList(data: any) {
    return request({
        url: '/mam/environmentDetail/equipmentTypeDetailData',
        method: 'post',
        data
    })
}
