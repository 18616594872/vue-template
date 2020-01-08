<template>
    <div class="main" :style="{height:fullHeight+'px'}">
        <!--Top标题-->
        <Row>
            <Col span="24">
            <div id="top" class="topOpacity">
                <Row>
                    <Col span="14">
                    <span class="Icon"></span>
                    <div style="padding-top: 1vh;">
                        <img :src="mainName" style="height: 3vh">
                    </div>
                    </Col>
                    <Col span="6" offset="4">
                    <div style="float: right;padding-top: 0px;padding-right: 5px;">
                        <Dropdown divided @click.native="showAboutUs">
                            <a>
                                <Icon type="ios-information-circle" color="#fff" title="关于我们" class="about"></Icon>
                            </a>
                        </Dropdown>
                        <!-- <showAboutUs v-bind="aboutUs"></showAboutUs> -->
                    </div>
                    <div style="float: right;padding-top: 1vmin;">
                        <Dropdown divided @click.native="logout">
                            <a>
                                <Icon type="md-power" color="#fff" class="power"></Icon>
                            </a>
                        </Dropdown>
                    </div>
                    </Col>
                </Row>
            </div>
            </Col>
        </Row>
        <br>
        <br>
        <br>
        <br>
        <br>
        <!--菜单内容-->
        <div class="modals">
            <Row type="flex" justify="center" align="top" class="code-row-bg">
                <!--运维管理 + 其他-->
                <Col span="6" offset="1">
                    <Row>
                        <h2 style="font-size: 2.4vmin">运维管理</h2>
                        <Col span="16">
                            <Button type="info" class="widthBtn btn-nenghao"
                                :disabled="findPath('/UM/virtualInspect')?false:true"
                                @click="goToMoudle({ path:'/UM/virtualInspect'})">
                                <div>
                                    <img :src="virtualInspect" :width="imgWidth">
                                    <div :style="{fontSize:mySize}">虚拟巡检</div>
                                </div>
                            </Button>
                        </Col>
                        <Col span="8">
                            <Button class="normalBtn" :disabled="findPath('/UM/patrolScheme')?false:true"
                                @click="goToMoudle({ path:'/UM/patrolScheme'})" type="info">
                                <div>
                                    <img :width="imgWidth" :src="patrol">
                                    <div :style="{fontSize:mySize}">巡检管理</div>
                                </div>
                            </Button>
                        </Col>
                        <Col span="8">
                            <Button class="normalBtn" type="info" :disabled="findPath('/UM/defect/query')?false:true"
                                @click="goToMoudle({ path:'/UM/defect/query'})">
                                <div>
                                    <img :width="imgWidth" :src="defect">
                                    <div :style="{fontSize:mySize}">缺陷管理</div>
                                </div>
                            </Button>
                        </Col>
                        <Col span="8">
                            <Button class="normalBtn" type="info" :disabled="findPath('/UM/overhaul/query')?false:true"
                                @click="goToMoudle({ path:'/UM/overhaul/query'})">
                                <div>
                                    <img :width="imgWidth" :src="overhaul">
                                    <div :style="{fontSize:mySize}">检修管理</div>
                                </div>
                            </Button>
                        </Col>
                        <Col span="8">
                            <Button class="normalBtn" type="info" :disabled="findPath('/UM/equipment/homePage')?false:true"
                                @click="goToMoudle({ path:'/UM/equipment/homePage'})">
                                <div>
                                    <img :width="imgWidth" :src="equipments">
                                    <div :style="{fontSize:mySize}">设备管理</div>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <h2 style="font-size: 2.4vmin; margin-top: 1vmin">其他管理</h2>
                        <Col span="8">
                            <Button type="info" class="normalBtn btn-jiqiren" :disabled="findPath('/VMMain')?false:true"
                                @click="goToMoudle({ path:'/VMMain'})">
                                <div>
                                    <img :src="space" :width="imgWidth">
                                    <div :style="{fontSize:mySize}">可视化平台</div>
                                </div>
                            </Button>
                        </Col>
                        <Col span="8">
                            <Button class="normalBtn" type="info" :disabled="findPath('/UM/tunnelDocuments/list')?false:true"
                                @click="goToMoudle({ path:'/UM/tunnelDocuments/list/1.1'})">
                                <div>
                                    <img :src="documents" :width="imgWidth">
                                    <div :style="{fontSize:mySize}">资料管理</div>
                                </div>
                            </Button>
                        </Col>
                        <Col span="8">
                            <Button class="normalBtn btn-quexian" type="info" :disabled="findPath('/UM/projectSurvey')?false:true"
                                @click="goToMoudle({ path:'/UM/projectSurveye'})">
                                <div>
                                    <img :src="enterGallery" :width="imgWidth">
                                    <div :style="{fontSize:mySize}">项目概况</div>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                </Col>

                <!--运营和应急-->
                <Col span="4" offset="1">
                    <Row>
                        <h2 style="font-size: 2.4vmin">运营管理</h2>
                        <Col span="12">
                            <Button type="info" class="normalBtn" :disabled="findPath('/UM/tunnelCustomer/list')?false:true"
                                @click="goToMoudle({ path:'/UM/tunnelCustomer/list'})">
                                <div>
                                    <div :style="{fontSize:mySize}">企业客户</div>
                                </div>
                            </Button>
                        </Col>
                        <Col span="12">
                            <Button class="normalBtn btn-quexian" :disabled="findPath('/UM/TunnelEnergy/homepage')?false:true"
                                @click="goToMoudle({path: '/UM/TunnelEnergy/homepage'})">
                                <div>
                                    <img :src="energy" :width="imgWidth">
                                    <div :style="{fontSize:mySize}">能耗管理</div>
                                </div>
                            </Button>
                        </Col>
                        <Col span="12">
                            <Button type="info" class="normalBtn" :disabled="findPath('/UM/tunnelContract/list')?false:true"
                                @click="goToMoudle({ path:'/UM/tunnelContract/list'})">
                                <div>
                                    <img :src="contract" :width="imgWidth">
                                    <div :style="{fontSize:mySize}">合同管理</div>
                                </div>
                            </Button>
                        </Col>
                        <Col span="12">
                            <Button type="info" class="normalBtn" :disabled="findPath('/UM/OperatingSpace/tunnel')?false:true"
                                @click="goToMoudle({ path:'/UM/OperatingSpace/tunnel'})">
                                <div>
                                    <img :src="space" :width="imgWidth">
                                    <div :style="{fontSize:mySize}">空间管理</div>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <h2 style="font-size: 2.4vmin; margin-top: 1vmin">应急管理</h2>
                        <Col span="12">
                            <Button type="info" class="normalBtn" :disabled="findPath('/UM/relatedUnits/query')?false:true"
                                @click="goToMoudle({ path:'/UM/relatedUnits/query'})">
                                <div>
                                    <img :src="faultyEquipment" :width="imgWidth">
                                    <div :style="{fontSize:mySize}">基础信息</div>
                                </div>
                            </Button>
                        </Col>
                        <Col span="12">
                            <Button type="info" class="normalBtn" :disabled="findPath('/UM/plans/detial')?false:true"
                                @click="goToMoudle({ path:'/UM/plans/detial/VentilationPlanSOP_KEY'})">
                                <div>
                                    <img :src="fire" :width="imgWidth">
                                    <div :style="{fontSize:mySize}">预案管理</div>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                </Col>

                <!--综合监控-->
                <Col span="6" offset="1">
                    <h2 style="font-size: 2.4vmin">综合监控</h2>
                    <Col span="8">
                        <Button class="btn-xunjian normalBtn" type="info" :disabled="findPath('/UM/IntegratedMonitoring')?false:true"
                            @click="goToMoudle({ path:'/UM/IntegratedMonitoring'})">
                            <div>
                                <img :src="environment" :width="imgWidth">
                                <div :style="{fontSize:mySize}">环境监测</div>
                            </div>
                        </Button>
                    </Col>
                    <Col span="8">
                        <Button class="normalBtn" type="info" :disabled="findPath('/UM/TunnelSafety')?false:true"
                            @click="goToMoudle({ path:'/UM/TunnelSafety'})">
                            <div>
                                <img :width="imgWidth" :src="safe">
                                <div :style="{fontSize:mySize}">安防监测</div>
                            </div>
                        </Button>
                    </Col>
                    <Col span="8">
                        <Button class="normalBtn" type="info" :disabled="findPath('/UM/TunnelElectromechanical')?false:true"
                            @click="goToMoudle({ path:'/UM/TunnelElectromechanical'})">
                            <div>
                                <img :width="imgWidth" :src="defect">
                                <div :style="{fontSize:mySize}">机电监控</div>
                            </div>
                        </Button>
                    </Col>
                    <Col span="16">
                        <Button class="normalBtn btn-shipin bigBtn" type="info" :disabled="findPath('/UM/videoMonitoring')?false:true"
                            @click="goToMoudle({ path:'/UM/videoMonitoring/1'})">
                            <div>
                                <img :src="monitor" :width="imgWidth">
                                <div :style="{fontSize:mySize}">视频监控</div>
                            </div>
                        </Button>
                    </Col>
                    <Col span="8">
                        <Button class="btn-yonhu normalBtn" :disabled="findPath('/UM/PersonnelPosition/Visitors')?false:true"
                            @click="goToMoudle({ path:'/UM/PersonnelPosition/Visitors'})">
                            <div>
                                <img :width="imgWidth" :src="position">
                                <div :style="{fontSize:mySize}">人员定位</div>
                            </div>
                        </Button>
                    </Col>
                    <Col span="8">
                        <Button class="normalBtn" :disabled="findPath('/UM/DataAnalysis/QueryData')?false:true"
                            @click="goToMoudle({ path:'/UM/DataAnalysis/QueryData'})" type="info">
                            <div>
                                <img :width="imgWidth" :src="dataAnalysis">
                                <div :style="{fontSize:mySize}">数据分析</div>
                            </div>
                        </Button>
                    </Col>
                </Col>

                <!--最右侧时间-->
                <Col span="3" offset="1">
                <Row style="margin-top: 16vh;">
                    <Col span="24">
                    <p class="time">
                        <Icon type="ios-time-outline"></Icon>
                        <span class="curTime">{{nowTime}}</span>
                    </p>
                    </Col>
                    <Col span="24">
                    <p class="date">{{nowDate}}</p>
                    </Col>
                    <Col span="24" style="margin-top: 4vh">
                    <span style="font-size: 2.4vmin">
                        安全运营
                        <span class="days">{{safeDays}}</span>天
                    </span>
                    </Col>
                </Row>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script lang="ts" src="./umMain.ts"></script>

<style lang="less">
    @import './umMain.less';
</style>