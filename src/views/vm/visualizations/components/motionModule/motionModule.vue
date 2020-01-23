<template>
    <div class="MotionModule-wrap">
        <div class="Title">
            <module-title v-bind="title"></module-title>
        </div>
        <div class="Chart">
            <line-chart :bindData="bindData" ref="lineChart" style="height: 26vh;"></line-chart>
        </div>
    </div>
</template>

<script lang="ts" src="./motionModule.ts"></script>

<style lang="less">
    @import './motionModule.less';
</style>

