import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    Total,
    CarouselInfo,
    Refresh,
    YearAndMonthAlarm
} from '@/types/views/alarmModule.interface'
import ModuleTitle from '../moduleTitle/moduleTitle.vue'
// import SimplePieChart from '@/components/common/chart/chartComponent/chartComponent.vue'
import {
    listYearAndMonthAlarmCount,
    listNewAlarms,
    listAlarmCount
} from '@/api/alarmModule.ts'
import {
    Series,
    ChartBindData,
    ChartType
} from '@/types/chart.Interface'

@Component({
    components: {
        // SimplePieChart,
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
            title: ''
        }
    }
    words: string[] = ["暂无告警"]
    alarmShowData: any = []
    alarmAllData: any[] = []
    carouselInfo: CarouselInfo = {
        intervalId: 0,
        totalId: 0,
        listId: 0,
        totalPage: 0,
        pageSize: 4,
        curPage: 1,
        isCarousel: true,
        time: 2000
    }
    refresh: Refresh = {
        total: true,
        list: true,
        time: 300000,
        intervalId: 0
    }

    mounted() {
        this.iconSize = window.innerWidth * 0.009;
        this.getTotalAlarmCount();
        this.getAlarmList();
        this.drawPieChart();
        let _this = this;
        if (this.carouselInfo.isCarousel) {
            this.carouselInfo.intervalId = setInterval(() => {
                _this.carousel();
            }, this.carouselInfo.time);
        }
    }

    // methods
    getTotalAlarmCount() {
        this.getListYearAndMonthAlarmCount()
            .then((result: YearAndMonthAlarm[]) => {
                console.log(result)
                result.forEach((item: YearAndMonthAlarm) => {
                    if (item.key === "year") {
                        this.yearTotal.number = item.value
                        this.yearTotal.isRise = item.isRise
                    } else {
                        this.monthTotal.number = item.value;
                        this.monthTotal.isRise = item.isRise;
                    }
                });
            })
            .finally(() => {
                let _this = this;
                if (this.refresh.total) {
                    setTimeout(() => {
                        _this.getTotalAlarmCount();
                    }, this.refresh.time);
                }
            });
    }
    getAlarmList() {
        this.getListNewAlarms()
            .then((result: any) => {
                if (result) {
                    this.words = [];
                    result.forEach((alarm: any) => {
                        let info =
                            alarm.description +
                            " " +
                            alarm.alarmLevel +
                            " " +
                            alarm.location +
                            " " +
                            alarm.alarmTime;
                        this.words.push(info);
                    });
                    this.alarmAllData = result;
                    this.alarmAllData.forEach((alarm: any) => {
                        alarm.alarmLevel = alarm.alarmLevel.slice(0, 2);
                        alarm.alarmDate = new Date(alarm.alarmDate).format('MM-dd hh:mm:ss')
                        switch (alarm.alarmLevel) {
                            case "提示":
                                alarm.bgColor = "#0066ff";
                                alarm.color = "#fff";
                                alarm.buttonText = "提示"
                                break;
                            case "一般":
                                alarm.bgColor = "#ffff00";
                                alarm.color = "#333";
                                alarm.buttonText = "一般"
                                break;
                            case "严重":
                                alarm.bgColor = "#ffae00";
                                alarm.color = "#333";
                                alarm.buttonText = "修复中"
                                break;
                            case "危急":
                                alarm.bgColor = "#ff0000";
                                alarm.color = "#fff";
                                alarm.buttonText = "处理中"
                                break;
                        }
                    });

                    this.carouselInfo.totalPage =
                        result.length % this.carouselInfo.pageSize === 0 ?
                        result.length / this.carouselInfo.pageSize :
                        Math.floor((result.length / this.carouselInfo.pageSize)) + 1;
                    this.carousel();
                }
            })
            .finally(() => {
                let _this = this;
                if (this.refresh.list) {
                    setTimeout(() => {
                        _this.getAlarmList();
                    }, this.refresh.time);
                }
            });
    }
    carousel() {
        this.alarmShowData = this.alarmAllData.slice(
            (this.carouselInfo.curPage - 1) * this.carouselInfo.pageSize,
            this.carouselInfo.curPage * this.carouselInfo.pageSize
        );
        if (this.carouselInfo.curPage === this.carouselInfo.totalPage) {
            this.carouselInfo.curPage = 1;
        } else {
            this.carouselInfo.curPage += 1;
        }
    }
    drawPieChart() {
        this.getListAlarms().then((result: any) => {
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
        this.carouselInfo.isCarousel = !this.carouselInfo.isCarousel;
        if (this.carouselInfo.isCarousel) {
            let _this = this;
            this.carouselInfo.intervalId = setInterval(() => {
                _this.carousel();
            }, this.carouselInfo.time);
        } else {
            clearInterval(this.carouselInfo.intervalId);
            this.carouselInfo.intervalId = 0;
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
            .catch(() => {
                (this as any).Log.info("main.ts运行结束")
            })
    }
    getListNewAlarms() {
        return new Promise((resolve: any, reject: any) => {
            listNewAlarms()
                .then((rel: any) => {
                    let {
                        code,
                        data
                    } = rel.data
                    if (code === 200) {
                        resolve(data)
                    }
                })
                .catch(() => {
                    resolve([{
                        alarmDate: 1574831828000,
                        alarmLevel: "提示",
                        id: 171530,
                        location: "实验路5区-综合舱",
                        name: "温度测试告警"
                    }, {
                        alarmDate: 1574826228000,
                        alarmLevel: "提示",
                        id: 171529,
                        location: "经二路4区-综合舱",
                        name: "温度测试告警"
                    }, {
                        alarmDate: 1574826228000,
                        alarmLevel: "一般",
                        id: 171528,
                        location: "经二路3区-综合舱",
                        name: "温度测试告警"
                    }, {
                        alarmDate: 1574826228000,
                        alarmLevel: "严重",
                        id: 171529,
                        location: "经二路2区-综合舱",
                        name: "温度测试告警"
                    }, {
                        alarmDate: 1574826228000,
                        alarmLevel: "危急",
                        id: 171529,
                        location: "经二路1区-综合舱",
                        name: "温度测试告警"
                    }])
                })
        })
    }
    getListAlarms() {
        return new Promise((resolve: any, reject: any) => {
            listAlarmCount()
                .then((rel: any) => {
                    let {
                        code,
                        data
                    } = rel.data
                    if (code === 200) {
                        resolve(data)
                    }
                })
                .catch(() => {
                    resolve([{
                        key: "古城大街",
                        val: 0
                    }, {
                        key: "实验路",
                        val: 5
                    }, {
                        key: "经三路",
                        val: 3
                    }, {
                        key: "经二路",
                        val: 2
                    }, {
                        key: "纬三路",
                        val: 0
                    }, {
                        key: "监控中心",
                        val: 0
                    }])
                })
        })
    }

    beforeDestroy() {
        clearInterval(this.carouselInfo.intervalId);
        this.carouselInfo.intervalId = 0;
        this.refresh.total = false;
        this.refresh.list = false;
    }

}