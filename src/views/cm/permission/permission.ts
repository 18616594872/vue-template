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
    routes: Array<any> =  []

    created(){
        this.init()
    }
    addRole() {
        this.ModalType = 'new'
        this.visableModal = true
    }

    async init() {
        let res = await this.getListRouter()
        this.routes = this.generateRoutes(res.data)
    }
    getListRouter(){
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
    generateRoutes(routers: Array< any >){
        
        return []
    }

}