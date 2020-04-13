import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    listRouter
} from '@/api/permission'

@Component({})
export default class About extends Vue {

    visableModal: boolean = false
    ModalType: string = 'new'
    role: any = {
        name: '',
        desc: '',
        routes: []
    }
    routes: Array < any > = []

    created() {
        this.init()
    }
    addRole() {
        this.ModalType = 'new'
        this.visableModal = true
    }

    async init() {
        let res = await this.getListRouter()
        this.routes = await this.parseRoutes(res)
        
    }
    getListRouter() {
        return listRouter()
            .then((res: any) => {
                let {
                    code,
                    data
                } = res.data
                if (code === 200) {
                    return data
                }
            })
            .catch((error: any) => {
                (this as any).Log.warn(error)
            })
    }
    parseRoutes(routers: Array < any > ) {
        return Array.isArray(routers) && routers.reduce((arr, route) => {
            if(route.hidden){
                return arr
            }
            let o = < any > {}
            o.title = route.name
            o.checked = false
            
            o.children = route.children ? this.parseRoutes(route.children) : this.insturction()
             
            return arr.concat(o)
        }, [])
    }
    insturction(){ // 默认指令权限
        return [{
            title: '增加',
            checked: true
        },{
            title: '删除',
            checked: true
        },{
            title: '修改',
            checked: true
        },{
            title: '查找',
            checked: true
        }]
    }

}