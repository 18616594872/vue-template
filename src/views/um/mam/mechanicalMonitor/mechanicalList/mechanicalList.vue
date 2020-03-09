<template>
    <div class="mechanicalList-wrap">
        <div class="equipCardData" v-if="showCard">
            <ul class="equipDataContent">
                <li v-for="(controlData,index) in equipmentDataList.card " :key="index" class="dataLis">
                    <equip-type-component :equipTypeDate="controlData" />
                </li>
            </ul>
            <div class="video"></div>
        </div>
        <div class="equipTableData" v-if="!showCard">
            <Table :columns="equipTypeDataTitle" :data="equipmentDataList.table" class="environTable"></Table>
            <Page class="page" :total="page.total" :current="page.current" :page-size="page.pageSize" show-sizer show-total :page-size-opts="[12,24,36]" placement="top" show-elevator></Page>
        </div>
    </div>
</template>

<script lang="ts" src="./mechanicalList.ts"></script>

<style lang="less">
    @import '../../../../../assets/less/environment.less';
</style>