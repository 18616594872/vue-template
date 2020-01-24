<template>
    <div class="pieChart_normal-wrap" :id="id" ref="element"></div>
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
        chartFontSize
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
            return new chartFontSize(this.$refs.element)
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
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    textStyle: {
                        color: theme.textColor,
                        fontSize: this.chartFont.getFontSize(legendFontSize)
                    },
                    icon: 'circle',
                    itemGap: 2,
                    itemWidth: this.chartFont.getFontSize(legendFontSize) * 2,
                    itemHeight: this.chartFont.getFontSize(legendFontSize),
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                series: [{
                    type: 'pie',
                    radius: ['0%', '55%'],
                    avoidLabelOverlap: false,
                    label: {
                        formatter: '{b}',
                        fontSize: this.chartFont.getFontSize(constFontSize),
                        textColor: theme.textColor
                    },
                    labelLine: {
                        length: this.chartFont.getFontSize("10%"),
                        length2: this.chartFont.getFontSize("4%")
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
            if (!series) return

            // 整理数据
            let _series: EChartOption.SeriesPie[] = []
            let data: EChartOption.SeriesPie.DataObject[] = []
            let _legends: string[] = []
            series.data.forEach(element => {
                data.push({
                    name: element.key,
                    value: element.value
                })
                _legends.push(element.key)
            })
            _series.push({
                name: series.name,
                type: 'pie',
                data: data
            })


            // 获得最终option
            let _option: EChartOption = {
                title: {
                    show: this.data.title.length > 0,
                    text: this.data.title
                },
                legend: {
                    data: _legends
                },
                series: _series
            }

            this.myChart.setOption(_option)
            if (this.option) this.myChart.setOption(this.option)
            this.myChart.hideLoading()
        }

        resizeChart() {
            window.addEventListener("resize", () => {
                this.myChart.resize()
                this.drawChart()
            });
        }

    }
</script>

<style lang="less">
    .pieChart_normal-wrap {
        height: 100%;
        width: 100%;
    }
</style>