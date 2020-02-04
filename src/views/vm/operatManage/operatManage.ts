import {
    Component,
    Vue
} from 'vue-property-decorator'
import MultipleLineChart from '@/components/common/chart/chartComponent.vue'
import {
    listCustomerData,
    listEnergyData
} from '@/api/operatManage'
import {
    Series,
    ChartBindData,
    ChartType
} from '@/types/chart.Interface'

@Component({
    components: {
        MultipleLineChart
    }
})
export default class About extends Vue {
    operatManageIMG: string = require('@/assets/images/vm/operatManage-bg.png')
    guideIcon: string = require('@/assets/images/vm/guide-icon.png')

    energyData: ChartBindData = {
        id: 'energyLineId',
        type: ChartType.LINECHART_MULTIPLE,
        data: {
            title: '晋源东区管廊能耗统计图'
        }
    }

    customerData: any[] = []
    enableTilt: boolean = false

    mounted() {
        this.listEnergyData()
        this.listCustomerData()
    }

    listEnergyData() {
        return listEnergyData()
            .then((res: any) => {
                let {
                    code,
                    data
                } = res.data
                if (code === 200) {
                    if (data.length == 0) return

                    let _series: Series[] = []
                    data[0].val.forEach((item: {
                        val: number,
                        key: string
                    }) => {
                        _series.push({
                            name: item.key,
                            unit: 'kw·h',
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
                    });

                    this.energyData.data = {
                        title: '管廊能耗统计图',
                        series: _series
                    }
                }
            })
            .catch((error: any) => {
                (this as any).Log.warn(error)
            })
    }

    listCustomerData() {
        return listCustomerData()
            .then(res => {
                let {
                    code,
                    data
                } = res.data
                if (code === 200) {
                    this.customerData = data
                }
            })
            .catch((error: any) => {
                (this as any).Log.warn(error)
            })
    }
}