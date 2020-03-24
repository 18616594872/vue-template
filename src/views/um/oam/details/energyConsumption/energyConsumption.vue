<template>
    <div class="energyConsumption-wrap">
        <Row>
            <div class="periodEnergy">
                <Col span="8" v-for="item in periodData" :key="item.text">
                    <div class="dataBox">
                        <Icon :type="item.icon" class="energyIcon"/>
                        <span>{{ item.text }}</span>
                        <span class="value">{{ item.value }}</span>
                        <span>{{ item.unit }}</span>
                    </div>
                </Col>
            </div>
        </Row>
        <Row style="margin: 0 20px;">
            <Col span="10">
                <div class="pie">
                    <Chart :bindData="pieChart"></Chart>
                </div>
            </Col>
            <Col span="14">
                <Row class="table">
                    <Col span="24">
                        <Row style="margin-bottom: 10px;">
                            <Col span="9" offset="1">
                                <span class="table_time_span">起始时间：</span>
                                <DatePicker
                                    type="date"
                                    placeholder="选择时间"
                                    style="width:61%"
                                ></DatePicker>
                            </Col>
                            <Col span="9">
                                <span class="table_time_span">结束时间：</span>
                                <DatePicker
                                    type="date"
                                    placeholder="选择时间"
                                    style="width: 61%"
                                ></DatePicker>
                            </Col>
                            <Col span="5">
                                <div style="position: relative;float: right;right: 0px;">
                                    <Button
                                        type="primary"
                                        icon="ios-search"
                                        class="search"
                                        @click="queryEnergies"
                                        size="small"
                                    >查询</Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span="22" offset="1">
                        <Table
                            size="small"
                            :columns="tableColumn"
                            :data="tableData"
                            ref="table"                            
                            disabled-hover
                            style="height: 28vmin"
                        ></Table>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row style="margin: 0 20px 10px 20px;">
            <Col span="10">
                <div class="radar">
                    <Chart :bindData="radarChart"></Chart>
                </div>
            </Col>
            <Col span="14">
                <div class="lineChartWrapper">
                    <Chart
                        style="width:90vmin;height:100%"
                        :bindData="lineChart"
                        ref="childChart"
                    ></Chart>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script lang="ts" src="./energyConsumption.ts"></script>

<style lang="less">
    @import './energyConsumption.less';
</style>

