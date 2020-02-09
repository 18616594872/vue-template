<template>
    <div class="environmentMonitor-wrap">
        <div class="imgBG-wrap">
            <img :src="environmentMonitorIMG" />
        </div>
        <router-link :to="{name: 'VMMain'}">
            <Button class="btn-return" type="primary">返回</Button>
        </router-link>
        <div class="page-title">环境监测</div>
        <!-- 环境监测 -->
        <div class="env-collapse-wrap">
            <div class="title">
                环境监测</div>
            <Collapse accordion v-model="EMData.value" v-if="EMData.isTrue">
                <Panel :key="index" :name="item.tunnelKey" v-for="(item, index) in EMData.environmentMonitorInfo">
                    <span>
                        <img :src="tunnelIcon" />
                        {{ item.tunnelName }}
                    </span>
                    <div :key="tep.id" class="details-wrap" slot="content" v-for="tep in item.list">
                        <div class="details">{{ tep.name }}</div>
                        <div :class="{'unNormal': tep.isNormalMin===false}" class="details">
                            {{ tep.minVal }}{{ tep.unit }}</div>
                        <div :class="{'unNormal': tep.isNormalMax===false}" class="details">
                            {{ tep.maxVal }}{{ tep.unit }}</div>
                    </div>
                </Panel>
            </Collapse>
        </div>
        <!-- 安防监测 -->
        <div class="sec-collapse-wrap">
            <div class="title">
                安防监测</div>
            <Collapse accordion v-model="SEData.value" v-if="SEData.isTrue">
                <Panel :key="index" :name="item.tunnelKey" v-for="(item, index) in SEData.securityMonitorInfo">
                    <span>
                        <img :src="tunnelIcon" />
                        {{ item.tunnelName }}
                    </span>
                    <div :key="tep.id" class="details-wrap" slot="content" v-for="tep in item.list">
                        <div class="details">{{ tep.name }}</div>
                        <div class="details">
                            <div>{{ tep.open }}：</div>
                            <div>{{ tep.openVal }}</div>
                        </div>
                        <div class="details noWork">
                            <div>{{ tep.close }}：</div>
                            <div>{{ tep.closeVal }}</div>
                        </div>
                        <div class="fault">
                            <div>{{ tep.broken }}：</div>
                            <div class="fault-wrap">
                                <div class="fault-num">
                                    <u>{{ tep.brokenVal }}</u>
                                </div>
                            </div>
                        </div>
                    </div>
                </Panel>
            </Collapse>
        </div>
    </div>
</template>

<script lang="ts" src="./environmentMonitor.ts"></script>

<style lang="less">
    @import "./environmentMonitor.less";
</style>