<template>
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
		methods:{
			goToStore(e){
				this.$emit("goToStore",e)
			}
		}
	}
</script>

<style>
</style>