let commonMessage = {
    area: "22区",
    datatypeId: 1,
    description: "K3+660",
    time: 1575363600000,
    tunnel: "古城大街",
    minNormal: 10,
    store: "燃气舱",
}
let equipMessage = {
    '6': (() => {
        return {
            total: 1, // 数据总数
            pageSize: 10, //每页条数 
            equipProp: [Object.assign({}, commonMessage, {
                curValue: 0,
                name: "甲烷检测仪",
                unit: "LEL"
            })]
        }
    })(),
    '1': (() => {
        return {
            total: 1, // 数据总数
            pageSize: 10, //每页条数 
            equipProp: [Object.assign({}, commonMessage, {
                curValue: 12.18,
                name: "温度检测仪",
                unit: "℃"
            })]
        }
    })(),
    '2': (() => {
        return {
            total: 1, // 数据总数
            pageSize: 10, //每页条数 
            equipProp: [Object.assign({}, commonMessage, {
                curValue: 23.18,
                name: "湿度检测仪",
                unit: "%RH"
            })]
        }
    })(),
    '3': (() => {
        return {
            total: 1, // 数据总数
            pageSize: 10, //每页条数 
            equipProp: [Object.assign({}, commonMessage, {
                curValue: 1.18,
                name: "硫化氢检测仪",
                unit: "ppm"
            })]
        }
    })(),
    '5': (() => {
        return {
            total: 1, // 数据总数
            pageSize: 10, //每页条数 
            equipProp: [Object.assign({}, commonMessage, {
                curValue: 5.18,
                name: "氧气检测仪",
                unit: "℃"
            })]
        }
    })(),
    '63': {
        total: 1, // 数据总数
        pageSize: 10, //每页条数 
        equipProp: [{
            area: "22区",
            areaId: 1020,
            control: true,
            curValue: {
                run: {
                    index: 1,
                    descript: "输入值",
                    value: false
                }
            },
            datatypeId: 200,
            description: "",
            id: 222015100,
            name: "布防/撤防",
            reset: false,
            store: "污水舱",
            storeId: 1011,
            tunnel: "古城大街",
            tunnelId: 1,
            time: 1575363603000,
        }]
    },
    '58': {
        total: 1, // 数据总数
        pageSize: 10, //每页条数 
        equipProp: [{
            area: "22区",
            areaId: 1020,
            control: true,
            curValue: {
                close: {
                    index: 1,
                    descript: "关足",
                    value: false
                },
                fault: {
                    index: 3,
                    descript: "故障",
                    value: true
                },
                open: {
                    index: 2,
                    descript: "开足",
                    value: false
                }
            },
            datatypeId: 200,
            description: "K3+640",
            id: 222234200,
            name: "电动百叶",
            reset: true,
            store: "综合舱排风口",
            storeId: 1016,
            time: 1575363603000,
            tunnel: "古城大街",
            tunnelId: 1,
        }]
    },

}

let equipmentType = {
    '0': [{
            id: 1,
            name: '湿度'
        },
        {
            id: 2,
            name: '湿度'
        },
        {
            id: 3,
            name: '硫化氢'
        },
        {
            id: 5,
            name: '氧气'
        },
        {
            id: 6,
            name: '甲烷'
        }
    ],
    '1': [{
        id: 63,
        name: "联动"
    }],
    '2': [{
        id: 58,
        name: '百叶'
    }]
}
export default [{
        url: '/mam/environment/common/equipmentType',
        type: 'post',
        response: config => {
            const {
                equipmentTypeId
            } = config.body
            let data = equipmentType[equipmentTypeId]
            return {
                code: 200,
                msg: "success",
                data: data
            }
        }
    },
    {
        url: '/mam/environmentDetail/equipmentTypeDetailData',
        type: 'post',
        response: config => {
            const {
                objtypeId
            } = config.body

            let data = equipMessage[objtypeId]
            return {
                code: 200,
                msg: "success",
                data: data
            }
        }
    },
    {
        url: '/mam/environmentDetail/measobjs/list',
        type: 'post',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: []
            }
        }
    },
    {
        url: '/mam/dataOverview/monitor/list',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                        data: [{
                            value: '18℃',
                            name: '最低温'
                        }, {
                            value: '28℃',
                            name: '最高温'
                        }]
                    },
                    {
                        data: [{
                            value: '325',
                            name: '对象总数'
                        }]
                    },
                    {
                        data: [{
                            value: '1200',
                            name: '无报警对象'
                        }, {
                            value: '1500',
                            name: '监测对象总数'
                        }]
                    }
                ]
            }
        }
    },
    {
        url: '/mam/integrated/objData',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                        value: 26,
                        key: '温度'
                    },
                    {
                        value: 20,
                        key: '湿度'
                    },
                    {
                        value: 8,
                        key: '氧气'
                    }
                ]
            }
        }
    },
    {
        url: '/mam/integrated/average',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                        key: '1区',
                        value: '20'
                    },
                    {
                        key: '2区',
                        value: '22'
                    },
                    {
                        key: '3区',
                        value: '19'
                    }
                ]
            }
        }
    },
    {
        url: '/mam/machanical/controlequipType',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                        id: 10,
                        name: '风机'
                    },
                    {
                        id: 58,
                        name: '百叶'
                    },
                    {
                        id: 59,
                        name: '排水泵'
                    }
                ]
            }
        }
    },
    {
        url: '/mam/machanical/controlequipStatus',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                        id: 10,
                        name: '风机'
                    },
                    {
                        id: 58,
                        name: '百叶'
                    },
                    {
                        id: 59,
                        name: '排水泵'
                    }
                ]
            }
        }
    },
    {
        url: '/mam/security/dataType',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                        id: 56,
                        name: "智能井盖"
                    },
                    {
                        id: 64,
                        name: "联动"
                    },
                    {
                        id: 41,
                        name: "声光报警"
                    },
                    {
                        id: 57,
                        name: "红外"
                    }
                ]
            }
        }
    }
]