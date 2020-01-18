<template>
    <div class="EquipmentModule-wrap">
        <div class="Title">
            <module-title v-bind="title"></module-title>
        </div>
        <div class="topBox">
            <ul class="stateLists">
                <li :key="key" v-for="(item,key) in stateDataLists">
                    <div class="stateList-content">
                        <span>{{ item.name }}</span>
                        <span>{{ item.value }}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="bottomBox">
            <stack-bar :bindData="bindData"/>
        </div>
    </div>
</template>

<script lang="ts" src="./equipmentModule.ts"></script>

<style lang="less">
    @import './equipmentModule.less';
</style>

