<template>
    <div class="integratedMonitoring-wrap">
        <div class="top-wrap">
            <div class="type-data-wrap">
                <div class="doughnut-wrap">
                    <Title :data="doughnutTitle"/>
                    <hollow-pie-chart :bindData="doughnutData" class="doughnut-box"/>
                </div>
                <div class="temp-humidity-wrap">
                    <div class="title">
                        <Title :data="tempHumidityTitle"/>
                        <SelectTemp class="select-temp" :data="tunnelSelect" @bingSend="propMsg"/>
                    </div>
                    <MixedLineAndBar :bindData="mixedLineAndBarData" class="mixedLineAndBar-box"/>
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
                <DataDetails />
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

