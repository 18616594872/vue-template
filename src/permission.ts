import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'; // Progress 进度条样式
import {
    getToken,
    TOKEN_KEY,
    USERNAME_KEY,
    PASSWORD_KEY
} from '@/utils/common.ts' // get token from cookie

NProgress.configure({
    showSpinner: false
}) // NProgress Configuration

const whiteList: string[] = ['/VMLogin'] // no redirect 的白名单

const permission = async () => {
    router.beforeEach(async (to: any, from: object, next: any) => {

        NProgress.start()
        // 确定用户是否登录
        const hasToken: string | boolean = getToken(TOKEN_KEY)

        if (hasToken) {
            if (to.path === '/VMLogin') {
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
                        // remove token and go to login page to re-login
                        await store.dispatch('resetToken')
                        next(`/VMLogin`)
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
                next(`/VMLogin`)
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