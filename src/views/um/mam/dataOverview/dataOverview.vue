<template>
    <div class="dataDetails-wrap">
        <Title :data="dataDetailsTitle" />
        <div class="data-details-chart-wrap">
            <SelectTemp class="select-temp-wrap" :data="tunnelSelect" />
            <div class="left-wrap">
                <ul class="data-option-wrap">
                    <li class="data-option" v-for="(item, index) in dataOption" :key="index" @click="choosedLi(index)"
                        :class="{'active-li' : currentIndex===index}">{{item.name}}</li>
                </ul>
                <div class="pie-3d-chart-wrap">
                    <Pie3DChart :bindData="pie3DData" />
                </div>
            </div>
            <div class="right-wrap">
                <div v-for="(item,key) in gaugeCharts" :key="key" :class="'myChart myChart_item_'+key">
                    <Simple-gauge :bindData="item" :ref="item.id"></Simple-gauge>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./dataDetails.ts"></script>

<style lang="less">
    @import './dataDetails.less';
</style>