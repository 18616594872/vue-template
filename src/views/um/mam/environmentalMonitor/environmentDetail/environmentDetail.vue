<template>
    <div class="environmentDetail-wrap">
        <Table :columns="equipTypeDataTitle" :data="equipTypeDataList" class="environTable"></Table>
        <Page
            class="page"
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

<script lang="ts" src="./environmentDetail.ts"></script>

<style lang="less">
    @import './environmentDetail.less';
</style>

