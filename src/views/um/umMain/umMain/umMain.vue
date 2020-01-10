<template>
    <div class="main">
        <!--Top标题-->
        <Row>
            <Col span="24">
                <div class="topOpacity">
                    <Row>
                        <Col span="14">
                            <span class="title">后台管理系统</span>
                        </Col>
                        <Col span="6" offset="4">
                            <div class="logoutBtn">
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
        
        <!--菜单内容-->
        <div class="menus">
            <Row type="flex" justify="center" align="top" class="code-row-bg">
                <!--运维管理 + 其他-->
                <Col span="6" offset="1">
                    <Row>
                        <h2 class="menusTitle">运维管理</h2>
                        <Col span="16">
                            <Button type="info" class="widthBtn btn-nenghao"
                                :disabled="findPath('/UM/virtualInspect') ? false : true"
                                @click="goToMoudle({ path:'/UM/virtualInspect'})">
                                <div>
                                    <img class="entranceImg" :src="virtualInspect">
                                    <div class="entranceTitle">虚拟巡检</div>
                                </div>
                            </Button>
                        </Col>
                        <Col span="8">
                            <Button class="normalBtn" :disabled="findPath('/UM/patrolScheme')?false:true"
                                @click="goToMoudle({ path:'/UM/patrolScheme'})" type="info">
                                <div>
                                    <img class="entranceImg" :src="patrol">
                                    <div class="entranceTitle">巡检管理</div>
                                </div>
                            </Button>
                        </Col>
                        <Col span="8">
                            <Button class="normalBtn" type="info" :disabled="findPath('/UM/defect/query')?false:true"
                                @click="goToMoudle({ path:'/UM/defect/query'})">
                                <div>
                                    <img class="entranceImg" :src="defect">
                                    <div class="entranceTitle">缺陷管理</div>
                                </div>
                            </Button>
                        </Col>
                        <Col span="8">
                            <Button class="normalBtn" type="info" :disabled="findPath('/UM/overhaul/query')?false:true"
                                @click="goToMoudle({ path:'/UM/overhaul/query'})">
                                <div>
                                    <img class="entranceImg" :src="overhaul">
                                    <div class="entranceTitle">检修管理</div>
                                </div>
                            </Button>
                        </Col>
                        <Col span="8">
                            <Button class="normalBtn" type="info" :disabled="findPath('/UM/equipment/homePage')?false:true"
                                @click="goToMoudle({ path:'/UM/equipment/homePage'})">
                                <div>
                                    <img class="entranceImg" :src="equipments">
                                    <div class="entranceTitle">设备管理</div>
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
                                    <img class="entranceImg" :src="space">
                                    <div class="entranceTitle">可视化平台</div>
                                </div>
                            </Button>
                        </Col>
                        <Col span="8">
                            <Button class="normalBtn" type="info" :disabled="findPath('/UM/tunnelDocuments/list')?false:true"
                                @click="goToMoudle({ path:'/UM/tunnelDocuments/list/1.1'})">
                                <div>
                                    <img class="entranceImg" :src="documents">
                                    <div class="entranceTitle">资料管理</div>
                                </div>
                            </Button>
                        </Col>
                        <Col span="8">
                            <Button class="normalBtn btn-quexian" type="info" :disabled="findPath('/UM/projectSurvey')?false:true"
                                @click="goToMoudle({ path:'/UM/projectSurveye'})">
                                <div>
                                    <img class="entranceImg" :src="enterGallery">
                                    <div class="entranceTitle">项目概况</div>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                </Col>

                <!--运营和应急-->
                <Col span="4" offset="1">
                    <Row>
                        <h2 class="menusTitle">运营管理</h2>
                        <Col span="12">
                            <Button type="info" class="normalBtn" :disabled="findPath('/UM/tunnelCustomer/list')?false:true"
                                @click="goToMoudle({ path:'/UM/tunnelCustomer/list'})">
                                <div>
                                    <div class="entranceTitle">企业客户</div>
                                </div>
                            </Button>
                        </Col>
                        <Col span="12">
                            <Button class="normalBtn btn-quexian" :disabled="findPath('/UM/TunnelEnergy/homepage')?false:true"
                                @click="goToMoudle({path: '/UM/TunnelEnergy/homepage'})">
                                <div>
                                    <img class="entranceImg" :src="energy">
                                    <div class="entranceTitle">能耗管理</div>
                                </div>
                            </Button>
                        </Col>
                        <Col span="12">
                            <Button type="info" class="normalBtn" :disabled="findPath('/UM/tunnelContract/list')?false:true"
                                @click="goToMoudle({ path:'/UM/tunnelContract/list'})">
                                <div>
                                    <img class="entranceImg" :src="contract">
                                    <div class="entranceTitle">合同管理</div>
                                </div>
                            </Button>
                        </Col>
                        <Col span="12">
                            <Button type="info" class="normalBtn" :disabled="findPath('/UM/OperatingSpace/tunnel')?false:true"
                                @click="goToMoudle({ path:'/UM/OperatingSpace/tunnel'})">
                                <div>
                                    <img class="entranceImg" :src="space">
                                    <div class="entranceTitle">空间管理</div>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <h2 class="menusTitle" style="margin-top: 1vmin">应急管理</h2>
                        <Col span="12">
                            <Button type="info" class="normalBtn" :disabled="findPath('/UM/relatedUnits/query')?false:true"
                                @click="goToMoudle({ path:'/UM/relatedUnits/query'})">
                                <div>
                                    <img class="entranceImg" :src="faultyEquipment">
                                    <div class="entranceTitle">基础信息</div>
                                </div>
                            </Button>
                        </Col>
                        <Col span="12">
                            <Button type="info" class="normalBtn" :disabled="findPath('/UM/plans/detial')?false:true"
                                @click="goToMoudle({ path:'/UM/plans/detial/VentilationPlanSOP_KEY'})">
                                <div>
                                    <img class="entranceImg" :src="fire">
                                    <div class="entranceTitle">预案管理</div>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                </Col>

                <!--综合监控-->
                <Col span="6" offset="1">
                    <h2 class="menusTitle">综合监控</h2>
                    <Col span="8">
                        <Button class="btn-xunjian normalBtn" type="info" :disabled="findPath('/UM/IntegratedMonitoring')?false:true"
                            @click="goToMoudle({ path:'/UM/IntegratedMonitoring'})">
                            <div>
                                <img class="entranceImg" :src="environment">
                                <div class="entranceTitle">环境监测</div>
                            </div>
                        </Button>
                    </Col>
                    <Col span="8">
                        <Button class="normalBtn" type="info" :disabled="findPath('/UM/TunnelSafety')?false:true"
                            @click="goToMoudle({ path:'/UM/TunnelSafety'})">
                            <div>
                                <img class="entranceImg" :width="imgWidth">
                                <div class="entranceTitle">安防监测</div>
                            </div>
                        </Button>
                    </Col>
                    <Col span="8">
                        <Button class="normalBtn" type="info" :disabled="findPath('/UM/TunnelElectromechanical')?false:true"
                            @click="goToMoudle({ path:'/UM/TunnelElectromechanical'})">
                            <div>
                                <img class="entranceImg" :src="defect">
                                <div class="entranceTitle">机电监控</div>
                            </div>
                        </Button>
                    </Col>
                    <Col span="16">
                        <Button class="normalBtn btn-shipin bigBtn" type="info" :disabled="findPath('/UM/videoMonitoring')?false:true"
                            @click="goToMoudle({ path:'/UM/videoMonitoring/1'})">
                            <div>
                                <img class="entranceImg" :src="monitor">
                                <div class="entranceTitle">视频监控</div>
                            </div>
                        </Button>
                    </Col>
                    <Col span="8">
                        <Button class="btn-yonhu normalBtn" :disabled="findPath('/UM/PersonnelPosition/Visitors')?false:true"
                            @click="goToMoudle({ path:'/UM/PersonnelPosition/Visitors'})">
                            <div>
                                <img class="entranceImg" :src="position">
                                <div class="entranceTitle">人员定位</div>
                            </div>
                        </Button>
                    </Col>
                    <Col span="8">
                        <Button class="normalBtn" :disabled="findPath('/UM/DataAnalysis/QueryData')?false:true"
                            @click="goToMoudle({ path:'/UM/DataAnalysis/QueryData'})" type="info">
                            <div>
                                <img class="entranceImg" :src="dataAnalysis">
                                <div class="entranceTitle">数据分析</div>
                            </div>
                        </Button>
                    </Col>
                </Col>

                <!--最右侧时间-->
                <Col span="3" offset="1">
                    <Row  class="homePageLeftTime" >
                        <Col span="24">
                            <p class="time">
                                <Icon type="ios-time-outline"></Icon>
                                <span class="curTime">{{nowTime}}</span>
                            </p>
                        </Col>
                        <Col span="24">
                            <p class="date">{{nowDate}}</p>
                        </Col>
                        <Col span="24" class="homePageLeftDay">
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