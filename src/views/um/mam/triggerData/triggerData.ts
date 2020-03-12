import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    ElementBoxTitle
} from '@/types/common.interface'
import Title from '@/components/um/umtitle.vue'
import {
    SelectData
} from '@/types/components/selectTemp.interface'
import {
    listTunnelInfo
} from '@/api/tunnelManage'
import {
    listAverageGesInfo
} from '@/api/integratedMonitoring'
import CrossBarChart from '@/components/common/chart/chartComponent.vue'
import SimpleBarChart from '@/components/common/chart/chartComponent.vue'
import {
    Series,
    ChartBindData,
    ChartType
} from '@/types/chart.Interface'

@Component({
    components: {
        Title,
        CrossBarChart,
        SimpleBarChart
    }
})
export default class About extends Vue {

    triggerDataTitle: ElementBoxTitle = {
        titleIcon: require('@/assets/images/um/tigger-icon.png'),
        text: '触发TOP5'
    }

    tunnels: any[] = []
    currentIndex: number = 0
    crossBarData: ChartBindData = {
        id: 'crossBarId',
        type: ChartType.BARCHART_NORMAL_HORIZONTAL,
        data: {
            title: '红外触发次数',
            series: {
                name: '红外触发',
                unit: '次',
                data: []
            }
        }
    }
    simpleBarData: ChartBindData = {
        id: 'simpleBarId',
        type: ChartType.BARCHART_NORMAL,
        data: {
            title: '门禁触发次数',
            series: {
                name: '门禁触发',
                unit: '次',
                data: []
            }
        }
    }

    mounted() {
        this.listSeriesData()
    }
    listSeriesData() {
        let {
            crossBarData: {
                data: {
                    series
                }
            },
            simpleBarData
        } = this
        return listAverageGesInfo().then((res: any) => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                (series as any).data = data(simpleBarData.data.series as any).data = data
            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }
    choosedLi(index: number) {
        this.currentIndex = index
    }

}