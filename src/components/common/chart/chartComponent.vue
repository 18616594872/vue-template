<template>
    <PieChartNormal v-bind="bindData" v-if="bindData.type === 400"></PieChartNormal>
    <PieChartHollow v-bind="bindData" v-else-if="bindData.type === 410"></PieChartHollow>
    <BarChartStack v-bind="bindData" v-else-if="bindData.type === 120"></BarChartStack>
    <BarChartMultiple v-bind="bindData" v-else-if="bindData.type === 110"></BarChartMultiple>
    <LineChartMultiple v-bind="bindData" v-else-if="bindData.type === 210"></LineChartMultiple>
    <GaugeChartNormal v-bind="bindData" v-else-if="bindData.type === 500"></GaugeChartNormal>
    <BarChartNormal v-bind="bindData" v-else-if="bindData.type === 100"></BarChartNormal>
    <RadarChartNormal v-bind="bindData" v-else-if="bindData.type === 600"></RadarChartNormal>
    <MixedChartBarAndLine v-bind="bindData" v-else-if="bindData.type === 300"></MixedChartBarAndLine>
</template>

<script lang="ts">
    import PieChartNormal from '@/components/common/chart/pieChart_normal.vue'
    import PieChartHollow from '@/components/common/chart/pieChart_hollow.vue'
    import BarChartStack from '@/components/common/chart/barChart_stack.vue'
    import BarChartMultiple from '@/components/common/chart/barChart_multiple.vue'
    import LineChartMultiple from '@/components/common/chart/lineChart_multiple.vue'
    import GaugeChartNormal from '@/components/common/chart/pieChart_normal.vue'
    import BarChartNormal from '@/components/common/chart/barChart_normal.vue'
    import RadarChartNormal from '@/components/common/chart/radarChart_normal.vue'
    import MixedChartBarAndLine from '@/components/common/chart/mixedChart_barAndLine.vue'
    import {
        ChartBindData,
        ChartType
    } from '@/types/chart.Interface'

    import {
        Component,
        Vue,
        Prop
    } from "vue-property-decorator"

    @Component({
        components: {
            BarChartNormal,
            PieChartNormal,
            PieChartHollow,
            BarChartStack,
            BarChartMultiple,
            LineChartMultiple,
            GaugeChartNormal,
            RadarChartNormal,
            MixedChartBarAndLine
        }
    })
    export default class About extends Vue {
        @Prop({
            required: true
        }) bindData!: ChartBindData
        mounted() {
        }

    }
</script>

<style lang="less">
    .chartComponent-wrap {
        height: 100%;
        width: 100%;
    }
</style>