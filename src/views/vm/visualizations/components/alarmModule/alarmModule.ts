import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    Total,
    CarouselInfo,
    Refresh,
    YearAndMonthAlarm,
    AlarmPart,
    AlarmCount
} from '@/types/views/alarmModule.interface'
import ModuleTitle from '../moduleTitle/moduleTitle.vue'
import SimplePieChart from '@/components/common/chart/chartComponent.vue'
import {
    listYearAndMonthAlarmCount,
    listNewAlarms,
    listAlarmCount
} from '@/api/alarmModule'
import {
    Series,
    ChartBindData,
    ChartType
} from '@/types/chart.Interface'
import {
    extendDate
} from '@/utils/common'

@Component({
    components: {
        SimplePieChart,
        ModuleTitle
    }
})
export default class About extends Vue {

    // data
    title: object = {
        name: '报警统计',
        showFlag: true,
        turnTo: '预案管理'
    }
    iconSize: number = 12
    yearTotal: Total = {
        number: 271,
        isRise: false
    }
    monthTotal: Total = {
        number: 32,
        isRise: true
    }
    pieChart: ChartBindData = {
        id: 'tunnelAlarmPieChart',
        type: ChartType.PIECHART_NORMAL,
        data: {
            title: '',
            series: []
        }
    }
    alarmShowData: AlarmPart[] = []
    alarmAllData: AlarmPart[] = []
    carouselInfo: CarouselInfo = {
        intervalId: 0,
        totalPage: 0,
        pageSize: 4,
        curPage: 1,
        isCarousel: true,
        time: 1000
    }
    refresh: Refresh = {
        total: true,
        list: true,
        time: 300 * 1000,
        intervalId: 0
    }

    mounted() {
        this.getTotalAlarmCount()
        this.getAlarmList()
        this.drawPieChart()
    }

    // methods
    getTotalAlarmCount() {
        this.getListYearAndMonthAlarmCount()
            .then((result: YearAndMonthAlarm[]) => {
                result.forEach((item: YearAndMonthAlarm) => {
                    let {
                        key,
                        value,
                        isRise
                    } = item
                    let {
                        yearTotal,
                        monthTotal
                    } = this

                    if (key === "year") {
                        yearTotal.number = value
                        yearTotal.isRise = isRise
                    } else {
                        monthTotal.number = value
                        monthTotal.isRise = isRise
                    }
                })
            })
            .catch((err: any) => {
                (this as any).Log.warn(err)
            })
    }
    getAlarmList() {
        this.getListNewAlarms()
            .then((result: AlarmPart[]) => {
                if (result) {

                    result.forEach((alarm: any) => {
                        alarm.alarmDate = new extendDate(alarm.alarmDate).format('MM-dd hh:mm:ss')
                    })

                    this.alarmAllData = result
                    this.carouselInfo.totalPage = Math.ceil(result.length / this.carouselInfo.pageSize)
                    this.carousel()
                }
            })
            .catch((err: any) => {
                (this as any).Log.warn(err)
            })
    }
    carousel() {
        let {
            alarmAllData,
            carouselInfo
        } = this

        this.alarmShowData = alarmAllData.slice(
            (carouselInfo.curPage - 1) * carouselInfo.pageSize,
            carouselInfo.curPage * carouselInfo.pageSize
        )

        carouselInfo.curPage = carouselInfo.curPage >= carouselInfo.totalPage ? 1 : ++carouselInfo.curPage

        if (carouselInfo.isCarousel) {
            clearInterval(carouselInfo.intervalId)
            carouselInfo.intervalId = setInterval(() => this.carousel(), carouselInfo.time)
        }

    }
    drawPieChart() {
        this.getListAlarms().then((result: AlarmCount[]) => {
            if (result) {

                let _series: Series = {
                    name: '管廊告警统计',
                    unit: '条',
                    data: []
                }

                result.forEach((tunnel: any) => {

                    _series.data.push({
                        key: tunnel.key,
                        value: tunnel.val
                    })
                })

                this.pieChart.option = {
                    title: {
                        show: false
                    }
                }

                // 设置传输的数据
                this.pieChart.data = {
                    title: '管廊告警统计',
                    series: _series
                }
            }
        })
    }
    changeState() {
        let {
            carouselInfo
        } = this
        carouselInfo.isCarousel = !carouselInfo.isCarousel
        if (carouselInfo.isCarousel) {
            carouselInfo.intervalId = setInterval(() => this.carousel(), this.carouselInfo.time)
        } else {
            clearInterval(carouselInfo.intervalId)
        }
    }
    getListYearAndMonthAlarmCount() {
        return listYearAndMonthAlarmCount()
            .then((rel: any) => {
                let {
                    code,
                    data
                } = rel.data
                if (code === 200) {
                    return data
                }
            })
            .catch((err: any) => {
                (this as any).Log.warn(err)
            })
    }
    getListNewAlarms() {
        return listNewAlarms()
            .then((rel: any) => {
                let {
                    code,
                    data
                } = rel.data
                if (code === 200) {
                    return data
                }
            })
            .catch((err: any) => {
                (this as any).Log.warn(err)
            })
    }
    getListAlarms() {
        return listAlarmCount()
            .then((rel: any) => {
                let {
                    code,
                    data
                } = rel.data
                if (code === 200) {
                    return data
                }
            })
            .catch((err: any) => {
                (this as any).Log.warn(err)
            })
    }

    beforeDestroy() {
        clearInterval(this.carouselInfo.intervalId)
        this.refresh.total = false
        this.refresh.list = false
    }

}