import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    ElementBoxTitle
} from '@/types/common.interface'
import {
    listObjData,
    listAverageGesInfo
} from '@/api/integratedMonitoring'
import {
    energyDataList
} from '@/api/operationManagement'
import MixedLineAndBar from '@/components/common/chart/chartComponent.vue'
import Title from '@/components/um/umtitle.vue'
import DataOverview from '@/views/um/mam/details/dataOverview/dataOverview.vue'
import TirggerData from '@/views/um/mam/details/triggerData/triggerData.vue'
import HollowPieChart from '@/components/common/chart/chartComponent.vue'
import Chart from '@/components/common/chart/chartComponent.vue'
import {
    ChartBindData,
    ChartType
} from '@/types/chart.Interface'
import {
    isSeriesArray
} from '@/utils/common'


@Component({
    components: {
        MixedLineAndBar,
        Title,
        DataOverview,
        TirggerData,
        HollowPieChart,
        Chart
    }
})
export default class About extends Vue {
    title: any = {
        equipType: '监测对象个数统计',
        tempHumidity: '温湿度数据',
        energy: '管廊能耗统计',
        contract: '管廊合同统计'

    }
    equipTypeDate: ChartBindData = {
        id: 'doughnutId',
        type: ChartType.PIECHART_HOLLOW,
        data: {
            title: '对象个数',
            series: {
                name: '',
                unit: '',
                data: []
            }
        },
        option: {
            series: [{
                type: 'pie',
                itemStyle: {
                    color: (item: any) => {
                        let dataColor = [{
                                leftColor: '#f0b975',
                                rightColor: '#fe5c54',
                            },
                            {
                                leftColor: '#ffccee',
                                rightColor: '#ff35bd',
                            },
                            {
                                leftColor: '#cec4ff',
                                rightColor: '#7054f7',
                            },
                            {
                                leftColor: '#ffb8ba',
                                rightColor: '#ff3237',
                            },
                            {
                                leftColor: '#cffdff',
                                rightColor: '#00f2fe',
                            },
                            {
                                leftColor: '#ecf991',
                                rightColor: '#e7ff44',
                            }
                        ]
                        let res = {
                            type: 'linear',
                            y: 0,
                            y2: 1,
                            x2: 0,
                            x: 0,
                            colorStops: [{
                                offset: 0,
                                color: dataColor[item.dataIndex % dataColor.length].leftColor // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: dataColor[item.dataIndex % dataColor.length].rightColor // 100% 处的颜色
                            }],
                            global: false
                        }

                        return res
                    }
                }
            }]
        }
    }
    mixedLineAndBarData: ChartBindData = {
        id: 'mixedLineAndBarId',
        type: ChartType.MIXEDCHART_BARANDLINE,
        data: {
            title: '',
            series: [{
                    name: '平均温度',
                    unit: '℃',
                    data: []
                },
                {
                    name: '平均湿度',
                    unit: '%RH',
                    data: []
                }
            ]
        },
    }
    energyData: ChartBindData = {
        id: 'operationManageEnergy',
        type: ChartType.LINECHART_MULTIPLE,
        data: {
            title: '',
            series: []
        }
    }

    mounted() {
        this.initEquipTypeDate()
        this.initMixedLineAndBar()
    }
    initEquipTypeDate() {
        let {
            equipTypeDate
        } = this
        listObjData().then((res: any) => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                equipTypeDate.data.series = {
                    name: '对象类型：',
                    unit: '个',
                    data
                }
            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }
    initMixedLineAndBar() {
        let {
            mixedLineAndBarData: {
                data: {
                    series
                }
            }
        } = this
        listAverageGesInfo().then((res: any) => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                if (isSeriesArray(series)) {
                    series.forEach((el: any) => {
                        el.data = data
                    })
                }
            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }
    getEnergyDataList() {
        let {
            energyData: {
                data: {
                    series
                }
            }
        } = this
        return energyDataList().then((res: any) => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                if (isSeriesArray(series)) {
                    series = [{
                        name: '古城大街',
                        unit: '千瓦时',
                        data
                    }]
                }
            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }

}