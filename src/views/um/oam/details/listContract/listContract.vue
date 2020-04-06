<template>
    <div class="listContract-wrap">
        <div class="queryCondition">
            <Row>
                <Col span="6">
                    <span class="conditionTitle">合同编号：</span>
                    <Input v-model="conditions.contractId" placeholder="请输入合同编号" style="width: 60%"></Input>
                </Col>
                <Col span="6">
                    <span class="conditionTitle">合同名称：</span>
                    <Input
                        v-model="conditions.contractName"
                        placeholder="请输入合同名称"
                        style="width: 60%"
                    ></Input>
                </Col>
                <Col span="6">
                    <span class="conditionTitle">付款方式：</span>
                    <Select v-model="conditions.payment" style="width: 60%" id="payment">
                        <Option value="null">所有</Option>
                        <Option
                            v-for="(item,index) in selectList.payTypes"
                            :key="index"
                            :value="item.val"
                        >{{item.key}}</Option>
                    </Select>
                </Col>
                <Col span="6">
                    <span class="conditionTitle">合同状态：</span>
                    <Select v-model="conditions.contractStatus" style="width: 60%">
                        <Option value="null">所有</Option>
                        <Option
                            v-for="(item,index) in selectList.contractStatus"
                            :key="index"
                            :value="item.val"
                        >{{item.key}}</Option>
                    </Select>
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
                    <Poptip placement="bottom">
                        <span class="conditionTitle">企业客户：</span>
                        <Input v-model="customerName" placeholder="请选择客户" id="cusInput"/>
                        <div class="pop" slot="content">
                        </div>
                    </Poptip>
                </Col>
                <Col span="6">
                    <Button type="primary" @click="resetPageAndSearch" icon="ios-search" v-permission="[':search']">查询</Button>
                </Col>
            </Row>
        </div>
        <div class="list">
            <Tabs value="card">
                <TabPane label="卡片" name="card">
                    <div class="nullData" v-show="isNullData">暂无数据</div>
                    <Row class="cardWrap">
                        <Col span="6" v-for="(item,index) in contractList" :key="index">
                            <div class="contracts">
                                <div
                                    style="display: table-cell;vertical-align: middle;text-align: center;"
                                >
                                    <div class="contractName" @click="edit(index)">
                                        <span>{{item.name}}</span>
                                    </div>
                                    <div>
                                        <div class="item">
                                            <div class="title">公司：</div>
                                            <div class="info">{{ item.companyName }}</div>
                                        </div>
                                        <div class="item">
                                            <div class="title">联系方式：</div>
                                            <div class="info">{{ item.tel }}</div>
                                        </div>
                                        <div class="item">
                                            <div class="title">合同状态：</div>
                                            <div
                                                :class="['info',{'red': item.contractStatus === '过期'}]"
                                            >{{ item.contractStatus }}</div>
                                        </div>
                                        <div class="item">
                                            <div class="title">创建时间：</div>
                                            <div class="info">{{ item.crtTime }}</div>
                                        </div>
                                        <div class="item">
                                            <div class="title">付款方式：</div>
                                            <div class="info">{{ item.payType }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane label="表格" name="table" class="table">
                    <Table :columns="contractColumn" :data="contractData" style="height: 600px"  disabled-hover></Table>
                </TabPane>
            </Tabs>
        </div>
        <Page
            :total="page.total"
            :current="page.current"
            :page-size-opts="[8,16,24]"
            :page-size="page.pageSize"
            show-sizer
            show-total
            placement="top"
            @on-change="handlePage"
            @on-page-size-change="handlePageSize"
            show-elevator
            :style="pageStyle"
        ></Page>
    </div>
</template>

<script lang="ts" src="./listContract.ts"></script>

<style lang="less">
    @import './listContract.less';
</style>

