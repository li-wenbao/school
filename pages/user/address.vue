<template>
	<view class="page">
		<cu-custom :bgColor="'bg-blue'" :isBack="true">
			<block slot="backText">我的收货地址</block>
			<block slot="content"></block>
			<block slot="right">
				<view class="action"></view>
			</block>
		</cu-custom>
		<view>
			<view class="bg-white padding-lr margin-top-sm margin-lr radius">
				<view v-for="(item,index) in myLocation" :key="index" class="solid-bottom padding-tb flex justify-between align-center">
					<view style="width:500upx;">
						<view class="flex">
							<view>
								<text class="margin-right-sm text-black text-lg">{{item.address}}</text>
							</view>
							<view>
								<text v-if="item.tag !==''" class="cu-tag bg-olive light sm">{{item.tag}}</text>
							</view>
						</view>
						<view class="text-sm text-grey">
							<text class="margin-right">{{item.name}}</text>
							<text>{{item.tel}}</text>
						</view>
					</view>
					<view class="text-right" style="width:80upx;">
						<navigator url="/pages/user/fixAddress" hover-class="none" class="solid-top padding-tb flex justify-between">
							<text class="cuIcon-edit text-xxxl text-grey"></text>
						</navigator>
					</view>
				</view>
				<navigator url="/pages/user/addAddress" hover-class="none" class="solid-top padding-tb flex justify-between">
					<view class="text-blue">新增地址</view>
					<view><text class="cuIcon-right text-grey"></text></view>
				</navigator>
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
				myLocation: [{
						address: "云南农业大学13栋",
						name: "某同学",
						tel: "18211112222",
						tag: "学校"
					},
					{
						address: "云南农业大学综合楼 507",
						name: "某同学",
						tel: "18211112222",
						tag: ""
					},
					{
						address: "昆明理工大学计算机与科学技术学院",
						name: "某同学",
						tel: "18211112222",
						tag: "学校"
					}
				]
			};
		},
		computed: {
			// 计算属性的 getter
		},
		onLoad: function() {},
		onShow: function() {
			console.log("pages/user/address");
		},
		methods: {}
	};
</script>

<style>
</style>
