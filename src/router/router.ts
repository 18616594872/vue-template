/**
 * meta 可配置参数
 * @param {boolean} icon 页面icon
 * @param {boolean} keepAlive 是否缓存页面
 * @param {string} title 页面标题
 */

export const constantRoutes: any[] = [{
        path: '/login',
        hidden: true, // 不显示在左侧栏
        component: (resolve: any) =>
            require(["@/views/vm/login/login.vue"], resolve),
    },
    {
        path: "/",
        hidden: true, // 不显示在左侧栏
        redirect: "/login"
    },

]

export const asyncRoutes: any[] = [
    {
        path: '/visual',
        hidden: true,
        name: '可视化',
        component: (resolve: any) => require(["@/views/vm/visualizations/visualizations.vue"], resolve),
    },
    {   
        path: '/visualDetail',
        name: '可视化详情',
        hidden: true,
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
        name: '综合监控',
        component: (resolve: any) => require(["@/views/um/mainPage/mainPage.vue"], resolve),
        children: [{
            path: 'overview',
            name: '监控总览',
            component: (resolve: any) => require(["@/views/um/mam/overview/integratedMonitoring/integratedMonitoring.vue"], resolve)
        },
        {
            path: 'details',
            redirect: '/mam/details/environmentalMonitor',
            name: '监控详情',
            component: (resolve: any) => require(["@/components/um/umDetailsMain.vue"], resolve),
            children: [{
                path: 'environmentalMonitor',
                name: '环境监测',
                component: (resolve: any) => require(["@/views/um/mam/details/environmentalMonitor/environmentalMonitor.vue"], resolve),
                meta: {
                    title: '环境监测', // 设置在侧边栏中展示的名字
                    icon: 'tips' // 设置左侧图标
                }
            },
            {
                path: 'securityMonitor',
                name: '安防监控',
                component: (resolve: any) => require(["@/views/um/mam/details/securityMonitor/securityMonitor.vue"], resolve),
                meta: {
                    title: '安防监控', // 设置在侧边栏中展示的名字
                    icon: 'tips' // 设置左侧图标
                }
            },
            {
                path: 'mechanicalMonitor',
                name: '机电监控',
                component: (resolve: any) => require(["@/views/um/mam/details/mechanicalMonitor/mechanicalMonitor.vue"], resolve),
                meta: {
                    title: '机电监控', // 设置在侧边栏中展示的名字
                    icon: 'tips' // 设置左侧图标
                }
            }]
        }]
    },
    {
        path: '/oam',
        redirect: '/oam/overview',
        name: '运营管理',
        component: (resolve: any) => require(["@/views/um/mainPage/mainPage.vue"], resolve),
        children: [
            {
                path: 'overview',
                name: '运营管理总览',
                component: (resolve: any) => require(["@/views/um/oam/overview/operationManagement/operationManagement.vue"], resolve)
            },
            {
                path: 'details',
                redirect: '/oam/details/contract_list',
                name: '运营详情',
                component: (resolve: any) => require(["@/components/um/umDetailsMain.vue"], resolve),
                children:[
                    {
                        path: 'contract_list',
                        name: '合同管理',
                        component: (resolve: any) => require(["@/views/um/oam/details/listContract/listContract.vue"], resolve),
                        meta: {
                            title: '合同管理', // 设置在侧边栏中展示的名字
                            icon: 'tips' // 设置左侧图标
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '/permission',
        redirect: '/permission/overview',
        name: '权限管理',
        component: (resolve: any) => require(["@/views/um/mainPage/mainPage.vue"], resolve),
        children: [
            {
                path: 'overview',
                name: '角色权限',
                component: (resolve: any) => require(["@/views/cm/permission/permission.vue"], resolve)
            },
        ]
    }
]