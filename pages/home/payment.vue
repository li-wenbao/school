<template>
	<view class="page">
		<cu-custom :bgColor="'bg-blue'" :isBack="true">
			<block slot="backText">提交订单</block>
		</cu-custom>
		<view>
			<!-- 导航栏开始 -->
			<scroll-view scroll-x class="bg-white nav solid-bottom width100" :style="'position:fixed;top: '+ CustomBar + 'px;z-index:99'">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="[tabCur == index?'text-blue cur':'']" v-for="(item,index) in tabList" :key="index"
					 @click="tabSelect" :data-id="index">{{tabList[index]}}</view>
				</view>
			</scroll-view>
			<!-- 导航栏结束 -->
			<!-- 全部订单开始 -->
			<view v-if="tabCur == 0" style="margin-top:45px">
				<scroll-view scroll-y :style="style" @scrolltolower="toLowFun">
					<view class="flex flex-direction">
						<view class="margin-sm bg-white radius">
							<view class="flex solid-bottom justify-between lines-black">
								<view class="padding-sm margin-xs">kk家的饭</view>
								<view class="padding-sm margin-xs">校园外卖</view>
							</view>
							<view class="flex justify-between padding-sm lines-black" v-for="(item,index) in storeList" :key="index"
							 :data-id="item.id" @click="goToStore">
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
							<view class="flex margin-sm justify-between">
								<view class="padding-sm margin-xs">包装费</view>
								<view class="padding-sm margin-xs"><text class="text-black text-bold">￥3</text></view>
							</view>
							<view class="flex margin-sm justify-between lines-black">
								<view class="padding-sm margin-xs">配送费</view>
								<view class="padding-sm margin-xs"><text class="text-black text-bold">￥3</text></view>
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
				</scroll-view>
			</view>
			<view v-if="tabCur == 1" style="margin-top:45px">
				<view>2222222222222222222222</view>
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
				tabCur: 0,
				vTabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				foodSTop: 0,
				currentIndex: 0,
				StatusBar: this.StatusBar,
				order: {
					id: 1,
					name: "蜜秘鸡地",
					imgUrl: "../../static/shop_logo.png",
					packPrice: 2.00,
					distribution: 3.00,
					amount: 4,
					sum: 22.00,
					list: [{
							name: "薯条",
							price: 10,
							bargain: 5,
							isActive: false,
							count: 2,
							imgUrl: "/static/aaa.jpg"
						},
						{
							name: "豚骨汤",
							price: 12,
							bargain: 5,
							isActive: false,
							count: 1,
							imgUrl: "/static/aaa.jpg"
						},
						{
							name: "鸡腿",
							price: 10,
							bargain: 5,
							isActive: true,
							count: 1,
							imgUrl: "/static/aaa.jpg"
						}
					],
					orderId: '2019211134238',
					status: "已完成",
					type: "支付宝",
					createTime: "2019-12-06 12:05",
					notes: "多辣，多放辣椒，不要生姜",
					completionTime: "2019-12-06 13:34",
					address: "昆明理工大学新校区学生宿舍12栋",
					distributionMode: "商家配送"
				}
			};
		},
		computed: {
			style() {
				let CustomBar = this.CustomBar;
				return `height:calc(100vh - ${CustomBar}px - 45px);`;
			},
			// 计算属性的 getter
			goodModify: function() {
				// `this` 指向 vm 实例

				let goodsname = this.order.list.name;
				// goodsname = "安康精髓覆盖爱韶关话说规划艾莎死哦韩国阿斯哦干哈所规划爱上改哦";
				return goodsname.length < 12 ? goodsname : goodsname.substr(0, 10) + "...";
			},
		},
		onLoad: function() {
			console.log("this.CustomBar==", this.CustomBar)
		},
		onShow: function() {
			console.log("pages/order/details");
		},
		methods: {
			/*
			 *菜单栏切换
			 */
			tabSelect(e) {
				console.log("点击事件：+++++++++", e.currentTarget.dataset.id)
				this.tabCur = e.currentTarget.dataset.id;
			},
			
			// tabSelect(e) {
			// 	console.log("点击事件：+++++++++", e)
			// 	console.log("点击事件：+++++++++", e.currentTarget.dataset.id)
			// 	let id = e.currentTarget.dataset.id;
			// 	//解决切换菜单返回点餐时自动滑动动画带来的闪屏问题
			// 	if (id == 0) {
			// 		this.mainCur = 0;
			// 	}
			// 	this.tabCur = id;
			// },

			//跳转至商家店铺
			// _goToStore(e) {
			// 	console.log(e);
			// 	uni.navigateTo({
			// 		url: "/pages/home/store?id=" + e.currentTarget.dataset.id
			// 	});
			// }
		}
	};
</script>

<style>
	.bgImage {
		background-size: 100% 100%;
		position: relative;
	}

	.mask {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: rgba(12, 12, 12, 0.4);
	}

	.top {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 9999;
	}

	/* 重写下划线样式:缩短,加粗 */
	.nav .cu-item.cur {
		border-bottom: 8rpx solid;
	}

	.cu-btn {
		height: 28px;
	}

	.VerticalNav.nav {
		width: 140rpx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		margin: 0;
		border: none;
		height: 80rpx;
		position: relative;
	}

	.flexd {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.my-tag {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-content: space-between;
	}

	/* 解决支付宝小程序不显示小图标 */
	/*  #ifdef  MP-ALIPAY  */
	.cu-list.menu>.cu-item .content>image {
		width: 48rpx;
		height: 48rpx;
	}

	/*  #endif  */
</style>
