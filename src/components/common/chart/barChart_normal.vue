<template>
    <div class="barChart_normal-wrap" :id="id" ref="element"></div>
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
            let initOption: EChartOption = {
                title: {
                    textStyle: {
                        color: theme.titleColor,
                        fontSize: this.chartFont.getFontSize('10%')
                    },
                    left: 'center'
                },
                legend: {
                    left: 'right',
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
                    right: '4%',
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
                yAxis: {
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
                        formatter: (value: number, index: number) => {
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
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                series: [{
                    type: 'bar',
                    barMaxWidth: this.chartFont.getSizeByWidth('7%'),
                    itemStyle: {
                        barBorderRadius: [8, 8, 0, 0]
                    },
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
            let series: Series = this.data.series as Series
            if (!series) {
                return
            }

            // 整理x轴
            let _xAxisData: string[] = []
            series.data.forEach(datum => {
                _xAxisData.push(datum.key)
            })

            // 整理series数据
            let _series: EChartOption.SeriesBar[] = []
            let _legends: string[] = []
            let _unit: string = ''

            let _yAxisData: number[] = []
            series.data.forEach(datum => {
                _yAxisData.push(datum.value)
            })
            _series.push({
                type: 'bar',
                name: series.name,
                data: _yAxisData
            })
            _legends.push(series.name)
            if (series.unit) {
                _unit = '单位(' + series.unit + ')'
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
                yAxis: {
                    name: _unit
                },
                series: _series
            }

            this.myChart.setOption(_option)
            if (this.option) {
                this.myChart.setOption(this.option)
            }
            this.myChart.hideLoading()
        }

        resizeChart() {
            window.addEventListener("resize", () => {
                this.myChart.resize()
                this.drawChart()
            })
        }


    }
</script>

<style lang="less">
    .barChart_normal-wrap {
        height: 100%;
        width: 100%;
    }
</style>