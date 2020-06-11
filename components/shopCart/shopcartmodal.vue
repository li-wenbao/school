<template>
	<view class="cu-modal" :class="{ 'show': showModal }">
		<view class="cu-dialog radius20" style="background: none;">
			<view class="bg-white padding-sm radius20">
				<view class="flex margin-bottom-sm">
					<text class="text-black text-bold text-xl">黄焖鸡米饭小份</text>
				</view>
				<view class="margin-xs">
					<view class="flex margin-xs">
						<text class="text-sm text-gray">规格</text>
					</view>
					<view class="flex margin-sm">
						<button class="cu-btn line-orange">约400克</button>
					</view>
				</view>
				<view class="margin-xs">
					<view class="flex margin-xs">
						<text class="text-sm text-gray">辣度</text>
					</view>
					<view class="flex flex-wrap margin-sm justify-between">
						<!-- <view v-for="(item,index) in cRule" :key="index">
							<button class="cu-btn" :class="item.checked?'line-orange':'line-gray'" @tap="ChooseCheckbox" :data-value="item.value">
								{{item.name}}
							</button>
						</view> -->
					</view>
				</view>
				<view class="margin-sm padding-xs margin-top-xl bg-gray text-gray text-left">
					已选规格:(约400克)/不辣
				</view>
				<view class="flex margin-sm justify-center align-center">
					<view class="flex flex-sub padding-xs text-red justify-start">
						<text class="flex block text-sm align-end">￥</text>
						<text class="flex block text-xl align-end text-bold">18.88</text>
						<text class="flex block text-sm align-end text-line-h text-gray margin-left-xs">￥19</text>
						<text class="flex block text-sm align-end text-red">折扣限3份</text>
					</view>
					<view class="padding-xs">
						<button class="cu-btn bg-orange padding-left-xs padding-right-xs" @click="addCart">+加入购物车</button>
					</view>
				</view>
			</view>
			<view class="action margin-top-sm" @click="hideModal">
				<text class="cuIcon-roundclose text-red text-xxl" style="font-size: 56rpx;"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// goods: {
			// 	type: Array
			// }
		},
		data() {
			return {
				// isShowModal: false,
			};
		},
		
		computed: {
			
		},
		methods: {
			showModal() {
				this.$emit('showModal')
			},
		},
	}
</script>

<style>
	.show{
		display: none;
	}
</style>
