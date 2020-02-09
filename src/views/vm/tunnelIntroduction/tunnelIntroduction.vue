<template>
    <div class="tunnelIntroduction-wrap">
        <div class="imgBG-wrap">
            <img :src="tunnelIntroductIMG" />
        </div>
        <router-link :to="{name: 'VMMain'}">
            <Button class="btn-return" type="primary">返回</Button>
        </router-link>
        <div class="page-title">
            管廊简介
        </div>
        <!-- 管廊简介 -->
        <div class="tunnel-collapse-wrap">
            <div class="title">
                <img :src="guideIcon" class="guide-icon" />
                管廊简介：
            </div>
            <Collapse v-model="TData.value" accordion v-if="TData.isTrue">
                <Panel :name="item.id+''" v-for="(item, index) in TData.tunnelInfo" :key="index">
                    <span>
                        <img :src="tunnelIcon" />
                        {{ item.name }}
                    </span>
                    <div class="details-wrap" slot="content">
                        介绍：<span>{{item.description}}</span>
                    </div>
                </Panel>
            </Collapse>
        </div>
        <!-- 廊内设备统计 -->
        <div class="equipment-statistics-wrap">
            <div class="title">
                <img :src="guideIcon" class="guide-icon" />
                廊内设备统计：
            </div>
            <section class="equipment-statistics-info-wrap">
                <div class="explain">
                    <img :src="equipmentIcon" />
                    晋源东区一共有设备{{totalEquipment}}个：
                </div>
                <div class="equipment-statistics-info">
                    <div v-for="(item, index) in equipmentStatisticsData" :key="index">
                        {{index+1}}、{{item.eKey}}：{{item.eVal}}个
                    </div>
                </div>
            </section>
        </div>
        <!-- 管廊公司 -->
        <div class="tunnel-company-wrap">
            <img class="tunnel-company-logo" :src="timeIcon">
            可视化管廊
        </div>
        <!-- 时间 -->
        <div class="time-wrap">
            <div class="safe-operat-wrap">
                系统已安全运行&nbsp;<span class="safe-days">{{safeOperatDay}}</span>&nbsp;天
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./tunnelIntroduction.ts"></script>

<style lang="less">
    @import './tunnelIntroduction.less';
</style>