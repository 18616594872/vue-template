<template>
    <div class="InspectModule-wrap">
        <div class="title">
            <module-title v-bind="title" />
        </div>
        <div class="charts" ref="chart">
            <multiple-bar-chart :bindData="bindData" ref="corssBarChar" />
        </div>
        <div class="inspectCount">
            <ul class="taskLists">
                <li>
                    <div>
                        <i-circle :percent="80" :size="circleWidth" stroke-linecap="square" stroke-color="#00f6fc"
                            trail-color="#001D49">
                            <span class="demo-Circle-inner">{{taskCount.nowYearTaskCount}}个</span>
                        </i-circle>
                    </div>
                    <div>
                        <div class="countTitle">本年巡检任务</div>
                        <div class="iconBox">
                            <span>同比</span>
                            <Icon :type="taskCount.isRise ? 'md-arrow-up' : 'md-arrow-down'"
                                :color="taskCount.isRise ? '#11d67c' : '#ff0000'" />
                        </div>
                    </div>
                </li>
                <li>
                    <div>
                        <i-circle :percent="75" :size="circleWidth" stroke-linecap="square" stroke-color="#11c0ff"
                            trail-color="#001E4A">
                            <span class="demo-Circle-inner">{{defectCount.nowYearDefectCount}}个</span>
                        </i-circle>
                    </div>
                    <div>
                        <div class="countTitle">本年缺陷</div>
                        <div class="iconBox">
                            <span>同比</span>
                            <Icon :type="taskCount.isRise ? 'md-arrow-up' : 'md-arrow-down'"
                                :color="taskCount.isRise ? '#11d67c' : '#ff0000'"></Icon>
                        </div>
                    </div>
                </li>
                <li>
                    <div ref="circleBox">
                        <i-circle :percent="62" :size="circleWidth" stroke-linecap="square" stroke-color="#008bfe"
                            trail-color="#00204D">
                            <span class="demo-Circle-inner">{{maintenanceCount.nowYearOrderCount}}个</span>
                        </i-circle>
                    </div>
                    <div>
                        <div class="countTitle">本年维修</div>
                        <div class="iconBox">
                            <span>同比</span>
                            <Icon :type="taskCount.isRise ? 'md-arrow-up' : 'md-arrow-down'"
                                :color="taskCount.isRise ? '#11d67c' : '#ff0000'"></Icon>
                        </div>
                    </div>
                </li>
                <li>
                    <div>
                        <i-circle :percent="maintenanceRateCount.nowYearOrderPercentage" :size="circleWidth"
                            stroke-linecap="square" stroke-color="#2562e9" trail-color="#002251">
                            <span class="demo-Circle-inner">{{maintenanceRateCount.nowYearOrderPercentage}}%</span>
                        </i-circle>
                    </div>
                    <div>
                        <div class="countTitle">维修率</div>
                        <div class="iconBox">
                            <span>同比</span>
                            <Icon :type="taskCount.isRise ? 'md-arrow-up' : 'md-arrow-down'"
                                :color="taskCount.isRise ? '#11d67c' : '#ff0000'"></Icon>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" src="./inspectModule.ts"></script>

<style lang="less">
    @import './inspectModule.less';
</style>