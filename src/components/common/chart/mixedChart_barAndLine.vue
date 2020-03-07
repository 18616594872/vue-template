<template>
    <div class="mixedChart_barAndLine-wrap" :id="id" ref="element"></div>
</template>

<script lang="ts">
    import {
        Component,
        Vue,
        Prop,
        Watch
    } from "vue-property-decorator"
    import {
        ChartData,
        Series
    } from "@/types/chart.Interface"
    import {
        EChartOption,
        ECharts
    } from 'echarts'
    import {
        ChartFontSize
    } from '@/utils/common'

    @Component({})
    export default class About extends Vue {

        @Prop({
            required: true,
            default: '1'
        }) id!: string

        @Prop({
            required: true
        }) data!: ChartData

        @Prop({
            required: false,
            default: null
        }) option!: EChartOption

        myChart!: ECharts

        @Watch('data', {
            deep: true
        })
        onDataChanged(val: ChartData, oldVal: ChartData) {
            this.drawChart()
        }

        get chartFont() {
            return new ChartFontSize(this.$refs.element)
        }

        mounted() {
            this.initData()
            this.drawChart()
            this.resizeChart()
        }

        initData() {
            this.myChart = (this as any).$echarts.init(document.getElementById(this.id))
            // 初始化的样式
            let theme = (this as any).EChartsTheme
            let constFontSize: string = '6%'
            let legendFontSize: string = '5%'
            let _series: Series[] = this.data.series as Series[]
            let initOption: EChartOption = {
                title: {
                    textStyle: {
                        color: theme.titleColor,
                        fontSize: this.chartFont.getFontSize('10%')
                    },
                    left: 'center'
                },
                legend: {
                    left: 'center',
                    top: '12%',
                    textStyle: {
                        color: theme.titleColor,
                        fontSize: this.chartFont.getFontSize(legendFontSize)
                    },
                    itemGap: 2,
                    itemWidth: this.chartFont.getFontSize(legendFontSize) * 2,
                    itemHeight: this.chartFont.getFontSize(legendFontSize),
                },
                grid: {
                    top: '25%',
                    left: '10%',
                    right: '10%',
                    bottom: '15%',
                    borderColor: theme.borderColor
                },
                xAxis: {
                    type: "category",
                    nameTextStyle: {
                        color: theme.borderColor
                    },
                    axisLine: {
                        lineStyle: {
                            color: theme.borderColor
                        }
                    },
                    axisLabel: {
                        color: theme.borderColor,
                        fontSize: this.chartFont.getFontSize(constFontSize)
                    },
                    data: []
                },
                yAxis: [{
                    type: "value",
                    nameTextStyle: {
                        color: theme.borderColor,
                        fontSize: this.chartFont.getFontSize(constFontSize)
                    },
                    axisLine: {
                        lineStyle: {
                            color: theme.borderColor
                        }
                    },
                    axisLabel: {
                        color: theme.borderColor,
                        fontSize: this.chartFont.getFontSize(constFontSize),
                        formatter: function (value: number, index: number): any {
                            let res: string = ''

                            if (value >= 10000) {
                                res = (value / 10000).toString() + '万'
                            } else if (value >= 1000) {
                                res = (value / 1000).toString() + '千'
                            } else {
                                res = value.toString()
                            }

                            return res
                        }
                    },
                }, {
                    type: "value",
                    nameTextStyle: {
                        color: theme.borderColor,
                        fontSize: this.chartFont.getFontSize(constFontSize)
                    },
                    axisLine: {
                        lineStyle: {
                            color: theme.borderColor
                        }
                    },
                    axisLabel: {
                        color: theme.borderColor,
                        fontSize: this.chartFont.getFontSize(constFontSize),
                        formatter: function (value: number, index: number): any {
                            let res: string = ''

                            if (value >= 10000) {
                                res = (value / 10000).toString() + '万'
                            } else if (value >= 1000) {
                                res = (value / 1000).toString() + '千'
                            } else {
                                res = value.toString()
                            }

                            return res
                        }
                    },
                }],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                series: [{
                    type: 'bar',
                    barMaxWidth: this.chartFont.getSizeByWidth('6%'),
                    data: []
                }, {
                    type: 'line',
                    data: []
                }],
                textStyle: {
                    color: theme.textColor
                },
                color: theme.color
            }
            this.myChart.setOption(initOption)

            // 将外部传来的样式导入
            if (this.option != null) {
                this.myChart.setOption(this.option)
            }

        }

        drawChart() {
            this.myChart.showLoading()
            // 整合数据
            let series: Series[] = this.data.series as Series[]
            if (!series || series.length == 0) return

            // 整理x轴
            let _xAxisData: string[] = []
            series[0].data.forEach(datum => {
                _xAxisData.push(datum.key)
            })

            // 整理series数据
            let _series1!: EChartOption.SeriesBar
            let _series2!: EChartOption.SeriesLine
            let _legends: string[] = []
            let max1: number = -999999999
            let max2: number = -999999999

            for (let index = 0; index < series.length; index++) {
                const element = series[index];
                let _yAxisData: number[] = []
                element.data.forEach(datum => {
                    _yAxisData.push(datum.value)
                    if (index === 0) {
                        if (max1 < datum.value) max1 = datum.value
                    } else {
                        if (max2 < datum.value) max2 = datum.value
                    }
                })
                if (index === 0) {
                    _series1 = {
                        type: 'bar',
                        name: element.name,
                        itemStyle: {
                            barBorderRadius: [8, 8, 0, 0]
                        },
                        data: _yAxisData
                    }
                } else {
                    _series2 = {
                        type: 'line',
                        name: element.name,
                        yAxisIndex: 1,
                        data: _yAxisData
                    }
                }
                _legends.push(element.name)
            }

            // 计算两个yAxis的interval和min=0，max
            // 假设最大值9位数以下
            for (let index = 0; index < 10; index++) {
                let tmp1 = Math.pow(10, index)
                let tmp2 = Math.pow(10, index + 1)

                // 已经找到了
                if (max1 < tmp1 && max2 < tmp1) break

                if (max1 >= tmp1 && max1 < tmp2) {
                    max1 = Math.ceil(max1 / tmp1) * tmp1
                }
                if (max2 >= tmp1 && max2 < tmp2) {
                    max2 = Math.ceil(max2 / tmp1) * tmp1
                }

            }

            // 获得最终option
            let _option: EChartOption = {
                title: {
                    show: this.data.title.length > 0,
                    text: this.data.title
                },
                legend: {
                    data: _legends
                },
                xAxis: {
                    type: "category",
                    data: _xAxisData
                },
                yAxis: [{
                    type: "value",
                    min: 0,
                    max: max1,
                    interval: max1 / 5,
                    name: series[0].name + '(' + series[0].unit + ')',
                }, {
                    type: "value",
                    min: 0,
                    max: max2,
                    interval: max2 / 5,
                    name: series[1].name + '(' + series[1].unit + ')',
                }],
                series: [_series1, _series2]
            }

            this.myChart.setOption(_option)
            if (this.option) this.myChart.setOption(this.option)
            this.myChart.hideLoading()
        }

        resizeChart() {
            let _this = this;
            window.addEventListener("resize", () => {
                _this.myChart.resize();
                _this.drawChart();
            });
        }

    }
</script>

<style lang="less">
    .mixedChart_barAndLine-wrap {
        height: 100%;
        width: 100%;
    }
</style>