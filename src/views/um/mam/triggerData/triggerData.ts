import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    ElementBoxTitle
} from '@/types/common.interface'
import Title from '@/components/um/umtitle.vue'
import SelectTemp from '@/components/um/selectTemp.vue'
import {
    SelectData
} from '@/types/components/selectTemp.interface'
import {
    listTunnelInfo
} from '@/api/tunnelManage'
import {
    listAverageGesInfo
} from '@/api/integratedMonitoring'
import {
    listTunnel
} from '@/api/commonModule.ts'
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
        SelectTemp,
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

    tunnelSelect: SelectData = {
        selectOption: [],
        type: 'border',
        defaultValue: 0
    }
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
        this.listTunnelInfo()
        this.listSeriesData()
    }

    listTunnelInfo() {
        return listTunnel().then((res: any) => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.tunnels = data
                this.tunnelSelect.selectOption = this.tunnels
            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
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
        return listTunnelInfo().then((res: any) => {
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