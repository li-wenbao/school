<template name="myList">
	<view class="list">
		<view class="flex justify-between padding-bottom-sm margin-sm" v-for="(item,index) in storeList" :key="index" :data-data="item"
		 @click="hanlderThe">
			<view class style="width:160rpx;height:160rpx;overflow: hidden;position: relative;">
				<view class="rag text-white" v-if="item.storetype==0">已停业</view>
				<image style="width:160rpx;height:160rpx;border-radius:8rpx; display: block;" mode="scaleToFill" lazy-load="true" :src="imgurl + item.logoId +'.json'" />
			</view>
			<view style="width:510rpx">
				<view class="padding-bottom-xs text-black text-bold text-xl">{{item.name}}</view>
				<view class="flex justify-between padding-bottom-xs text-jiujiu">
					<view class="margin-top-xs">
						<text class="cuIcon-favorfill text-orange text-sm"></text>
						<text class="text-sm">{{item.merchantStat}}</text>
						<text class="margin-left-sm text-sm">月销{{item.count}}</text>
					</view>
				</view>
				<view class="padding-bottom-xs margin-top-xs solid-bottom text-sm">
					<text class="text-sm">起送</text>
					<text class="text-price text-sm">{{item.initialDeliveryPrice}}</text>
					<text class="margin-left-sm text-sm">配送</text>
					<text class="text-price text-sm">{{item.distributionFee}}</text>
					<!-- <text class="margin-left-sm text-sm">人均</text>
					<text class="text-price text-sm">{{item.averageConsume}}</text> -->
				</view>
			</view>
		</view>
		<view v-if="loading" class="cu-load loading"></view>
		<view v-if="over" class="cu-load over"></view>
		<!-- </scroll-view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			storeList: {
				type: Array
			},
			loading:{
				type: Boolean,
				default: false
			},
			over:{
				type: Boolean,
				default: false
			},
			imgurl:{
				type:String,
				default:""
			}
		},
		methods: {
			hanlderThe(e){
				this.$emit("hanlder",e)
			},
		}
	}
</script>

<style>
	.cu-load::before {
		font-family: "cuIcon";
		display: inline-block;
		margin-right: 6rpx;
		font-size: 36rpx;
	}

	.cu-load.loading::after {
		content: "加载中...";
		font-size: 32rpx;
	}

	.cu-load.erro::before {
		font-size: 36rpx;
		content: "\e658";
	}

	.cu-load.over::after {
		content: "定位失败，点击重试";
		font-size: 32rpx;
	}

	.location-img {
		width: 40rpx;
		height: 40rpx;
	}

	/* 重写轮播图样式 */
	.swiper {
		height: 200rpx;
		width: 690rpx;
		margin: 0rpx auto;
	}

	/* 自定义标签 */
	.my-tag {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-top: 10px;
	}
	
	.rag{
		text-align: center;
		background: red;
		position: absolute;
		bottom: 0;
		z-index: 999;
		width:160rpx;
	}
</style>
