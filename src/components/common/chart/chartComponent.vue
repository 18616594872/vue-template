<template>
    <PieChartNormal v-bind="bindData" v-if="bindData.type === 400"></PieChartNormal>
    <PieChartHollow v-bind="bindData" v-else-if="bindData.type === 410"></PieChartHollow>
</template>

<script lang="ts">
    import PieChartNormal from '@/components/common/chart/pieChart_normal.vue' 
    import PieChartHollow from '@/components/common/chart/pieChart_hollow.vue'

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
            PieChartNormal,
            PieChartHollow
        }
    })
    export default class About extends Vue {
        @Prop({
            required: true
        }) bindData!: ChartBindData
    }
</script>

<style lang="less">
    .chartComponent-wrap {
        height: 100%;
        width: 100%;
    }
</style>