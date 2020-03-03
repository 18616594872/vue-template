<template>
    <div class="videoDisplay-wrap">
        <Title :data="videoDisplayTitle"/>
        <div class="video-display-wrap">
            <SelectTemp class="select-temp-wrap" :data="tunnelSelect"/>
            <div class="video-warp">
                <video-loop :videolist="videos" :videoNumber="1"></video-loop>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./videoDisplay.ts"></script>

<style lang="less">
    @import './videoDisplay.less';
</style>

