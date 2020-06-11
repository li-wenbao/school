<template>
	<view class="page">
		<cu-custom :bgColor="'bg-blue'" :isBack="false">
			<block slot="backText"></block>
			<block slot="content">
				<!-- #ifndef MP-ALIPAY -->
				<!-- 订单 -->
				<!-- #endif -->
			</block>
			<block slot="right">
				<view class="action"></view>
			</block>
		</cu-custom>
		<!-- 顶部导航开始 -->
		<view class="cu-bar search bg-blue" style="position: fixed;width:750rpx;height:50px;z-index:9999;">
			<view v-if="!isLocation" @click="getCurLocation" class="cu-load margin-left-sm text-left" :class="locationError?'erro over':'loading'"
			 style="width:400rpx;"></view>
			<navigator style="width:400rpx;" class="flex align-center" v-else url="/pages/home/location" hover-class="none">
				<image src="/static/location.png" class="location-img margin-left-sm" mode="aspectFit" />
				<text>{{addressModify}}</text>
				<text class="cuIcon-right" style="color: #FFFFFF;"></text>
			</navigator>
			<navigator class="search-form round" url="/pages/home/search" hover-class="none">
				<text class="cuIcon-search text-grey text-xl"></text>
				<input type="text" placeholder="搜索" confirm-type="search" />
			</navigator>
		</view>
		<view style="height:50px;background: #0099FF;">我就是占位</view>
		<!-- 顶部导航结束 -->
		<scroll-view @scroll="pageScroll" :style="pageScrollHeight" :scroll-y="true" :scroll-into-view="toStore">
			<view class="bg-white">
				<view class="cu-list grid no-border col-4">
					<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" :data-id="item.name" @click="goToMoreStore">
						<image style="height:70rpx" :src="item.url" mode="aspectFit" />
						<text>{{item.name}}</text>
					</view>
				</view>
				<view class="padding-lr">
					<!-- 轮播图开始 -->
					<swiper class="swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
					 :autoplay="true" interval="4000" duration="1000">
						<swiper-item v-for="(item,index) in swiperList" :key="index">
							<view style="padding:0 5rpx">
								<image style="height:200rpx;width:680rpx;border-radius:20rpx;overflow:hidden;" :src="item.url" mode="scaleToFill"
								 v-if="item.type=='image'" />
							</view>
						</swiper-item>
					</swiper>
					<!-- 轮播图结束 -->
					<!-- 为你优选开始 -->
					<view class="flex justify-between align-center margin-top">
						<view class="text-black text-bold text-sxl">为你优选</view>
						<view @click="goToMoreStore" data-id="为你优选">
							<text class="check-more">更多</text>
							<text class="cuIcon-right"></text>
						</view>
					</view>
					<view class="flex padding-tb-sm justify-between">
						<view v-for="(item,index) in  cateList" :key="index" :data-id="item.id" @click="goToStore">
							<view class style="width:210rpx;height:180rpx;overflow: hidden;">
								<image style="width:210rpx;height:180rpx;border-radius:8rpx; " mode="scaleToFill" lazy-load="true" :src="item.url" />
							</view>
							<view>
								<view class="text-cut text-xsl margin-xs margin-left-none margin-right-none" style="width:210rpx;">{{item.name}}</view>
								<view class="text-grey text-sm">好评率{{item.rate}}%</view>
							</view>
						</view>
					</view>
					<!-- 为你优选结束 -->
					<!-- 今日特价开始 -->
					<view class="flex justify-between align-center">
						<view class="text-black text-bold text-sxl">今日特价</view>
						<view @click="goToMoreStore" data-id="今日特价">
							<text>更多</text>
							<text class="cuIcon-right"></text>
						</view>
					</view>
					<view class="flex padding-tb-sm justify-between">
						<view v-for="(item,index) in  discountList" :key="index" :data-id="item.id" @click="goToStore">
							<view class style="width:210rpx;height:180rpx;overflow: hidden;">
								<image style="width:210rpx;height:180rpx;border-radius:8rpx; " mode="scaleToFill" lazy-load="true" :src="item.imgUrl" />
							</view>
							<view>
								<view class="text-cut text-black text-bold text-xsl margin-xs margin-left-none margin-right-none" style="width:210rpx;">{{item.name}}</view>
								<view class="text-grey">
									<text class="text-price text-orange margin-right-sm">{{item.bargain}}</text>
									<text class="text-price text-grey text-strikethrough">{{item.price}}</text>
								</view>
							</view>
						</view>
					</view>
					<!-- 今日特价结束 -->
					<view class="flex justify-between margin-top">
						<view class="text-black text-bold text-sxl">附近商家</view>
					</view>
				</view>
			</view>
			<!-- 筛选条件框 -->
			<view id="nav" class="bg-white flex justify-between align-center padding-tb-sm padding-lr border-bottom" style="height:40px;z-index:9999;">
				<view class="flex justify-start">
					<view style="min-width:7em" @tap="showModal" data-target="sort">
						{{sortName}}
						<text :class="modalName=='sort'?'cuIcon-fold':'cuIcon-unfold'"></text>
					</view>
					<view :class="sortCur == 7?'text-blue':''" style="min-width:7em" @click="sortSelect" :data-id="7">销量最高</view>
					<view :class="sortCur == 8?'text-blue':''" style="min-width:7em" @click="sortSelect" :data-id="8">速度最快</view>
				</view>
				<!-- <view @tap="showModal" data-target="screen">
					<text>筛选</text>
					<text class="cuIcon-right"></text>
				</view> -->
			</view>
			<!-- 排序拟态窗口开始 -->
			<view class="cu-modal drawer-modal justify-start" :class="modalName=='sort'?'show':''" @tap="hideModal">
				<view class="cu-dialog" @tap.stop :style="[{top:CustomBar + 90+'px'}]">
					<view class="cu-list menu">
						<view class="cu-item" v-for="(item,index) in sortList" :key="index" @click="sortSelect" :data-id="index">
							<view class="content">
								<view :class="sortCur == index?'text-blue':''">{{item}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 排序拟态窗口结束 -->
			<!-- 筛选拟态窗口开始 -->
			<view class="cu-modal drawer-modal justify-start" :class="modalName=='screen'?'show':''" @tap="hideModal">
				<view class="cu-dialog" @tap.stop :style="[{top:CustomBar + 90+'px'}]" style="height:600upx;">
					<view class="padding-lr-sm bg-white" style="height:100%;">
						<scroll-view style="height:600upx" scroll-y="true">
							<view class="my-tag">
								<view class="bg-gray radius padding-tb-xs margin-bottom-sm" style="width:220upx;" v-for="(item,index) in storeTagList"
								 :key="index">{{item}}</view>
							</view>
							<view class="padding-tb-sm text-left text-black">人均价</view>
							<view class="my-tag">
								<view class="bg-gray radius padding-tb-xs margin-bottom-sm" style="width:220upx;" v-for="(item,index) in averageConsume"
								 :key="index">{{item}}</view>
							</view>
							<view class="padding-tb-sm text-left text-black">优惠活动(可多选)</view>
							<view class="my-tag">
								<view class="bg-gray radius padding-tb-xs margin-bottom-sm" style="width:220upx;" v-for="(item,index) in activeTagList"
								 :key="index">{{item}}</view>
							</view>
							<view style="height:49px"></view>
						</scroll-view>
					</view>
					<view class="flex solid-top" style="position:fixed;bottom:0upx;">
						<view class="bg-white padding-tb" @click="screenClear" style="width:375upx">清空</view>
						<view class="bg-blue padding-tb" @click="screenComplete" style="width:375upx">完成</view>
					</view>
				</view>
			</view>
			<scroll-view class="bg-white" @scrolltolower="scrolltolower" :style="storeScrollHeight" :scroll-y="isScroll">
				<!-- <myList :storeList="storeList" @hanlder="goToStore" :loading="loading" :over="over">
				</myList> -->
				<view class="flex justify-between padding-bottom-sm margin-sm" v-for="(item,index) in storeList" :key="index"
				 :data-data="item" @click="goToStore">
					<view class style="width:160rpx;height:160rpx;overflow: hidden;">
						<image style="width:160rpx;height:160rpx;border-radius:8rpx; " mode="scaleToFill" lazy-load="true" :src="item.url" />
					</view>
					<view style="width:510rpx">
						<view class="padding-bottom-xs text-black text-bold text-xl">{{item.name}}</view>
						<view class="flex justify-between padding-bottom-xs text-jiujiu">
							<view>
								<text class="cuIcon-favorfill text-orange"></text>
								<text>{{item.grade}}</text>
								<text class="margin-left-sm">月销{{item.sales}}</text>
							</view>
							<!-- <view>
								<text>30分钟</text>
							</view> -->
						</view>
						<view class="padding-bottom-sm solid-bottom">
							<text>起送</text>
							<text class="text-price">{{item.baseprice}}</text>
							<text class="margin-left-sm">配送</text>
							<text class="text-price">{{item.distribution}}</text>
							<text class="margin-left-sm">人均</text>
							<text class="text-price">{{item.averageConsume}}</text>
						</view>
					</view>
				</view>
				<view v-if="loading" class="cu-load loading"></view>
				<view v-if="over" class="cu-load over"></view>
			</scroll-view>
		</scroll-view>
	</view>
</template>

<script>
	// import sortBox from "../../components/sort/index.vue";
	import myList from "../../components/list/list.vue";
	import Json from '../../../json';
	export default {
		// 引入组件
		components: {
			// sortBox,
			myList
		},

		/*
		初始化数据
		*/
		data() {
			return {
				// CustomBar: this.CustomBar,
				CustomBar: 72,
				isScroll: false,
				scrollTop: 0,
				isLocation: false,
				locationError: false,
				address: "昆明市",
				cuIconList: [],
				dotStyle: false,
				swiperList: [],
				cateList: [],
				storeList: [],
				discountList: [],
				modalName: null,
				toStore: null,
				sortCur: 0,
				sortList: [
					"综合排序",
					"距离最近",
					"评分最高",
					"起送价最低",
					"配送费最低",
					"人均高到低",
					"人均低到高"
				],
				storeTagList: [
					"校园专送",
					"到店自取",
					"放心吃",
					"点评分高",
					"品牌商家",
					"免配送费",
					"新商家"
				],
				averageConsume: ["20元一下", "20-40元", "40元以上"],
				activeTagList: [
					"满减优惠",
					"进店领券",
					"折扣商品",
					"新人立减",
					"满赠活动",
					"减配送费"
				],
				loading: false,
				over: false,
				count: 0
			};
		},
		computed: {
			pageScrollHeight() {
				let CustomBar = this.CustomBar;
				return `height:calc(100vh - ${CustomBar + 50}px);`;
			},
			storeScrollHeight() {
				let CustomBar = this.CustomBar;
				return `height:calc(100vh - ${CustomBar + 90}px);`;
			},
			sortName() {
				let sortCur = this.sortCur;
				let sortList = this.sortList;
				return sortCur > 6 ? sortList[0] : sortList[sortCur];
			},
			// 计算属性的 getter
			addressModify: function() {
				// `this` 指向 vm 实例
				let address = this.address;
				return address.length < 12 ? address : address.substr(0, 10) + "...";
			},

		},
		onLoad: function() {
			console.log("this.CustomBar==", this.CustomBar)
			console.log("Json+++++:", Json)
			uni.createSelectorQuery()
				.select("#nav")
				.boundingClientRect(res => {
					console.log("筛选距离：", res.top);
					this.scrollTop = res.top;
				})
				.exec();
			// 数据请求
			this.getCurLocation();
			this.getCuIconList();
			this.getCatelist();
			this.getStoreList();
			this.getSwiperList();
			this.getDiscountList()
		},
		onShow: function() {
			console.log("pages/home/home");
			if (
				this.gloablMyLocation.address !== null &&
				this.address !== this.gloablMyLocation.address
			) {
				console.log("用户选择了位置");
				this.address = this.gloablMyLocation.address;
			}
		},
		onShareAppMessage(res) {
			if (res.from === "button") {
				// 来自页面内分享按钮
				console.log(res.target);
			}
			return {
				title: "未来校园",
				path: "/pages/home/home"
			};
		},
		methods: {
			//获取当前位置
			getCurLocation: function() {
				// console.log("定位方法++++++++++")
				this.locationModel.getLocation(data => {
					if (!data.locationError) {
						let gloablMyLocation = this.gloablMyLocation;
						let baseInfo = data.baseInfo;
						gloablMyLocation.city = baseInfo.city;
						gloablMyLocation.aois = baseInfo.aois;
						gloablMyLocation.address = baseInfo.address;
						gloablMyLocation.location = baseInfo.location;
						gloablMyLocation.formattedAddress = baseInfo.formattedAddress;
						gloablMyLocation.addressComponent = baseInfo.addressComponent;
						this.address = baseInfo.address;
						this.isLocation = true;
					}
					this.locationError = data.locationError;
				});
			},
			// 分类cuIconList 列表数据
			getCuIconList: function() {
				// console.log("Json+++++:", Json)
				this.cuIconList = Json.cuiconlist
				console.log("JsonstoreList图标分类:", this.cuIconList)
				
				// this.$api.cuIconListApi({
				// 	"pageNo": 1,
				// 	"pageSize": 5
				// }).then(res => {
				// 	console.log('数据:' + JSON.stringify(res.data));
				// 	this.cuIconList = res.data;
				// })
			},
			
			// 今日特价  列表数据
			getDiscountList: function() {
				// console.log("Json+++++:", Json)
				this.discountList = Json.discountlist
				console.log("discountList特价:", this.discountList)
				
=======
				this.cuIconList = Json.cuiconlist
				console.log("cuIconList:", this.cuIconList)

>>>>>>> 6b221cc28e510b1e6a911729bb8b594d333f8bad
				// this.$api.cuIconListApi({
				// 	"pageNo": 1,
				// 	"pageSize": 5
				// }).then(res => {
				// 	console.log('数据:' + JSON.stringify(res.data));
				// 	this.cuIconList = res.data;
				// })
			},
			
			// 分类cuIconList 列表数据
			getCatelist: function() {
<<<<<<< HEAD
				// console.log("Json+++++:", Json)
				this.cateList = Json.catelist
				console.log("JsonstoreList附近商家:", this.cateList)
=======
				this.cateList = Json.catelist
				console.log("cateList:", this.cateList)
>>>>>>> 6b221cc28e510b1e6a911729bb8b594d333f8bad
				// this.$api.catelistApi({
				// 	"pageNo": 1,
				// 	"pageSize": 5
				// }).then(res => {
				// 	console.log('cateList数据:' + JSON.stringify(res.data));
				// 	this.cateList = res.data;
				// })
			},
			// 列表数据
			getStoreList: function() {
<<<<<<< HEAD
				// console.log("Json+++++:", Json)
				this.storeList = Json.storelist
				console.log("JsonstoreList:商家", this.storeList)
=======
				this.storeList = Json.storelist
				console.log("storeList:", this.storeList)
>>>>>>> 6b221cc28e510b1e6a911729bb8b594d333f8bad
				// this.$api.storeListApi({
				// 	"pageNo": 1,
				// 	"pageSize": 5
				// }).then(res => {
				// 	this.carArr = res.data;
				// 	console.log('数据:' + res);
				// 	console.log('storeList数据+++++++++:' + JSON.stringify(res.data));
				// 	this.storeList = res.data;
				// 	this.scrolltolower(data)
				// })
			},
			// 轮播图数据
			getSwiperList: function() {
				this.swiperList = Json.swiperlist
				console.log("swiperList:", this.swiperList)
				// this.$api.swiperListApi({
				// 	"pageNo": 1,
				// 	"pageSize": 5
				// }).then(res => {
				// 	this.carArr = res.data;
				// 	console.log('数据:' + res);
				// 	console.log('swiperList数据+++++++++:' + JSON.stringify(res.data));
				// 	this.swiperList = res.data;
				// })
			},

			pageScroll: function(e) {
				//console.log(e.detail.scrollTop)
				let temp = this.scrollTop - 50 - this.CustomBar - 2;
				// 重要！！！多减2像素可降低滑动卡顿
				//console.log(temp)
				if (e.detail.scrollTop >= temp) {
					this.isScroll = true;
				} else {
					this.isScroll = false;
				}
			},
			//跳转至更多商家店铺
			goToMoreStore(e) {
				console.log("P++++", e.currentTarget.dataset);
				uni.navigateTo({
					url: "/pages/home/morestore?id=" + e.currentTarget.dataset.id
				});
			},
			//跳转至商家店铺
			goToStore(e) {
				uni.navigateTo({
					// url: "/pages/home/store?id=" + e.currentTarget.dataset,
					url: "/pages/home/storetest?id=" + e.currentTarget.dataset
				});
			},
			showModal(e) {
				console.log("传过来的是什么？", e)
				this.toStore = "nav";
				this.modalName = e.currentTarget.dataset.target;
			},
			hideModal(e) {
				this.toStore = null;
				this.modalName = null;
			},
			//排序方式切换
			sortSelect(e) {
				console.log(e);
				this.sortCur = e.currentTarget.dataset.id;
			},
			//筛选栏切换
			tabSelect(e) {
				console.log(e);
				this.tabCur = e.currentTarget.dataset.id;
			},
			//筛选条件清空
			screenClear(e) {
				console.log("清空筛选条件");
			},
			//筛选条件确定
			screenComplete() {
				this.modalName = null;
			},
			currentHanler(mess) {
				console.log(mess)
			},

			scrolltolower() {
				console.log("到底了", this.storeList);
				// this.getStoreList()
				if (!this.over) {
					if (this.count < 5) {
						this.loading = true;
						var _this = this;
						setTimeout(function() {
							_this.storeList = _this.storeList.concat(_this.storeList);
							_this.loading = false;
							_this.count++;
						}, 1000);
					} else {
						this.over = true;
					}
				} else {
					this.loading = false;
				}
			}
		}
	};
</script>

<style>
	.cu-load::before {
		font-family: "cuIcon";
		display: inline-block;
		margin-right: 6rpx;
		font-size: 36rpx;
	}

	.cu-load.loading::after {
		content: "加载中...";
		font-size: 32rpx;
	}

	.cu-load.erro::before {
		font-size: 36rpx;
		content: "\e658";
	}

	.cu-load.over::after {
		content: "定位失败，点击重试";
		font-size: 32rpx;
	}

	.location-img {
		width: 40rpx;
		height: 40rpx;
	}

	/* 重写轮播图样式 */
	.swiper {
		height: 200rpx;
		width: 690rpx;
		margin: 0rpx auto;
	}

	/* 自定义标签 */
	.my-tag {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-top: 10px;
	}

	/* ==================
         模态窗口
 ==================== */

	.cu-modal.show {
		opacity: 1;
		transition-duration: 0.3s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
	}

	.cu-dialog {
		position: relative;
		display: inline-block;
		vertical-align: middle;
		margin-left: auto;
		margin-right: auto;
		width: 750upx;
		max-width: 100%;
		background-color: #f8f8f8;
		border-radius: 10upx;
		overflow: hidden;
	}

	.cu-modal.drawer-modal .cu-dialog {
		height: 500upx;
		width: 750upx;
		border-radius: 0;
		margin: initial;
		transition-duration: 0.3s;
	}

	.cu-modal.drawer-modal.justify-start .cu-dialog {
		transform: translateY(-100%);
	}

	.cu-modal.drawer-modal.justify-end .cu-dialog {
		transform: translateY(100%);
	}

	.cu-modal.drawer-modal.show .cu-dialog {
		transform: translateY(0%);
	}
</style>
