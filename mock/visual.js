export default [
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
        url: '/description',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: [{
                    description: +new Date(),
                    alarmLevel: "提示",
                    id: 171530,
                    location: "实验路5区-综合舱",
                    name: "温度测试告警"
                }, {
                    description: +new Date(),
                    alarmLevel: "提示",
                    id: 171529,
                    location: "经二路4区-综合舱",
                    name: "温度测试告警"
                }, {
                    description: +new Date(),
                    alarmLevel: "一般",
                    id: 171528,
                    location: "经二路3区-综合舱",
                    name: "温度测试告警"
                }, {
                    description: +new Date(),
                    alarmLevel: "严重",
                    id: 171529,
                    location: "经二路2区-综合舱",
                    name: "温度测试告警"
                }, {
                    description: +new Date(),
                    alarmLevel: "危急",
                    id: 171529,
                    location: "经二路1区-综合舱",
                    name: "温度测试告警"
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
    }
]