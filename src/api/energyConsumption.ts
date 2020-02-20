import request from '@/utils/request'

export function tableList() {
    return request({
        url: '/oam/enery/table',
        method: 'get'
    })
}

