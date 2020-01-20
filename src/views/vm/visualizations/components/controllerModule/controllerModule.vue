<template>
	<div class="ControllerModule-wrap">
		<div class="Title">
			<module-title v-bind="title"></module-title>
		</div>

		<div style="display:inline">

			<div v-for="(item, index) in equipmentState" :key="index"
				:class="item.typeId === 58 || item.typeId === 56 ? 'infoBox' : 'infoBox2'">
				<div :class="item.typeId === 58 || item.typeId === 56 ? 'infoTitle' : 'infoTitle2'">
					<div>{{item.name}}</div>
					<div><img :src="item.url"
							:style="{ 'width': item.typeId === 58 || item.typeId === 56 ? '50%' : '60%'}"></div>
				</div>
				<div :class="item.typeId === 58 || item.typeId === 56 ? 'infoContent' : 'infoContent2'">
					<div :class="item.typeId === 58 || item.typeId === 56 ? 'content openClass' : 'content2 openClass'">
						<div>开</div>
						<div>{{item.open}}</div>
					</div>
					<div
						:class="item.typeId === 58 || item.typeId === 56 ? 'content closeClass' : 'content2 closeClass'">
						<div>关</div>
						<div>{{item.close}}</div>
					</div>
					<div class="content faultClass" v-if="item.typeId === 58 || item.typeId === 56 ? true : false">
						<div>故障</div>
						<div>{{item.fault}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" src="./controllerModule.ts"></script>

<style lang="less">
	@import './controllerModule.less';
</style>