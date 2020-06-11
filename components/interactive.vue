<template>
	<view class="page bg-white flex inter-box">
		<view class="inter-massge" v-if="noNetwork">
			<image src="../../static/interactuve/nonetwork.png"></image>
			<view class="text-xl text-jiujiu">我猜你肯定没网了哦！</view>
		</view>
		<view class="inter-massge" v-if="!nodata">
			<image src="../../static/interactuve/nodata.png"></image>
			<view class="text-xl text-jiujiu">还没有数据哦！</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noNetwork: false,
				noData: false,
			}
		},
		onLoad() {

		},
		onShow() {
			
		}
	}
</script>

<style>
</style>
