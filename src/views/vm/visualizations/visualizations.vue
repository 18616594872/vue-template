<template>
	<div id="VMMain">
		<div class="MainContent">
			<div class="VmHead">

			</div>
			<div class="AlarmModule">
				<alarm-module></alarm-module>
			</div>
			<div class="CommonModule">
				<common-module></common-module>
			</div>
			<div class="EquipmentModule">
				<equipment-module></equipment-module>
			</div>
			<div class="InspectModule">
				<inspect-module></inspect-module>
			</div>
			<div class="MapModule">
			</div>
			<div class="MeasureModule">
			</div>
			<div class="MotionModule">
				<controller-module></controller-module>
			</div>
			<div class="ThreeDimensionsModule">
				<motion-module></motion-module>
			</div>
			<div class="VideoModule">
			</div>
		</div>
	</div>
</template>

<script lang="ts" src="./visualizations.ts"></script>

<style lang="less">
	@import './visualizations.less';
</style>