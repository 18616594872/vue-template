<template>
    <div class="planManage-wrap">
        <div class="imgBG-wrap">
            <img :src="planManageIMG" />
        </div>
        <router-link :to="{name: 'VMMain'}">
            <Button class="btn-return" type="primary">返回</Button>
        </router-link>
        <div class="page-title">
            预案管理
        </div>
        <!-- 告警统计 -->
        <div class="alarm-statistics-wrap">
            <div class="title">
                <img :src="guideIcon" class="guide-icon" />
                告警统计：
            </div>
            <div class="details-wrap">
                <div class="details-title">
                    <div>类型</div>
                    <div>正常</div>
                    <div>故障</div>
                    <div>隐患</div>
                    <div>维修</div>
                    <div>其他</div>
                </div>
                <div class="details-info-wrap">
                    <div class="details-info" v-for="(item, index) in alarmData" :key="index">
                        <div>{{item.eKey}}</div>
                        <div>{{item.normalNum}}</div>
                        <div>{{item.unNormalNum}}</div>
                        <div>{{item.hiddenNum}}</div>
                        <div>{{item.repairNum}}</div>
                        <div>{{item.othersNum}}</div>
                    </div>
                </div>
                <div class="details-total">
                    <div>总计</div>
                    <div>{{TotalNum.totalNormalNum}}</div>
                    <div>{{TotalNum.totalUnNormalNum}}</div>
                    <div>{{TotalNum.totalHiddenNum}}</div>
                    <div>{{TotalNum.totalRepairNum}}</div>
                    <div>{{TotalNum.totalOtherNum}}</div>
                </div>
            </div>
        </div>  
        <!-- 模拟预案 -->
        <div class="simulate-plan-wrap">
            <div class="title">
                <img :src="guideIcon" class="guide-icon" />
                模拟预案：
            </div>
            <section class="load-plan-wrap">
                <div class="title">加载预案</div>
                <Select v-model="PData.model">
                    <Option v-for="(item, index) in PData.planInfo" :key="index" :value="item.id">{{item.planName}}</Option>
                </Select>
                <div class="load-plan-details">
                    加载预案
                </div>
            </section>
            <section class="plan-simulate-wrap">
                <div class="title">预案模拟</div>
                <ButtonGroup>
                    <Button 
                        v-for="(item, index) in btnInfo" 
                        :key="index"
                        class="plan-simulate-btn"  
                    >
                        {{item.btnContent}}
                    </Button>
                </ButtonGroup>
            </section>
        </div>  
    </div>
</template>

<script lang="ts" src="./planManage.ts"></script>

<style lang="less">
    @import './planManage.less';
</style>

