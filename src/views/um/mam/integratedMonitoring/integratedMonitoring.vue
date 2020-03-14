<template>
    <div class="integratedMonitoring-wrap">
        <div class="top-wrap">
            <div class="type-data-wrap">
                <div class="doughnut-wrap">
                    <Title :Title="equipTypeTitle" />
                    <hollow-pie-chart :bindData="equipTypeDate" class="doughnut-box" />
                </div>
                <div class="temp-humidity-wrap">
                    <div class="title">
                        <Title :Title="tempHumidityTitle" />
                    </div>
                    <mixed-line-and-bar :bindData="mixedLineAndBarData" class="mixedLineAndBar-box" />
                </div>
            </div>
            <div class="overview-data-wrap">
                <DataOverview />
            </div>
            <div class="type-data-wrap">
                <div class="doughnut-wrap">
                    <Title :Title="equipTypeTitle" />
                    <hollow-pie-chart :bindData="equipTypeDate" class="doughnut-box" />
                </div>
                <div class="temp-humidity-wrap">
                    <div class="title">
                        <Title :Title="tempHumidityTitle" />
                    </div>
                    <mixed-line-and-bar :bindData="mixedLineAndBarData" class="mixedLineAndBar-box" />
                </div>
            </div>
        </div>
        <div class="bottom-wrap">
            <div class="tunnel-contract-wrap">
                <Title :Title="contractTitle" />
                <div class="contractChart">
                    <Chart :bindData="contractData" />
                </div>
            </div>
            <div class="energy-consumption-wrap">
                <Title :Title="energyTitle" />
                <div class="energyChart">
                    <Chart :bindData="energyData" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./integratedMonitoring.ts"></script>

<style lang="less">
    @import './integratedMonitoring.less';
</style>