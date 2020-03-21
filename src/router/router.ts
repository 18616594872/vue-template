/**
 * meta 可配置参数
 * @param {boolean} icon 页面icon
 * @param {boolean} keepAlive 是否缓存页面
 * @param {string} title 页面标题
 */

import mainPage from '@/views/um/mainPage/mainPage.vue'

export const constantRoutes: any[] = [{
        path: '/login',
        component: (resolve: any) =>
            require(["@/views/vm/login/login.vue"], resolve),
    },
    {
        path: "/",
        redirect: "/login"
    },

]

export const asyncRoutes: any[] = [
    {
        path: '/UMMain',
        name: 'ummain',
        component: (resolve: any) => require(["@/views/um/umMain/umMain.vue"], resolve),
    },
    {
        path: '/visual',
        name: '可视化',
        component: (resolve: any) => require(["@/views/vm/visualizations/visualizations.vue"], resolve),
    },
    {   
        path: '/visualDetail',
        name: '可视化详情',
        redirect: '/visualDetail/environment',
        component: (resolve: any) =>
            require(["@/views/vm/overviewMain/overviewMain.vue"], resolve),
        children: [{
                path: 'environment',
                name: '综合监控',
                component: (resolve: any) =>
                    require(["@/views/vm/environmentMonitor/environmentMonitor.vue"], resolve)
            },
            {
                path: 'tunnelIntroduct',
                name: '管廊简介',
                component: (resolve: any) =>
                    require(["@/views/vm/tunnelIntroduction/tunnelIntroduction.vue"], resolve)
            },
            {
                path: 'PlanManage',
                name: '预案管理',
                component: (resolve: any) =>
                    require(["@/views/vm/planManage/planManage.vue"], resolve)
            },
            {
                path: 'operatManage',
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
            },
            {
                path: 'securityMonitor',
                name: '安防监控',
                component: (resolve: any) => require(["@/views/um/mam/details/securityMonitor/securityMonitor.vue"], resolve),
                meta: {
                    title: '安防监控', // 设置在侧边栏中展示的名字
                }
            },
            {
                path: 'mechanicalMonitor',
                name: '机电监控',
                component: (resolve: any) => require(["@/views/um/mam/details/mechanicalMonitor/mechanicalMonitor.vue"], resolve),
                meta: {
                    title: '机电监控', // 设置在侧边栏中展示的名字
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