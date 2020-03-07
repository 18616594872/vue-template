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
    listTunnel
} from '@/api/commonModule.ts'
import MixedLineAndBar from '@/components/common/chart/chartComponent.vue'
import Title from '@/components/um/umtitle.vue'
import DataOverview from '@/views/um/mam/dataOverview/dataOverview.vue'
// import VideoDisplay from '@/views/um/mam/videoDisplay/videoDisplay.vue'
import DataDetails from '@/views/um/mam/dataDetails/dataDetails.vue'
import TirggerData from '@/views/um/mam/triggerData/triggerData.vue'
import HollowPieChart from '@/components/common/chart/chartComponent.vue'
import {
    Series,
    ChartBindData,
    ChartType
} from '@/types/chart.Interface'


@Component({
    components: {
        MixedLineAndBar,
        Title,
        DataOverview,
        // VideoDisplay,
        DataDetails,
        TirggerData,
        HollowPieChart
    }
})
export default class About extends Vue {

    equipTypeTitle: ElementBoxTitle = {
        titleIcon: require('@/assets/images/um/doughnut-icon.png'),
        text: '监测对象个数统计'
    }

    tempHumidityTitle: ElementBoxTitle = {
        titleIcon: require('@/assets/images/um/temp-humidity-icon.png'),
        text: '温湿度数据'
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

    mounted() {
        this.initEquipTypeDate()
        this.initMixedLineAndBar()
    }
    initEquipTypeDate() {
        listObjData().then((res: any) => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.equipTypeDate.data.series = {
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
        listAverageGesInfo().then((res: any) => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                (this.mixedLineAndBarData.data.series as any).forEach((el: any) => {
                    el.data = data
                })

                
            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }

}