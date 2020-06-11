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
		<view class="cu-bar search bg-blue" style="position: fixed;width:750rpx;height:50px;z-index:888;">
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
			<view id="nav" class="bg-white flex justify-between align-center padding-tb-sm padding-lr solids-bottom" style="height:40px;z-index:9999;">
				<view class="flex justify-start">
					<view style="min-width:7em" @tap="showModal" data-target="sort">
						{{synthesize}}
						<text :class="modalName=='sort'?'cuIcon-fold':'cuIcon-unfold'"></text>
					</view>
					<view :class="sortCur == 7?'text-appcolor':'text-black'" style="min-width:7em" @click="salHselect" :data-id="7">销量最高</view>
					<view :class="sortCur == 8?'text-appcolor':'text-black'" style="min-width:7em" @click="fastSelect" :data-id="8">速度最快</view>
				</view>
				<view @tap="showModal" data-target="screen">
					<text>筛选</text>
					<text class="cuIcon-right"></text>
				</view>
			</view>
			<!-- 综合排序拟态窗口开始 -->
			<view class="cu-modal drawer-modal justify-start" :class="modalName=='sort'?'show':''" @tap="hideModal">
				<view class="cu-dialog" @tap.stop :style="[{top:CustomBar + 90+'px'}]">
					<view class="cu-list menu">
						<view class="cu-item" v-for="(item,index) in sortList" :key="index">
							<view class="content" @click="sortTap(index,item.name,item.screen,item.nums)">
								<view :class="sortCur == index?'text-blue':''">{{item.name}}</view>
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
								<view class=" padding-tb-xs margin-bottom-sm" v-for="(item,index) in screendata" :key="index">
									<view class="flex justify-start margin-bottom-xs margin-top-xs">{{item.title}}</view>
									<block v-for="(itemdata,indexs) in item.datas" :key="indexs">
										<button class="cu-btn margin-xs " :class="{lineOrange: itemdata.id === 2}" @click="screenchoIce(indexs,itemdata.sign)">
											{{itemdata.name}}
										</button>
									</block>
								</view>
							</view>
							<!-- <view class="padding-tb-sm text-left text-black">人均价</view> -->
							<view class="my-tag">
								<!-- 单选：人均价 -->
								<view class="padding-tb-xs margin-bottom-sm" v-for="(item,index) in person" :key="index">
									<view class="flex justify-start margin-bottom-xs margin-top-xs">{{item.title}}</view>
									<view class="sortlist-flex">
										<block v-for="(itemdata,indexs) in item.datas" :key="indexs">
											<button class="cu-btn margin-xs " :class="{lineOrange: indexs == scrnum}" @click="personchoIce(indexs,itemdata.per)">
												{{itemdata.name}}
											</button>
										</block>
									</view>
								</view>
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
				<myList :storeList="storeList" @hanlder="goToStore" :loading="loading" :over="over">
				</myList>
			</scroll-view>
		</scroll-view>
	</view>
</template>

