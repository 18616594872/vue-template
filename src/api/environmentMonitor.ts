import request from '@/utils/request'

export function listEnvironmentMonitorData() {
    return request({
        url: 'mam/tunnels/environment/measobjs',
        method: 'get'
    })
}

export function listSecurityData() {
    return request({
        url: 'mam/tunnels/security/measobjs',
        method: 'get'
    })
}