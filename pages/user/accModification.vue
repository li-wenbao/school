<template>
	<view class="page">
		<cu-custom :bgColor="'bg-blue'" :isBack="true">
			<block slot="backText">账号修改</block>
			<block slot="content"></block>
			<block slot="right">
				<view class="action"></view>
			</block>
		</cu-custom>
		<view>
			<view class="changes">
				<view class="item-tit">更换手机号</view>
				<view class="item-sm">当前手机号
					<span><i>+86</i>315623156</span>
				</view>
			</view>
			<view class="cu-form-group margin-top border-custom">
				<view class="title">+86</view>
				<input type="number" placeholder="请输入手机号码" name="tel" maxlength="11" />
			</view>
			<view class="margin-top padding flex flex-direction">
				<button class="cu-btn bg-blue lg radius60" role="button" aria-disabled="false">获取验证码</button>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		/*
		初始化数据
		*/
		data() {
			return {

			};
		},
		computed: {
			// 计算属性的 getter
		},
		onLoad: function() {},
		onShow: function() {
			console.log("pages/user/favor");
		},
		methods: {

		}
	};
</script>

<style>
</style>
