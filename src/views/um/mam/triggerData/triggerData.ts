import { Component, Vue } from 'vue-property-decorator'
import { TitleBlock } from '@/types/components/umtitle.interface'
import Title from '@/components/um/umtitle/umtitle.vue'
import SelectTemp from '@/components/common/selectTemp/selectTemp.vue'
import { SelectData } from '@/types/components/selectTemp.interface'
import { listTunnelInfo } from '@/api/tunnelManage'
import CrossBarChart from '@/components/common/chart/chartComponent/chartComponent.vue'
import SimpleBarChart from '@/components/common/chart/chartComponent/chartComponent.vue'
import { Series, ChartBindData, ChartType } from '@/types/chart.Interface'

@Component({
    components: { Title, SelectTemp, CrossBarChart, SimpleBarChart }
})
export default class About extends Vue {

    triggerDataTitle: TitleBlock = {
        titleIcon: require('@/assets/images/um/tigger-icon.png'),
        title: '触发TOP5'
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
                data: [
                    { key: '8区', value: 20 },
                    { key: '4区', value: 22 },
                    { key: '3区', value: 47 },
                    { key: '2区', value: 52 },
                    { key: '1区', value: 56 }
                ]
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
                data: [
                    { key: '1区', value: 150 },
                    { key: '2区', value: 170 },
                    { key: '3区', value: 189 },
                    { key: '4区', value: 192 },
                    { key: '7区', value: 208 }
                ]
            }
        }
    }

    mounted() {
        this.listTunnelInfo()
    }

    listTunnelInfo() {
        let params = {
            tunnel: true
        }
        return new Promise((resolve, reject) => {
            listTunnelInfo(params).then(res => {
                let { code, data, msg } = res.data
                if (code === 200) {
                    this.tunnels = data
                    this.tunnelSelect.selectOption = this.tunnels
                    resolve()
                } else {
                    this.$Message.error('查询管廊信息失败！')
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    choosedLi(index: number) {
        this.currentIndex = index
    }

}
