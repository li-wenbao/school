<template>
	<view class="page">
		<cu-custom :bgColor="'bg-blue'" :isBack="true">
			<block slot="backText">{{pageTitle}}</block>
			<block slot="content">
				<!-- #ifndef MP-ALIPAY -->
				
				<!-- #endif -->
			</block>
			<block slot="right">
				<view class="action"></view>
			</block>
		</cu-custom>
		<!-- 滚动页面开始 -->
		<!-- 滚动固定排序 开始-->
		<view :style="'position:fixed;top: '+ CustomBar + 'px;'" id="nav" class="bg-blue flex justify-between align-center padding-tb-sm padding-lr solids-bottom"
		 style="height:40px;z-index:9999;width: 100%;">
			<view class="flex justify-start">
				<view style="min-width:7em" @tap="showModal" data-target="sort">
					{{sortName}}
					<text :class="modalName=='sort'?'cuIcon-fold':'cuIcon-unfold'"></text>
				</view>
				<view :class="sortCur == 7?'text-black':''" style="min-width:7em" @click="sortSelect" :data-id="7">销量最高</view>
				<view :class="sortCur == 8?'text-black':''" style="min-width:7em" @click="sortSelect" :data-id="8">速度最快</view>
			</view>
			<!-- <view @tap="showModal" data-target="screen">
				<text>筛选</text>
				<text class="cuIcon-right" style="color: #FFFFFF;"></text>
			</view> -->
		</view>
		<!-- 滚动固定排序 结束-->
		<!-- 排序拟态窗口开始 -->
		<view class="cu-modal drawer-modal justify-start" :class="modalName=='sort'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop :style="[{top:CustomBar + 40+'px'}]">
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
			<view class="cu-dialog" @tap.stop :style="[{top:CustomBar + 40+'px'}]" style="height:600upx;">
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
		<!-- 筛选拟态窗口 结束 -->
		<!-- 商家列表开始  -->
		<scroll-view class="bg-white" @scrolltolower="scrolls" scroll-y :style="pageScrollHeight">
			<view style="margin-top: 50px;">
				<myList :storeList="storeList" @hanlder="goToStore" :loading="loading" :over="over">
				</myList>
			</view>
		</scroll-view>
		<!-- 商家列表 结束-->
	</view>
</template>

<script>
	import myList from "../../components/list/list.vue";
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
				pageTitle:"店铺",
				isScroll: false,
				scrollTop: 0,
				discountList: [{
						url: "/static/aaa.jpg",
						name: "豚骨拉面(怡园风味)",
						price: 20,
						bargain: 15,
						id: 1
					},
					{
						url: "/static/zyy5.jpg",
						name: "黄金炸洋芋",
						price: 30,
						bargain: 24,
						id: 2
					},
					{
						url: "/static/zyy2.jpg",
						name: "炸洋芋拼炸石屏豆腐",
						price: 15,
						bargain: 12,
						id: 3
					}
				],
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
				storeList: [{
						id: 1,
						name: "豚骨拉面(怡园风味)",
						url: "/static/ddd.jpg",
						grade: 4.9,
						sales: 258,
						basePrice: 15,
						distribution: 3,
						averageConsume: 21
					},
					{
						id: 2,
						name: "美味炸鸡",
						url: "/static/eee.jpg",
						grade: 4.5,
						sales: 356,
						basePrice: 20,
						distribution: 2,
						averageConsume: 25
					},
					{
						id: 3,
						name: "羊肉米线",
						url: "/static/fff.jpg",
						grade: 4.6,
						sales: 186,
						basePrice: 15,
						distribution: 2,
						averageConsume: 18
					},
					{
						id: 3,
						name: "清真昭通牛肉王小肉串(月牙塘店)",
						url: "/static/ddd.jpg",
						grade: 4.6,
						sales: 186,
						basePrice: 15,
						distribution: 2,
						averageConsume: 18
					},
					{
						id: 53,
						name: "四禾小吃坊 (花甲米线)",
						url: "/static/ldd.jpg",
						grade: 4.6,
						sales: 186,
						basePrice: 15,
						distribution: 2,
						averageConsume: 18
					},
					{
						id: 3,
						name: "叫了只炸鸡 (北市区店)",
						url: "/static/jlzj.jpg",
						grade: 4.6,
						sales: 186,
						basePrice: 15,
						distribution: 2,
						averageConsume: 18
					},
					{
						id: 3,
						name: "乐多多炸鸡汉堡(农大店)",
						url: "/static/ldd.jpg",
						grade: 4.6,
						sales: 186,
						basePrice: 15,
						distribution: 2,
						averageConsume: 18
					},
					{
						id: 73,
						name: "鸭旭北京烤鸭(百富琪店)",
						url: "/static/ky.jpg",
						grade: 4.6,
						sales: 186,
						basePrice: 15,
						distribution: 2,
						averageConsume: 18
					},
					{
						id: 1,
						name: "豚骨拉面(怡园风味)",
						url: "/static/ddd.jpg",
						grade: 4.9,
						sales: 258,
						basePrice: 15,
						distribution: 3,
						averageConsume: 21
					},
					{
						id: 2,
						name: "美味炸鸡",
						url: "/static/eee.jpg",
						grade: 4.5,
						sales: 356,
						basePrice: 20,
						distribution: 2,
						averageConsume: 25
					},
					{
						id: 3,
						name: "羊肉米线",
						url: "/static/fff.jpg",
						grade: 4.6,
						sales: 186,
						basePrice: 15,
						distribution: 2,
						averageConsume: 18
					},
					{
						id: 3,
						name: "清真昭通牛肉王小肉串(月牙塘店)",
						url: "/static/ddd.jpg",
						grade: 4.6,
						sales: 186,
						basePrice: 15,
						distribution: 2,
						averageConsume: 18
					}
				],
				loading: false,
				over: false,
				count: 0
			};
		},
		computed: {
			// 计算属性的 getter
			pageScrollHeight() {
				let CustomBar = this.CustomBar;
				return `height:calc(100vh - ${CustomBar}px);`;
			},
			sortName() {
				let sortCur = this.sortCur;
				let sortList = this.sortList;
				return sortCur > 6 ? sortList[0] : sortList[sortCur];
			}
		},
		onLoad: function(options) {
          console.log("fffffffffffff",options)
		  this.pageTitle = options.id
		},
		onShow: function() {

		},
		methods: {
			//跳转至商家店铺
			goToStore(e) {
				console.log(e);
				uni.navigateTo({
					url: "/pages/home/storetest?id=" + e.currentTarget.dataset.id
				});
			},
			showModal(e) {
				console.log("是什么？", e.currentTarget.dataset.target)
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

			scrolls() {
				console.log("scrolls到底了");
				if (!this.over) {
					if (this.count < 5) {
						this.loading = true;
						var _this = this;
						setTimeout(function() {
							let data = _this.storeList;
							_this.storeList.push(
								data[Math.floor(Math.random() * 10)],
								data[Math.floor(Math.random() * 10)],
								data[Math.floor(Math.random() * 10)],
								data[Math.floor(Math.random() * 10)]
							);
							_this.loading = false;
							_this.count++;
						}, 2000);
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
