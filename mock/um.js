export default [{
    url: '/um/mamPage/navBar',
    type: 'get',
    response: () => {
        return {
            code: 200,
            msg: "success",
            data: [{
                    id: '1',
                    navBarParentName: '综合监控',
                    children: [{
                            id: '1-1',
                            navBarName: '监控总览',
                            url: '/UM/IntegratedMonitoring'
                        },
                        {
                            id: '1-2',
                            navBarName: '监控详情',
                            children: [{
                                    id: '1-2-1',
                                    menuName: '环境监测',
                                    url: ''
                                },
                                {
                                    id: '1-2-2',
                                    menuName: '安防监控',
                                    url: ''
                                },
                                {
                                    id: '1-2-3',
                                    menuName: '机电监控',
                                    url: ''
                                },
                                {
                                    id: '1-2-4',
                                    menuName: '人员定位',
                                    url: ''
                                },
                                {
                                    id: '1-2-5',
                                    menuName: '视频监控',
                                    url: '/UM/videoMonitoring/1'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: '2',
                    navBarParentName: '运营管理',
                    children: [{
                            id: '2-1',
                            navBarName: '运营总览',
                            url: '/UM/operationManagement'
                        },
                        {
                            id: '2-2',
                            navBarName: '运营详情',
                            children: [{
                                    id: '2-2-1',
                                    menuName: '能耗管理',
                                    url: '/UM/energyConsumption'
                                },
                                {
                                    id: '2-2-2',
                                    menuName: '合同管理',
                                    url: '/UM/listContract'
                                },
                                {
                                    id: '2-2-3',
                                    menuName: '企业客户',
                                    url: '/UM/listCustomer'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: '3',
                    navBarParentName: '运维管理',
                    children: [{
                            id: '3-1',
                            navBarName: '运维总览',
                            url: '/UM/patrolScheme'
                        },
                        {
                            id: '3-2',
                            navBarName: '巡检详情',
                            children: [{
                                    id: '3-2-1',
                                    menuName: '巡检管理',
                                    url: '/UM/patrolManage'
                                },
                                {
                                    id: '3-2-2',
                                    menuName: '巡检任务',
                                    url: '/UM/patrolTask/query'
                                },
                                {
                                    id: '3-2-3',
                                    menuName: '缺陷管理',
                                    url: '/UM/defect/query'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
}, {
    url: '/um/operation/moniter/data',
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
    url: '/um/operation/customer',
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
    url: '/um/operation/energy',
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
    url: '/um/operation/space',
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
}]