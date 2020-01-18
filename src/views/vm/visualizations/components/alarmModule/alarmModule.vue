<template>
    <div class="AlarmModule-wrap">
        <div class="Title">
            <module-title v-bind="title"></module-title>
        </div>
        <div class="total">
            <div class="subTitle">
                <span class="name">本年度告警：</span>
                <span class="number">{{ yearTotal.number }}</span>
                <span class="yearIcon">
                    <Icon :type="yearTotal.isRise ? 'md-arrow-round-up' : 'md-arrow-round-down'"
                        :color="yearTotal.isRise ? 'rgb(247, 26, 56)': 'white'"></Icon>
                </span>
            </div>
            <div class="subTitle">
                <span style="letter-spacing: 0.25em;margin-right: -0.25em;" class="name">本月告警：</span>
                <span class="number">{{ monthTotal.number }}</span>
                <span class="monthIcon">
                    <Icon :type="monthTotal.isRise ? 'md-arrow-round-up' : 'md-arrow-round-down'"
                        :color="monthTotal.isRise ? 'rgb(247, 26, 56)': 'white'"></Icon>
                </span>
            </div>
        </div>
        <div class="pie">
            <simple-pie-chart :bindData="pieChart"></simple-pie-chart>
        </div>
        <div class="alarms">
            <span style="font-size: 1.5vmin;line-height: 2.8vmin;color: #fff;">告警信息</span>
            <Icon type="android-volume-up" color="#fff" :size="17"></Icon>
            <div class="play" @click="changeState">
                <Icon :type="carouselInfo.isCarousel ? 'ios-pause' : 'ios-play'" class="playIcon"></Icon>
            </div>
            <Row :gutter="16" style="margin-top: 0.3vh;">
                <div :key="index" v-for="(alarm,index) in alarmShowData" class="alarm-row" :style="{top:(index * 3) + 'vmin'}">
                    <Col span="1" >
                    <Icon type="ios-checkmark-circle" color="#0196ff" style="font-size: 1.6vmin"></Icon>
                    </Col>
                    <Col span="5" offset="1" class="colSpan">
                    <div>{{alarm.alarmDate}}</div>
                    </Col>
                    <Col span="6" class="colSpan">
                    <div :title="alarm.name">{{alarm.name}}</div>
                    </Col>
                    <Col span="7" class="colSpan">
                    <div :title="alarm.location">{{alarm.location}}</div>
                    </Col>
                    <Col span="3" class="colSpan">
                    <div
                        :style="{backgroundColor: alarm.alarmStyle.bgColor, textAlign: 'center', borderRadius: '5px',color: alarm.alarmStyle.color }">
                        {{alarm.alarmStyle.buttonText}}</div>
                    </Col>
                </div>
            </Row>
        </div>
    </div>
</template>

<script lang="ts" src="./alarmModule.ts"></script>

<style lang="less">
    @import './alarmModule.less';
</style>

