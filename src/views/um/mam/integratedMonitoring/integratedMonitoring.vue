<template>
    <div class="integratedMonitoring-wrap">
        <div class="top-wrap">
            <div class="type-data-wrap">
                <div class="doughnut-wrap">
                    <Title :Title="equipTypeTitle"/>
                    <hollow-pie-chart :bindData="equipTypeDate" class="doughnut-box"/>
                </div>
                <div class="temp-humidity-wrap">
                    <div class="title">
                        <Title :Title="tempHumidityTitle"/>
                    </div>
                    <mixed-line-and-bar :bindData="mixedLineAndBarData" class="mixedLineAndBar-box"/>
                </div>
            </div>
            <div class="overview-data-wrap">
                <DataOverview />
            </div>
            <div class="video-wrap">
                <VideoDisplay />
            </div>
        </div>
        <div class="bottom-wrap">
            <div class="data-details-wrap">
                <TirggerData />
            </div>
            <div class="entrance-guard-wrap">
                <TirggerData />
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./integratedMonitoring.ts"></script>

<style lang="less">
    @import './integratedMonitoring.less';
</style>

