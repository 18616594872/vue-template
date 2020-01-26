<template>
    <div class="gaugeChart_normal-wrap" :id="id" ref="element"></div>
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

        get chartFont() {
            return new chartFontSize(this.$refs.element)
        }

        @Watch('data', {
            deep: true
        })
        onDataChanged(val: ChartData, oldVal: ChartData) {
            this.drawChart()
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
            let unit = (this.data.series as Series).unit ? (this.data.series as Series).unit : ''
            let initOption: EChartOption = {
                title: {
                    show: false
                },
                tooltip: {
                    formatter: "{a} <br/>{b} : {c}" + unit
                },
                series: [{
                    type: 'gauge',
                    radius: "90%",
                    axisLine: {
                        // 坐标轴线
                        lineStyle: {
                            // 属性lineStyle控制线条样式
                            width: this.chartFont.getFontSize('1%'),
                            shadowBlur: 0
                        }
                    },
                    axisTick: {
                        length: this.chartFont.getFontSize('4%'),
                        // 坐标轴小标记
                        lineStyle: {
                            // 属性lineStyle控制线条样式
                            color: "auto",
                        }
                    },
                    axisLabel: {
                        fontSize: this.chartFont.getFontSize('6%'),
                        formatter: (value: any, index: any) => {
                            let val = parseFloat(value.toFixed(1));
                            return val;
                        }
                    },
                    splitLine: {
                        // 分隔线
                        length: this.chartFont.getFontSize('6%'),
                        lineStyle: {
                            // 属性lineStyle控制线条样式
                            color: "auto"
                        }
                    },
                    // 标题
                    title: {
                        fontSize: this.chartFont.getFontSize('8%'),
                        color: theme.titleColor,
                        offsetCenter: [0, '-30%']
                    },
                    // 数值显示
                    detail: {
                        width: '80%',
                        offsetCenter: [0, '75%'],
                        fontSize: this.chartFont.getFontSize('12%')
                    },
                    //指针
                    pointer: {
                        width: this.chartFont.getFontSize('2%')
                    },
                    itemStyle: {
                        shadowBlur: this.chartFont.getFontSize('2%')
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
            if (!series || series.data.length == 0) return

            // 获得最终option
            let _option: any = {
                title: {
                    show: this.data.title.length > 0,
                    text: this.data.title
                },
                series: [{
                    type: 'gauge',
                    name: '数值',
                    detail: {
                        formatter: '{value}' + series.unit
                    },
                    data: [{
                        name: series.name,
                        value: series.data[0].value
                    }]
                }]
            }

            this.myChart.setOption(_option)
            if (this.option) this.myChart.setOption(this.option)
            this.myChart.hideLoading()
        }

        resizeChart() {
            window.addEventListener("resize", () => {
                this.myChart.resize();
                this.drawChart();
            })
        }

    }
</script>

<style lang="less">
    .gaugeChart_normal-wrap {
        height: 100%;
        width: 100%;
    }
</style>