import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    RunMessage,
    Title
} from '@/types/views/commonModule.interface'
import ModuleTitle from '../moduleTitle/moduleTitle.vue'
import HollowPieChart from '@/components/common/chart/chartComponent.vue'
import {
    listTunnelStatus
} from '@/api/commonModule'
import {
    Series,
    ChartType,
    ChartBindData
} from '@/types/chart.Interface'
import {
    extendDate
} from '@/utils/common'

@Component({
    components: {
        ModuleTitle,
        HollowPieChart
    }
})
export default class About extends Vue {
    // data
    title: Title = {
        name: '基本信息',
        showFlag: true,
        turnTo: '管廊简介'
    }
    statusList: any[] = []

    pieChart: ChartBindData = {
        id: 'common_pieChartId',
        type: ChartType.PIECHART_HOLLOW,
        data: {
            title: '管廊总数'
        }
    }

    runMessage: RunMessage = {
        startTime: '',
        safe: 20
    }
    nowTime: string = ''
    intervalId: number = 0

    mounted() {
        this.listTunnelStatus()
        this.refreshDate()
    }

    listTunnelStatus() {
        return listTunnelStatus().then(res => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {

                if (!data.length) return

                let total: number = 0
                data.forEach((ele: any) => {
                    total += ele.value
                })

                let _series: Series = {
                    name: '管廊类型统计',
                    unit: '条',
                    data: []
                }
                data.forEach((item: any) => {
                    let toFixedNum = (item.value / total * 100).toFixed(2)
                    let temp = {
                        name: item.name,
                        value: toFixedNum + '%'
                    }
                    this.statusList.push(temp)

                    _series.data.push({
                        key: item.name,
                        value: item.value
                    })
                });

                // 设置特殊样式
                this.pieChart.option = {
                    title: {
                        top: '49%'
                    },
                    legend: {
                        show: false
                    },
                    graphic: {
                        type: "text",
                        left: "center",
                        top: "37.5%",
                        style: {
                            text: total.toString()
                        }
                    }
                }
                // 设置传输的数据
                this.pieChart.data = {
                    title: '管廊总数',
                    series: _series
                }
            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }
    refreshDate() {
        this.intervalId = setInterval(() => this.nowTime = new extendDate().format("hh:mm:ss"), 1000)
    }
    beforeDestroy() {
        clearInterval(this.intervalId)
    }

}