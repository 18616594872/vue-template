import {
    Component,
    Vue
} from 'vue-property-decorator'
import UMTopPage from "@/components/um/umtopPage.vue" // 组件
import UMLeftMenu from "@/components/um/umleftMenu.vue"
import {
    Route
} from 'vue-router'
import {
    getNavBarNum
} from '@/api/mainPage'
import {
    DetailSubFunModuleItem
} from '@/types/components/umtopPage.interface'

@Component({
    components: {
        UMTopPage,
        UMLeftMenu
    }
})
export default class About extends Vue {

    navBar: object[] = []
    leftMenu: any[] = []
    isShowLeftMenu: boolean = false
    refeshPath: string = ''

    mounted() {
        this.getNavBarList()
    }

    propMsg(leftMenu: DetailSubFunModuleItem[]) {
        this.leftMenu = leftMenu
    }

    propIsShowLeftMenu(isShowLeftMenu: boolean) {
        this.isShowLeftMenu = isShowLeftMenu
    }

    getNavBarList() {
        return getNavBarNum().then((res: any) => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.navBar = data
            }
        }).catch(error => {
            (this as any).Log.warn(error)
        })

    }

    beforeRouteEnter(to: Route, from: Route, next: any) {
        if (from.path === '/') {
            next((vm: any) => {
                vm.refeshPath = to.path
            })
        } else {
            next()
        }
    }

    beforeRouteUpdate(to: Route, from: Route, next: () => void) {
        sessionStorage.setItem('fromPath', from.path)
        next()
    }
}