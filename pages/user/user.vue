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
		<UserProfile :UserInfo="UserInfo"></UserProfile>
		<IList></IList>
	</view>
</template>

<script>
	import Json from '../../json.js';
	import UserProfile from "./components/userProfile.vue"
	import IList from "./components/iList.vue"
	export default {
		components: {
			UserProfile,
			IList
		},
		data() {
			return {
				UserInfo: {}
			}
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
								// ...
							}
						});
					},
					fail: (error) => {
						console.log(error)
					}
				});
				// #endif

				uni.getUserInfo({
					provider: 'weixin',
					success: function(loginRes) {
						// 获取用户信息
						console.log(loginRes.authResult);
					}
				})


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
	}
</script>

<style>

</style>
