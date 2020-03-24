<template>
    <div class="operationManagement-wrap">
        <div class="top-wrap">
            <div class="left-wrap">
                <Title :Title="customerTitle" />
                <div class="tunnel-customer-wrap">
                    <Chart :bindData="customerData" />
                </div>
            </div>
            <div class="center-wrap">
                <Title :Title="dataOverviewTitle" />
                <Row Row type="flex" justify="space-around" class="code-row-bg">
                    <Col class="monitor-data-wrap" span="8" v-for="(item, index) in monitorDataList" :key="index"
                        :class="{'col-span-12' : index === 6 | index === 7}">
                    <DataBox :monitorData="item.data" />
                    </Col>
                </Row>
            </div>
            <div class="right-wrap">
                <Title :Title="spaceTitle" />
                <div class="tunnel-space-wrap">
                    <Chart :bindData="spaceData" />
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

<script lang="ts" src="./operationManagement.ts"></script>

<style lang="less">
    @import './operationManagement.less';
</style>