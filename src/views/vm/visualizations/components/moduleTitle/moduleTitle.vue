<template>
    <div class="ModuleTitle-wrap">
        <img
            class="left"
            src='../../../../../assets/images/vm/vm_module_title_bg.png'
        >
        <p>{{name}}</p>
        <router-link :to="{name: turnTo}" class="jupe" v-if="showFlag">
            <img src="../../../../../assets/images/vm/switch-terrace.png">
        </router-link>
    </div>
</template>

<script lang="ts" src="./moduleTitle.ts"></script>

<style lang="less">
    @import './moduleTitle.less';
</style>

