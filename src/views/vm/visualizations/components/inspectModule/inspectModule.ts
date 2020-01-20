import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    TaskCount,
    DefectCount,
    MaintenanceCount,
    MaintenanceRateCount,
    Title
} from '@/types/views/inspectModule.interface'
import ModuleTitle from '../moduleTitle/moduleTitle.vue'
import MultipleBarChart from '@/components/common/chart/chartComponent/chartComponent.vue'
import {
    getInspectNum,
    listInspectData
} from '@/api/inspectModule'
import {
    Series,
    ChartBindData,
    ChartType
} from '@/types/chart.Interface'

@Component({
    components: {
        ModuleTitle,
        MultipleBarChart
    }
})
export default class About extends Vue {

    title: Title = {
        name: '巡检模块',
        showFlag: true,
        turnTo: '运维管理'
    }

    bindData: ChartBindData = {
        id: 'inspectModule_barChartId',
        type: ChartType.BARCHART_MULTIPLE,
        data: {
            title: '巡检缺陷维修统计'
        }
    }

    taskCount: TaskCount = {
        nowYearTaskCount: 0,
        isRise: false
    }

    defectCount: DefectCount = {
        nowYearDefectCount: 0,
        isRise: false
    }

    maintenanceCount: MaintenanceCount = {
        nowYearOrderCount: 0,
        isRise: false
    }

    maintenanceRateCount: MaintenanceRateCount = {
        nowYearOrderPercentage: 0,
        isRise: false
    }

    circleWidth: number = (window.innerHeight / 100) * 6.2

    mounted() {
        this.listInspectData()
        this.getInspectNum()
        window.onresize = () => {
            return (() => {
                this.circleWidth = (window.innerHeight / 100) * 6.2;
            })();
        };
    }

    listInspectData() {
        return new Promise((resolve, reject) => {
            listInspectData().then(res => {
                let {
                    code,
                    data
                } = res.data
                if (code === 200) {

                    if (data.length == 0) return

                    let _series: Series[] = []
                    data[0].val.forEach((item: {
                        val: number,
                        key: string
                    }) => {
                        _series.push({
                            name: item.key,
                            unit: '次',
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
                        element.val.forEach(item1 => {
                            _series.forEach(item2 => {
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
                        title: '巡检缺陷维修统计',
                        series: _series
                    }

                    resolve()
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    getInspectNum() {
        return new Promise((resolve, reject) => {
            getInspectNum().then(res => {
                let {
                    code,
                    data
                } = res.data
                if (code === 200) {
                    this.taskCount.nowYearTaskCount = data[0].taskCount.nowYearTaskCount
                    this.taskCount.isRise = data[0].taskCount.isRise
                    this.defectCount.nowYearDefectCount = data[1].defectCount.nowYearTaskCount
                    this.defectCount.isRise = data[1].defectCount.isRise
                    this.maintenanceCount.nowYearOrderCount = data[2].maintenanceCount.nowYearTaskCount
                    this.maintenanceCount.isRise = data[2].maintenanceCount.isRise
                    this.maintenanceRateCount.nowYearOrderPercentage = data[3].maintenanceRateCount.nowYearTaskCount
                    this.maintenanceRateCount.isRise = data[3].maintenanceRateCount.isRise
                    resolve()
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

}