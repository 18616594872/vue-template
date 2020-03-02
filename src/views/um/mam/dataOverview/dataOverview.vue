<template>
    <div class="dataOverview-wrap">
        <Title :data="dataOverviewTitle" />
        <div class="data-wrap">
            <div class="guide-wrap">
                <ul class="time-select">
                    <li class="time-item" v-for="(item, index) in guideData" :key="index" @click="choosedLi(index)" :class="{'active-li' : currentIndex===index}">{{item.name}}</li>
                </ul>
                <SelectTemp class="select-temp-wrap" :data="tunnelSelect" />
            </div>
            <Row class="data-content-wrap">
                <Col class="data-content-col12" span="12" v-for="(item, index) in monitorData" :key="index">
                    <DataBox :data="item.data"/>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script lang="ts" src="./dataOverview.ts"></script>

<style lang="less">
    @import './dataOverview.less';
</style>

