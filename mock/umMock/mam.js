let commonMessage = {
    area: "22区",
    datatypeId: 1,
    description: "K3+660",
    time: 1575363600000,
    tunnel: "古城大街",
    minNormal: 10,
    store: "燃气舱"
}
let equipMessage = {
    '6': (() => {
        return [Object.assign({}, commonMessage, {
            curValue: 0,
            name: "甲烷检测仪",
            unit: "LEL"
        })]
    })(),
    '1': (() => {
        return [Object.assign({}, commonMessage, {
            curValue: 12.18,
            name: "温度检测仪",
            unit: "℃"
        })]
    })(),
    '2': (() => {
        return [Object.assign({}, commonMessage, {
            curValue: 23.18,
            name: "湿度检测仪",
            unit: "%RH"
        })]
    })(),
    '3': (() => {
        return [Object.assign({}, commonMessage, {
            curValue: 1.18,
            name: "硫化氢检测仪",
            unit: "ppm"
        })]
    })(),
    '5': (() => {
        return [Object.assign({}, commonMessage, {
            curValue: 5.18,
            name: "氧气检测仪",
            unit: "℃"
        })]
    })(),
}

export default [{
        url: '/mam/environment/common/equipmentType',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
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
                        id: 4,
                        name: '一氧化碳'
                    },
                    {
                        id: 5,
                        name: '氧气'
                    },
                    {
                        id: 6,
                        name: '甲烷'
                    }
                ]
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
                }]
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
                }]
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
                    val: '20'
                },
                {
                    key: '2区',
                    val: '22'
                },
                {
                    key: '3区',
                    val: '19'
                }]
            }
        }
    }
]