<template>
    <div class="triggerData-wrap">
        <Title :data="triggerDataTitle" />
        <div class="trigger-chart-wrap">
            <div class="left-wrap">
                <CrossBarChart :bindData="crossBarData"/>
            </div>
            <div class="right-wrap">
                <SimpleBarChart :bindData="simpleBarData"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./triggerData.ts"></script>

<style lang="less">
    @import './triggerData.less';
</style>

