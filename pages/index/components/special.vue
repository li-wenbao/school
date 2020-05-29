<template>
	<view class="padding-sm">
		<view class="flex justify-between align-center">
			<view class="text-black text-bold text-sxl">今日特价</view>
			<view @click="goToMoreStore" data-id="今日特价">
				<text>更多</text>
				<text class="cuIcon-right"></text>
			</view>
		</view>
		<view class="flex padding-tb-sm justify-between">
			<view v-for="(item,index) in  discountList" :key="index" :data-id="item.id" @click="goToStore">
				<view class style="width:210rpx;height:180rpx;overflow: hidden;">
					<image style="width:210rpx;height:180rpx;border-radius:8rpx; " mode="scaleToFill" lazy-load="true" :src="item.imgUrl" />
				</view>
				<view>
					<view class="text-cut text-black text-bold text-xsl margin-xs margin-left-none margin-right-none" style="width:210rpx;">{{item.name}}</view>
					<view class="text-grey">
						<text class="text-price text-orange margin-right-sm">{{item.bargain}}</text>
						<text class="text-price text-grey text-strikethrough">{{item.price}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:{
			discountList:Array
		},
	}
</script>

<style>
</style>
