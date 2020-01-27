import request from '@/utils/request'

export function totleEnergyEveryMonthAndTunnel() {
    return request({
        url: '/oam/tunnels/energies/every-month',
        method: 'get'
    })
}

