/**
 * meta 可配置参数
 * @param {boolean} icon 页面icon
 * @param {boolean} keepAlive 是否缓存页面
 * @param {string} title 页面标题
 */

 import mainPage from '@/views/um/mainPage/mainPage.vue'

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

export const asyncRoutes: any[] = [
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
    },
    {
        path: '/mam',
        redirect: '/mam/overview',
        component: mainPage,
        children: [{
            path: 'overview',
            name: '运营管理总览',
            hidden: true, // 不显示在左侧栏
            component: (resolve: any) => require(["@/views/um/mam/overview/integratedMonitoring/integratedMonitoring.vue"], resolve)
        },
        {
            path: 'details',
            redirect: '/mam/details/environmentalMonitor',
            name: '巡检计划详情',
            hidden: true, // 不显示在左侧栏
            component: (resolve: any) => require(["@/views/um/mam/details/detailsMain/detailsMain.vue"], resolve),
            children: [{
                path: 'environmentalMonitor',
                name: '环境监测',
                component: (resolve: any) => require(["@/views/um/mam/details/environmentalMonitor/environmentalMonitor.vue"], resolve),
                meta: {
                    title: '环境监测', // 设置在侧边栏中展示的名字
                }
            }]
        }]
    }
]

// children: [{
//     path: '/UM/IntegratedMonitoring',
//     name: '综合监控',
//     component: (resolve: any) => require(["@/views/um/mam/integratedMonitoring/integratedMonitoring.vue"], resolve)
// },
// {
//     path: '/UM/operationManagement',
//     name: '运营管理',
//     component: (resolve: any) => require(["@/views/um/oam/operationManagement/operationManagement.vue"], resolve)
// },
// {
//     path: '/UM/energyConsumption',
//     name: '能耗管理',
//     component: (resolve: any) => require(["@/views/um/oam/energyConsumption/energyConsumption.vue"], resolve)
// },
// {
//     path: '/UM/listContract',
//     name: '合同管理',
//     component: (resolve: any) => require(["@/views/um/oam/listContract/listContract.vue"], resolve)
// },
// {
//     path: '/UM/listCustomer',
//     name: '客户管理',
//     component: (resolve: any) => require(["@/views/um/oam/listCustomer/listCustomer.vue"], resolve)
// },
// {
//     path: '/UM/environmentalMonitor',
//     name: '环境监测',
//     component: (resolve: any) => require(["@/views/um/mam/environmentalMonitor/environmentalMonitor.vue"], resolve)
// }
// ]