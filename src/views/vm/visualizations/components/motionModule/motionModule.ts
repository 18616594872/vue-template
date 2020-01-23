import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    Title
} from '@/types/views/inspectModule.interface'
import ModuleTitle from '../moduleTitle/moduleTitle.vue'
import LineChart from '@/components/common/chart/chartComponent.vue'
import {
    totleEnergyEveryMonthAndTunnel
} from '@/api/motionModule'
import {
    Series,
    ChartBindData,
    ChartType
} from '@/types/chart.Interface'

@Component({
    components: {
        LineChart,
        ModuleTitle
    }
})
export default class About extends Vue {
    title: Title = {
        name: '能耗监测',
        showFlag: true,
        turnTo: '运营管理'
    }

    bindData: ChartBindData = {
        id: 'tunnelEnergyLineChartId',
        type: ChartType.LINECHART_MULTIPLE,
        data: {
            title: '每月用电量'
        }
    }

    mounted() {
        this.getLineChartData();
    }

    getLineChartData() {
        return totleEnergyEveryMonthAndTunnel()
            .then((rel: any) => {
                let {
                    code,
                    data
                } = rel.data
                if (code === 200) {

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
                                if (item1.key == item2.name) {
                                    item2.data.push({
                                        key: element.key,
                                        value: item1.val
                                    })
                                }
                            })
                        })
                    });

                    this.bindData.data = {
                        title: '各管廊每月用电量',
                        series: _series
                    }
                }
            })
    }

}