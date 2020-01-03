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

export const asyncRoutes: any[] = []