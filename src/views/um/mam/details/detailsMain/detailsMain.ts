import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

@Component({})
export default class About extends Vue {

    menuData: any[] = [
        {
            id: 'left-1',
            url: '/mam/details/environmentalMonitor',
            name: '环境监测',
            picUrl: require('@/assets/images/um/tips.png')
        },
        {
            id: 'left-2',
            url: '/mam/details/securityMonitor',
            name: '安防监控',
            picUrl: require('@/assets/images/um/tips.png')
        },
        {
            id: 'left-3',
            url: '/mam/details/mechanicalMonitor',
            name: '机电监控',
            picUrl: require('@/assets/images/um/tips.png')
        },
        {
            id: 'left-4',
            url: '/mam/details/personalPosition',
            name: '人员定位',
            picUrl: require('@/assets/images/um/tips.png')
        }
    ]



    count: number = 0

    isOpen: boolean = true
    isPickUp: boolean = true
    isChildMenu: boolean = false
    currentMenu: string = 'left-1'
    currentChild: string = ''

    get Routers (): any{
        return this.$store.getters.routers
    } 

    mounted() {
        console.log('Routers',this.Routers)
        this.choosedMenuStyle()
        let toPath = sessionStorage.getItem('toPath')
        if (toPath!== null) {
            try {
                this.menuData.forEach((item: any) => {
                    if (!item.children && (toPath as string).indexOf(item.url) === 0) {
                        this.currentMenu = item.id
                        this.isChildMenu = false
                        console.log('this.currentMenu', this.currentMenu)
                        throw new Error ('EndIterative')
                    } else if (item.children) {
                        try {
                            item.children.forEach((ele: any) => {
                                if ((toPath as string).indexOf(ele.url) === 0) {
                                    this.currentMenu = item.id
                                    this.currentChild = ele.id
                                    this.isChildMenu = true
                                    throw new Error ('EndIterative')
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


    choosedMenuStyle() {
        let leftMenu = this.$refs['UMLeftMenu-wrap'] as HTMLElement
        this.menuData.forEach(item => {
            if (item.children) {
                this.count++
            } 
        })
        if (this.count > 0) {
            leftMenu.setAttribute('class', 'UMLeftMenu-wrap-double left-menu')
        } else {
            leftMenu.setAttribute('class', 'UMLeftMenu-wrap-single left-menu')
        }
    }
}

