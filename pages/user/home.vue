<template>
	<view class="page">
		<cu-custom :bgColor="'bg-blue'" :isBack="false">
			<block slot="backText"></block>
			<block slot="content">
				<!-- #ifndef MP-ALIPAY -->
				我的
				<!-- #endif -->
			</block>
			<block slot="right">
				<view class="action"></view>
			</block>
		</cu-custom>
		<view>
			<!-- 用户个人信息开始 -->
			<view class=" bg-blue flex">
				<image class="face margin-left-sm margin-bottom-sm" :src="UserInfo.avatar" />
				<view class="margin-left-sm margin-top-sm">
					<view class="text-sxl text-bold margin-top-xs">{{UserInfo.nickName}}</view>
				</view>
			</view>
			<!-- #ifdef MP-ALIPAY -->
			<!-- <view class="bg-blue padding flex">
				<image class="face margin-left-sm margin-bottom-sm" :src="userInfo.avatar" />
				<view class="margin-left-sm margin-top-xs">
					<view class="text-xxl text-bold margin-bottom">{{userInfo.nickName}}</view>
				</view>
			</view> -->
			<!-- #endif -->
			<!-- 用户个人信息结束 -->
			<!-- 操作菜单开始 -->
			<view class="cu-list menu sm-border margin-top-sm">
				<view class="cu-item arrow">
					<navigator class="content" url="/pages/user/address" hover-class="none">
						<image src="/static/menu/location.png" class="png" mode="aspectFit" />
						<text>我的地址</text>
					</navigator>
				</view>
				<!-- <view class="cu-item arrow">
					<navigator class="content" url="/pages/user/favor" hover-class="none">
						<image src="/static/menu/collect.png" class="png" mode="aspectFit" />
						<text>我的收藏</text>
					</navigator>
				</view> -->
				<view class="cu-item arrow" @click="goTel">
					<button class="cu-btn content" open-type="contact">
						<image src="/static/menu/service.png" class="png" mode="aspectFit" />
						<text>联系客服</text>
					</button>
				</view>
				<!--  <view class="cu-item arrow">
          <navigator class="content" url="/pages/user/help" hover-class="none">
            <image src="/static/menu/help.png" class="png" mode="aspectFit" />
            <text>帮助和反馈</text>
          </navigator>
        </view> 
       <view class="cu-item arrow">
          <view class="content">
            <image src="/static/menu/rule.png" class="png" mode="aspectFit" />
            <text>规则中心</text>
          </view>
        </view>
        <view class="cu-item arrow">
          <view class="content">
            <image src="/static/menu/account.png" class="png" mode="aspectFit" />
            <text>修改账号</text>
          </view> -->
				<!-- <view class="action">
					<text class="text-grey">{{hideTel}}</text>
				</view> -->
				<!-- </view> -->
			</view>
			<!-- 操作菜单结束 -->
			<!-- <view class="margin-top padding flex flex-direction">
        <button
          class="cu-btn bg-white lg text-black"
          role="button"
          aria-disabled="false"
        >退出账号</button>
      </view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				UserInfo: {
					// avatar: "https://tfs.alipayobjects.com/images/partner/TB1c1dbbz9EDuNjmgXUXXbCKXXa",
					// nickName: "文保"
				},
				avatar: '',
				nickName: ''
			};
		},
		computed: {

		},
		onLoad: function() {
			this.getUserInfoMt()
			console.log("sdhsnhsighsdui", this.UserInfo)
		},
		onShow: function() {
			// console.log("pages/user/home");

		},
		methods: {
			getUserInfoMt() {
				// #ifdef MP-ALIPAY
				my.getAuthCode({
					scopes: 'auth_user',
					success: (auth) => {
						uni.getUserInfo({
							provider: 'alipay',
							success: (result) => {
								console.log('getUserInfo success', result);
								this.UserInfo = result
							},
							fail: (error) => {
								console.log('getUserInfo fail', error);
								let content = error.errMsg;
								if (~content.indexOf('uni.login')) {
									content = '请在登录页面完成登录操作';
								}
							}
						});
					},
					fail: (error) => {
						console.log(error)
					}
				});
				// #endif
			},
			goTel() {
				uni.makePhoneCall({
					// 手机号
					phoneNumber: '110119',
					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}
				});
			}
		}
	};
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
