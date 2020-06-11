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
		<UserProfile></UserProfile>
		<view class="cu-list menu sm-border margin-top-sm">
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/user/address/address" hover-class="none">
					<image src="/static/menu/location.png" class="png" mode="aspectFit" />
					<text>我的地址</text>
				</navigator>
			</view>
			<view class="cu-item arrow" @click="goTel">
				<button class="cu-btn content" open-type="contact">
					<image src="/static/menu/service.png" class="png" mode="aspectFit" />
					<text>联系客服</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import Json from '../../json.js';
	import UserProfile from "./components/userProfile.vue"
	export default {
		components: {
			UserProfile,
		},
		data() {
			return {}
		},
		onLoad: function() {},
		onShow: function() {},
		methods: {
			
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
