<template>
	<view class="header" :style="[{height:CustomBar + 120 + 'px'}]">
		<!-- 商家页面头部展示信息 -->
		<view class="bgImage" style="width:100%;" :style="[{height:CustomBar + 30 + 'px'}]" :class="store.logo?'':'bg-blue'">
			<image :src="store.logo" style="width:100%;" :style="[{height:CustomBar + 30 + 'px'}]" mode="aspectFill" />
			<view class="mask"></view>
		</view>
		<!-- <view class="bg-white" style="height:90px;width:100%"></view> -->
		<view class="top">
			<view class="cu-bar text-white" :style="barHeight">
				<view class="action" @tap="BackPage">
					<!-- #ifdef MP-WEIXIN -->
					<text class="cuIcon-back"></text>
					<!-- #endif -->
				</view>
			</view>
			<view class="margin-lr margin-top-sm padding-sm bg-white shadow radius10" style="width:690rpx">
				<view class="flex justify-between">
					<view style="width:100rpx;height:100rpx">
						<image style="width:100rpx;height:100rpx;border-radius:8rpx; " lazy-load="true" mode="aspectFit" :src="store.logo" />
					</view>
					<view class="margin-left-sm" style="width:410rpx">
						<view class="text-black text-bold text-xl">{{store.shop}}</view>
						<view class="text-grey text-sm padding-tb-xs">
							<text class="cuIcon-favorfill text-orange"></text>
							<text>{{store.grade[0]}}</text>
							<text class="margin-lr-sm">|</text>
							<text>配送约{{store.duration}}分钟</text>
						</view>
					</view>
					<view class="text-center" style="width:120rpx">
						<button class="cu-btn round line-black" role="button" aria-disabled="false">关注</button>
					</view>
				</view>
				<view class="text-grey text-sm margin-top-xs">
					<!-- <text>公告：{{store.notice}}</text> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			store: Object
		},
		data() {
			return {
				height: 0,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				// store: {
				// 	id: 1,
				// 	name: "豚骨拉面(怡园风味)",
				// 	notice: "新用户即可领取5元无门槛红包",
				// }
			}

		},
		computed: {
			bgImageHeight() {
				let CustomBar = this.CustomBar;
				let bgImage = this.store.bgImage;
				return `height:${CustomBar + 30}px;`;
			},
			barHeight() {
				let StatusBar = this.StatusBar;
				let CustomBar = this.CustomBar;
				return `height:${CustomBar}px;padding-top:${StatusBar}px;`;
			},
			style() {
				let CustomBar = this.CustomBar;
				return `height:calc(100vh - ${CustomBar}px - 120px - 50px);`;
			},
		},
		methods: {
			BackPage() {
				if (getCurrentPages().length < 2 && "undefined" !== typeof __wxConfig) {
					let url = "/" + __wxConfig.pages[0];
					return uni.redirectTo({
						url
					});
				}
				uni.navigateBack({
					delta: 1
				});
			},
		}
	}
</script>

<style scoped>
	.header {
		position: relative;
		z-index: 1
	}

	.bgImage {
		background-size: 100% 100%;
		position: relative;
	}

	.mask {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: rgba(12, 12, 12, 0.4);
	}

	.top {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 9999;
	}
</style>
