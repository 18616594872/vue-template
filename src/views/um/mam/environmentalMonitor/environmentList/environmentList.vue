<template>
    <div class="environmentList-wrap">
        <ul class="equipDataContent">
            <li v-for="(equipmentData,index) in equipmentDataList " :key="index" class="dataLis">
                <equipment-detail /> 
            </li>
        </ul>
        <div class="video"></div>
    </div>
</template>

<script lang="ts" src="./environmentList.ts"></script>

<style lang="less">
    @import './environmentList.less';
</style>

