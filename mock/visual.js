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
]