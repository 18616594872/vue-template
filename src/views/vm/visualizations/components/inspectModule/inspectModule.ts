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
import MultipleBarChart from '@/components/common/chart/chartComponent.vue'
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
            })()
        };
    }

    listInspectData() {
        return listInspectData().then((res: any) => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {

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
                    element.val.forEach((item1: any) => {
                        _series.forEach((item2: any) => {
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
            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }

    getInspectNum() {
        return getInspectNum().then((res: any) => {
            let {
                code,
                data: [{
                    taskCount
                }, {
                    defectCount
                }, {
                    maintenanceCount
                }, {
                    maintenanceRateCount
                }]
            } = res.data
            if (code === 200) {
                this.taskCount.nowYearTaskCount = taskCount.nowYearTaskCount
                this.taskCount.isRise = taskCount.isRise
                this.defectCount.nowYearDefectCount = defectCount.nowYearTaskCount
                this.defectCount.isRise = defectCount.isRise
                this.maintenanceCount.nowYearOrderCount = maintenanceCount.nowYearTaskCount
                this.maintenanceCount.isRise = maintenanceCount.isRise
                this.maintenanceRateCount.nowYearOrderPercentage = maintenanceRateCount.nowYearTaskCount
                this.maintenanceRateCount.isRise = maintenanceRateCount.isRise

            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }

}