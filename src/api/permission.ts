import request from '@/utils/request.ts'

export function listRouter() {
    return request({
        url: 'cm/permission/routes',
        method: 'get'
    })
}

