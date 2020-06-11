<template>
	<view class="page">
		<cu-custom :bgColor="'bg-blue'" :isBack="false">
			<block slot="backText"></block>
			<block slot="content">
				<!-- #ifndef MP-ALIPAY -->
				订单
				<!-- #endif -->
			</block>
			<block slot="right">
				<view class="action"></view>
			</block>
		</cu-custom>
		<view class="flex">
			<!-- 导航栏开始 -->
			<scroll-view scroll-x class="bg-white nav solid-bottom" :style="'position:fixed;top: '+ CustomBar + 'px;z-index:99;'">
				<view class="flex text-center width100">
					<view class="cu-item flex-sub" style="position: relative;" v-for="(item,index) in tabList" :key="index" @click="tabSelect" :data-id="index">
						<view :class="[tabCur == index?'text-blue':'']">{{tabList[index]}}</view>
						<view :class="[tabCur == index?'cur':'']">{{index}}</view>
					</view>
				</view>
			</scroll-view>
			<!-- 导航栏结束 -->
			
			<!-- 全部订单开始 -->
			<view v-if="tabCur == 0" style="margin-top:45px">
				<scroll-view scroll-y :style="style" @scrolltolower="toLowFun">
					<view v-if="orderList.length>0">
						<view class="margin-sm radius padding-sm bg-white radius20" v-for="(item,index) in orderList" :key="index">
							<view class="flex">
								<view class="margin-right-sm" style="width:80rpx;height:80rpx; overflow: hidden;" :data-id="item.id" @click="_goToStore">
									<image style="width:80rpx;height:80rpx;border-radius:4rpx;" mode="scaleToFill" lazy-load="true" :src="item.imgUrl" />
								</view>
								<view style="width:570rpx">
									<view class="flex align-center padding-bottom-xs" style="height:80rpx">
										<view class="flex-treble flex align-center" style="width:380rpx;" :data-id="item.id" @click="_goToStore">
											<text class="text-black text-bold text-xl text-cut">{{item.name}}</text>
											<text class="cuIcon-right padding-left-sm"></text>
										</view>
										<view class="flex-sub text-right" :data-id="item.orderId" @click="_goDetails">
											<text>{{item.status}}</text>
										</view>
									</view>
									<view class="margin-top-xs padding-top-xs solid-top" @click="_goDetails">
										<view class="flex justify-between text-gray" v-for="(listItem,listIndex) in item.list" :key="listIndex">
											<view>{{listItem.name}}</view>
											<view>x{{listItem.count}}</view>
										</view>
										<view class="margin-top-xs text-right">
											共{{item.amount}}件商品，实付
											<text class="text-price text-orange">{{item.sum}}</text>
										</view>
									</view>
								</view>
							</view>
							<view class="margin-top flex justify-end text-center">
								<!-- <button @click="_goTelStore" class="cu-btn line-gray text-black radius20" role="button" aria-disabled="false">致电商家</button>
								<button @click="_goTelHorman" class="cu-btn line-gray text-black radius20" role="button" aria-disabled="false">致电骑手</button> -->
								<button @click="_goSetaList" class="cu-btn line-gray text-black " role="button" aria-disabled="false">再来一单</button>
								<button v-if="item.status =='已取消'" class="cu-btn line-gray text-black  margin-left" role="button"
								 aria-disabled="false" :data-id="item.orderId" @click="_goRefund">退款进度</button>
							</view>
						</view>
						<view v-if="loading" class="cu-load loading"></view>
						<view v-if="over" class="cu-load over"></view>
					</view>
					<view v-else>暂无订单,一大波美食正在袭来~</view>
				</scroll-view>
			</view>
			<!-- 全部订单结束 -->
			<!-- 待评价开始 -->
			<!-- 后期加的部分 -->
			<!-- 待评价结束 -->
			<!-- 退款开始 -->
			<view v-if="tabCur == 1" style="margin-top:45px">
				<scroll-view scroll-y :style="style" @scrolltolower="toLowFun">
					<view v-if="orderList.length>0">
						<view class="margin-sm radius padding-sm bg-white radius20" v-for="(item,index) in orderList" :key="index">
							<view class="flex">
								<view class="margin-right-sm" style="width:80rpx;height:80rpx; overflow: hidden;" :data-id="item.id" @click="_goToStore">
									<image style="width:80rpx;height:80rpx;border-radius:4rpx;" mode="scaleToFill" lazy-load="true" :src="item.imgUrl" />
								</view>

								<view style="width:570rpx">
									<view class="flex align-center padding-bottom-xs" style="height:80rpx">
										<view class="flex-treble flex align-center" style="width:380rpx;" :data-id="item.id" @click="_goToStore">
											<text class="text-black text-bold text-xl text-cut">{{item.name}}</text>
											<text class="cuIcon-right padding-left-sm"></text>
										</view>
										<view class="flex-sub text-right" :data-id="item.orderId" @click="_goDetails">
											<text>{{item.status}}</text>
										</view>
									</view>
									<view class="margin-top-xs padding-top-xs solid-top" @click="_goDetails">
										<view class="flex justify-between text-gray" v-for="(listItem,listIndex) in item.list" :key="listIndex">
											<view>{{listItem.name}}</view>
											<view>x{{listItem.count}}</view>
										</view>
										<view class="margin-top-xs text-right">
											共{{item.amount}}件商品，实付
											<text class="text-price text-orange">{{item.sum}}</text>
										</view>
									</view>
								</view>
							</view>
							<view class="margin-top flex justify-end text-center">
								<!-- <button @click="_goTelStore" class="cu-btn sm text-xs line-gray text-black radius20" role="button" aria-disabled="false">致电商家</button>
								<button @click="_goTelHorman" class="cu-btn sm text-xs line-gray text-black radius20" role="button" aria-disabled="false">致电骑手</button> -->
								<button @click="_goSetaList" class="cu-btn line-gray text-black text-cyan " role="button" aria-disabled="false">再来一单</button>
								<button class="cu-btn  line-gray text-black  margin-left" role="button" aria-disabled="false" :data-id="item.orderId"
								 @click="_goRefund">退款进度</button>
							</view>
						</view>
						<view v-if="loading" class="cu-load loading"></view>
						<view v-if="over" class="cu-load over"></view>
					</view>
					<view v-else>空空如也，也是一种态度~</view>
				</scroll-view>
			</view>
			<!-- 退款结束 -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				tabList: ["全部订单", "退款"],
				tabCur: 0,
				top: 0,
				orderList: [{
						id: 1,
						orderId: 100000,
						imgUrl: "/static/ddd.jpg",
						name: "清真昭通牛肉王小肉串(月牙塘店)",
						status: "派送中",
						amount: 2,
						discount: 0.12,
						sum: 29.88,
						createTime: "2019-12-11",
						list: [{
								name: "昭通炸洋芋",
								unitPrice: 20.0,
								count: 1
							},
							{
								name: "炸洋芋拼炸石屏豆腐",
								unitPrice: 10.0,
								count: 1
							}
						]
					},
					{
						id: 1,
						orderId: 100000,
						imgUrl: "/static/ldd.jpg",
						name: "四禾小吃坊 (花甲米线)",
						status: "已完成",
						amount: 4,
						discount: 5.0,
						sum: 22,
						createTime: "2019-12-11",
						list: [{
								name: "黄金炸洋芋",
								unitPrice: 5,
								count: 2
							},
							{
								name: "蒜泥狠炸洋芋",
								unitPrice: 12,
								count: 1
							},
							{
								name: "秘制炸洋芋",
								unitPrice: 5,
								count: 1
							}
						]
					},
					{
						id: 1,
						orderId: 100000,
						imgUrl: "../../static/shop_logo.png",
						name: "蜜秘鸡地",
						status: "已取消",
						amount: 4,
						discount: 5.0,
						sum: 22,
						createTime: "2019-12-11",
						list: [{
								name: "薯条",
								unitPrice: 5,
								count: 2
							},
							{
								name: "豚骨汤",
								unitPrice: 12,
								count: 1
							},
							{
								name: "鸡腿",
								unitPrice: 5,
								count: 1
							}
						]
					},
					{
						id: 1,
						orderId: 100000,
						imgUrl: "../../static/shop_logo.png",
						name: "蜜秘鸡地",
						status: "已完成",
						amount: 4,
						discount: 5.0,
						sum: 22,
						createTime: "2019-12-11",
						list: [{
								name: "薯条",
								unitPrice: 5,
								count: 2
							},
							{
								name: "豚骨汤",
								unitPrice: 12,
								count: 1
							},
							{
								name: "鸡腿",
								unitPrice: 5,
								count: 1
							}
						]
					},
					{
						id: 1,
						orderId: 100000,
						imgUrl: "../../static/shop_logo.png",
						name: "蜜秘鸡地",
						status: "已完成",
						amount: 4,
						discount: 5.0,
						sum: 22,
						createTime: "2019-12-11",
						list: [{
								name: "薯条",
								unitPrice: 5,
								count: 2
							},
							{
								name: "豚骨汤",
								unitPrice: 12,
								count: 1
							},
							{
								name: "鸡腿",
								unitPrice: 5,
								count: 1
							}
						]
					},
					{
						id: 1,
						orderId: 100000,
						imgUrl: "../../static/shop_logo.png",
						name: "蜜秘鸡地",
						status: "已完成",
						amount: 4,
						discount: 5.0,
						sum: 22,
						createTime: "2019-12-11",
						list: [{
								name: "薯条",
								unitPrice: 5,
								count: 2
							},
							{
								name: "豚骨汤",
								unitPrice: 12,
								count: 1
							},
							{
								name: "鸡腿",
								unitPrice: 5,
								count: 1
							}
						]
					}
				],
				loading: false,
				over: false,
				count: 0
			};
		},
		computed: {
			style() {
				let CustomBar = this.CustomBar;
				return `height:calc(100vh - ${CustomBar}px - 45px);`;
			}
		},
		onLoad: function() {
			console.log("头部组件高度", this.CustomBar)
		},
		onShow: function() {
			console.log("pages/order/home");
		},
		methods: {
			tabSelect(e) {
				console.log(e);
				this.tabCur = e.currentTarget.dataset.id;
			},
			/*
			 *加载更多
			 */
			toLowFun() {
				console.log("触底事件");
				if (!this.over) {
					if (this.count < 5) {
						this.loading = true;
						var _this = this;
						setTimeout(function() {
							let data = _this.orderList;
							_this.orderList.push(data[0], data[1]);
							_this.loading = false;
							_this.count++;
						}, 2000);
					} else {
						this.over = true;
					}
				} else {
					this.loading = false;
				}
			},
			//跳转至商家店铺
			_goToStore(e) {
				console.log(e);
				uni.navigateTo({
					url: "/pages/home/storetest?id=" + e.currentTarget.dataset.id
				});
			},
			//查看订单详情
			_goDetails(e) {
				uni.navigateTo({
					url: "/pages/order/details?orderId=" + e.currentTarget.dataset.id
				});
			},
			//去评价
			_goEvaluate(e) {
				console.log(e)
				uni.navigateTo({
					url: "/pages/order/evaluate?orderId=" + e.currentTarget.dataset.id
				});
			},
			//查看退款进度
			_goRefund(e) {
				uni.navigateTo({
					url: "/pages/order/refund?orderId=" + e.currentTarget.dataset.id
				});
			},

			//才来一单
			_goSetaList(e) {
				uni.navigateTo({
					url: "/pages/home/storetest?orderId=" + e.currentTarget.dataset.id
				});
			},

			// 致电骑手
			_goTelHorman() {
				console.log("致电棋手")
			},
			// 致电商家
			_goTelStore() {
				console.log("致电棋手")
			},
		}
	};
</script>

<style>
	/* 重写下划线样式:缩短,加粗 */
	.nav .cu-item {
		margin: 0 50rpx;
	}

	/* 重写btn 线框样式 */
	.cu-btn[class*="line"]::after {
	    content: " ";
	    display: block;
	    width: 200%;
	    height: 200%;
	    position: absolute;
	    top: 0;
	    left: 0;
	    border: 0.5px solid currentColor;
	    -webkit-transform: scale(0.5);
	    transform: scale(0.5);
	    -webkit-transform-origin: 0 0;
	    transform-origin: 0 0;
	    box-sizing: border-box;
	    border-radius:20px;
	    z-index: 1;
	    pointer-events: none;
	}
</style>
