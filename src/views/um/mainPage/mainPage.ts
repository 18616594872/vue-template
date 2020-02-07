import { Component, Vue } from 'vue-property-decorator'
import UMTopPage from "@/components/um/umtopPage.vue" // 组件
import UMLeftMenu from "@/components/um/umleftMenu.vue"
import { Route } from 'vue-router'

@Component({
    components: { UMTopPage, UMLeftMenu }
})
export default class About extends Vue {

    navBar: any[] = [
        { 
            id: '1', 
            navBarParentName: '综合监控', 
            children: [
                { 
                    id: '1-1',
                    navBarName: '监控总览',
                    url: '/UM/IntegratedMonitoring'
                },
                {
                    id: '1-2',
                    navBarName: '监控详情',
                    children: [
                        { 
                            id: '1-2-1',
                            menuName: '环境监测',
                            url: '',
                            picUrl: require('@/assets/images/um/tips.png')
                        },
                        {
                            id: '1-2-2',
                            menuName: '安防监控',
                            url: '',
                            picUrl: require('@/assets/images/um/tips.png')
                        },
                        {
                            id: '1-2-3',
                            menuName: '机电监控',
                            url: '',
                            picUrl: require('@/assets/images/um/tips.png')
                        },
                        {
                            id: '1-2-4',
                            menuName: '人员定位',
                            url: '',
                            picUrl: require('@/assets/images/um/tips.png')
                        },
                        {
                            id: '1-2-5',
                            menuName: '视频监控',
                            url: '/UM/videoMonitoring/1',
                            picUrl: require('@/assets/images/um/tips.png')
                        }
                    ]
                }
            ] 
        },
        {
            id: '2',
            navBarParentName: '运营管理',
            children: [
                {
                    id: '2-1',
                    navBarName: '运营总览',
                    url: '/UM/operationManagement'
                },
                {
                    id: '2-2',
                    navBarName: '运营详情',
                    children: [
                        {
                            id: '2-2-1',
                            menuName: '能耗管理',
                            url: '/UM/energyConsumption',
                            picUrl: require('@/assets/images/um/tips.png')
                        },
                        {
                            id: '2-2-2',
                            menuName: '合同管理',
                            url: '/UM/listContract',
                            picUrl: require('@/assets/images/um/tips.png')
                        },
                        {
                            id: '2-2-3',
                            menuName: '企业客户',
                            url: '/UM/listCustomer',
                            picUrl: require('@/assets/images/um/tips.png')
                        }
                    ]
                }
            ]
        },
        {
            id: '3',
            navBarParentName: '运维管理',
            children: [
                { 
                    id: '3-1',
                    navBarName: '运维总览',
                    url: '/UM/patrolScheme'
                },
                {
                    id: '3-2',
                    navBarName: '巡检详情',
                    children: [
                        { 
                            id: '3-2-1',
                            menuName: '巡检管理',
                            url: '/UM/patrolManage',
                            picUrl: require('@/assets/images/um/tips.png')
                        },
                        {
                            id: '3-2-2',
                            menuName: '巡检任务',
                            url: '/UM/patrolTask/query',
                            picUrl: require('@/assets/images/um/tips.png')
                        },
                        {
                            id: '3-2-3',
                            menuName: '缺陷管理',
                            url: '/UM/defect/query',
                            picUrl: require('@/assets/images/um/tips.png')
                        }
                    ]
                }
            ]
        }
    ]

    leftMenu: any[] = []

    isShowLeftMenu: boolean = false

    toPath: string = ''

    refeshPath: string = ''

    propMsg(leftMenu: any[]) {
        this.leftMenu = leftMenu
    }

    propIsShowLeftMenu(isShowLeftMenu: boolean) {
        this.isShowLeftMenu = isShowLeftMenu
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
