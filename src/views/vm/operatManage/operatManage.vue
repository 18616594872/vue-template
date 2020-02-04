<template>
    <div class="operatManage-wrap">
        <div class="imgBG-wrap">
            <img :src="operatManageIMG" />
        </div>
        <router-link :to="{name: 'VMMain'}">
            <Button class="btn-return" type="primary">返回</Button>
        </router-link>
        <div class="page-title">运营管理</div>
        <!-- 能耗统计 -->
        <div class="energy-statistics-wrap">
            <div class="title">
                <img :src="guideIcon" class="guide-icon" />
                能耗统计：
            </div>
            <div class="line-chart-wrap">
                <MultipleLineChart :bindData="energyData" />
            </div>
        </div>
        <!-- 客户管理 -->
        <div class="customer-wrap">
            <div class="title">
                <img :src="guideIcon" class="guide-icon" />
                客户管理：
            </div>
            <div>
                <div class="customer-title">
                    <div>公司名称</div>
                    <div>管线数</div>
                </div>
                <div class="customer-info-wrap">
                    <div :key="index" class="customer-info" v-for="(item, index) in customerData">
                        <div>{{item.key}}</div>
                        <div>{{item.val}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./operatManage.ts"></script>

<style lang="less">
    @import '../../../assets/less/variables';
    @import './operatManage.less';
</style>