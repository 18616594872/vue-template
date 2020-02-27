import {
    Component,
    Vue
} from 'vue-property-decorator'
import publicMonitorDetails from '@/components/um/publicMonitorDetails.vue'
import environmentDetail from './environmentDetail/environmentDetail.vue'
import environmentList from './environmentList/environmentList.vue'
import {
    MonitorType,
    Codition
} from '@/types/views/environmentalMonitor.interface.ts'
import {
    equipmentTypeList,
} from '@/api/environmentalMonitor'
import { equipmentTypeDataList } from '@/api/environmentDetail'
import { ExtendDate } from '@/utils/common'

@Component({
    components: {
        publicMonitorDetails,
        environmentDetail,
        environmentList
    }
})
export default class About extends Vue {

    // data
    monitorTypeList: MonitorType[] = []
    equipTypeCardList: any[] = []
    equipTypeTableList: any[] = []
    showCard: boolean = true

    mounted() {
        this.getMonitorTypeList()
    }

    getMonitorTypeList() {
        equipmentTypeList()
            .then((res: any) => {
                let {
                    code,
                    data
                } = res.data
                if (code === 200) {
                    this.monitorTypeList = data
                }
            })
            .catch((error: any) => {
                (this as any).Log.warn(error)
            })
    }
    getDetailList(condition: Codition){
        
        equipmentTypeDataList(condition).then(
            (result: any) => {
                let {
                    code,
                    data
                } = result.data
                if (code === 200) {
                    this.equipTypeTableList = data

                    this.equipTypeCardList.splice(0)
                    data.forEach((a: any) => {
                        let o = <any>{}
                        o = a
                        o.ObjName = a.name
                        o.ObjVal = a.curValue
                        o.clickStatus = false
                        o.objtypeId = condition.objtypeId
                        o.time =
                            a.time == undefined || a.time == "" ?
                            "" :
                            new ExtendDate(a.time).format(
                                "yyyy-MM-dd hh:mm:ss"
                            )
                        this.equipTypeCardList.push(o)
                    })

                    console.log(this.equipTypeCardList)

                }
            },
            (error: any) => {
                (this as any).Log.warn(error)
            }
        )
    }

    getPageStatus(show: boolean){
        this.showCard = show
    }

}