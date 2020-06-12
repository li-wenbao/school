<template>
	<view class="page">
		<cu-custom :bgColor="'bg-blue'" :isBack="true">
			<block slot="content">
				我的收货地址
			</block>
		</cu-custom>
		<view class="padding-sm">
			<block v-for="(item,index) in myLocation" :key="index">
				<view class="bg-white border-bottom flex justify-between align-center margin-top-sm margin-bottom-sm">
					<view class="flex-sub">
						<view class="flex">
							<view>
								<text class="margin-right-sm text-black text-lg">{{item.address}}</text>
							</view>
							<view>
								<text v-if="item.tag !==''" class="cu-tag bg-olive light sm">{{item.tag}}</text>
							</view>
						</view>
						<view class="text-sm text-grey margin-top-xs">
							<text class="margin-right">{{item.name}}</text>
							<text>{{item.tel}}</text>
						</view>
					</view>
					<view class="flex justify-center align-center">
						<navigator url="/pages/user/address/fixAddress" hover-class="none" class="solid-top flex justify-between">
							<text class="cuIcon-edit text-xxxl text-grey"></text>
						</navigator>
					</view>
				</view>
			</block>
			<navigator url="/pages/user/address/addAddress" hover-class="none" class="solid-top padding-tb flex justify-between">
				<view class="text-blue">新增地址</view>
				<view><text class="cuIcon-right text-grey"></text></view>
			</navigator>
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
							address: "云南农业大学13栋",
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
		methods: {
			
		}
	};
</script>

<style>
</style>
