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
    }
]