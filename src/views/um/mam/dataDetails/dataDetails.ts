import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    ElementBoxTitle
} from '@/types/common.interface'
import Title from '@/components/um/umtitle.vue'
import SimpleGauge from '@/components/common/chart/chartComponent.vue'
import {
    listMeasTriggerCount
} from '@/api/measureModule.ts'
import {
    listcontrolEquip,
    listEquipStatus
} from '@/api/mechanicalMonitor.ts'
import Pie3DChart from '@/components/common/chart/chartComponent.vue'
import {
    ChartBindData,
    ChartType
} from '@/types/chart.Interface'

@Component({
    components: {
        Title,
        SimpleGauge,
        Pie3DChart
    }
})
export default class About extends Vue {

    dataDetailsTitle: ElementBoxTitle = {
        titleIcon: require('@/assets/images/um/data-details-icon.png'),
        text: '数据详情'
    }
    equipData: {
        id: number,
        name: string
    } [] = []
    pie3DData: ChartBindData = {
        id: 'pie3Did',
        type: ChartType.PIECHART_3D,
        data: {
            title: '开关详情',
            series: {
                name: '开关详情',
                unit: '',
                data: []
            }
        }
    }
    currentIndex: number = 0
    iconSize: number = window.innerWidth * 0.012
    fetchTime: number = 5000
    gaugeCharts: ChartBindData[] = []
    dataInterval: any = null

    mounted() {
        this.getToDayExtreDatas()
        this.getListcontrolEquip()
    }

    choosedLi(index: number) {
        this.currentIndex = index
    }

    getToDayExtreDatas() {
        let _this = this;

        let colors = ['#00ff00', '#ff0000', '#0000ff']

        this.getListMeasTriggerCount().then(
            (result: any) => {
                if (result) {

                    result.forEach((a: any) => {
                        a.alarmRange = [{
                                min: 30,
                                max: 70,
                                level: 0
                            },
                            {
                                min: 10,
                                max: 30,
                                level: 1
                            },
                            {
                                min: 70,
                                max: 90,
                                level: 1
                            },
                            {
                                min: 0,
                                max: 10,
                                level: 2
                            },
                            {
                                min: 90,
                                max: 100,
                                level: 2
                            }
                        ]

                        // 对alarmRange进行排序
                        a.alarmRange.sort((c: any, d: any) => {
                            if (c.min < d.min) {
                                return -1
                            } else if (c.min > d.min) {
                                return 1
                            } else {
                                return 0
                            }
                        })

                        // 设置颜色区间
                        let min: number = a.alarmRange[0].min as number
                        let max: number = a.alarmRange[a.alarmRange.length - 1].max as number
                        let axisColors: any[] = []
                        for (let index = 0; index < a.alarmRange.length; index++) {
                            const element = a.alarmRange[index];
                            axisColors.push([(element.max - min) / (max - min), colors[element.level]])
                        }

                        _this.gaugeCharts.push({
                            id: "gaugeChartsId_" + a.id,
                            type: ChartType.GAUGECHART_NORMAL,
                            data: {
                                title: '',
                                series: {
                                    name: a.name,
                                    unit: a.unit,
                                    data: [{
                                        key: a.name,
                                        value: a.value
                                    }]
                                },
                            },
                            option: {
                                series: [{
                                    type: 'gauge',
                                    min: min,
                                    max: max,
                                    axisLine: {
                                        lineStyle: {
                                            color: axisColors
                                        }
                                    }
                                }]
                            }
                        })
                    });
                }
            },
            (error: any) => {
                (this as any).Log.warn(error)
            }
        )

    }
    getListMeasTriggerCount() {
        return listMeasTriggerCount()
            .then((rel: any) => {
                let {
                    code,
                    data
                } = rel.data
                if (code === 200) {

                    return data.map((item: any) => {
                        let {
                            location,
                            type,
                            value
                        } = item;
                        return Object.assign({
                            location
                        }, type, {
                            value
                        })
                    })
                }
            })
    }
    getListcontrolEquip() {
        listcontrolEquip().then((res: any) => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.equipData = data
            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }
    getlistEquipStatus() {
        let {
            pie3DData: {
                data: series
            }
        } = this
        listEquipStatus().then((res: any) => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                (series as any).data = data
            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }

}