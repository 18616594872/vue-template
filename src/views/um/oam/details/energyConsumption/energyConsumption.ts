import {
    Component,
    Vue
} from 'vue-property-decorator'
import Chart from "@/components/common/chart/chartComponent.vue"
import {
    ChartBindData,
    ChartType
} from '@/types/chart.Interface'
import {
    TableInterface
} from '@/types/views/energyConsumption.interface'
import {
    tableList,
    energyConsumptionDataList,
    energyAverageECDataList,
    energyPeriodECDataList
} from '@/api/energyConsumption'
@Component({
    components: {
        Chart
    }
})
export default class EnergyConsumption extends Vue {

    period: number = 3
    tableColumn: any[] = [{
            title: "管廊名称",
            key: "tunnelName",
            align: "center"
        },
        {
            title: "耗电量（千瓦时）",
            key: "powerConsumption",
            align: "center"
        }
    ]
    tableData: TableInterface[] = []
    pieChart: ChartBindData = {
        id: 'tunnelenergyConsumption',
        type: ChartType.PIECHART_NORMAL,
        data: {
            title: '管廊能耗统计',
            series: {
                name: '',
                unit: '',
                data: []
            }
        },
        option: {
            legend: {
                textStyle: {
                    fontSize: 12
                }
            },
            title: {
                textStyle: {
                    fontSize: 22
                }
            },
            tooltip: {
                textStyle: {
                    fontSize: 16
                }
            },
            series: [{
                label: {
                    fontSize: 12
                }
            }]
        }
    }
    radarChart: ChartBindData = {
        id: 'tunnelAverageEC',
        type: ChartType.RADARCHART_NORMAL,
        data: {
            title: '管廊平均能耗',
            series: {
                name: '',
                unit: '',
                data: []
            }
        }
    }
    lineChart: ChartBindData = {
        id: 'tunnelPeriodEC',
        type: ChartType.LINECHART_MULTIPLE,
        data: {
            title: '综合管廊耗电量',
            series: [{
                    name: '',
                    unit: '',
                    data: []
                }
            ]
        }
    }
    periodData: any[] = [{
            icon: 'ios-flash',
            text: '历史总能耗',
            value: 5518.16,
            unit: '千瓦时'
        },
        {
            icon: 'ios-flash',
            text: '本年度能耗',
            value: 56,
            unit: '千瓦时'
        },
        {
            icon: 'ios-flash',
            text: '本月度能耗',
            value: 4,
            unit: '千瓦时'
        }
    ]

    mounted() {
        this.getEnergyDataList()
        this.getAverageECDataList()
        this.getPeriodECDataList()
    }

    queryEnergies() {
        return tableList().then((res: any) => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.tableData = data
            }
        })
    }
    getEnergyDataList(){
        return energyConsumptionDataList().then((res: any) => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.pieChart.data.series = {
                    name: '管廊能耗统计',
                    unit: '千瓦时',
                    data
                }
            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }
    getAverageECDataList(){
        return energyAverageECDataList().then((res: any) => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.radarChart.data.series = {
                    name: '管廊平均能耗',
                    unit: '千瓦时/KM',
                    data
                }
            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }
    getPeriodECDataList(){
        return energyPeriodECDataList().then((res: any) => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.lineChart.data.series = [{
                    name: '古城大街',
                    unit: '千瓦时',
                    data
                }]
            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }

}