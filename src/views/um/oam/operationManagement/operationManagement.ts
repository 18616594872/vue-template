import {
    Component,
    Vue
} from 'vue-property-decorator'
import Chart from '@/components/common/chart/chartComponent.vue'
import {
    ChartBindData,
    ChartType
} from '@/types/chart.Interface'

@Component({
    components: {
        Chart
    }
})
export default class OperationManagement extends Vue {

    monitorData: any[] = [{
            data: [{
                value: '18',
                name: '可用管线数'
            }]
        },
        {
            data: [{
                value: '30',
                name: '设计管线数'
            }]
        },
        {
            data: [{
                value: '12',
                name: '已用管线数'
            }]
        },
        {
            data: [{
                value: '27',
                name: '企业客户'
            }]
        },
        {
            data: [{
                value: '6',
                name: '本月总能耗'
            }]
        },
        {
            data: [{
                value: '14',
                name: '合同'
            }]
        },
        {
            data: [{
                value: '22',
                name: '年度总能耗'
            }]
        },
        {
            data: [{
                value: '89',
                name: '历史总能耗'
            }]
        }
    ]
    dataOverviewTitle: any = {
        titleIcon: require('@/assets/images/um/data-overview-icon.png'),
        title: '数据总览'
    }
    contractTitle: any = {
        title: '管廊合同统计'
    }
    energyTitle: any = {
        title: '管廊能耗统计'
    }
    spaceTitle: any = {
        title: '管廊空间管理'
    }
    customerTitle: any = {
        title: '管廊客户管理'
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
                data: [{
                        key: '北京',
                        value: 3
                    },
                    {
                        key: '太原',
                        value: 2
                    },
                    {
                        key: '上海',
                        value: 1
                    }
                ]
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


}