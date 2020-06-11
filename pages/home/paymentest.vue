<template>
	<view class="page">
		<cu-custom :bgColor="'bg-blue'" :isBack="true">
			<block slot="backText">提交订单</block>
		</cu-custom>
		<scroll-view scroll-y style="margin-bottom: 180rpx;">
			<!-- 导航栏开始 -->
			<view class="bg-white margin-sm padding-sm radius30">
				<view class="flex text-center">
					<view class="cu-item flex-sub margin-sm" :class="[tabCur == index?'text-blue cur':'']" v-for="(item,index) in tabList" :key="index"
					 @click="tabSelect" :data-id="index">
						{{tabList[index]}}
					</view>
				</view>
				<view v-if="tabCur == 0" class="flex flex-direction">
					<view class="flex flex-direction">
						<view class="bg-white radius30">
							<view class="flex solid-bottom justify-between lines-black" >
								<navigator url="/pages/user/address" hover-class="none">
								<view class="padding-xs margin-xs text-jiujiu text-xl" style="margin-left: 0;padding-left: 0;">
									选择外卖地址
									<text class="cuIcon-right text-white" style="color: #999;"></text>
								</view>
								</navigator>
							</view>
							<view class="flex solid-bottom justify-between">
								<view class="padding-sm margin-xs text-bold text-black" style="margin-left: 0;padding-left: 0;">立即送出</view>
								<view class="padding-sm margin-xs text-orange" style="margin-right: 0;padding-right: 0;">
									大约10:52到达
									<text class="cuIcon-right" style="color: #f37b1d;"></text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="tabCur == 1" class="flex flex-direction">
					<view class="flex flex-direction">
						<view class="bg-white radius30">
							<view class="flex solid-bottom justify-between">
								<view class="padding-xs margin-xs text-jiujiu text-xl" style="margin-left: 0;padding-left: 0;">
									商家店铺的地址在这里
									<text class="cuIcon-right text-white" style="color: #999999;"></text>
								</view>
							</view>
							<view class="flex solid-bottom justify-start">
								<view class="padding-sm" style="padding-left: 0;">
									<view class="text-jiujiu text-sm padding-bottom-xs">自取时间</view>
									<view class="text-black text-sm">
										10:25
										<text class="cuIcon-right text-white" style="color: #999999;"></text>
									</view>
								</view>
								<view class="padding-sm">
									<view class="text-jiujiu text-sm padding-bottom-xs">预留电话</view>
									<view class="text-black text-sm">
										15489515484
										<text class="cuIcon-right text-white" style="color: #999999;"></text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 导航栏结束 -->
			<!-- 全部订单开始 -->
			<view class="flex flex-direction">
				<view class="margin-sm bg-white radius30">
					<view class="flex solid-bottom justify-between lines-black">
						<view class="padding-sm margin-xs">kk家的饭</view>
						<view class="padding-sm margin-xs">校园外卖</view>
					</view>
					<scroll-view scroll-y style="max-height: 800px;">
						<view class="flex justify-between padding-sm lines-black" v-for="(item,index) in storeList" :key="index" :data-id="item.id"
						 @click="_goToStore">
							<view class style="width:100rpx;height:100rpx;overflow: hidden;">
								<image style="width:100rpx;height:100rpx;border-radius:8rpx; " mode="scaleToFill" lazy-load="true" :src="item.url" />
							</view>
							<view class="padding-sm text-xgray" style="flex: 2;padding:0 15rpx;">
								<view class="flex justify-between padding-bottom-xs text-jiujiu">
									<view>
										<view class="padding-bottom-xs text-black text-bold text-xl">{{item.name}}</view>
									</view>
									<view class="text-black text-bold">
										<text>￥30</text>
									</view>
								</view>
								<view class="padding-bottom-sm">
									<text>2</text>
								</view>
							</view>
						</view>
					</scroll-view>
					<view class="flex margin-sm justify-between text-black">
						<view class="padding-sm margin-xs">包装费</view>
						<view class="padding-sm margin-xs"><text class="text-bold">￥3</text></view>
					</view>
					<view class="flex margin-sm justify-between text-black">
						<view class="padding-sm margin-xs">配送费</view>
						<view class="padding-sm margin-xs"><text class="text-bold">￥3</text></view>
					</view>
					<view class="padding bg-white">
						<view class="text-black text-bold">备注</view>
						<view class="text-left padding" style="height: 180rpx;overflow-y: auto;">
							少放盐少放辣椒少放盐少放辣椒少放盐少放辣椒少放盐
							少放辣椒少放盐少放辣椒少放盐少放辣椒少放盐少放辣椒
							少放盐少放辣椒少放盐少放辣椒少放盐少放辣椒少放盐
							少放辣椒少放盐少放辣椒少放盐少放辣椒少放盐少放辣椒
							</view>
					</view>
					<view class="flex solid-bottom padding justify-end">
						<view class="padding-sm margin-xs text-black text-sm align-end">已优惠
							<text class="text-red">￥15</text>
						</view>
						<view class="padding-sm margin-xs text-black text-sm align-end">小计
							<text class="text-black text-xsl">￥15</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 全部订单结束 -->
			<!-- 购物车 -->
			<my-cart style="margin-bottom: 20rpx;" @cartTopay="_cartTopay"></my-cart>
		</scroll-view>
	</view>
</template>

<script>
	import myCart from "@/colorui/components/my-cart.vue";
	export default {
		components: {
			myCart,
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				tabList: ["外卖配送", "到店自货"],
				tabCur: 0,
				top: 0,
				storeList: [{
						id: 1,
						name: "豚骨拉面(怡园风味)",
						url: "/static/ddd.jpg",
						grade: 4.9,
						sales: 258,
						baseprice: 15,
						distribution: 3,
						averageConsume: 21
					},
					{
						id: 1,
						name: "豚骨拉面",
						url: "/static/aaa.jpg",
						grade: 4.9,
						sales: 258,
						baseprice: 18,
						distribution: 3,
						averageConsume: 21
					}
				],
				loading: false,
				over: false,
				count: 0
			};
		},
		computed: {

		},
		onLoad: function() {

		},
		onShow: function() {
			console.log("pages/order/home");
		},
		methods: {
			tabSelect(e) {
				console.log(e);
				this.tabCur = e.currentTarget.dataset.id;
			},
			//跳转至商家店铺
			_goToStore(e) {
				console.log(e);
				uni.navigateTo({
					url: "/pages/home/storetest?id=" + e.currentTarget.dataset.id
				});
			},
			_cartTopay(){
				uni.navigateTo({
					url: "./paymentest"
				});
			}
		}
	};
</script>

<style>
	/* 重写下划线样式:缩短,加粗 */
	.nav .cu-item {
		margin: 0 50rpx;
	}

	.nav .cu-item.cur {
		border-bottom: 8rpx solid;
	}
</style>
