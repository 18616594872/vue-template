<template>
    <div class="MeasureModule-wrap">
        <div class="Title">
			<module-title v-bind="title"></module-title>
		</div>
        <div  v-for="(item,key) in gaugeCharts" :key="key" :class="'myChart myChart_item_'+key">
			<Simple-gauge :bindData="item" :ref="item.id"></Simple-gauge>
		</div>
    </div>
</template>

<script lang="ts" src="./measureModule.ts"></script>

<style lang="less">
    @import './measureModule.less';
</style>

