<template>
	<!-- 用户个人信息开始 -->
	<view class=" bg-blue flex">
		<image class="face margin-left-sm margin-bottom-sm" :src="UserInfo.avatar" />
		<view class="margin-left-sm margin-top-sm">
			<view class="text-sxl text-bold margin-top-xs">{{UserInfo.nickName}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			UserInfo: Object
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
.face {
		width: 130rpx;
		height: 130rpx;
		overflow: hidden;
		border-radius: 50%;
		border: 10rpx rgba(225,225,225,.8) solid;
	}

	/* 解决支付宝小程序不显示小图标 */
	/*  #ifdef  MP-ALIPAY  */
	.cu-list.menu>.cu-item .content>image {
		width: 48rpx;
		height: 48rpx;
	}

	/*  #endif  */
</style>
