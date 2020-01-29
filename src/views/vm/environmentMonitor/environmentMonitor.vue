<template>
    <div class="environmentMonitor-wrap">
        <div class="imgBG-wrap">
            <img :src="environmentMonitorIMG" />
        </div>
        <router-link :to="{name: 'VMMain'}">
            <Button class="btn-return" type="primary">返回</Button>
        </router-link>
        <div :style="{background: 'url('+ pageTitleIMG +') 100% 100% no-repeat', backgroundSize: '40% 100%', backgroundPositionX: 'center',position: 'relative'}"
            class="page-title">环境监测</div>
        <!-- 环境监测 -->
        <div class="env-collapse-wrap">
            <div :style="{background: 'url('+ titleIMG + ') no-repeat', backgroundPositionX: 'center'}" class="title">
                环境监测</div>
            <Collapse :style="{background: 'url('+ collapseIMG +') 100% 100% no-repeat', backgroundSize: '100% 100%'}"
                accordion v-model="EMData.value">
                <Panel :key="index" :name="item.tunnelKey" v-for="(item, index) in EMData.environmenttMonitorInfo">
                    <span>
                        <img :src="tunnelIcon" />
                        {{ item.tunnelName }}
                        <Button class="status-btn" type="primary" v-show="item.isNormal===true">正常</Button>
                        <Button class="status-btn" type="error" v-show="item.isNormal===false">故障</Button>
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
            <div :style="{background: 'url('+ titleIMG + ') no-repeat', backgroundPositionX: 'center'}" class="title">
                安防监测</div>
            <Collapse :style="{background: 'url('+ collapseIMG +') 100% 100% no-repeat', backgroundSize: '100% 100%'}"
                accordion v-model="SEData.value">
                <Panel :key="index" :name="item.tunnelKey" v-for="(item, index) in SEData.securityMonitorInfo">
                    <span>
                        <img :src="tunnelIcon" />
                        {{ item.tunnelName }}
                        <Button class="status-btn" type="error" v-show="item.isNormal===false">故障</Button>
                        <Button class="status-btn" type="primary" v-show="item.isNormal===true">正常</Button>
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
                                <div class="fault-num" @click="choosedfault(idx)">
                                    <u>{{ tep.brokenVal }}</u>
                                </div>
                                <Select v-if="isShow === idx" class="fault-choosed" @on-change="zoomTo">
                                    <Option v-for="ele in tep.listBroken" :value="ele.id + ',' + ele.measobjTypeId"
                                        :key="ele.id">{{ele.name}}</Option>
                                </Select>
                            </div>
                        </div>
                    </div>
                </Panel>
            </Collapse>
        </div>
        <canvas class="canvas-wrap"></canvas>
        <div :style="{background: 'url('+ environmentSpotIMG +') 100% 100% no-repeat', backgroundSize: '100% 100%'}"
            class="spot-wrap" v-show="isWithCanvas">
            <div :key="index" class="spot-line-wrap" v-for="(item ,index) in SpotData">
                <div>{{item.spotKey}}</div>
                <div>{{item.spotVal}}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./environmentMonitor.ts"></script>

<style lang="less">
    @import "./environmentMonitor.less";
</style>