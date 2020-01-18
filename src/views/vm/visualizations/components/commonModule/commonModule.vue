<template>
    <div class="CommonModule-wrap">
        <div class="commonTitle">
            <module-title v-bind="title"></module-title>
        </div>
        <div class="baseInformationContent">
            <div class="baseInformationTime">
                <span>当前时间:</span>
                {{nowTime}}
            </div>

            <div class="pieChartClass">
                <hollow-pie-chart :bindData="pieChart"></hollow-pie-chart>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./commonModule.ts"></script>

<style lang="less">
    @import './commonModule.less';
</style>