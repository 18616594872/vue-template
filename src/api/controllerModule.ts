import request from '@/utils/request'

export function listComplexobjData() {
    return request({
        url: '/mam/complexobj-datas',
        method: 'get',
    })
}
