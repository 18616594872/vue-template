<template>
    <div class="dataOverview-wrap">
        <Title :Title="dataOverviewTitle" />
        <div class="data-wrap">
            <Row class="data-content-wrap">
                <Col class="data-content-col12" span="12" v-for="(item, index) in monitorData" :key="index">
                    <DataBox :monitorData="item.data"/>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script lang="ts" src="./dataOverview.ts"></script>

<style lang="less">
    @import './dataOverview.less';
</style>

