<template>
    <div class="environmentalMonitor-wrap">
        <public-monitor-details :equipmentType="monitorTypeList" @condition-change="getDetailList" @switch="getPageStatus">
        </public-monitor-details>
        <environment-list :equipmentDataList="equipTypeList" :showElement="showCard"/>  
    </div>
</template>

<script lang="ts" src="./environmentalMonitor.ts"></script>

<style lang="less">
    @import './environmentalMonitor.less';
</style>