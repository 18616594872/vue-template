/**
 * meta 可配置参数
 * @param {boolean} icon 页面icon
 * @param {boolean} keepAlive 是否缓存页面
 * @param {string} title 页面标题
 */

export const constantRoutes: any[] = [{
        path: '/VMLogin',
        name: 'VMLogin',
        component: (resolve: any) =>
            require(["@/views/vm/login/login.vue"], resolve),
    },
    {
        path: "/",
        redirect: "/VMLogin"
    },

]

export const asyncRoutes: any[] = [{
        path: '/VMMain',
        name: 'VMMain',
        component: (resolve: any) =>
            require(["@/views/vm/visualizations/visualizations.vue"], resolve)
    },
    {
        path: '/UMMain',
        name: 'ummain',
        component: (resolve: any) => require(["@/views/um/umMain/umMain/umMain.vue"], resolve),
    },
    {
        path: '/VM',
        name: '可视化主页',
        component: (resolve: any) =>
            require(["@/views/vm/overviewMain/overviewMain.vue"], resolve),
        children: [{
                path: '/VM/environment',
                name: '综合监控',
                component: (resolve: any) =>
                    require(["@/views/vm/environmentMonitor/environmentMonitor.vue"], resolve)
            },
            {
                path: '/VM/tunnelIntroduct',
                name: '管廊简介',
                component: (resolve: any) =>
                    require(["@/views/vm/tunnelIntroduction/tunnelIntroduction.vue"], resolve)
            },
            {
                path: '/VM/PlanManage',
                name: '预案管理',
                component: (resolve: any) =>
                    require(["@/views/vm/planManage/planManage.vue"], resolve)
            },
            {
                path: '/VM/operatManage',
                name: '运营管理',
                component: (resolve: any) =>
                    require(["@/views/vm/operatManage/operatManage.vue"], resolve)
            },
        ]
    }, ,
    {
        path: '/UM',
        name: 'um',
        component: (resolve: any) => require(["@/views/um/mainPage/mainPage.vue"], resolve),
        children: [{
                path: '/UM/IntegratedMonitoring',
                name: '综合监控',
                component: (resolve: any) => require(["@/views/um/mam/integratedMonitoring/integratedMonitoring.vue"], resolve)
            },
            {
                path: '/UM/operationManagement',
                name: '运营管理',
                component: (resolve: any) => require(["@/views/um/oam/operationManagement/operationManagement.vue"], resolve)
            },
            {
                path: '/UM/energyConsumption',
                name: '能耗管理',
                component: (resolve: any) => require(["@/views/um/oam/energyConsumption/energyConsumption.vue"], resolve)
            }
        ]
    }
]