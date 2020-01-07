import request from '@/utils/request.ts'

export function getRunMessage() {
    return request({
        url: '/common/tunnels/run-message',
        method: 'get'
    })
}