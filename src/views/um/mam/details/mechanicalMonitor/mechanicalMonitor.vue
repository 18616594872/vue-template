<template>
    <div class="mechanicalMonitor-wrap">
        <public-monitor-details :equipmentType="monitorTypeList" @condition-change="getDetailList" @switch="getPageStatus">
        </public-monitor-details>
        <mechanical-list :equipmentDataList="equipTypeList" :showElement="showCard" />
    </div>
</template>

<script lang="ts" src="./mechanicalMonitor.ts"></script>

<style lang="less">
    @import './mechanicalMonitor.less';
</style>