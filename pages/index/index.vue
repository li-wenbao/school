<template>
	<view class="page">
		<view class="bg-white">
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
			<GriadList :cuIconList="cuIconList"></GriadList>
			<Banners :swiperList="swiperList"></Banners>
			<!-- <Preference :cateList="cateList"></Preference> -->
			<Preference :preferdata="preferdata"></Preference>
			<Special :discountList="discountList"></Special>
			<Title></Title>
			<!-- 筛选先放下 -->
			<view @click="poll()" :catchtouchmove="true">
				<Delicacy id="boxFixed" :class="{'is_fixed' : isfixed}"></Delicacy>
			</view>
			<view style="height: 45px;"></view>
			<scroll-view class="bg-white" @scrolltolower="scrolltolower" :style="storeScrollHeight" :scroll-y="isScroll">
				<Mlist :takeshop="takeshop" @hanlder="goToStore" :loading="loading" :over="over"></Mlist>
			</scroll-view>
		</view>
		<!-- loading -->
		<home-load v-if="efinition"></home-load>
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
	import Delicacy from "./components/delicacy.vue"
	import Mlist from "./components/mlist.vue"

	// 引入接口
	import {
		listing
	} from '../../api/api.js'
	// 引入请求地址
	import {
		getpreferurl,
		wxshopurl
	} from '../../api/request.js'
	// 引入vuex的mapstate
	import {
		mapState
	} from 'vuex'

	export default {
		components: {
			Search,
			GriadList,
			Banners,
			Preference,
			Special,
			Title,
			Delicacy,
			Mlist,
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				// CustomBar: 72,
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

				// loading
				efinition: true,
				menutop: '',
				rect: '',
				topdata: '',
				isfixed: false,
				// 为你优选
				preferdata: [],
				// 商家列表
				takeshop: [],
			}
		},
		onLoad() {
			// this.getCurLocation();
			this.getCuIconList(); //商家分类
			this.getSwiperList(); //广告轮播
			// this.getCatelist(); //为你优选 
			this.getDiscountList(); //今日特价
			// this.getStoreList(); //附近商家
			// #ifdef MP-WEIXIN
			uni.createSelectorQuery()
				.select("#boxFixed")
				.boundingClientRect(res => {
					this.menutop = res.top
					this.topdata = res.top
				}).exec();
			// #endif
			// #ifdef MP-ALIPAY
			my.createSelectorQuery()
				.select("#boxFixed")
				.boundingClientRect(res => {
					this.menutop = res.top
					this.topdata = res.top
				}).exec();
			// #endif
		},
		onShow: function() {
			// console.log("pages/home/home");
			if (
				this.gloablMyLocation.address !== null &&
				this.address !== this.gloablMyLocation.address
			) {
				// console.log("用户选择了位置");
				this.address = this.gloablMyLocation.address;
			}
		},
		mounted() {
			this.preference()
		},
		methods: {
			//获取当前位置
			getCurLocation: function() {
				console.log("定位方法++++++++++")
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

			preference() {
				// 批量并发请求多个接口，
				//Promise.all =>可以并发请求多个接口。并且同时得到多个接口的数据
				Promise.all([listing(getpreferurl), listing(wxshopurl)])
					.then((res) => {
						// console.log("res+++++++++"res)
						// 为你优选
						this.preferdata = res[0].data
						// 商家列表
						this.takeshop = res[1].data
						// loading取消
						this.efinition = false
					})
					.catch((err) => {
						console.log(err)
					})
			},


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
				let temp = this.scrollTop - this.CustomBar - 2;
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
				this.toStore = "boxFixed";
				// uni.pageScrollTo({
				// 	scrollTop: this.topdata + this.CustomBar + 2,
				// 	duration: 300
				// })
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
			...mapState(['screendata']),
			pageScrollHeight() {
				let CustomBar = this.CustomBar;
				return `height:calc(100vh - ${CustomBar}px);`;
			},
			storeScrollHeight() {
				let CustomBar = this.CustomBar;
				return `height:calc(100vh - ${CustomBar + 145}px);`;
			},

			// count() {
			// 	this.takeshop = this.screendata.screenarr
			// },

			// 计算属性的 getter
			// addressModify: function() {
			// 	// `this` 指向 vm 实例
			// 	let address = this.address;
			// 	return address.length < 12 ? address : address.substr(0, 10) + "...";
			// },
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

	/* 重写轮播图样式 */
	.swiper {
		height: 200rpx;
		width: 690rpx;
		margin: 0rpx auto;
	}
</style>
