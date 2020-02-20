import { Component, Vue } from 'vue-property-decorator'
import Chart from "@/components/common/chart/chartComponent.vue" 
import { ChartBindData, ChartType } from '@/types/chart.Interface.ts'
import { ExtendDate } from '@/utils/common'
import { TableInterface } from '@/types/views/energyConsumption.interface.ts'
import { tableList } from '@/api/energyConsumption.ts'
@Component({
    components: {
        Chart
    }
})
export default class EnergyConsumption extends Vue {

    startTime: any 
    endTime: any
    period: number = 3
    tableColumn: any[] = [
        {
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
                name: '管廊能耗统计',
                unit: '千瓦时',
                data: [
                    { key: '古城大街', value: 40 },
                    { key: '实验路', value: 20 },
                    { key: '经二路', value: 10 },
                    { key: '经三路', value: 10 },
                    { key: '纬三路', value: 10 }
                ]
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
                name: '管廊平均能耗',
                unit: '千瓦时/KM',
                data: [
                    { key: '古城大街', value: 30 },
                    { key: '实验路', value: 10 },
                    { key: '经二路', value: 9 },
                    { key: '经三路', value: 10 },
                    { key: '纬三路', value: 7 }
                ]
            }
        }
    }
    lineChart: ChartBindData = {
        id: 'tunnelPeriodEC',
        type: ChartType.LINECHART_MULTIPLE,
        data: {
            title: '综合管廊耗电量',
            series: [
                {
                    name: '古城大街',
                    unit: '千瓦时',
                    data: [
                        {
                            key: '1月',
                            value: 20
                        }, 
                        {
                            key: '2月',
                            value: 8
                        },
                        {
                            key: '3月',
                            value: 10
                        },
                        {
                            key: '4月',
                            value: 5
                        },
                        {
                            key: '5月',
                            value: 5
                        }
                    ]
                },
                {
                    name: '实验路',
                    unit: '千瓦时',
                    data: [
                        {
                            key: '1月',
                            value: 10
                        }, 
                        {
                            key: '2月',
                            value: 14
                        },
                        {
                            key: '3月',
                            value: 10
                        },
                        {
                            key: '4月',
                            value: 5
                        },
                        {
                            key: '5月',
                            value: 9
                        }
                    ]
                },
                {
                    name: '经二路',
                    unit: '千瓦时',
                    data: [
                        {
                            key: '1月',
                            value: 12
                        }, 
                        {
                            key: '2月',
                            value: 19
                        },
                        {
                            key: '3月',
                            value: 7
                        },
                        {
                            key: '4月',
                            value: 9
                        },
                        {
                            key: '5月',
                            value: 5
                        }
                    ]
                }
            ]
        }
    }
    periodData: any[] =  [
        {
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

    get queryParam() {
        return {
            startTime: this.startTime.getTime(),
            endTime: this.endTime.getTime()
        }
    }

    mounted() {
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
    
}
