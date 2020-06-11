<template>
	<view class="page">
		<view class="header" :style="[{height:CustomBar + 120 + 'px'}]">
			<view class="bgImage" style="width:100%;" :style="[{height:CustomBar + 30 + 'px'}]" :class="store.bgImage?'':'bg-blue'">
				<image v-if="store.bgImage" :src="store.bgImage" style="width:100%;" :style="[{height:CustomBar + 30 + 'px'}]" />
				<view class="mask"></view>
			</view>
			<view class="bg-white" style="height:90px;width:100%"></view>
			<view class="top">
				<view class="cu-bar text-white" :style="barHeight">
					<view class="action" @tap="BackPage">
						<!-- #ifdef MP-WEIXIN -->
						<text class="cuIcon-back"></text>
						<!-- #endif -->
					</view>
				</view>
				<view class="margin-lr margin-top-sm padding-sm bg-white shadow radius10" style="width:690rpx">
					<view class="flex justify-between">
						<view style="width:100rpx;height:100rpx">
							<image style="width:100rpx;height:100rpx;border-radius:8rpx; " lazy-load="true" mode="aspectFit" :src="store.imgUrl" />
						</view>
						<view class="margin-left-sm" style="width:410rpx">
							<view class="text-black text-bold text-xl">{{store.name}}</view>
							<view class="text-grey text-sm padding-tb-xs">
								<text class="cuIcon-favorfill text-orange"></text>
								<text>{{store.grade[0]}}</text>
								<text class="margin-lr-sm">|</text>
								<text>配送约{{store.averageTime}}分钟</text>
							</view>
						</view>
						<view class="text-center" style="width:120rpx">
							<button class="cu-btn round line-black" role="button" aria-disabled="false">关注</button>
						</view>
					</view>
					<view class="text-grey text-sm margin-top-xs">
						<text>公告：{{store.notice}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 导航栏开始 -->
		<scroll-view scroll-x class="bg-white nav" scroll-left="0">
			<view class="flex cu-bar search border-bottom">
				<view class="flex align-center" style="width:500rpx;">
					<view class="cu-item"  style="position: relative;" v-for="(item,index) in tabList" :key="index"
					 @click="tabSelect" :data-id="index">
					 <view :class="[tabCur == index?'text-blue':'']">{{tabList[index]}}</view>
					  <view :class="[tabCur == index?'cur':'']"></view>
					 </view>
				</view>
				<view class="search-form round">
					<text class="cuIcon-search text-grey text-sxl"></text>
					<input type="text" placeholder="搜索" confirm-type="search" />
				</view>
			</view>
		</scroll-view>
		<!-- 导航栏结束 -->
		<!-- 点菜开始 -->
		<view v-if="tabCur == 0">
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
			<!-- 购物车 -->
			<!-- <cu-cart></cu-cart> -->
			<shopcart :goods="goods" @add="addCart" @dec="decreaseCart" @delAll="delAll" @topay="topay"></shopcart>
			
			<!-- 模态框 -->
			<!-- <tra-order :rulefood="goods" @hideModal="hideModal" @trchangOrder ="_trchangOrder"  @rule="addCart" :modalName="modalName"></tra-order> -->
		</view>
		<!-- 点菜结束 -->
		<!-- 评价开始 -->

		<!-- 评价结束 -->
		<!-- 商家开始 -->
		<view v-if="tabCur == 2">
			<!-- 操作菜单开始 -->
			<view class="cu-list menu sm-border margin-top-sm">
				<view class="cu-item">
					<view class="content">
						<image src="/static/menu/location.png" class="png" mode="aspectFit" />
						<text class="text-grey">昆明理工大学怡园风味食堂二楼103档口</text>
					</view>
				</view>
				<view class="cu-item margin-top-sm arrow">
					<view class="content">
						<image src="/static/menu/collect.png" class="png" mode="aspectFit" />
						<text class="text-grey">查看食品安全档案</text>
					</view>
				</view>
				<view class="cu-item margin-top-sm">
					<view class="content">
						<image src="/static/menu/service.png" class="png" mode="aspectFit" />
						<text class="text-grey">配送服务：由xx提供配送服务</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<image src="/static/menu/help.png" class="png" mode="aspectFit" />
						<text class="text-grey">配送时间：9:00-23:00</text>
					</view>
				</view>
				<view class="cu-item margin-top-sm arrow">
					<view class="content">
						<image src="/static/menu/rule.png" class="png" mode="aspectFit" />
						<text class="text-grey">商家服务：跨天预定 到店自取</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 商家结束 -->
	</view>
</template>

<script>
	import traOrder from '@/components/tra-order/tra-order.vue';
	import cuRate from "@/colorui/components/cu-rate.vue";
	import cuCart from "@/colorui/components/cu-cart.vue";
	import shopcart from '@/components/shopCart/shopcar.vue';
	import cartcontrol from '@/components/shopCart/cartcontrol.vue';
	// import chooserule from '@/components/shopCart/chooserule.vue';
	import Json from '../../../json';
	import Vue from 'vue';
	let showData = {};
	export default {
		components: {
			cuRate,
			cuCart,
			cartcontrol,
			shopcart,
			// chooserule,
			// traOrder
		},
		/*
		初始化数据
		*/
		data() {
			return {
				height: 0,
				foodSTop: 0,
				currentIndex: 0,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				tabList: ["点菜", "", "商家"],
				modalName: null,
				showM: null,
				tabCur: 0,
				store: {
					id: 1,
					name: "豚骨拉面(怡园风味)",
					notice: "新用户即可领取5元无门槛红包",
					imgUrl: "/static/ddd.jpg",
					bgImage: "/static/bg.jpg",
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
				goods: [],
				tagList: [{
						name: "全部",
						count: 1888
					},
					{
						name: "好评",
						count: 788
					},
					{
						name: "差评",
						count: 18
					},
					{
						name: "包装好",
						count: 207
					},
					{
						name: "分量足",
						count: 188
					},
					{
						name: "价格实惠",
						count: 108
					}
				],
				tagCur: 0,
				discussList: [{
						name: "匿名用户",
						imgUrl: "/static/face.jpg",
						grade: 4.8,
						createTime: "2020.01.16",
						content: "非常好，经常买，鸡肉卷鸡米花很好吃，卖家还送优惠券，还会再来，推荐推荐，棒棒哒！",
						imgList: [],
						foodList: ["鸡米花", "鸡肉卷"],
						reply: "今天能收到您的赞扬，以后我要先感谢领导给予的栽培！感谢公司给予我为你服务的机会！还要感谢祖国对我的培养！当然最最需要感谢的，还是您对我的认同！"
					},
					{
						name: "匿名用户",
						imgUrl: "/static/face.jpg",
						grade: 4.8,
						createTime: "2020.01.16",
						content: "非常好，经常买，鸡肉卷鸡米花很好吃，卖家还送优惠券，还会再来，推荐推荐，棒棒哒！",
						imgList: [
							"/static/aaa.jpg",
							"/static/ddd.jpg",
							"/static/eee.jpg",
							"/static/fff.jpg"
						],
						foodList: ["鸡米花", "鸡肉卷"],
						reply: ""
					},
					{
						name: "匿名用户",
						imgUrl: "/static/face.jpg",
						grade: 4.8,
						createTime: "2020.01.16",
						content: "非常好，经常买，鸡肉卷鸡米花很好吃，卖家还送优惠券，还会再来，推荐推荐，棒棒哒！",
						imgList: [],
						foodList: ["鸡米花", "鸡肉卷"],
						reply: "今天能收到您的赞扬，以后我要先感谢领导给予的栽培！感谢公司给予我为你服务的机会！还要感谢祖国对我的培养！当然最最需要感谢的，还是您对我的认同！"
					}
				],
				loading: false,
				over: false,
				count: 0,
				showData: {},
				vshowModal:false
			};
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
				return `height:calc(100vh - ${CustomBar}px - 120px - 50px);`;
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
			// 获得购物车所有商品数量
			getAllCount: function(item) {
				// console.log('item', item)
				let result = [];
				let count = 0;
				for (let i = 0; i < this.goods.length; i++) {
					count = 0;
					this.goods[i].foods.forEach((food) => {
						// console.log('food',food);
						if (food.count >= 0) {
							count += food.count
							Vue.set(this.goods[i], 'count', count)
						}
					})
					// console.log('result', count);
					result.push(count)
				}
				result.sort(function(a, b) {
					return a - b;
				})
				count = result[result.length - 1]
				// console.log('result', count);
				return count;
			},
			// 点击获取数据
		},
		onLoad: function() {
			this.getGoodsList()
		},
		onShow: function() {
			console.log("pages/home/store");
		},
		methods: {
			// 打开模态框
			showfun() {
				this.showM = true
				console.log("+++++++++++++++++++++")
			},
			showModal(e) {
				this.vshowModal = true
				console.log('ev', JSON.stringify(e))
				this.showM = "showM"
				this.showData = e
				showData = this.showData
			},

			//模态框选择
			ChooseCheckbox() {
				console.log("sl;jseuighs" + showData)
				let size = showData.size;
				let cRule = showData.cRule;
				for (let i = 0; i < size.length; i++) {
					size[i].value.checked = !size[i].value.checked;
					this.chfdArr.push(size[i].value.checked)
				}
				for (let j = 0; j < cRule.length; j++) {
					cRule[j].value.checked = !cRule[j].value.checked;
					this.chfdArr.push(cRule[j].value.checked)
				}
				console.log("选择了什么??", this.chfdArr)
			},

			//关闭模态窗口
			hideModal(e) {
				this.showM = null
			},
			
			
			//转单
			_changOrder(e) {
				console.log("转单+++++:", e.currentTarget.dataset.target)
				this.modalName = e.currentTarget.dataset.target
			},
			
			// 确认转单
			_trchangOrder() {
				console.log("this.phone+++++:", this.phone)
				this.hideModal()
				uni.showToast({
					title: "您转给了" + this.phone,
					duration: 2000
				});
				// this.modalName = e.currentTarget.dataset.target
			},
			// 关闭模态窗口
			hideModal(e) {
				this.modalName = null
			},
			

			// 获取数据
			getGoodsList: function() {
				this.goods = Json.goods
				console.log("商品列表+++++:", this.goods)
			},

			addModalCart: function(item) {
				console.log('ev', JSON.stringify(item))
				if (item.count >= 0) {
					item.count++
					this.goods.forEach((good) => {
						good.foods.forEach((food) => {
							if (item.name == food.name)
								food.count = item.count
						})
					})
					// console.log('c++', JSON.stringify(item))
				} else {
					console.log('add')
					this.goods.forEach((good) => {
						good.foods.forEach((food) => {
							if (item.name == food.name)
								Vue.set(food, 'count', 1)
							// food.count = 1
							// console.log('add-shop', JSON.stringify(food))
						})
					})
				}
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
			/*
			 *用户评论加载更多
			 */
			toLowFun() {
				console.log("触底事件");
				if (!this.over) {
					if (this.count < 5) {
						this.loading = true;
						var _this = this;
						setTimeout(function() {
							let data = _this.discussList;
							_this.discussList.push(data[0], data[1]);
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

			// 点击侧边栏
			select(index) {
				this.currentIndex = index;
				this.setScrollH(index);

			},
			BackPage() {
				if (getCurrentPages().length < 2 && "undefined" !== typeof __wxConfig) {
					let url = "/" + __wxConfig.pages[0];
					return uni.redirectTo({
						url
					});
				}
				uni.navigateBack({
					delta: 1
				});
			},
			addCart: function(item) {
				console.log('ev', JSON.stringify(item))
				if (item.count >= 0) {
					item.count++
					this.goods.forEach((good) => {
						good.foods.forEach((food) => {
							if (item.name == food.name)
								food.count = item.count
						})
					})
					// console.log('c++', JSON.stringify(item))
				} else {
					console.log('add')
					this.goods.forEach((good) => {
						good.foods.forEach((food) => {
							if (item.name == food.name)
								Vue.set(food, 'count', 1)
							// food.count = 1
							// console.log('add-shop', JSON.stringify(food))
						})
					})
				}
			},
			decreaseCart(item) {
				if (item.count) {
					item.count--
					this.goods.forEach((good) => {
						good.foods.forEach((food) => {
							if (item.name == food.name)
								food.count = item.count
							// console.log('dec-shop', JSON.stringify(this.foods))
						})
					})
				}
			},
			// 清空购物车
			delAll() {
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if (food.count) {
							food.count = 0
							// console.log(JSON.stringify(food));
						}
					})
				})
			},
			topay() {
				console.log("PPPPPPPPPPPPPPPPPPPPP")
				uni.navigateTo({
					url: "./paymentest"
				});
			}
		}
	};
</script>

<style>
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
