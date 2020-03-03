import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    TitleBlock
} from '@/types/components/umtitle.interface'
import {
    listTunnelInfo,
    listEuqipData
} from '@/api/integratedMonitoring'
import SelectTemp from '@/components/um/selectTemp.vue'
import {
    SelectData
} from '@/types/components/selectTemp.interface'
import MixedLineAndBar from '@/components/common/chart/chartComponent.vue'
import Title from '@/components/um/umtitle.vue'
import DataOverview from '@/views/um/mam/dataOverview/dataOverview.vue'
import VideoDisplay from '@/views/um/mam/videoDisplay/videoDisplay.vue'
import DataDetails from '@/views/um/mam/dataDetails/dataDetails.vue'
import TirggerData from '@/views/um/mam/triggerData/triggerData.vue'
import HollowPieChart from '@/components/common/chart/chartComponent.vue'
import {
    Series,
    ChartBindData,
    ChartType
} from '@/types/chart.Interface'


@Component({
    components: {
        SelectTemp,
        MixedLineAndBar,
        Title,
        DataOverview,
        VideoDisplay,
        DataDetails,
        TirggerData,
        HollowPieChart
    }
})
export default class About extends Vue {

    doughnutTitle: TitleBlock = {
        titleIcon: require('@/assets/images/um/doughnut-icon.png'),
        title: '监测对象个数统计'
    }

    tempHumidityTitle: TitleBlock = {
        titleIcon: require('@/assets/images/um/temp-humidity-icon.png'),
        title: '温湿度数据'
    }

    doughnutData: ChartBindData = {
        id: 'doughnutId',
        type: ChartType.PIECHART_HOLLOW,
        data: {
            title: '对象个数'
        }
    }

    AnalogData: {
        name: string,
        value: number
    } [] = [{
            value: 26,
            name: '温度'
        },
        {
            value: 20,
            name: '湿度'
        },
        {
            value: 8,
            name: '氧气'
        },
        {
            value: 10,
            name: '甲烷'
        },
        {
            value: 12,
            name: '硫化氢'
        },
        {
            value: 45,
            name: '视频'
        }
    ]

    tunnels: any[] = []

    tunnelSelect: SelectData = {
        selectOption: [],
        type: 'solid',
        defaultValue: 0
    }

    choosedITunnelId: any = ''

    mixedLineAndBarData: ChartBindData = {
        id: 'mixedLineAndBarId',
        type: ChartType.MIXEDCHART_BARANDLINE,
        data: {
            title: ''
        }
    }

    AnalogData2: any[] = [{
            key: '1区',
            val: '20'
        },
        {
            key: '2区',
            val: '22'
        },
        {
            key: '3区',
            val: '19'
        },
        {
            key: '4区',
            val: '24'
        },
        {
            key: '5区',
            val: '26'
        },
        {
            key: '6区',
            val: '30'
        },
        {
            key: '7区',
            val: '32'
        },
        {
            key: '8区',
            val: '30'
        },
        {
            key: '9区',
            val: '25'
        },
        {
            key: '10区',
            val: '23'
        }
    ]

    AnalogData3: any[] = [{
            key: '1区',
            val: '20'
        },
        {
            key: '2区',
            val: '32'
        },
        {
            key: '3区',
            val: '52'
        },
        {
            key: '4区',
            val: '40'
        },
        {
            key: '5区',
            val: '52'
        },
        {
            key: '6区',
            val: '10'
        },
        {
            key: '7区',
            val: '10'
        },
        {
            key: '8区',
            val: '50'
        },
        {
            key: '9区',
            val: '41'
        },
        {
            key: '10区',
            val: '12'
        }
    ]

    mounted() {
        this.initDoughnut()
        this.listTunnelInfo()
        this.initMixedLineAndBar()
    }

    // 初始化监测对象个数统计
    initDoughnut() {

        let _series: Series = {
            name: '对象类型：',
            unit: '个',
            data: []
        }

        this.AnalogData.forEach(element => {
            _series.data.push({
                key: element.name,
                value: element.value
            })
        })

        // 设置样式
        this.doughnutData.option = {
            series: [{
                type: 'pie',
                itemStyle: {
                    color: function (item: any) {
                        let dataColor = [{
                                leftColor: '#f0b975',
                                rightColor: '#fe5c54',
                            },
                            {
                                leftColor: '#ffccee',
                                rightColor: '#ff35bd',
                            },
                            {
                                leftColor: '#cec4ff',
                                rightColor: '#7054f7',
                            },
                            {
                                leftColor: '#ffb8ba',
                                rightColor: '#ff3237',
                            },
                            {
                                leftColor: '#cffdff',
                                rightColor: '#00f2fe',
                            },
                            {
                                leftColor: '#ecf991',
                                rightColor: '#e7ff44',
                            }
                        ]
                        let res = {
                            type: 'linear',
                            y: 0,
                            y2: 1,
                            x2: 0,
                            x: 0,
                            colorStops: [{
                                offset: 0,
                                color: dataColor[item.dataIndex % dataColor.length].leftColor // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: dataColor[item.dataIndex % dataColor.length].rightColor // 100% 处的颜色
                            }],
                            global: false
                        }

                        return res
                    }
                }
            }]
        }
        // 设置数据
        this.doughnutData.data = {
            title: '对象个数',
            series: _series
        }
    }

    listTunnelInfo() {
        let params = {
            tunnel: true
        }
        return listTunnelInfo(params).then(res => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.tunnels = data
                this.tunnelSelect.selectOption = this.tunnels
            } else {
                this.$Message.error('查询管廊信息失败！')
            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }

    propMsg(choosedItem: any) {
        this.choosedITunnelId = choosedItem.id
    }

    initMixedLineAndBar() {

        let _series: Series[] = [{
                name: '平均温度',
                unit: '℃',
                data: []
            },
            {
                name: '平均湿度',
                unit: '%RH',
                data: []
            }
        ]

        this.AnalogData2.forEach(element => {
            _series[0].data.push({
                key: element.key,
                value: element.val
            })
        })
        this.AnalogData3.forEach(element => {
            _series[1].data.push({
                key: element.key,
                value: element.val
            })
        })

        this.mixedLineAndBarData.data = {
            title: '',
            series: _series
        }
    }

}