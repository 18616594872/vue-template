import request from '@/utils/request.ts'

export function listCustomerData() {
    return request({
        url: '/common/companies/cables/total',
        method: 'get'
    })
}

export function listEnergyData() {
    return request({
        url: '/oam/tunnels/energies/every-month',
        method: 'get'
    })
}


