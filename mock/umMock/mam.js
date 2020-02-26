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
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                    list: [{
                        name: '湿度检测仪',
                        tunnel: '古城大街',
                        area: '22区',
                        store: '综合仓',
                        location: 'K0+445',
                        crtTime: '1280977330000',
                        curValue: '69',
                        isNormal: '正常',

                    }],
                    total: 1
                }]
            }
        }
    }
]