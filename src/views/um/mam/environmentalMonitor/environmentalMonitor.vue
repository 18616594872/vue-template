<template>
    <div class="environmentalMonitor-wrap">
        <public-monitor-details :equipmentType="monitorTypeList"></public-monitor-details>
        <environment-detail/>
    </div>
</template>

<script lang="ts" src="./environmentalMonitor.ts"></script>

<style lang="less">
    @import './environmentalMonitor.less';
</style>

