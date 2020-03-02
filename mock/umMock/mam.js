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
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                    name: '湿度检测仪',
                    tunnel: '古城大街',
                    area: '22区',
                    store: '综合仓',
                    description: 'K0+445',
                    crtTime: '1280977330000',
                    curValue: '69',
                    isNormal: '正常',
                    maxValue: 85,
                    maxNormal: 25,
                    storeId: 1006,
                    datatypeId: 1,
                    minNormal: 15,
                    unit: "%",
                    minValue: -20,
                    tunnelId: 1,
                    total: 1
                }]
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
    }
]