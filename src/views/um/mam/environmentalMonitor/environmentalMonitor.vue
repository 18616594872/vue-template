<template>
    <div class="environmentalMonitor-wrap">
        <public-monitor-details :equipmentType="monitorTypeList"></public-monitor-details>
        <environment-detail v-if="false" />
        <environment-list v-if="true"/>
    </div>
</template>

<script lang="ts" src="./environmentalMonitor.ts"></script>

<style lang="less">
    @import './environmentalMonitor.less';
</style>

