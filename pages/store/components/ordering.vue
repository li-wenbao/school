<template>
	<view class="page">
		<swiper-item class="swiper-item">
			<view class="scroll-items">
				<view class="flex">
					<scroll-view class="VerticalNav bg-f8 nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" :style="style">
						<view class="cu-item text-df" :class="index==vTabCur?'text-appcolor bg-white text-bold':''" v-for="(item,index) in goods"
						 :key="index" @tap="vTabSelect" :data-id="index">
							{{item.name}}
							<text class="allcount" v-if="getAllCount>=item.count&&item.count>0">{{item.count}}</text>
						</view>
					</scroll-view>
					<scroll-view class="bg-white padding-sm" style="flex: 1;" scroll-y scroll-with-animation :style="style"
					 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
						<view v-for="(item,index) in goods" :key="index" :id="'main-'+index">
							<view class="text-black text-bold margin-bottom-xs">{{item.name}}</view>
							<view class="flex margin-bottom-sm" v-for="(food,cIndex) in item.foods" :key="cIndex" style="width:550rpx">
								<view class="margin-right-sm" style="width:160rpx;height:160rpx;overflow: hidden;">
									<image style="width:160rpx;height:160rpx;border-radius:10rpx;" mode="scaleToFill" lazy-load="true" :src="food.img" />
								</view>
								<view class="flexd" style="width:370rpx">
									<view>
										<view class="text-lg text-black text-bold">{{food.name}}</view>
										<view class="text-sm text-cut margin-top-xs">
											<text>{{food.introduction}}</text>
										</view>
										<view class="text-gray margin-top-xs">
											<text class="text-sm">月销{{food.sales}}</text>
											<text class="margin-left-sm text-sm">好评{{food.rate}}%</text>
										</view>
									</view>
									<view>
										<block v-if="food.isActive">
											<view class="flex align-center text-yellow">
												<view class="cu-tag radius sm line-yellow">{{food.discount}}折</view>
												<view class="text-sm margin-left-sm">每单限一份优惠</view>
											</view>
											<view>
												<text class="text-price text-yellow">{{food.bargain}}</text>
												<text class="margin-left-sm text-price text-strikethrough">{{food.price}}</text>
											</view>
											<view></view>
										</block>
										<block v-else>
											<view class="flex justify-between">
												<view class="margin-top-xs">
													<text class="text-price text-red">{{food.price}}</text>
												</view>
												<view>
													<view v-if="food.foodtype =='1'">
														<button class="cu-btn margin-xs line-blue" data-target="Modal" @click="_changOrder">选规格</button>
													</view>
													<view v-else class="food-btm" style="color: red;">
														<cartcontrol :food="food" @add="addCart" @dec="decreaseCart" style="color: red;"> </cartcontrol>
													</view>
												</view>
											</view>
										</block>
									</view>
								</view>
							</view>
						</view>
						<view class="bg-white" style="height:40px;"></view>
					</scroll-view>
				</view>
			</view>
		</swiper-item>
	</view>
</template>

<script>
	// 引入登录模态弹窗组件
	// import motal from '../../../../element/modal.vue'

	import shopcart from '@/components/shopCart/shopcar.vue';
	var {
		log
	} = console
	export default {
		components: {
			// motal,
			shopcart
		},
		props: {
			orderingdata: Array,
			goods: Array,
			busidata: Object,
			style:''
		},
		data() {
			return {
				// goods: [],
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				height: 0,
				currentIndex: 0,
				showM: null,
				tabCur: 0,
				store: {
					id: 1,
					name: "豚骨拉面(怡园风味)",
					notice: "新用户即可领取5元无门槛红包",
					imgUrl: "../../../static/ddd.jpg",
					bgImage: "../../../static/bg.jpg",
					grade: [4.8, 4.7, 3.6, 4.9],
					sales: 258,
					basePrice: 15,
					distribution: 3,
					averageConsume: 21,
					averageTime: 30
				},
				vTabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				count: 0,
			}
		},

		methods: {
			// 点击侧边栏
			select(index) {
				this.currentIndex = index;
				this.setScrollH(index);

			},
			/*
			 *菜单栏切换
			 */
			tabSelect(e) {
				let id = e.currentTarget.dataset.id;
				//解决切换菜单返回点餐时自动滑动动画带来的闪屏问题
				if (id == 0) {
					this.mainCur = 0;
				}
				this.tabCur = id;
			},
			/*
			 *点餐分类切换
			 */
			vTabSelect(e) {
				console.log(e);
				this.vTabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 44;
			},
			VerticalMain(e) {
				console.log(e);
			},
		},

		computed: {
			bgImageHeight() {
				let CustomBar = this.CustomBar;
				let bgImage = this.store.bgImage;
				return `height:${CustomBar + 30}px;`;
			},
			barHeight() {
				let StatusBar = this.StatusBar;
				let CustomBar = this.CustomBar;
				return `height:${CustomBar}px;padding-top:${StatusBar}px;`;
			},
			style() {
				let CustomBar = this.CustomBar;
				return `height:calc(100vh - ${CustomBar}px - 50px);`;
			},

			getList() {
				let result = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if (food.count) {
							result.push(food)
						}
					})
				})
				// console.log('result', result);
				return result
			},
		},


		watch: {

		}
	}
</script>

<style scoped>
	.header {
		position: relative;
		z-index: 1
	}

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

	.VerticalNav.nav {
		width: 160rpx;
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


	/* 新添加的 */

	/* 重写按钮宽度 */

	.current {
		position: relative;
		z-index: 0;
		background-color: #fff;
		color: #00A0DC;
	}

	.menu-wrapper {
		text-align: center;
		width: 22%;
		display: flex;
		flex-direction: column;
		background: #f3f5f7;

	}

	.menu-item {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50px;
	}

	.allcount {
		position: absolute;
		right: 0px;
		top: 8px;
		display: inline-block;
		padding: 0 5px;
		font-size: 20upx;
		line-height: 16px;
		font-weight: 400;
		border-radius: 10px;
		background-color: #f01414;
		color: #ffffff;
	}

	.foods-wrapper {
		margin-left: 4px;
		width: 78%;
	}

	.food,
	.food-btm,
	.content {
		display: flex;
		flex-direction: row;
	}

	.food-title {
		padding: 2px 0;
	}

	.food-info {
		margin-left: 10px;
		margin-right: 16px;
		display: flex;
		flex-direction: column;
		flex: 2;
	}

	.food-btm {
		justify-content: space-between;

	}

	.food-price {
		color: #f01414;
		font-size: 16px;
	}
</style>
