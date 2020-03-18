<template>
    <div class="securityMonitor-wrap">
        <public-monitor-details :equipmentType="monitorTypeList" @condition-change="getDetailList" @switch="getPageStatus">
        </public-monitor-details>
        <security-list :equipmentDataList="equipTypeList" :showElement="showCard" />
    </div>
</template>

<script lang="ts" src="./securityMonitor.ts"></script>

<style lang="less">
    @import './securityMonitor.less';
</style>