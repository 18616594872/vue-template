import {
    Component,
    Vue
} from 'vue-property-decorator'
import UMTopPage from "@/components/um/umtopPage.vue" // 组件
import UMLeftMenu from "@/components/um/umleftMenu.vue"
import {
    Route
} from 'vue-router'
import { getNavBarNum } from '@/api/mainPage.ts'

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
    toPath: string = ''
    refeshPath: string = ''

    mounted(){
        this.getNavBarList()
    }

    propMsg(leftMenu: any[]) {
        this.leftMenu = leftMenu
    }

    propIsShowLeftMenu(isShowLeftMenu: boolean) {
        this.isShowLeftMenu = isShowLeftMenu
    }

    getNavBarList(){
        return getNavBarNum().then((res: any)=>{
            this.navBar = res
        })
    }

    beforeRouteEnter(to: Route, from: Route, next: any): void {
        if (from.path === '/UMMain') {
            next((vm: any) => {
                vm.toPath = to.path
            });
        } else if (from.path === '/') {
            next((vm: any) => {
                vm.refeshPath = to.path
            })
        } else {
            next()
        }
    }

    beforeRouteUpdate(to: Route, from: Route, next: () => void): void {
        sessionStorage.setItem('fromPath', from.path)
        next()
    }
}