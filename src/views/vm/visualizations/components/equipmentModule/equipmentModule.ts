import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    Title
} from '@/types/views/equipmentModule.interface'
import ModuleTitle from '../moduleTitle/moduleTitle.vue'
import StackBar from '@/components/common/chart/chartComponent.vue'
import {
    getEquipmetStatus,
    listEquipmentData
} from '@/api/equipmentModule'
import {
    Series,
    ChartBindData,
    ChartType,
    BaseData
} from '@/types/chart.Interface'
import {
    AlarmCount
} from '@/types/views/alarmModule.interface'

@Component({
    components: {
        ModuleTitle,
        StackBar
    }
})
export default class About extends Vue {

    title: Title = {
        name: '廊内设备',
        showFlag: true,
        turnTo: '管廊简介'
    }

    stateDataLists: AlarmCount[] = []

    bindData: ChartBindData = {
        id: 'stackBarId',
        type: ChartType.BARCHART_STACK,
        data: {
            title: '',
            series: []
        }
    }

    mounted() {
        this.getEquipmetStatus()
        this.listEquipmentData()
    }

    getEquipmetStatus() {
        return getEquipmetStatus().then((res: any) => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.stateDataLists = data

            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }

    listEquipmentData() {
        return listEquipmentData().then(res => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {

                let _series: Series[] = []

                data[0].val.forEach((item: { val: number, key: string }) => {
                    _series.push({
                        name: item.key,
                        unit: '个',
                        data: []
                    })
                })
                
                data.forEach((element: {
                    key: string,
                    val: Array < {
                        val: number,
                        key: string
                    } >
                }) => {
                    element.val.forEach((item1: any) => {
                        _series.forEach((item2: any) => {
                            if (item1.key === item2.name) {
                                item2.data.push({
                                    key: element.key,
                                    value: item1.val
                                })
                            }
                        })
                    })
                })

                this.bindData.data = {
                    title: '各类型设备数量',
                    series: _series
                }
            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }

}