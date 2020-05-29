<template>
	<view class="padding-sm">
		<!-- 为你优选开始 -->
		<view class="flex justify-between align-center margin-top">
			<view class="text-black text-bold text-sxl">为你优选</view>
			<view @click="goToMoreStore" data-id="为你优选">
				<text class="check-more">更多</text>
				<text class="cuIcon-right"></text>
			</view>
		</view>
		<view class="flex padding-tb-sm justify-between">
			<view v-for="(item,index) in  cateList" :key="index" :data-id="item.id" @click="goToStore">
				<view class style="width:210rpx;height:180rpx;overflow: hidden;">
					<image style="width:210rpx;height:180rpx;border-radius:8rpx; " mode="scaleToFill" lazy-load="true" :src="item.url" />
				</view>
				<view>
					<view class="text-cut text-xsl margin-xs margin-left-none margin-right-none" style="width:210rpx;">{{item.name}}</view>
					<view class="text-grey text-sm">好评率{{item.rate}}%</view>
				</view>
			</view>
		</view>
		
		

		<!-- <view class="prefer-content">
		<view class="prefer-title">
			为你优选
		</view>
		<scroll-view scroll-x="true" class="scroll" scroll-with-animation="true">
			<view class="prefer-dis">
				<block v-for="(item, index) in preferdata" :key="index">
					<view class="prefer-view">
						<image :src="item.image" mode="aspectFill"></image>
						<text>{{item.title}}</text>
						<text>{{item.lable}}</text>
					</view>
				</block>	
			</view>
		</scroll-view>
	</view> -->
	</view>
</template>

<script>
	export default {
		props: {
			preferdata: Array,
			cateList:Array,

		},
		data() {
			return {

			}
		},
	}
</script>

<style scoped>
	.prefer-content {
		margin: 30upx 0;
	}

	.prefer-title {
		font-size: 35upx;
		height: 50upx;
		line-height: 50upx;
		margin-bottom: 20upx;
	}

	.scroll {
		white-space: nowrap;
		width: 100%;
		height: 300upx;
	}

	.prefer-dis {
		display: flex;
		justify-content: space-between;
	}

	.prefer-view {
		height: 300upx;
		width: 300upx;
		padding: 0 8upx;
	}

	.prefer-view image {
		width: 300upx;
		height: 200upx;
		border-radius: 8upx;
	}

	.prefer-view text {
		height: 45upx;
		line-height: 45upx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}

	.prefer-view text:nth-child(2) {
		font-size: 30upx;
	}

	.prefer-view text:nth-child(3) {
		font-size: 27upx;
		color: #9c9c9c;
	}

	.prefer-dis view:nth-child(2) {
		padding: 0 7upx !important;
	}
</style>
