<template>
    <div class="listCustomer-wrap">
        <div class="conditions">
            <Row>
                <Col span="6">
                    <span class="conditionTitle">企业名称：</span>
                    <Input v-model="conditions.name" placeholder="请输入企业名称" style="width: 60%"/>
                </Col>
                <Col span="6">
                    <span class="conditionTitle">开始时间：</span>
                    <DatePicker
                        type="datetime"
                        placeholder="请选择开始时间"
                        style="width: 60%"
                        v-model="conditions.startTime"
                    ></DatePicker>
                </Col>
                <Col span="6">
                    <span class="conditionTitle">结束时间：</span>
                    <DatePicker
                        type="datetime"
                        placeholder="请选择结束时间"
                        style="width: 60%"
                        v-model="conditions.endTime"
                    ></DatePicker>
                </Col>
                <Col span="6">
                    <Button type="primary" icon="ios-search" @click="queryList()">查询</Button>
                </Col>
            </Row>
        </div>
        <div class="list">
            <Tabs value="card">
                <TabPane label="卡片" name="card">
                    <Row class="cardWrap">
                        <Col span="6" v-for="(item,index) in customerData" :key="index">
                            <div class="infoList">
                                <div class="company">
                                    <Icon type="android-bookmark"></Icon>
                                    <span>{{item.name}}</span>
                                </div>
                                <div>
                                    <Row>
                                        <Col span="10" offset="1" class="columns">
                                            <Icon type="ios-home"></Icon>
                                            <span>{{item.address}}</span>
                                        </Col>
                                        <Col span="10" offset="2" class="columns">
                                            <Icon type="android-call"></Icon>
                                            <span>{{item.phone}}</span>
                                        </Col>
                                        <Col span="10" offset="1" class="columns">
                                            <Icon type="card"></Icon>
                                            <span>{{item.account}}</span>
                                        </Col>
                                        <Col span="10" offset="2" class="columns">
                                            <Icon type="android-mail"></Icon>
                                            <span>{{item.mail}}</span>
                                        </Col>
                                        <Col span="10" offset="1" class="columns">
                                            <Icon type="ios-barcode"></Icon>
                                            <span>{{item.creditNo}}</span>
                                        </Col>
                                        <Col span="10" offset="2" class="columns">
                                            <Icon type="cash"></Icon>
                                            <span>{{item.bank}}</span>
                                        </Col>
                                        <Col span="10" offset="2">
                                            <div class="crtTime">
                                                <Icon type="android-time"></Icon>
                                                <span>{{item.crtTime}}</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane label="表格" name="table" class="table">
                    <Table :columns="companyColumn" :data="customerData" style="height: 600px"></Table>
                </TabPane>
            </Tabs>
        </div>
        <Page
            :total="page.total"
            :current="page.current"
            :page-size="page.pageSize"
            show-sizer
            show-total
            :page-size-opts="[12,24,36]"
            placement="top"
            @on-change="handlePage"
            @on-page-size-change="handlePageSize"
            show-elevator
            :style="pageStyle"
        ></Page>
    </div>
</template>

<script lang="ts" src="./listCustomer.ts"></script>

<style lang="less">
    @import './listCustomer.less';
</style>

