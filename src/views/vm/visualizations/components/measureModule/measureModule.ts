import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    Title
} from '@/types/views/inspectModule.interface'
import ModuleTitle from '../moduleTitle/moduleTitle.vue'
import SimpleGauge from '@/components/common/chart/chartComponent.vue'
import {
    listMeasTriggerCount
} from '@/api/measureModule.ts'
import {
    ChartBindData,
    ChartType
} from '@/types/chart.Interface'

@Component({
    components: {
        ModuleTitle,
        SimpleGauge
    }
})
export default class About extends Vue {

    // data
    title: Title = {
        name: '管廊监测',
        showFlag: true,
        turnTo: '综合监控'
    }
    iconSize: number = window.innerWidth * 0.012
    fetchTime: number = 5000
    gaugeCharts: ChartBindData[] = []
    dataInterval: any = null
    dataTimeout: any = {
        todayExtreFlag: true
    }

    mounted() {
        this.getToDayExtreDatas();
    }

    //methods
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
                            // tslint:disable-next-line:prefer-for-of
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
                    _this.Log.info(error);
                }
            )
            .finally(() => {
                if (_this.dataTimeout.todayExtreFlag) {
                    setTimeout(() => {
                        _this.getToDayExtreDatas()
                    }, _this.fetchTime)
                }
            });

    }
    getListMeasTriggerCount() {
        return listMeasTriggerCount()
            .then((rel: any) => {
                let {
                    code,
                    data
                } = rel.data
                if (code === 200) {

                    let newDate: any[] = data.map((item: any) => {
                        let {
                            location,
                            type,
                            value
                        } = item
                        return Object.assign({
                            location
                        }, type, {
                            value
                        })
                    })
                    return newDate
                }
            })
    }

    beforeDestroy() {
        this.dataTimeout.todayExtreFlag = false
    }

}