/**
 * meta 可配置参数
 * @param {boolean} icon 页面icon
 * @param {boolean} keepAlive 是否缓存页面
 * @param {string} title 页面标题
 */

export const constantRoutes: any[] = [
    {
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
        children: [
            {
                path: '/VM/environment',
                name: '综合监控',
                component: (resolve: any) =>
                    require(["@/views/vm/environmentMonitor/environmentMonitor.vue"], resolve)
            },
        ]
    }
]