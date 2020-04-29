import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'; // Progress 进度条样式
import {
    getToken,
    TOKEN_KEY,
} from '@/utils/common' // get token from cookie
import {
    Route
} from 'vue-router'

NProgress.configure({
    showSpinner: false
}) // NProgress Configuration

const whiteList: string[] = ['/login'] // no redirect 的白名单

const permission = async () => {
    router.beforeEach(async (to: Route, from: Route, next: any) => {

        NProgress.start()
        // 确定用户是否登录
        const hasToken: string | boolean = getToken(TOKEN_KEY)

        if (hasToken) {
            if (to.path === '/login') {
                // 如果是登录 重定向到首页
                next()
                NProgress.done()
            } else {
                // 确定用户是否已通过getInfo获得其权限角色
                const hasRoles: boolean = store.getters.name && store.getters.name.length > 0

                if (hasRoles) {
                    next()
                } else {
                    try {
                        // 获取用户信息
                        const data = await store.dispatch('getInfo')
                        // 生成动态路由
                        const accessRoutes: any[] = await store.dispatch('generateRoutes', data)

                        router.addRoutes(accessRoutes)
                        next({
                            ...to,
                            replace: true
                        })
                    } catch (error) {
                        await store.dispatch('logout')
                        next(`/login`)
                        NProgress.done()
                    }
                }
            }
        } else {

            if (whiteList.indexOf(to.path) !== -1) {
                // 白名单内 直接进入
                next()
            } else {
                // 没有访问权限的其他页将重定向到登录页。
                next(`/login`)
                NProgress.done()
            }
        }
    })

    router.afterEach(() => {
        NProgress.done()
    })
}

export {
    permission
}