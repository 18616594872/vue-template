import request from '@/utils/request'

export function listTunnelStatus() {
    return request({
        url: '/common/tunnel-status/statistics',
        method: 'get',
    })
}

export function listTunnel(){
    return request({
        url: '/oam/common/tunnels',
        method: 'get',
    })
}
export function listArea(data: any){
    return request({
        url: '/oam/common/areas',
        method: 'post',
        data
    })
}

export function listStore(data: any){
    return request({
        url: '/oam/common/stores',
        method: 'post',
        data
    })
}

