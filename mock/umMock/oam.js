
const areas = {
    '1': [{
            key: 1,
            val: '1区'
        },
        {
            key: 2,
            val: '2区'
        },
        {
            key: 3,
            val: '3区'
        }
    ],
    '2': [{
            key: 1,
            val: '1区'
        },
        {
            key: 2,
            val: '2区'
        }
    ]
}
const stores = {
    '1': [{
            key: 1,
            val: '污水仓'
        },
        {
            key: 2,
            val: '燃气舱'
        }
    ],
    '2': [{
        key: 2,
        val: '燃气舱'
    }]
}
export default [{
    url: '/oam/operation/moniter/data',
    type: 'get',
    response: () => {
        return {
            code: 200,
            msg: "success",
            data: [{
                    data: [{
                        value: '18',
                        name: '可用管线数'
                    }]
                },
                {
                    data: [{
                        value: '30',
                        name: '设计管线数'
                    }]
                },
                {
                    data: [{
                        value: '12',
                        name: '已用管线数'
                    }]
                },
                {
                    data: [{
                        value: '27',
                        name: '企业客户'
                    }]
                },
                {
                    data: [{
                        value: '6',
                        name: '本月总能耗'
                    }]
                },
                {
                    data: [{
                        value: '14',
                        name: '合同'
                    }]
                },
                {
                    data: [{
                        value: '22',
                        name: '年度总能耗'
                    }]
                },
                {
                    data: [{
                        value: '89',
                        name: '历史总能耗'
                    }]
                }
            ]
        }
    }
}, {
    url: '/oam/operation/customer',
    type: 'get',
    response: () => {
        return {
            code: 200,
            msg: "success",
            data: [{
                    key: '北京',
                    value: 3
                },
                {
                    key: '太原',
                    value: 2
                },
                {
                    key: '上海',
                    value: 1
                }
            ]
        }
    }
}, {
    url: '/oam/operation/energy',
    type: 'get',
    response: () => {
        return {
            code: 200,
            msg: "success",
            data: [{
                    key: '1月',
                    value: 20
                },
                {
                    key: '2月',
                    value: 8
                },
                {
                    key: '3月',
                    value: 10
                },
                {
                    key: '4月',
                    value: 5
                },
                {
                    key: '5月',
                    value: 5
                }
            ]
        }
    }
}, {
    url: '/oam/operation/space',
    type: 'get',
    response: () => {
        return {
            code: 200,
            msg: "success",
            data: [{
                    key: '古城大街',
                    value: 8
                },
                {
                    key: '实验路',
                    value: 5
                },
                {
                    key: '经二路',
                    value: 3
                },
                {
                    key: '经三路',
                    value: 5
                },
                {
                    key: '纬三路',
                    value: 5
                }
            ]
        }
    }
}, {
    url: '/oam/enery/table',
    type: 'get',
    response: () => {
        return {
            code: 200,
            msg: "success",
            data: [{
                    tunnelName: '古城大街',
                    powerConsumption: '33'
                },
                {
                    tunnelName: '实验路',
                    powerConsumption: '14'
                },
                {
                    tunnelName: '经二路',
                    powerConsumption: '04'
                },
                {
                    tunnelName: '经三路',
                    powerConsumption: '11'
                },
                {
                    tunnelName: '纬三路',
                    powerConsumption: '89'
                }
            ]
        }
    }
}, {
    url: '/oam/enery/tunnelEnergyConsumptionData',
    type: 'get',
    response: () => {
        return {
            code: 200,
            msg: "success",
            data: [{
                    key: '古城大街',
                    value: 40
                },
                {
                    key: '实验路',
                    value: 20
                },
                {
                    key: '经二路',
                    value: 10
                },
                {
                    key: '经三路',
                    value: 10
                },
                {
                    key: '纬三路',
                    value: 10
                }
            ]
        }
    }
}, {
    url: '/oam/enery/averageEC',
    type: 'get',
    response: () => {
        return {
            code: 200,
            msg: "success",
            data: [{
                    key: '古城大街',
                    value: 10
                },
                {
                    key: '实验路',
                    value: 10
                },
                {
                    key: '经二路',
                    value: 9
                },
                {
                    key: '经三路',
                    value: 10
                },
                {
                    key: '纬三路',
                    value: 7
                }
            ]
        }
    }
}, {
    url: '/oam/enery/periodEC',
    type: 'get',
    response: () => {
        return {
            code: 200,
            msg: "success",
            data: [{
                    key: '1月',
                    value: 20
                },
                {
                    key: '2月',
                    value: 8
                },
                {
                    key: '3月',
                    value: 10
                },
                {
                    key: '4月',
                    value: 5
                },
                {
                    key: '5月',
                    value: 5
                }
            ]
        }
    }
}, {
    url: '/oam/contract/payType',
    type: 'get',
    response: () => {
        return {
            code: 200,
            msg: "success",
            data: [{
                    key: '月付',
                    val: 1
                },
                {
                    key: '季付',
                    val: 2
                },
                {
                    key: '年付',
                    val: 3
                }
            ]
        }
    }
}, {
    url: '/oam/contract/contractType',
    type: 'get',
    response: () => {
        return {
            code: 200,
            msg: "success",
            data: [{
                    key: '正常',
                    val: 1
                },
                {
                    key: '过期',
                    val: 2
                }
            ]
        }
    }
}, {
    url: '/oam/contract/grid/contractTypeGrid',
    type: 'get',
    response: () => {
        return {
            code: 200,
            msg: "success",
            data: [{
                list: [{
                    id: 1,
                    name: '合同1',
                    company: {
                        name: '中国移动',
                        phone: '0231-6352923'
                    },
                    contractStatusName: '正常',
                    crtTime: '2020-01-15 13:03:23',
                    payTypeName: '年付'
                }],
                total: 1
            }]
        }
    }
}, {
    url: '/oam/customer',
    type: 'get',
    response: () => {
        return {
            code: 200,
            msg: "success",
            data: [{
                list: [{
                    id: 1,
                    name: 'xxx公司',
                    crtTime: '2020-01-15 13:03:23',
                    address: "浦东新区",
                    phone: '0231-6352923',
                    account: 1,
                    mail: 'xxxx@163.com',
                    creditNo: '优良',
                    bank: '上海银行'
                }],
                total: 1
            }]
        }
    }
}, {
    url: '/oam/common/tunnels',
    type: 'get',
    response: () => {
        return {
            code: 200,
            msg: "success",
            data: [{
                key: 1,
                val: "古城大街"
            }, {
                key: 2,
                val: "实验路"
            }, {
                key: 3,
                val: "经二路"
            }, {
                key: 4,
                val: "经三路"
            }, {
                key: 5,
                val: "纬三路"
            }, ]
        }
    }
}, {
    url: '/oam/common/areas',
    type: 'post',
    response: config => {
        const {
            areaId
        } = config.body

        const areaList = areas[areaId]

        return {
            code: 200,
            msg: "success",
            data: areaList
        }
    }
}, {
    url: '/oam/common/stores',
    type: 'post',
    response: config => {
        const {
            storeId
        } = config.body

        const storeList = stores[storeId]

        return {
            code: 200,
            msg: "success",
            data: storeList
        }
    }
}]