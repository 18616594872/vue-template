import request from '@/utils/request.ts'

export function listRouter() {
    return request({
        url: '/cm/permission/routes',
        method: 'get'
    })
}

export function listRole() {
    return request({
        url: '/cm/permission/roles',
        method: 'get'
    })
}

export function updateRole(data: any) {
    return request({
        url: '/cm/permission/updateRoles',
        method: 'post',
        data
    })
}
