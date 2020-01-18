import request from '@/utils/request.ts'

export function listComplexobjData() {
    return request({
        url: '/mam/complexobj-datas',
        method: 'get',
    })
}
