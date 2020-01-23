import request from '@/utils/request.ts'

export function test(data: any) {
    return request({
        url: '',
        method: 'post',
        data
    })
}

