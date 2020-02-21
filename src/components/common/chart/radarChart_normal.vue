<template>
    <div class="radarChart_normal-wrap" :id="id" ref="element"></div>
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
        Series,
        RadarData,
        RadarIndicator
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
            let constFontSize: string = '9%'
            let legendFontSize: string = '7%'
            let initOption: EChartOption = {
                title: {
                    textStyle: {
                        color: theme.titleColor,
                        fontSize: this.chartFont.getFontSize('9%')
                    },
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis'
                },
                radar: [{
                    center: ['50%', '55%'],
                    radius: this.chartFont.getSizeByHeight('30%')
                }],
                series: [{
                    type: 'radar',
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                type: 'default'
                            }
                        },
                        color: theme.titleColor
                    }
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

            // 整理数据
            let data: RadarData[] = []
            let seriesData: number[] = []
            let _radar: RadarIndicator[] = []
            let maxValue!: number
            series.data.forEach(element => {
                seriesData.push(element.value)
                maxValue = seriesData.sort().reverse()[0]
                _radar.push({
                    text: element.key,
                    max: maxValue + 10
                })
            })
            data.push({
                name: (series.name as string),
                value: seriesData,
            })
            // 获得最终option
            let _option: any = {
                title: {
                    show: this.data.title.length > 0,
                    text: this.data.title
                },
                radar: [{
                    indicator: _radar
                }],
                series: [{
                    name: series.name,
                    data: data,
                    tooltip: {
                        trigger: 'item'
                    }
                }],

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
    .radarChart_normal-wrap {
        width: 100%;
        height: 100%;
    }
</style>