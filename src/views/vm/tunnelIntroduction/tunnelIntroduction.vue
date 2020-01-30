<template>
    <div class="tunnelIntroduction-wrap">
        <div class="imgBG-wrap">
            <!-- <img :src="tunnelIntroductIMG" /> -->
            <bim ref="tunnelIntroBim" :cameraPosition="cameraAngle" :openFlight="openFlight"></bim>
        </div>
        <router-link :to="{name: 'VMMain'}">
            <Button class="btn-return" type="primary">返回</Button>
        </router-link>
        <div class="page-title"
            :style="{background: 'url('+ pageTitleIMG +') 100% 100% no-repeat', backgroundSize: '40% 100%', backgroundPositionX: 'center',position: 'relative'}">
            管廊简介
        </div>
        <!-- 管廊简介 -->
        <div class="tunnel-collapse-wrap"
            :style="{background: 'url('+ tunnelCollapseIMG +') 100% 100% no-repeat', backgroundSize: '100% 100%'}">
            <div class="title">
                <img :src="guideIcon" class="guide-icon" />
                管廊简介：
            </div>
            <Collapse v-model="TData.value" accordion @on-change="changFlyRoute">
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
        <div class="equipment-statistics-wrap"
            :style="{background: 'url('+ tunnelCollapseIMG +') 100% 100% no-repeat', backgroundSize: '100% 100%'}">
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
        <div class="tunnel-company-wrap"
            :style="{background: 'url('+timeIMG +') 100% 100% no-repeat', backgroundSize: '100% 100%'}">
            <img class="tunnel-company-logo" :src="timeIcon">
            晋源综合管廊
        </div>
        <!-- 时间 -->
        <div class="time-wrap"
            :style="{background: 'url('+timeIMG +') 100% 100% no-repeat', backgroundSize: '100% 100%'}">
            <div class="hms-wrap">
                <img :src="timeIcon">
                {{Day.nowTime}}
            </div>
            <div class="ymd-wrap">
                {{Day.nowDate}}{{Day.nowWeek}}
            </div>
            <div class="safe-operat-wrap">
                系统已安全运行&nbsp;<span class="safe-days">{{Day.safeOperatDay}}</span>&nbsp;天
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./tunnelIntroduction.ts"></script>

<style lang="less">
    @import '../../../assets/less/variables';
    @import './tunnelIntroduction.less';
</style>