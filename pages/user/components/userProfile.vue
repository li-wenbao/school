<template>
	<!-- 用户个人信息开始 -->
	<view class=" bg-blue flex">
		<!-- #ifdef MP-ALIPAY -->
		<image class="face margin-left-sm margin-bottom-sm" :src="UserInfo.avatar" />
		<view class="margin-left-sm margin-top-sm">
			<view class="text-sxl text-bold margin-top-xs">{{UserInfo.nickName}}</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<open-data type="userAvatarUrl" class="weixin-face margin-left-sm margin-bottom-sm"></open-data>
		<view class="margin-left-sm margin-top-sm">
			<open-data type="userNickName"></open-data>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				UserInfo: {}
			}
		},
		mounted() {
			this.getUserInfoMt()
		},
		methods: {
			getUserInfoMt() {
				// #ifdef MP-ALIPAY
				my.getAuthCode({
				  scopes: 'auth_user',
				  success: (res) => {
				    my.getAuthUserInfo({
				      success: (userInfo) => {
						  this.UserInfo = userInfo
				      }
				    });
				  },
				});
				
				// #endif
				
				// 查看是否授权
				wx.getSetting({
				  success (res){
					if (res.authSetting['scope.userInfo']) {
					  // 已经授权，可以直接调用 getUserInfo 获取头像昵称
					  wx.getUserInfo({
						success: function(res) {
							this.UserInfo = res.userInfo
						  console.log(res.userInfo)
						}
					  })
					}
				  }
				})
			},
		}
	}
</script>

<style>
	.face {
		width: 130rpx;
		height: 130rpx;
		overflow: hidden;
		border-radius: 50%;
		border: 10rpx rgba(225, 225, 225, .8) solid;
	}
	
	.weixin-face {
	width: 100rpx;
	height: 100rpx;
	overflow: hidden;
	border-radius: 50%;
	border: 10rpx rgba(225, 225, 225, .8) solid;
	
	}


	/* 解决支付宝小程序不显示小图标 */
	/*  #ifdef  MP-ALIPAY  */
	.cu-list.menu>.cu-item .content>image {
		width: 48rpx;
		height: 48rpx;
	}

	/*  #endif  */
</style>
