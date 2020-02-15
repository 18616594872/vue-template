<template>
    <div class="mainPage-wrap layout-wrap">
        <UMTopPage :itemMenu="navBar" :refeshPath="refeshPath" @bingSend="propMsg"
            @bingIsShow="propIsShowLeftMenu" />
        <div class="main-content-wrap">
            <UMLeftMenu class="left-menu" v-if="isShowLeftMenu" :menuData="leftMenu"/>
            <div class="content-wrap">
                <router-view></router-view>
            </div>
        </div>
        <div class="footer-wrap">
            2019-2020
        </div>
    </div>
</template>

<script lang="ts" src="./mainPage.ts"></script>

<style lang="less">
    @import './mainPage.less';
</style>