<script>
	import myList from "../../components/list/list.vue";
	import Json from '../../../json';
	export default {
		// 引入组件
		components: {
			myList
		},

		/*
		初始化数据
		*/
		data() {
			return {
				CustomBar: this.CustomBar,
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
				synthesize: "综合排序",
				sortList: [{
						"name": "综合排序",
						"screen": "_id",
						"nums": 1
					},
					{
						"name": "起送价最低",
						"screen": "delivering",
						"nums": 1
					},
					{
						"name": "配送费最低",
						"screen": "physical",
						"nums": 1
					},
					{
						"name": "人均高到低",
						"screen": "capita",
						"nums": -1
					},
					{
						"name": "人均低到高",
						"screen": "capita",
						"nums": 1
					},
					{
						"name": "评分高到低",
						"screen": "capita",
						"nums": -1
					},
					{
						"name": "评分低到高",
						"screen": "capita",
						"nums": 1
					}
				],

				// 多选
				screendata: [{
					"title": "商家特色(可多选)",
					"datas": [{
							"id": 1,
							"sign": 'duration',
							"name": '配送最快'
						},
						{
							"id": 1,
							"sign": 'deliver',
							"name": '0元起送'
						},
						{
							"id": 1,
							"sign": 'physi',
							"name": '免配送费'
						}
					],
				}],
				// 人均价筛选
				person: [{
					"title": "人均价",
					"datas": [{
							"name": "20元以下",
							"per": {
								"$lt": 20
							},
						},
						{
							"name": "20-40元",
							"per": {
								"$lte": 40,
								"$gte": 20
							},
						},
						{
							"name": "40元以上",
							"per": {
								"$gt": 40
							},
						},
					]
				}],
				scrnum: -1,
				// 接收筛选的对象
				multiobj: {},

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
			console.log("组件高度", this.CustomBar)
			uni.createSelectorQuery()
				.select("#nav")
				.boundingClientRect(res => {
					console.log("筛选距离:", res.top);
					this.scrollTop = res.top;
				}).exec();

			// #ifdef MP-ALIPAY
			my.createSelectorQuery()
				.select("#nav")
				.boundingClientRect(res => {
					this.scrollTop = res.top;
				}).exec();
			// #endif
			// 数据请求
			this.getCurLocation();
			this.getCuIconList();
			this.getCatelist();
			this.getStoreList();
			this.getSwiperList();
			this.getDiscountList()
		},
		onShow: function() {
			if (
				this.gloablMyLocation.address !== null &&
				this.address !== this.gloablMyLocation.address
			) {
				//console.log("用户选择了位置");
				this.address = this.gloablMyLocation.address;
			}
		},
		methods: {
			//获取当前位置
			getCurLocation: function() {
				// //console.log("定位方法++++++++++")
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
				this.cuIconList = Json.cuiconlist

			},

			// 今日特价  列表数据
			getDiscountList: function() {
				this.discountList = Json.discountlist
			},

			// 分类cuIconList 列表数据
			getCatelist: function() {
				this.cateList = Json.catelist
			},
			// 列表数据
			getStoreList: function() {
				this.storeList = Json.storelist
			},
			// 列表数据
			getSwiperList: function() {
				this.swiperList = Json.swiperList
			},

			pageScroll: function(e) {
				console.log("滚动的距离", e.detail.scrollTop)

				let temp = this.scrollTop - 50 - this.CustomBar - 2;
				// 重要！！！多减2像素可降低滑动卡顿
				////console.log(temp)
				if (e.detail.scrollTop >= temp) {
					this.isScroll = true;
				} else {
					this.isScroll = false;
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
			showModal(e) {
				this.toStore = "nav";
				console.log("点击置顶？？？")
				console.log("this.toStore？？？", this.toStore)
				this.modalName = e.currentTarget.dataset.target;
				uni.pageScrollTo({
					scrollTop: this.scrollTop + this.CustomBar + 2,
				})
			},
			hideModal(e) {
				this.toStore = null;
				this.modalName = null;
			},
			//用户选择销量最高
			salHselect(e) {
				this.toStore = "nav";
				this.sortCur = e.currentTarget.dataset.id;
				uni.showToast({
					title: "要传的参数" + this.sortCur
				})
			},

			//用户选择速度最快
			fastSelect(e) {
				this.toStore = "nav";
				this.sortCur = e.currentTarget.dataset.id;
				uni.showToast({
					title: "要传的参数" + this.sortCur
				})
			},


			//综合排序方式切换
			sortTap(index, name, screen, nums) {
				this.sortCur = index;
				this.synthesize = name
				console.log("综合排序选择+", screen + nums)
				this.starTing(screen, nums)
			},

			// 综合排序的请求
			starTing(screen, nums) {
				let Data = {
					screen,
					nums
				}
				console.log("触发综合排序请求打出参数:+", JSON.stringify(Data))
			},

			//筛选栏切换
			// tabSelect(e) {
			// 	//console.log(e);
			// 	this.tabCur = e.currentTarget.dataset.id;
			// },

			// 商家特色（多选）
			screenchoIce(indexs, sign) {
				console.log(sign)
				if (this.screendata[0].datas[indexs].id == 1) {
					// 选中
					this.screendata[0].datas[indexs].id = 2
					console.log('选中')
					this.$set(this.multiobj, sign, sign)
					// this.$set给对象添加一个属性
					console.log(this.multiobj)
				} else {
					// 未选中
					this.screendata[0].datas[indexs].id = 1
					console.log('未选中')
					this.$delete(this.multiobj, sign)
					console.log(this.multiobj)
				}
			},

			// 人均价（单选）
			personchoIce(index, name) {
				if (this.scrnum == index) {
					// 未选中
					this.scrnum = -1
					this.$delete(this.multiobj, 'capita')
					console.log(this.multiobj)
				} else {
					// 选中
					this.scrnum = index
					this.$set(this.multiobj, 'capita', name)
					console.log(this.multiobj)
				}
			},


			//筛选条件清空
			screenClear(e) {
				//console.log("清空筛选条件");
				// 商家特色
				this.screendata.forEach((item) => {
					let arr = item.datas.map((items) => {
						items.id = 1
						return items
					})
					console.log(arr)
				})
				this.multiobj = {}
				// 人均价
				this.scrnum = -1
			},
			//筛选条件确定
			screenComplete() {
				this.modalName = null;
				console.log("打出筛选条件", JSON.stringify(this.multiobj))

				// publicing(multipleurl, this.multiobj)
				// 	.then((res) => {
				// 		console.log(res)
				// 		// 存储到vuex数据仓库
				// 		this.$store.commit('screenmuta', res.data)
				// 	})
				// 	.catch((err) => {
				// 		console.log(err)
				// 	})
			},

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
			}
		}
	};
</script>

<style>
	/* 商家特色加样式 */
	.lineOrange {
		border-color: #f37b1d;
	}

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
