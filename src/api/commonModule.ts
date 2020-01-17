import request from '@/utils/request'

export function listTunnelStatus() {
    return request({
        url: '/common/tunnel-status/statistics',
        method: 'get',
    })
}

export function getRunMessage() {
    return request({
        url: '/common/tunnels/run-message',
        method: 'get'
    })
}

