import Vue from 'vue'
import Router from 'vue-router'
import {
    constantRoutes,
    asyncRoutes
} from '@/router/router'

Vue.use(Router)

const createRouter = () =>
    new Router({
        routes: constantRoutes,
        mode: 'history'
    })
const router: any = createRouter()

export function resetRouter() {
    const newRouter: any = createRouter()
    router.matcher = newRouter.matcher // 重置 router
}

export {
    constantRoutes,
    asyncRoutes
}
export default router