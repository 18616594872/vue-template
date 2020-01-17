<template>
    <div class="CommonModule-wrap">
        <div class="commonTitle">
            <module-title v-bind="title"></module-title>
        </div>
        <div class="leftBox">
            <div class="tunnelMessage">
                <div class="startTimeText">
                    <span style="font-weight:bold">自{{runMessage.startTime}}起</span>
                </div>
                <div class="safeRunText">
                    <span style="font-weight: bold">管廊已安全运营</span>
                    <span class="safe">{{runMessage.safe}}</span>
                    <span style="font-weight: bold">天</span>
                </div>
            </div>

            <div class="pieChartClass">
                <hollow-pie-chart :bindData="pieChart"></hollow-pie-chart>
            </div>

            <div class="tongjiClass">
                <div class="statusText" :key="index" v-for="(item,index) in statusList">
                    <span style>{{item.name}}</span>
                    <span style="margin-left: 5px;" :class="index>0 ? (index>1?'style_3':'style_2'): 'style_1'  ">
                        {{item.value}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./commonModule.ts"></script>

<style lang="less">
    @import './commonModule.less';
</style>