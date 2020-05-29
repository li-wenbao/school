<template>
	<view class="page">
		<cu-custom :bgColor="'bg-blue'" :isBack="false">
			<block slot="backText"></block>
			<block slot="content">
				<!-- #ifdef MP-WEIXIN -->
				校园外卖
				<!-- #endif -->
			</block>
			<block slot="right">
				<view class="action"></view>
			</block>
		</cu-custom>
		<!-- 顶部导航开始 -->
		<Search></Search>
		<view style="height:50px;background: #0099FF;">我就是占位</view>
		<scroll-view @scroll="pageScroll" :style="pageScrollHeight" :scroll-y="true" :scroll-into-view="toStore">
			<GriadList :cuIconList="cuIconList"></GriadList>
			<Banners :swiperList="swiperList"></Banners>
			<Preference :cateList="cateList"></Preference>
			<Special :discountList="discountList"></Special>
			<Title></Title>
			<!-- 筛选先放下 -->
			<!-- <view @click="poll()" :catchtouchmove="true">
			<Delicacy id="boxFixed" :class="{'is_fixed' : isfixed}"></Delicacy>
			</view> -->
			<scroll-view class="bg-white" @scrolltolower="scrolltolower" :style="storeScrollHeight" :scroll-y="isScroll">
				<Mlist :storeList="storeList" @hanlder="goToStore" :loading="loading" :over="over"></Mlist>
			</scroll-view>
		</scroll-view>
	</view>
</template>

<script>
	let {
		log
	} = console
	import Json from '../../json.js';
	import Search from "./components/search.vue"
	import GriadList from "./components/griadList.vue"
	import Banners from "./components/banners.vue"
	import Preference from "./components/preference.vue"
	import Special from "./components/special.vue"
	import Title from "./components/title.vue"
	// import Delicacy from "./components/delicacy.vue"
	import Mlist from "./components/mlist.vue"
	export default {
		components: {
			Search,
			GriadList,
			Banners,
			Preference,
			Special,
			Title,
			// Delicacy,
			Mlist,
		},
		data() {
			return {
				CustomBar: 72,
				isScroll: false,
				scrollTop: 0,
				cuIconList: [],
				swiperList: [],
				isScroll: false,
				dotStyle: false,
				cateList: [],
				discountList: [],
				storeList: [],
				loading: false,
				over: false,
				count: 0,
				toStore: null,
			}
		},
		onLoad() {
			this.getCuIconList(); //商家分类
			this.getSwiperList(); //广告轮播
			this.getCatelist(); //为你优选 
			this.getDiscountList(); //今日特价
			this.getStoreList(); //附近商家
		},
		methods: {
			// 分类cuIconList 列表数据
			getCuIconList: function() {
				this.cuIconList = Json.cuiconlist
				// log(this.cuIconList)
			},

			// 广告轮播图部分 列表数据
			getSwiperList: function() {
				this.swiperList = Json.swiperList
				// log(this.swiperList)
			},
			// 分类cuIconList 列表数据
			getCatelist: function() {
				this.cateList = Json.catelist
				// log(this.cateList)
			},
			// 今日特价  列表数据
			getDiscountList: function() {
				this.discountList = Json.discountlist
			},
			getStoreList: function() {
				this.storeList = Json.storelist
			},

			pageScroll: function(e) {
				////console.log(e.detail.scrollTop)
				let temp = this.scrollTop - 50 - this.CustomBar - 2;
				// 重要！！！多减2像素可降低滑动卡顿
				////console.log(temp)
				if (e.detail.scrollTop >= temp) {
					this.isScroll = true;
				} else {
					this.isScroll = false;
				}
			},

			// 回到顶部
			poll() {
				wx.pageScrollTo({
					scrollTop: this.topdata + 2,
					duration: 300
				})
			},
			// 到底了
			scrolltolower() {
				//console.log("到底了", this.storeList);
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
			},
			//跳转至更多商家店铺
			goToMoreStore(e) {
				//console.log("P++++", e.currentTarget.dataset);
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

	}
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
</style>
