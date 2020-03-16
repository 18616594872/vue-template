import {
    Component,
    Vue
} from 'vue-property-decorator'
import publicMonitorDetails from '@/components/um/publicMonitorDetails/publicMonitorDetails.vue'
import securityList from './securityList/securityList.vue'
import {
    MonitorType,
    Codition,
    EquipmentProp,
    EquipmentDataList
} from '@/types/views/environmentalMonitor.interface'
import {
    equipmentTypeList,
    equipmentTypeDataList
} from '@/api/environmentalMonitor'

@Component({
    components: {
        publicMonitorDetails,
        securityList
    }
})
export default class About extends Vue {

    // data
    monitorTypeList: MonitorType[] = []
    equipTypeList: EquipmentDataList = {
        card: [],
        table: {
            total: 0, // 数据总数
            pageSize: 0, //每页条数 
            equipProp: []
        }
    }
    showCard: boolean = true // 展示详情 或 表格

    mounted() {
        this.getMonitorTypeList()
    }

    getMonitorTypeList() {
        equipmentTypeList(2)
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
    getDetailList(condition: Codition) {
        let {
            equipTypeList
        } = this
        equipmentTypeDataList(condition).then(
            (result: any) => {
                let {
                    code,
                    data
                } = result.data
                if (code === 200) {
                    equipTypeList.table = data

                    equipTypeList.card.splice(0)
                    data.equipProp.forEach((a: EquipmentProp) => {
                        let o = < any > {}
                        o = a
                        o.clickStatus = false
                        o.objtypeId = condition.objtypeId
                        o.time =
                            a.time == undefined || a.time == "" ?
                            "" :
                            new Date(a.time).format(
                                "yyyy-MM-dd hh:mm:ss"
                            )
                        o.objtypeName =
                            a.tunnel + a.area + a.store
                        equipTypeList.card.push(o)
                    })

                }
            },
            (error: any) => {
                (this as any).Log.warn(error)
            }
        )
    }

    getPageStatus(show: boolean) {
        this.showCard = show
    }

}