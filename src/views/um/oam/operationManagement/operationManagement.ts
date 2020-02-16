import {
    Component,
    Vue
} from 'vue-property-decorator'
import Chart from '@/components/common/chart/chartComponent.vue'
import Title from '@/components/um/umtitle.vue'
import DataBox from '@/components/um/dataBox.vue'
import {
    ChartBindData,
    ChartType
} from '@/types/chart.Interface'
import {
    MonitorData,
    TitleInterface
} from '@/types/views/operationManagement.interface'
import {
    moniterDataList,
    customerDataList
} from '@/api/operationManagement'

@Component({
    components: {
        Chart,
        DataBox,
        Title
    }
})
export default class OperationManagement extends Vue {

    monitorDataList: MonitorData[] = []
    dataOverviewTitle: TitleInterface = {
        titleIcon: require('@/assets/images/um/data-overview-icon.png'),
        text: '数据总览'
    }
    contractTitle: TitleInterface = {
        text: '管廊合同统计'
    }
    energyTitle: TitleInterface = {
        text: '管廊能耗统计'
    }
    spaceTitle: TitleInterface = {
        text: '管廊空间管理'
    }
    customerTitle: TitleInterface = {
        text: '管廊客户管理'
    }
    contractData: ChartBindData = {
        id: 'operationManageContract',
        type: ChartType.BARCHART_NORMAL,
        data: {
            title: '',
            series: {
                name: '合同',
                unit: '个',
                data: [{
                        key: '古城大街',
                        value: 20
                    },
                    {
                        key: '实验路',
                        value: 8
                    },
                    {
                        key: '经二路',
                        value: 10
                    },
                    {
                        key: '经三路',
                        value: 5
                    },
                    {
                        key: '纬三路',
                        value: 0
                    }
                ]
            }
        }
    }
    energyData: ChartBindData = {
        id: 'operationManageEnergy',
        type: ChartType.LINECHART_MULTIPLE,
        data: {
            title: '',
            series: [{
                    name: '古城大街',
                    unit: '千瓦时',
                    data: [{
                            key: '1月',
                            value: 20
                        },
                        {
                            key: '2月',
                            value: 8
                        },
                        {
                            key: '3月',
                            value: 10
                        },
                        {
                            key: '4月',
                            value: 5
                        },
                        {
                            key: '5月',
                            value: 5
                        }
                    ]
                },
                {
                    name: '实验路',
                    unit: '千瓦时',
                    data: [{
                            key: '1月',
                            value: 10
                        },
                        {
                            key: '2月',
                            value: 14
                        },
                        {
                            key: '3月',
                            value: 10
                        },
                        {
                            key: '4月',
                            value: 5
                        },
                        {
                            key: '5月',
                            value: 9
                        }
                    ]
                },
                {
                    name: '经二路',
                    unit: '千瓦时',
                    data: [{
                            key: '1月',
                            value: 12
                        },
                        {
                            key: '2月',
                            value: 19
                        },
                        {
                            key: '3月',
                            value: 7
                        },
                        {
                            key: '4月',
                            value: 9
                        },
                        {
                            key: '5月',
                            value: 5
                        }
                    ]
                }
            ]
        }
    }
    spaceData: ChartBindData = {
        id: 'operationManageSpace',
        type: ChartType.BARCHART_STACK,
        data: {
            title: '',
            series: [{
                    name: '已用管线',
                    unit: '条',
                    data: [{
                            key: '古城大街',
                            value: 8
                        },
                        {
                            key: '实验路',
                            value: 5
                        },
                        {
                            key: '经二路',
                            value: 3
                        },
                        {
                            key: '经三路',
                            value: 5
                        },
                        {
                            key: '纬三路',
                            value: 5
                        }
                    ]
                },
                {
                    name: '可用管线',
                    unit: '条',
                    data: [{
                            key: '古城大街',
                            value: 2
                        },
                        {
                            key: '实验路',
                            value: 5
                        },
                        {
                            key: '经二路',
                            value: 6
                        },
                        {
                            key: '经三路',
                            value: 2
                        },
                        {
                            key: '纬三路',
                            value: 3
                        }
                    ]
                }
            ]
        },
        option: {
            legend: {
                textStyle: {
                    fontSize: 14
                }
            },
            yAxis: {
                nameTextStyle: {
                    fontSize: 14
                },
                axisLabel: {
                    fontSize: 14
                }
            },
            xAxis: {
                axisLabel: {
                    fontSize: 14
                }
            }
        }
    }
    customerData: ChartBindData = {
        id: 'operationManageCustomer',
        type: ChartType.PIECHART_NORMAL,
        data: {
            title: '',
            series: {
                name: '客户',
                unit: '个',
                data: []
            }
        },
        option: {
            legend: {
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip: {
                textStyle: {
                    fontSize: 16
                }
            },
            series: [{
                label: {
                    fontSize: 14
                }
            }]
        }
    }

    mounted() {
        this.getMonitorDataList()
        this.getCustomerDataList()
    }
    getMonitorDataList() {
        return moniterDataList().then((res: any) => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.monitorDataList = data
            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }
    getCustomerDataList() {
        let {
            data
        } = this.customerData
        return customerDataList().then((res: any) => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                console.log(this.customerData.data.series)
                // this.customerData.data.series.data = data
            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }

}