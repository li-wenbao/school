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
						<!-- <text class="cuIcon-back"></text> -->
						<text style="margin-left: 20rpx;">返回</text>
					</view>
				</view>
				<view class="margin-lr margin-top-sm padding-sm bg-white shadow" style="border-radius: 10rpx;width:690rpx">
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
			<view class="cu-bar search solids-top solids-bottom">
				<view class="flex align-center" style="width:500rpx;">
					<view class="cu-item" :class="[tabCur == index?'text-blue cur':'']" v-for="(item,index) in tabList" :key="index"
					 @click="tabSelect" :data-id="index">{{tabList[index]}}</view>
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
				<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" :style="style">
					<view class="cu-item text-sm" :class="index==vTabCur?'text-black text-bold cur':''" v-for="(item,index) in menu"
					 :key="index" @tap="vTabSelect" :data-id="index">{{item.name}}</view>
				</scroll-view>
				<scroll-view class="bg-white padding-sm" style="width:590rpx;" scroll-y scroll-with-animation :style="style"
				 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
					<view v-for="(item,index) in menu" :key="index" :id="'main-'+index">
						<view class="text-black text-bold margin-bottom-xs">{{item.name}}</view>
						<view class="flex margin-bottom-sm" v-for="(cItem,cIndex) in item.list" :key="cIndex" style="width:550rpx">
							<view class="margin-right-sm" style="width:160rpx;height:160rpx;overflow: hidden;">
								<image style="width:160rpx;height:160rpx;border-radius:10rpx;" mode="scaleToFill" lazy-load="true" :src="cItem.imgUrl" />
							</view>

							<view class="flexd" style="width:370rpx">
								<view>
									<view class="text-xsl">{{cItem.name}}</view>
									<view class="text-xs text-cut">
										<text>{{cItem.introduction}}</text>
									</view>
									<view class="text-xs">
										<text>月销{{cItem.sales}}</text>
										<text class="margin-left-sm">好评{{cItem.rate}}%</text>
									</view>
								</view>
								<view>
									<block v-if="cItem.isActive">
										<view class="flex align-center text-yellow">
											<view class="cu-tag radius sm line-yellow">{{cItem.discount}}折</view>
											<view class="text-xs margin-left-sm">每单限一份优惠</view>
										</view>
										<view>
											<text class="text-price text-yellow">{{cItem.bargain}}</text>
											<text class="margin-left-sm text-price text-strikethrough">{{cItem.price}}</text>
										</view>
										<view></view>
									</block>
									<block v-else>
										<view class="flex justify-between">
											<view>
												<text class="text-price text-yellow">{{cItem.price}}</text>
											</view>
											<view>
												<button class="cu-btn bg-brown round sm" @click="open">选规格</button>
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
			<cu-cart></cu-cart>
			<!-- 选中规格弹出层 -->
			<uni-popup ref="popup" type="center">
				<view class="bg-white" style="padding: 10rpx;width:690rpx;height:490rpx;border-radius:18rpx;">
					<!-- 按空格还噶 -->
					<view class="text-xsl">店铺名称</view>
				</view>
			</uni-popup>
		</view>
		<!-- 点菜结束 -->
		<!-- 评价开始 -->
		<view v-if="tabCur == 1">
			<scroll-view scroll-y :style="style" @scrolltolower="toLowFun">
				<!-- 评分开始 -->
				<view class="bg-white padding-lr-xl padding-tb-sm flex align-center justify-between">
					<view class="text-center">
						<view class="text-sl text-bold text-yellow">{{store.grade[0]}}</view>
						<view>商家评分</view>
					</view>
					<view>
						<view class="flex align-center">
							<view class="margin-right-sm">口味</view>
							<cu-rate :disabled="true" :value="store.grade[1]" :size="'text-lg'" :margin="'margin-right-xs'"></cu-rate>
							<view class="text-orange">{{store.grade[1]}}</view>
						</view>
						<view class="flex align-center">
							<view class="margin-right-sm">包装</view>
							<cu-rate :value="store.grade[2]" :size="'text-lg'" :margin="'margin-right-xs'"></cu-rate>
							<view class="text-orange">{{store.grade[2]}}</view>
						</view>
					</view>
					<view class="text-center">
						<view class="text-sl text-bold text-gray">{{store.grade[3]}}</view>
						<view>配送评分</view>
					</view>
				</view>
				<!-- 评分结束 -->

				<view class="bg-white margin-top-sm">
					<!-- 评价分类标签开始 -->
					<view class="padding-top padding-lr my-tag">
						<view class="cu-tag radius bg-blue margin-bottom-xs" :class="[tagCur == index?'':'light']" v-for="(item,index) in tagList"
						 :key="index" @click="tagSelect" :data-id="index">{{item.name + ' '+item.count}}</view>
					</view>
					<!-- 评价分类标签结束 -->
					<!-- 用户评论开始 -->
					<view>
						<view v-for="(item,index) in discussList" :key="index" class="flex padding-tb solid-bottom">
							<view style="width:80rpx;height:80rpx;border:1rpx solid #aaaaaa;border-radius:50%; overflow: hidden;margin:0 20rpx;">
								<image style="width:80rpx;height:80rpx;" mode="scaleToFill" lazy-load="true" :src="item.imgUrl" />
							</view>

							<view class="padding-right-sm" style="width:630rpx;">
								<view class="flex justify-between">
									<view>
										<view class="text-black">{{item.name}}</view>
										<view class="flex align-center">
											<view class="margin-right-xs">评分</view>
											<cu-rate :disabled="true" :value="item.grade" :size="'text-sm'" :margin="'margin-right-xs'"></cu-rate>
										</view>
									</view>
									<view class="text-sm text-grey">{{item.createTime}}</view>
								</view>
								<view class="text-content">{{item.content}}</view>
								<view class="flex justify-between" style="width:470rpx;flex-wrap: wrap;" v-if="item.imgList">
									<view v-for="(cItem,cIndex) in item.imgList" :key="cIndex" style="width:150rpx;height:150rpx;overflow: hidden;"
									 class="margin-bottom-sm">
										<image style="width:150rpx;height:150rpx;border-radius:10rpx;" mode="scaleToFill" lazy-load="true" :src="cItem" />
									</view>
								</view>
								<view class="my-tag">
									<text class="cuIcon-appreciate text-xxxl text-gray margin-bottom-xs"></text>
									<view class="cu-tag radius line-blue margin-bottom-xs" v-for="(cItem,cIndex) in item.foodList" :key="cIndex">{{cItem}}</view>
								</view>
								<view v-if="item.reply" class="padding-sm bg-gray text-sm text-grey">商家回复：{{item.reply}}</view>
							</view>
						</view>
					</view>
					<view v-if="loading" class="cu-load bg-blue loading"></view>
					<view v-if="over" class="cu-load bg-grey over"></view>
					<!-- 用户评论结束 -->
				</view>
			</scroll-view>
		</view>
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
	import cuRate from "@/colorui/components/cu-rate.vue";
	import cuCart from "@/colorui/components/cu-cart.vue";
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			cuRate,
			cuCart,
			uniPopup
		},
		/*
		初始化数据
		*/
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				tabList: ["点菜", "评价", "商家"],
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
				menu: [{
						name: "热销",
						icon: "",
						list: [
							{
								imgUrl: "/static/ddd.jpg",
								name: "豚骨拉面",
								introduction: "精心熬制的豚骨汤精心熬制的豚骨汤精心熬制的豚骨汤",
								sales: 79,
								rate: 98,
								price: 36,
								bargain: 18,
								isActive: false,
								discount: 3.8
							},
							{
								imgUrl: "/static/ddd.jpg",
								name: "豚骨拉面",
								introduction: "精心熬制",
								sales: 79,
								rate: 98,
								price: 36,
								bargain: 18,
								isActive: false,
								discount: 5.8
							}
						]
					},
					{
						name: "折扣",
						icon: "",
						list: [{
								imgUrl: "/static/98k.jpg",
								name: "豚骨拉面",
								introduction: "精心熬制的豚骨汤",
								sales: 79,
								rate: 98,
								price: 36,
								bargain: 18,
								isActive: true,
								discount: 3.8
							},
							{
								imgUrl: "/static/ddd.jpg",
								name: "豚骨拉面",
								introduction: "精心熬制的豚骨汤精心熬制的豚骨汤精心熬制的豚骨汤精心熬制的豚骨汤",
								sales: 79,
								rate: 98,
								price: 36,
								bargain: 18,
								isActive: true,
								discount: 5.8
							}
						]
					},
					{
						name: "素菜专区",
						icon: "",
						list: [{
								imgUrl: "/static/ccc.jpg",
								name: "豚骨拉面",
								introduction: "精心熬制的豚骨汤",
								sales: 79,
								rate: 98,
								price: 36,
								bargain: 18,
								isActive: false,
								discount: 3.8
							},
							{
								imgUrl: "/static/hg.jpg",
								name: "豚骨拉面",
								introduction: "精心熬制的豚骨汤精心熬制的豚骨汤精心熬制的豚骨汤",
								sales: 79,
								rate: 98,
								price: 36,
								bargain: 18,
								isActive: false,
								discount: 5.8
							}
						]
					},
					{
						name: "荤菜专区",
						icon: "",
						list: [{
							imgUrl: "/static/ddd.jpg",
							name: "豚骨拉面",
							introduction: "精心熬制的豚骨汤",
							sales: 79,
							rate: 98,
							price: 36,
							bargain: 18,
							isActive: false,
							discount: 3.8
						}]
					},
					{
						name: "小菜专区",
						icon: "",
						list: [{
							imgUrl: "/static/ddd.jpg",
							name: "豚骨拉面",
							introduction: "精心熬制的豚骨汤",
							sales: 79,
							rate: 98,
							price: 36,
							bargain: 18,
							isActive: false,
							discount: 3.8
						}]
					},
					{
						name: "饮品专区",
						icon: "",
						list: [{
							imgUrl: "/static/ddd.jpg",
							name: "豚骨拉面",
							introduction: "精心熬制的豚骨汤",
							sales: 79,
							rate: 98,
							price: 36,
							bargain: 18,
							isActive: false,
							discount: 3.8
						}]
					}
				],
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
				count: 0
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
			}
		},
		onLoad: function() {

		},
		onShow: function() {
			console.log("pages/home/store");
		},
		methods: {

			open() {
				this.$refs.popup.open()
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
			}
		}
	};
</script>

<style>
	.header {
		position: relative;
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
