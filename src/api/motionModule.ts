import request from '@/utils/request.ts'

export function totleEnergyEveryMonthAndTunnel() {
    return request({
        url: '/oam/tunnels/energies/every-month',
        method: 'get'
    })
}

