export default [{
        url: '/mam/environment/equipmentType',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                        id: 1,
                        title: '湿度'
                    },
                    {
                        id: 2,
                        title: '湿度'
                    },
                    {
                        id: 3,
                        title: '硫化氢'
                    },
                    {
                        id: 4,
                        title: '一氧化碳'
                    },
                    {
                        id: 5,
                        title: '氧气'
                    },
                    {
                        id: 6,
                        title: '甲烷'
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