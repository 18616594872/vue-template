export default [{
        url: '/mam/year/month/alarm',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                    key: "year",
                    value: 291,
                    isRise: false
                }, {
                    key: "month",
                    value: 32,
                    isRise: true
                }]
            }
        }
    },
    {
        url: '/mam/alarms/part',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                    alarmDate: +new Date(),
                    alarmLevel: "提示",
                    id: 171530,
                    location: "实验路5区-综合舱",
                    name: "温度测试告警",
                    alarmStyle: {
                        bgColor: "#0066ff",
                        color: "#fff",
                        buttonText: "提示"
                    }
                }, {
                    alarmDate: +new Date(),
                    alarmLevel: "提示",
                    id: 171529,
                    location: "经二路4区-综合舱",
                    name: "温度测试告警",
                    alarmStyle: {
                        bgColor: "#0066ff",
                        color: "#fff",
                        buttonText: "提示"
                    }
                }, {
                    alarmDate: +new Date(),
                    alarmLevel: "一般",
                    id: 171528,
                    location: "经二路3区-综合舱",
                    name: "温度测试告警",
                    alarmStyle: {
                        bgColor: "#ffff00",
                        color: "#333",
                        buttonText: "一般"
                    }
                }, {
                    alarmDate: +new Date(),
                    alarmLevel: "严重",
                    id: 171529,
                    location: "经二路2区-综合舱",
                    name: "温度测试告警",
                    alarmStyle: {
                        bgColor: "#ffae00",
                        color: "#333",
                        buttonText: "修复中"
                    }
                }, {
                    alarmDate: +new Date(),
                    alarmLevel: "危急",
                    id: 171529,
                    location: "经二路1区-综合舱",
                    name: "温度测试告警",
                    alarmStyle: {
                        bgColor: "#ff0000",
                        color: "#fff",
                        buttonText: "处理中"
                    }
                }]
            }
        }
    },
    {
        url: '/mam/year/month/alarm',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                    key: "year",
                    value: 291,
                    isRise: false
                }, {
                    key: "month",
                    value: 32,
                    isRise: true
                }]
            }
        }
    },
    {
        url: '/mam/tunnels/alarm-count',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                    key: "古城大街",
                    val: 0
                }, {
                    key: "实验路",
                    val: 5
                }, {
                    key: "经三路",
                    val: 3
                }, {
                    key: "经二路",
                    val: 2
                }, {
                    key: "纬三路",
                    val: 0
                }, {
                    key: "监控中心",
                    val: 0
                }]
            }
        }
    },
    {
        url: '/common/tunnel-status/statistics',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                    unit: "条",
                    name: "正常",
                    value: 6
                }, {
                    unit: "条",
                    name: "455",
                    value: 0
                }]
            }
        }
    },
    {
        url: '/omm/equipments/status-percentage',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                        name: "运行",
                        value: "6%"
                    },
                    {
                        name: "停运",
                        value: "13%"
                    },
                    {
                        name: "故障",
                        value: "63%"
                    },
                    {
                        name: "其他",
                        value: "18%"
                    }
                ]
            }
        }
    },
    {
        url: '/omm/equipments/overview',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                        key: "安防",
                        val: [{
                            val: 82,
                            key: "运行"
                        }, {
                            val: 97,
                            key: "停运"
                        }, {
                            val: 46,
                            key: "故障"
                        }, {
                            val: 67,
                            key: "其他"
                        }]
                    },
                    {
                        key: "视频",
                        val: [{
                            val: 82,
                            key: "运行"
                        }, {
                            val: 97,
                            key: "停运"
                        }, {
                            val: 46,
                            key: "故障"
                        }, {
                            val: 67,
                            key: "其他"
                        }]
                    }

                ]
            }
        }
    },
    {
        url: '/mam/complexobj-datas',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                        close: 1,
                        typeId: 10,
                        open: 0
                    },
                    {
                        fault: 1,
                        typeId: 56,
                        close: 6,
                        open: 0
                    },
                    {
                        fault: 19,
                        typeId: 58,
                        close: 42,
                        open: 32
                    },
                    {
                        close: 1,
                        typeId: 12,
                        open: 9
                    },
                    {
                        close: 0,
                        typeId: 59,
                        open: 0
                    }

                ]
            }
        }
    }, {
        url: '/omm/equipments/comprehensive-compared',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                        taskCount: {
                            nowYearTaskCount: 51,
                            isRise: true
                        }
                    },
                    {
                        defectCount: {
                            nowYearTaskCount: 99,
                            isRise: true
                        }
                    },
                    {
                        maintenanceCount: {
                            nowYearTaskCount: 70,
                            isRise: false
                        }
                    },
                    {
                        maintenanceRateCount: {
                            nowYearTaskCount: 33,
                            isRise: false
                        }
                    }
                ]
            }
        }
    }, {
        url: '/omm/equipments/maintenance',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                    val: [{
                        val: 40,
                        key: "已维修"
                    }, {
                        val: 25,
                        key: "未维修"
                    }],
                    key: "2019年02月"
                }, {
                    val: [{
                        val: 20,
                        key: "已维修"
                    }, {
                        val: 45,
                        key: "未维修"
                    }],
                    key: "2019年03月"
                }]
            }
        }
    }, {
        url: '/oam/tunnels/energies/every-month',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                    key: "19年2月",
                    val: [{
                        val: 6194.49,
                        key: "古城大街"
                    }]
                }, {
                    key: "19年3月",
                    val: [{
                        val: 2194.49,
                        key: "古城大街"
                    }]
                }]
            }
        }
    }, {
        url: '/mam/extreme-datas',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                    id: 1,
                    name: "温度",
                    unit: "℃",
                    value: 26
                }, {
                    id: 2,
                    name: "温度",
                    unit: "℃",
                    value: 26
                }, {
                    id: 3,
                    name: "温度",
                    unit: "℃",
                    value: 26
                }, {
                    id: 4,
                    name: "温度",
                    unit: "℃",
                    value: 26
                }, {
                    id: 5,
                    name: "温度",
                    unit: "℃",
                    value: 26
                }]
            }
        }
    }, {
        url: '/mam/tunnels/environment/measobjs',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                    tunnelKey: "1",
                    tunnelName: "古城大街",
                    isNormal: false,
                    list: [{
                        id: "1-1",
                        name: "温度",
                        isNormalMax: false,
                        isNormalMin: true,
                        maxVal: 23,
                        minVal: 18,
                        unit: "℃"
                    }]
                }, {
                    tunnelKey: "2",
                    tunnelName: "古城大街",
                    isNormal: false,
                    list: [{
                        id: "2-1",
                        name: "温度",
                        isNormalMax: false,
                        isNormalMin: true,
                        maxVal: 23,
                        minVal: 18,
                        unit: "℃"
                    }]
                }, {
                    tunnelKey: "3",
                    tunnelName: "古城大街",
                    isNormal: false,
                    list: [{
                        id: "3-1",
                        name: "温度",
                        isNormalMax: false,
                        isNormalMin: true,
                        maxVal: 23,
                        minVal: 18,
                        unit: "℃"
                    }]
                }]
            }
        }
    }, {
        url: '/mam/tunnels/security/measobjs',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                    tunnelKey: "1",
                    tunnelName: "古城大街",
                    isNormal: false,
                    list: [{
                        id: "1-11",
                        name: "照明",
                        open: "开",
                        openVal: 40,
                        close: "关",
                        closeVal: 60,
                        broken: "故障",
                        brokenVal: 10,

                    }]
                }, {
                    tunnelKey: "2",
                    tunnelName: "古城大街",
                    isNormal: false,
                    list: [{
                        id: "1-12",
                        name: "照明",
                        open: "开",
                        openVal: 40,
                        close: "关",
                        closeVal: 60,
                        broken: "故障",
                        brokenVal: 10,

                    }]
                }, {
                    tunnelKey: "3",
                    tunnelName: "古城大街",
                    isNormal: false,
                    list: [{
                        id: "1-13",
                        name: "照明",
                        open: "开",
                        openVal: 40,
                        close: "关",
                        closeVal: 60,
                        broken: "故障",
                        brokenVal: 10,

                    }]
                }]
            }
        }
    }, {
        url: '/omm/equipments/statistics',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                        eVal: 30,
                        eKey: "温度"
                    },
                    {
                        eVal: 25,
                        eKey: "湿度"
                    },
                    {
                        eVal: 40,
                        eKey: "氧气"
                    }
                ]
            }
        }
    }, {
        url: '/common/tunnels/conditions',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                        id: 1,
                        name: "古城大街",
                        description: "古城大街"
                    },
                    {
                        id: 2,
                        name: "古城大街",
                        description: "古城大街"
                    },
                    {
                        id: 3,
                        name: "古城大街",
                        description: "古城大街"
                    }
                ]
            }
        }
    }, {
        url: '/em/plans/list',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                        planName: "预案1",
                        id: 1
                    },
                    {
                        planName: "预案2",
                        id: 2
                    },
                ]
            }
        }
    }, {
        url: '/omm/equipments/alarm',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                        eKey: 1,
                        normalNum: 1,
                        unNormalNum: 1,
                        hiddenNum: 1,
                        repairNum: 1,
                        othersNum: 1
                    },
                    {
                        eKey: 2,
                        normalNum: 1,
                        unNormalNum: 1,
                        hiddenNum: 1,
                        repairNum: 1,
                        othersNum: 1
                    }
                ]
            }
        }
    }, {
        url: '/common/companies/cables/total',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                    key: '公司1',
                    val: 10
                },
                {
                    key: '公司1',
                    val: 10
                }
                ]
            }
        }
    }
]