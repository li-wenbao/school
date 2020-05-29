<template>
	<view class="cu-bar search bg-blue" style="position: fixed;width:750rpx;height:50px;z-index:888;">
		<view v-if="!isLocation" @click="getCurLocation" class="cu-load margin-left-sm text-left" :class="locationError?'erro over':'loading'"
		 style="width:400rpx;"></view>
		<navigator style="width:400rpx;" class="flex align-center" v-else url="/pages/home/location" hover-class="none">
			<image src="/static/location.png" class="location-img margin-left-sm" mode="aspectFit" />
			<text>{{addressModify}}</text>
			<text class="cuIcon-right" style="color: #FFFFFF;"></text>
		</navigator>
		<navigator class="search-form round" url="/pages/home/search" hover-class="none">
			<text class="cuIcon-search text-grey text-xl"></text>
			<input type="text" placeholder="搜索" confirm-type="search" />
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLocation: false,
				locationError: false,
				address: "昆明市",
			}
		}
	}
</script>

<style>
</style>
