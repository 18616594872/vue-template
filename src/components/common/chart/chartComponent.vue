<template>
    <PieChartNormal v-bind="bindData" v-if="bindData.type === 400"></PieChartNormal>
</template>

<script lang="ts">
    import PieChartNormal from '@/components/common/chart/pieChart_normal.vue'

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
            PieChartNormal
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