<template>
    <div class="equipTypeComponent-wrap">
        <simulate-data v-if="equipTypeDate.datatypeId == 1" :equipDetailData="equipTypeDate" v-on="$listeners">
        </simulate-data>
        <status-date v-else-if="equipTypeDate.datatypeId == 2" :equipStatusData="equipTypeDate" v-on="$listeners">
        </status-date>
        <control-simulate-data v-else :controlEquipData="equipTypeDate" v-on="$listeners"></control-simulate-data>
    </div>
</template>

<script lang="ts">
    import {
        Component,
        Vue,
        Prop,
        Emit,
        Watch
    } from "vue-property-decorator"
    import simulateData from './simulateData.vue'
    import statusDate from './statusDate.vue'
    import controlSimulateData from './controlSimulateData.vue'

    @Component({
        components: {
            simulateData,
            statusDate,
            controlSimulateData
        }
    })
    export default class About extends Vue {

        // prop
        @Prop({
            required: true,
            default: Object
        }) equipTypeDate!: any

    }
</script>

<style lang="less">
    .equipTypeComponent-wrap {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>