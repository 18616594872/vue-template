export default [{
    url: '/um/mamPage/navBar',
    type: 'get',
    response: () => {
        return {
            code: 200,
            msg: "success",
            data: [{
                    id: '1',
                    navBarName: '综合监控',
                    path: '/mam',
                    children: [{
                            id: '1-1',
                            secondMenuName: '监控总览',
                            url: '/mam/overview'
                        },
                        {
                            id: '1-2',
                            secondMenuName: '监控详情',
                            url: '/mam/details'
                        },
                        {
                            id: '1-3',
                            secondMenuName: '数据分析',
                            url: '/mam/dataAna'
                        }
                    ]
                },
                {
                    id: '2',
                    navBarName: '运营管理',
                    path: '/oam',
                    children: [{
                            id: '2-1',
                            secondMenuName: '运营总览',
                            url: '/oam/overview'
                        },
                        {
                            id: '2-2',
                            secondMenuName: '运营详情',
                            url: '/oam/details'
                        },
                        {
                            id: '2-3',
                            secondMenuName: '数据分析',
                            url: '/oam/dataAna'
                        }
                    ]
                },
                {
                    id: '3',
                    navBarName: '运维管理',
                    path: '/omm',
                    children: [{
                            id: '3-1',
                            secondMenuName: '运维总览',
                            url: '/omm/overview'
                        },
                        {
                            id: '3-2',
                            secondMenuName: '运维详情',
                            url: '/omm/details'
                        },
                        {
                            id: '3-3',
                            secondMenuName: '数据分析',
                            url: '/omm/dataAna'
                        }
                    ]
                }
            ]
        }
    }
}, {
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
}, {
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
}, {
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
}]