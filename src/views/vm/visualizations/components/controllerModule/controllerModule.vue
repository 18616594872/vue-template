<template>
    <div class="ControllerModule-wrap">
        <div class="Title">
			<module-title v-bind="title"></module-title>
		</div>

		<div style="display:inline">
			<div class="infoBox">
				<div class="infoTitle">
					<div>{{jinggai.name}}</div>
					<div>
						<img :src="jinggai.url" width="50%">
					</div>
				</div>
				<div class="infoContent">
					<div class="content openClass">
						<div>开</div>
						<div>{{jinggai.open}}</div>
					</div>
					<div class="content closeClass">
						<div>关</div>
						<div>{{jinggai.close}}</div>
					</div>
					<div class="content faultClass">
						<div>故障</div>
						<div>{{jinggai.fault}}</div>
					</div>
					<!-- <div class="content">
						<div>其他</div>
						<div>{{jinggai.other}}</div>
					</div> -->
				</div>
			</div>
			<div class="infoBox">
				<div class="infoTitle">
					<div>{{baiye.name}}</div>
					<div>
						<img :src="baiye.url" width="50%">
					</div>
				</div>
				<div class="infoContent">
					<div class="content openClass">
						<div>开</div>
						<div>{{baiye.open}}</div>
					</div>
					<div class="content closeClass">
						<div>关</div>
						<div>{{baiye.close}}</div>
					</div>
					<div class="content faultClass">
						<div>故障</div>
						<div>{{baiye.fault}}</div>
					</div>
					<!-- <div class="content">
						<div>其他</div>
						<div>{{baiye.other}}</div>
					</div> -->
				</div>
			</div>
		</div>

		<div style="display:inline">
			<div class="infoBox2">
				<div class="infoTitle2">
					<div>{{fengji.name}}</div>
					<div>
						<img :src="fengji.url" width="60%">
					</div>
				</div>
				<div class="infoContent2">
					<div class="content2 openClass">
						<div>开</div>
						<div>{{fengji.open}}</div>
					</div>
					<div class="content2 closeClass">
						<div>关</div>
						<div>{{fengji.close}}</div>
					</div>
				</div>
			</div>
			<div class="infoBox2">
				<div class="infoTitle2">
					<div>{{zhaoming.name}}</div>
					<div>
						<img :src="zhaoming.url" width="60%">
					</div>
				</div>
				<div class="infoContent2">
					<div class="content2 openClass">
						<div>开</div>
						<div>{{zhaoming.open}}</div>
					</div>
					<div class="content2 closeClass">
						<div>关</div>
						<div>{{zhaoming.close}}</div>
					</div>
				</div>
			</div>
			<div class="infoBox2">
				<div class="infoTitle2">
					<div>{{shuibeng.name}}</div>
					<div>
						<img :src="shuibeng.url" width="60%">
					</div>
				</div>
				<div class="infoContent2">
					<div class="content2 openClass">
						<div>开</div>
						<div>{{shuibeng.open}}</div>
					</div>
					<div class="content2 closeClass">
						<div>关</div>
						<div>{{shuibeng.close}}</div>
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

