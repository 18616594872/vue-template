import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    SubFunModuleItem
} from '@/types/components/umtopPage.interface.ts'

@Component({})
export default class About extends Vue {

    // menuData: any[] = [
    //     {
    //         id: 'left-1',
    //         url: '/mam/details/environmentalMonitor',
    //         name: '环境监测',
    //         picUrl: require('@/assets/images/um/tips.png')
    //     },
    //     {
    //         id: 'left-2',
    //         url: '/mam/details/securityMonitor',
    //         name: '安防监控',
    //         picUrl: require('@/assets/images/um/tips.png')
    //     },
    //     {
    //         id: 'left-3',
    //         url: '/mam/details/mechanicalMonitor',
    //         name: '机电监控',
    //         picUrl: require('@/assets/images/um/tips.png')
    //     },
    //     {
    //         id: 'left-4',
    //         url: '/mam/details/personalPosition',
    //         name: '人员定位',
    //         picUrl: require('@/assets/images/um/tips.png')
    //     }
    // ]


    isOpen: boolean = true
    isPickUp: boolean = true
    isChildMenu: boolean = false
    currentMenu: string = '0'
    currentChild: string = ''

    get treeRouters(): any {
        return this.$store.getters.leftTreeRouters
    }
    get styleClase(): string {
        let bool = this.treeRouters.some((treeRouters: SubFunModuleItem) => treeRouters.children !== undefined)
        return bool ? 'UMLeftMenu-wrap-double' : 'UMLeftMenu-wrap-single'
    }

    mounted() {
        console.log('treeRouters', this.styleClase)

        let toPath = sessionStorage.getItem('toPath')
        if (!toPath) {
            return
        }
        if (toPath !== null) {
            try {
                this.treeRouters.forEach((item: any) => {
                    if (!item.children && (toPath as string).indexOf(item.url) === 0) {
                        this.currentMenu = item.id
                        this.isChildMenu = false
                        console.log('this.currentMenu', this.currentMenu)
                        throw new Error('EndIterative')
                    } else if (item.children) {
                        try {
                            item.children.forEach((ele: any) => {
                                if ((toPath as string).indexOf(ele.url) === 0) {
                                    this.currentMenu = item.id
                                    this.currentChild = ele.id
                                    this.isChildMenu = true
                                    throw new Error('EndIterative')
                                }
                            })
                        } catch (e) {
                            if (e.message !== 'EndIterative') throw e
                        }
                    }
                })
            } catch (e) {
                if (e.message !== 'EndIterative') throw e
            }
        }
    }

    toggle() {
        this.isOpen = !this.isOpen
        this.isPickUp = !this.isPickUp
        if (this.isPickUp === false && this.isOpen === true) {
            (this.$refs['UMLeftMenu-wrap'] as HTMLElement).style.flex = '0 0 4%';
            (this.$refs['UMLeftMenu-wrap'] as HTMLElement).style.transition = '.5s'
        } else {
            (this.$refs['UMLeftMenu-wrap'] as HTMLElement).style.flex = '0 0 6%';
            (this.$refs['UMLeftMenu-wrap'] as HTMLElement).style.transition = '.5s'
        }
    }

    choosedMenu(item: any) {
        this.currentMenu = item.id
        this.isChildMenu = false
        this.$router.push(item.url)
    }

    // click parent
    choosedHasChildMenu(item: any) {
        this.currentMenu = item.id
        this.isChildMenu = true
        this.currentChild = '';
        (event as Event).stopPropagation();

    }
    // click child
    choosedChildrenMenu(ele: any, item: any) {
        this.currentMenu = item.id
        this.currentChild = ele.id
        this.$router.push(ele.url);
        (event as Event).stopPropagation()
    }
}