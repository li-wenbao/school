<template>
	<view class="hx-store">
		<view class="page">
			<!-- 只需要绑定购物车位置即可 -->
			<flyInCart ref="inCart" :cartBasketRect="cartBasketRect"></flyInCart>
			<!-- 头部 -->
			<view class="header" :style="[{height:CustomBar + 120 + 'px'}]">
				<view class="bgImage" style="width:100%;" :style="[{height:CustomBar + 30 + 'px'}]" :class="storeData.logoId?'':'bg-blue'">
					<image v-if="storeData.logoId" :src="imgurl + storeData.logoId + '.json'" style="width:100%;" :style="[{height:CustomBar + 30 + 'px'}]" />
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
								<image style="width:100rpx;height:100rpx;border-radius:8rpx; " mode="aspectFit" :src="imgurl + storeData.logoId + '.json'" />
							</view>
							<view class="margin-left-sm" style="width:410rpx">
								<view class="text-black text-bold text-xl">{{storeData.name}}</view>
								<view class="text-grey text-sm padding-tb-xs">
									<text class="cuIcon-favorfill text-orange"></text>
									<text>{{storeData.merchantStat}}</text>
									<!-- <text class="margin-lr-sm">|</text> -->
									<!-- <text>配送约{{store.averageTime}}分钟</text>-->
								</view>
							</view>
							<view class="text-center" style="width:120rpx">
								<button class="cu-btn round line-black" role="button" aria-disabled="false">关注</button>
							</view>
						</view>
						<!-- <view class="text-grey text-sm margin-top-xs">
							<text>公告：{{store.notice}}</text>
						</view> -->
					</view>
				</view>
			</view>
			<!-- 导航栏开始 -->
			<scroll-view scroll-x class="bg-white nav" scroll-left="0">
				<view class="flex cu-bar search border-bottom">
					<view class="flex align-center" style="width:500rpx;">
						<view class="cu-item" style="position: relative;" v-for="(item,index) in tabList" :key="index" @click="tabSelect"
						 :data-id="index">
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

			<!-- 主体 -->
			<!-- 购物 -->
			<view v-if="tabCur == 0">
				<view class="flex">
					<!-- 左侧菜单 -->
					<scroll-view class="VerticalNav bg-f8 nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" :style="style">
						<view class="cu-item text-df" :class="index==vTabCur?'text-appcolor bg-white text-bold':''" v-for="(item,index) in categoryList"
						 :key="index" @tap="vTabSelect" :data-id="index">
							{{item.name}}
							<text class="allcount" v-if="item.number">
								{{item.number}}
							</text>
						</view>
						<view style="height: 70px;"></view>
					</scroll-view>
					<scroll-view class="bg-white padding-sm" style="flex: 1;" scroll-y scroll-with-animation :style="style"
					 :scroll-into-view="'main-'+ mainCur" @scroll="VerticalMain">
						<view v-for="(item,index) in categoryList" :key="index" :id="'main-'+index">
							<view class="text-black text-bold margin-bottom-xs">{{item.name}}</view>
							<view class="flex margin-bottom-sm" v-for="(rowData,i) in goodsList" :key="i" v-if="item.id == rowData.type_id"
							 style="width:550rpx">
								<view class="margin-right-sm" style="width:160rpx;height:160rpx;overflow: hidden;">
									<image style="width:160rpx;height:160rpx;border-radius:10rpx;" lazy-load="true" :src="rowData.img" />
								</view>
								<view class="flexd" style="width:370rpx">
									<view>
										<view class="text-lg text-black text-bold">{{rowData.name}}</view>
										<view class="text-sm text-cut margin-top-xs">
											<text>{{rowData.introduction}}</text>
											<text>{{rowData.descripe}}</text>
										</view>
										<view class="text-gray margin-top-xs">
											<text class="text-sm">月销{{rowData.sales}}</text>
											<text class="margin-left-sm text-sm">好评{{rowData.rate}}%</text>
										</view>
									</view>
									<view>
										<view class="flex justify-between">
											<view class="margin-top-xs">
												<block v-if="rowData.form">
													<view class="text-grey">
														<text class="text-price text-orange margin-right-sm">
															{{rowData.form_child[0].price}}
														</text>
														<text class="text-price text-grey text-strikethrough" v-if="rowData.form_child[0].oldprice">
															￥{{rowData.form_child[0].oldprice}}
														</text>
													</view>

												</block>
												<block v-else>
													<view class="text-grey">
														<text class="text-price text-orange margin-right-sm">
															{{rowData.price}}
														</text>
														<text class="text-price text-grey text-strikethrough" v-if="rowData.oldprice">
															￥{{rowData.oldprice}}
														</text>
													</view>
												</block>
											</view>
											<view>
												<block v-if="rowData.form">
													<view class="miniBtn" @click="showForm(rowData)">
														<text>选规格</text>
														<view class="num" v-if="getCartGoodsNum(rowData)">{{getCartGoodsNum(rowData)}}</view>
														<!-- #ifdef APP-PLUS || H5 -->
														<!-- <view class="num" v-if="getCartGoodsNum(rowData)">{{getCartGoodsNum(rowData)}}</view> -->
														<!-- #endif -->
													</view>
												</block>
												<block v-else>
													<view :class="'addEle_' + i" class="jumpPosition"></view>
													<hx-number-box @change="addGoodsChange" :value="rowData.number" :rowData="rowData" :clickTime="animaTime"
													 @addChange="touchOnAddGoods('.addEle_' + i,rowData)"></hx-number-box>
												</block>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view style="height: 60px;"></view>
					</scroll-view>
				</view>
			</view>
			<!-- 评价 -->
			<!-- <view v-if="tabCur == 1">
				<scroll-view scroll-y style="height: 100%;width: 100%;background-color: #ffffff;" @scroll="asideScroll" :scroll-y="goodsBoxScroll">
					<view class="scroll-items evaluate-box">
						<view class="evaluate-box-header">
						</view>
						<view class="evaluate-box-body">
						</view>
						<hx-comment :listData="commentList"></hx-comment>
					</view>
				</scroll-view>
			</view> -->
			<!-- 商家 -->
			<view class="swiper-item" v-if="tabCur == 1">
				<view class="cu-list menu sm-border margin-top-sm">
					<view class="cu-item">
						<view class="content">
							<image src="/static/menu/location.png" class="png" mode="aspectFit" />
							<text class="text-grey">{{storeData.address}}</text>
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
							<text class="text-grey">配送服务：由一点校园提供配送服务</text>
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
			<!-- 购物车 -->
			<view class="foot" @touchmove.stop.prevent="mpClear" :style="{height: footHeight}" v-if="showFoot">
				<view class="zz" @click="hideShoppingCar"></view>
				<view class="btn-box">
					<view class="btn-box-left" @click="contact">
						<view class="imgBox">
							<image src="../../static/store/contact.png" mode="aspectFit"></image>
						</view>
						<text>联系商家</text>
					</view>
					<view class="btn-box-line"></view>
					<view class="btn-box-center" @click="showShoppingCar">
						<view class="cart" :animation="cartAnimationData">
							<view class="tag cartNum" v-if="goodsTotalNumber>0">{{goodsTotalNumber}}</view>
							<image :src="goodsTotalNumber ? '/static/store/cart.png' : '/static/store/cart2.png'" mode="aspectFit"></image>
						</view>
						<view class="padding-sm">
							<view class="text-xl text-white" v-if="goodsTotalPrice>0">
								￥{{ Number(goodsTotalPrice) + Number(goodsTotalPacking)}}
							</view>
							<view class="text-xs text-gray">
								另需配送费￥{{shippingDees}}
							</view>
						</view>
					</view>
					<view class="btn-box-right">
						<view class="jiesuan" v-if="goodsTotalPrice>0 && goodsTotalPrice >= startingPrice" @click="jiesuan">
							去结算
						</view>
						<view class="pscj text-xs text-gray" v-else>
							<text v-if="startingPrice>0">差￥{{-(goodsTotalPrice-startingPrice)}}起送</text>
						</view>
					</view>
				</view>
				<view class="cart-box" :style="{display: showCar ? 'flex' : 'none'}">
					<view class="box-container rebate-box" v-if="showDiscount">
						<text>已享100减25</text>
					</view>
					<view class="box-container operating-box">
						<view class="operating-box_right">
							包装费￥{{goodsTotalPacking}}
						</view>
						<view class="operating-box_left clear" @click="clearShoppingCart">
							<text class="cuIcon-delete"></text>
							<text>清空购物车</text>
						</view>
					</view>
					<view class=" goods-box">
						<view class="" style="flex: 1;">
							<scroll-view scroll-y="true" class="goods-list-scroll" :scroll-top="carGoodsScrollTop">
								<view class="goods-list">
									<view class="box" v-for="(rowData,i) in shoppCart" :key="i" v-if="rowData.number>0">
										<view class="m-store-item">
											<view class="m-img">
												<image style="width: 100%;height: 100%;" :src="rowData.img" mode="aspectFit"></image>
											</view>
											<view class="m-text">
												<view class="m-title">
													{{rowData.name}}
												</view>
												<view class="m-descripe">
													{{rowData.current_form ? rowData.form.name + "：" + rowData.current_form.name : rowData.descripe}}
												</view>
												<view class="m-price-box">
													<view class="symbol">￥</view>
													<view class="m-price">{{rowData.price}}</view>
													<view class="m-old-price" v-if="rowData.oldprice">
														<text>￥{{rowData.oldprice}}</text>
													</view>
												</view>
												<view class="m-distance">
													<view :class="'addEle2_' + rowData.id" class="jumpPosition">
													</view>
													<hx-number-box @change="addGoodsChange" :value="rowData.number" :rowData="rowData" :clickTime="animaTime"
													 @addChange="touchOnAddGoods('.addEle2_' + rowData.id,rowData)"></hx-number-box>
												</view>
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
			</view>
			<!-- v-if="showFormBox" -->

			<!-- 多规格 -->
			<uni-popup ref="popup" type="center" @change="popupChange">
				<view class="form-main" v-if="currentGoodsData.name">
					<view class="form-main_ctn" @click.stop.prevent="mpClear">
						<view class="godos_tit"><text>{{currentGoodsData.name}}</text></view>
						<view class="gg_tit">
							<text>{{currentGoodsData.form.name}}</text>
						</view>
						<view class="gg_box">
							<block v-for="(form_child,index) in currentGoodsData.form_child" :key="form_child.id" v-if="form_child.pid == currentGoodsData.form.id">
								<view class="item" :class="{'active': form_child.select}" @click="selectGoodsForm(currentGoodsData,form_child)">{{form_child.name}}</view>
							</block>
						</view>
						<view class="select_gg">
							<text class="lable">已选规格：</text>
							<view class="select_gg_box">
								<block v-for="(form_child,index) in currentGoodsData.form_child" :key="form_child.id" v-if="form_child.select == true">
									<view class="gg-item">
										<text>{{form_child.name}} </text>
										<text class="gg-item-cut">,</text>
									</view>
								</block>
							</view>
						</view>
						<view class="bottom">
							<view class="price_box">
								<text>￥</text>
								<block v-for="(form_child,i) in currentGoodsData.form_child" :key="i" v-if="form_child.select == true">
									<text class="price">{{form_child.price}}</text>
								</block>
							</view>
							<view class="form-btn-box">
								<block v-if="!currentGoodsData.number">
									<view id="ggAddBtn" class="add-btn" @click="formFirstAddGoods()">
										<i class="hxicon-add" id="eleAdd"></i>
										<text>加入购物车</text>
									</view>
								</block>
								<block v-else>
									<view class="addEle_gg jumpPosition"></view>
									<hx-number-box @change="formAddGoodsChange" :value="currentGoodsData.number" :rowData="currentGoodsData"
									 :clickTime="animaTime + 200" @addChange="touchOnAddGoods('.addEle_gg',currentGoodsData)"></hx-number-box>
								</block>
							</view>
						</view>
					</view>
					<view class="close" @click="hiddenForm()">
						<text class="cuIcon-close" style="font-size: 26px;"></text>
					</view>
				</view>
			</uni-popup>
		</view>
		
	</view>
</template>

<script>
	import hxNumberBox from "@/components/uni-number-box/uni-number-box.vue"; //加减	
	import flyInCart from '@/components/flyInCart.vue' //加入购物车动画组件
	import testData from "@/common/testdata.js"; //引入测试数据
	// 引入接口
	import {
		listing
	} from '../../api/api.js'
	// 引入请求地址
	import {
		getShop,
		imgurl
	} from '../../api/request.js'
	var {
		log
	} = console
	export default {
		components: {
			hxNumberBox,
			flyInCart //跳动的小球
		},
		data() {
			return {
				// 上个页面传来的id
				storeId: "",
				
				imgurl: imgurl,
				//商家信息
				storeData: {},

				tabList: ["点菜", "商家"],
				verticalNavTop: 0,
				CustomBar: this.CustomBar,
				tabCur: 0,
				vTabCur: 0,
				mainCur: 0,
				pageScroll: {},

				//商品列表
				goodsList: [],
				//商品分类信息列表
				categoryList: [],
				//评论列表
				commentList: [],
				//动画时间
				animaTime: 300,
				//商家盒子高度
				storeInfoBoxHeight: 100,
				//展开门店信息容器
				showStoreBox: false,
				cartAnimation: {},
				cartAnimationData: {},
				swiperCurrent: 0,
				//所有购物车
				shoppingCartAll: [],
				//显示购物车
				showFoot: true,
				//配送费
				shippingDees: 0,
				//配送起步价
				startingPrice: 0,
				// 总包装费
				goodsTotalPacking: 0,
				//购物车商品价格合计
				goodsTotalPrice: 0,
				//购物车商品数量合计
				goodsTotalNumber: 0,
				//当前门店购物车
				shoppCart: [],
				//foot 高度
				footHeight: '0',
				//显示购物车
				showCar: false,
				//购物车中商品滚动条位置
				carGoodsScrollTop: 0,
				//购物车缓存 Storage 名称
				shoppingCartStorageName: 'shopping_cart',
				//购物车显示折扣
				showDiscount: true,
				//多规格当前产品
				currentGoodsData: {},
				//显示规格容器
				showFormBox: false,
				//购物车位置数据
				cartBasketRect: {},
				navStatus: true,
				isBack: true,
			}
		},
		async onLoad(option) {
			const that = this
			// uni.showLoading({
			// 	title: '加载中'
			// });

			this.storeId = option.id
			this.storefun();

			//模拟请求数据
			setTimeout(() => {
				//商家信息
				// that.storeData = testData.storeData,
				//商品列表
				that.goodsList = testData.goodsData;
				// console.log("商品列表", JSON.stringify(that.goodsList))

				//商品分类信息列表
				that.categoryList = testData.categoryData;
				// console.log("商品分类信息列表", JSON.stringify(that.categoryList))

				//评论列表
				that.commentList = testData.commentData,
					setTimeout(() => {
						this.init();
						uni.hideLoading();
					}, 200)
			}, 500)

		},

		methods: {
			// 请求数据
			storefun() {
				let data = {
					id: this.storeId
				}
				Promise.all([listing(getShop, data)])
					.then((res) => {
						// 商家介绍
						// this.busidata = res[0].data[0]
						// 商家信息
						this.storeData = res[0].data
						// log("商家信息+++", this.storeData)
						
						// 商品信息列表
						//商品分类信息列表
						// this.categoryList = this.storeData.categoryData;
						// 评论
						// log(res[2].data)

						
					})
					.catch((err) => {
						log(err)
					})
			},
			
			init() {
				let that = this;
				//假设这是从后台获取的商品数据
				let goods = this.goodsList;
				//商品初始化
				// for(let i in goods){
				// 	goods[i].purchases = 3
				// }
				that.shoppCart = []
				let carts = uni.getStorageSync(that.shoppingCartStorageName) || [];
				// console.log("店铺", JSON.stringify(carts));
				//根据缓存数据 获取购物车中属于本商店的商品
				for (let i in carts) {
					if (carts[i].store_id == that.storeData.store_id) {
						that.shoppCart = carts[i].shopping_cart ? carts[i].shopping_cart : [];
						break;
					}
				}
				that.goodsTotalPrice = 0;
				that.goodsTotalNumber = 0;
				that.goodsTotalPacking = 0;
				for (let i in that.shoppCart) {
					for (let j in goods) {
						if (goods[j].id == that.shoppCart[i].id) {
							goods[j].number = that.shoppCart[i].number
						}
					}
					//计算商品总价
					that.goodsTotalPrice += that.shoppCart[i].total
					//计算包装费总价
					that.goodsTotalPacking += that.shoppCart[i].packingtotal
					//商品总数量
					that.goodsTotalNumber += that.shoppCart[i].number
				}
				//初始化商品列表
				that.goodsList = goods;
				//初始化起步价和配送费
				that.starting_price = that.storeData.starting_price;
				that.shipping_dees = that.storeData.shipping_dees;
				that.setLabelNumber();
			},
			navBack() {
				if (getCurrentPages().length > 1) {
					uni.navigateBack();
				} else {
					// #ifdef H5
					history.back()
					// #endif
					// #ifndef H5
					uni.reLaunch({
						url: '/pages/index/index'
					});
					// #endif
				}
			},
			popupChange(e) {
				this.isBack = !e.show
			},
			//-----------------------------------------------------------------------------------
			//显示 规格
			showForm(goods) {
				// console.log("商品goods的值是什么？++++",JSON.stringify(goods))
				var that = this;
				let goodsCart = that.getStoreCart();
				// console.log("商品goodsCart的值是什么？++++", JSON.stringify(goodsCart))
				if (goodsCart) {
					let currentGoods = null
					for (let i in goodsCart) {
						if (goodsCart[i].id == goods.id) {
							currentGoods = goodsCart[i]
							break
						}
					}
					if (currentGoods) {
						let selectStatus = false
						for (let i in goods.form_child) {
							if (goods.form_child[i].id == currentGoods.current_form.id) {
								if (!selectStatus) {
									goods.form_child[i].select = true
									goods.number = currentGoods.number
									selectStatus = true
								} else {
									goods.form_child[i].select = false
								}
							} else {
								goods.form_child[i].select = false
							}
						}
					}
				}
				that.currentGoodsData = goods
				that.$refs.popup.open()
			},
			//隐藏规格
			hiddenForm() {
				this.$refs.popup.close();
			},
			formFirstAddGoods() {
				let that = this
				that.formAddGoodsChange(1, that.currentGoodsData)
				that.touchOnAddGoods('#ggAddBtn', that.currentGoodsData)
			},
			//加入购物车
			formAddGoodsChange(number, goodsData) {
				let that = this;
				if (number >= 1) {
					for (let i in goodsData.form_child) {
						if (goodsData.form_child[i].select == true) {
							that.currentGoodsData.current_form = goodsData.form_child[i]
							break
						}
					}
				}
				that.addGoodsChange(number, that.currentGoodsData)
			},
			//选择规格
			selectGoodsForm(goods, formChild) {
				let that = this
				let data = goods.form_child
				let n = 0
				for (var i in data) {
					if (data[i].id == formChild.id) {
						data[i].select = true
					} else {
						data[i].select = false
					}
				}
				let goodsCart = that.getStoreCart();
				if (goodsCart) {
					for (let i in goodsCart) {
						if (goodsCart[i].id == goods.id && goodsCart[i].current_form.id == formChild.id) {
							n = goodsCart[i].number
							break;
						}
					}
				}
				goods.number = n
				this.currentGoodsData = goods
			},

			//获取该商品在购物车的数量
			getCartGoodsNum(goods) {
				let cart = this.getStoreCart()
				let n = 0
				if (cart) {
					for (let i in cart) {
						if (cart[i].id == goods.id) {
							n += cart[i].number
						}
					}
				}
				return n
			},
			//-----------------------------------------------------------------------------------
			//获取门店购物车
			getStoreCart() {
				const that = this
				return that.shoppCart
			},

			//---------------------------------------------------------------------------------
			//菜单栏切换
			tabSelect(e) {
				let id = e.currentTarget.dataset.id;
				//解决切换菜单返回点餐时自动滑动动画带来的闪屏问题
				if (id == 0) {
					this.mainCur = 0;
				}
				this.tabCur = id;
			},
			//点餐分类切换
			vTabSelect(e) {
				// console.log(e);
				this.vTabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 44;
			},
			VerticalMain(e) {
				// console.log(e);
			},
			// 点击侧边栏
			select(index) {
				this.currentIndex = index;
				this.setScrollH(index);
			},
			//小球跳跃动画
			touchOnAddGoods(ele, data) {
				const that = this;
				let q = uni.createSelectorQuery()
				q.select(ele).boundingClientRect(res => {
					that.$refs.inCart.addToCart(res, data.id);
				}).exec();
			},
			//新增商品计算价格
			addGoodsChange(number, rowData) {
				number = Number(number)
				var that = this;
				let shoppCart = [];
				let totalPrice = 0;
				let totalNumber = 0;
				let totalPacking = 0
				let existedGoods = false;
				//门店第一次添加商品
				let isFirstAddGoods = true;
				//是否为有规格的商品
				let isFormGoods = false
				if (rowData.current_form) {
					isFormGoods = true
				}
				let deleteGoods = null
				let carts = uni.getStorageSync(that.shoppingCartStorageName) || [];
				if (carts.length != 0) {
					isFirstAddGoods = false
					//根据缓存数据 获取购物车中属于本商店的商品
					for (let i in carts) {
						if (carts[i].store_id == that.storeData.store_id) {
							shoppCart = carts[i].shopping_cart ? carts[i].shopping_cart : [];
							break;
						}
					}
					//检查该商品是否为第一次添加，
					for (var i in shoppCart) {
						if (shoppCart[i].id == rowData.id) {
							if (isFormGoods) {
								//相同商品比较规格是否也相同
								if (shoppCart[i].current_form.id == rowData.current_form.id) {
									existedGoods = true;
								}
							} else {
								existedGoods = true;
							}
							if (existedGoods) {
								//在购物车中移除该商品
								if (number <= 0) {
									deleteGoods = shoppCart[i];
									break;
								}
								//非第一次添加，直接修改商品数量，并计算出单品合计
								if (isFormGoods) {
									shoppCart[i].price = rowData.current_form.price
									shoppCart[i].total = number * rowData.current_form.price
									shoppCart[i].oldprice = rowData.current_form.oldprice
									shoppCart[i].packing = rowData.current_form.packing
									shoppCart[i].packingtotal = number * rowData.current_form.packing
								} else {
									shoppCart[i].price = rowData.price
									shoppCart[i].total = number * rowData.price
									shoppCart[i].oldprice = rowData.oldprice
									shoppCart[i].packing = rowData.packing
									shoppCart[i].packingtotal = number * rowData.packing
								}
								shoppCart[i].number = rowData.number = number
								break;
							}
						}
					}
				}
				//在购物车中移除该商品
				if (deleteGoods != null) {
					if (carts) {
						//根据缓存数据 获取购物车中属于本商店的商品
						for (let i in carts) {
							if (carts[i].store_id == that.storeData.store_id) {
								var index = shoppCart.indexOf(deleteGoods);
								if (index > -1) {
									shoppCart.splice(index, 1);
								}
								carts[i].shopping_cart = shoppCart
								uni.setStorageSync(that.shoppingCartStorageName, carts);
								break;
							}
						}
						setTimeout(() => {
							this.init();
						}, 100)
					} else {
						that.storeData.shopping_cart = []
						uni.setStorageSync(that.shoppingCartStorageName, that.storeData);
					}
					return
				}

				//第一次添加
				if (!existedGoods) {
					if (rowData.form) {
						rowData.price = rowData.current_form.price
						rowData.packing = rowData.current_form.packing
						rowData.oldprice = rowData.current_form.oldprice
						rowData.total = number * rowData.current_form.price
						rowData.packingtotal = number * rowData.current_form.packing
					} else {
						rowData.total = number * rowData.price
						rowData.packingtotal = number * rowData.packing
					}
					rowData.number = number;
					shoppCart.push(rowData);
				}

				//计算总商品数量和总价
				for (var i in shoppCart) {
					//总价
					totalPrice += shoppCart[i].total
					totalNumber += shoppCart[i].number
					totalPacking += shoppCart[i].packingtotal
				}
				//更改商品列表中的已购买数量
				for (let i in that.goodsList) {
					if (that.goodsList[i].id == rowData.id) {
						that.goodsList[i] = rowData
						break;
					}
				}

				that.goodsTotalPrice = totalPrice
				that.goodsTotalNumber = totalNumber
				that.goodsTotalPacking = totalPacking
				that.shoppCart = shoppCart;
				that.storeData.shopping_cart = shoppCart;

				that.setLabelNumber();
				if (isFirstAddGoods) {
					carts.push(that.storeData)
				}
				if (that.goodsTotalNumber == 0) {
					that.hideShoppingCar();
				}
				//购物车商品数据缓存至本地
				uni.setStorageSync(that.shoppingCartStorageName, carts);
			},

			//计算每类商品购买的总数
			setLabelNumber() {
				let that = this;
				//计算每一类购买商品的总数量
				for (let j in that.categoryList) {
					let n = 0;
					for (var i in that.shoppCart) {
						if (that.shoppCart[i].type_id == that.categoryList[j].id) {
							n += that.shoppCart[i].number;
						}
					}
					that.categoryList[j].number = n;
				}
			},

			//去结算
			jiesuan() {
				this.navTo("/pages/order/preview?sid=" + this.storeData.store_id)
			},
			navTo(url) {
				let that = this;
				if (that.navStatus) {
					that.navStatus = false
					uni.navigateTo({
						url: url,
						complete: function() {
							that.navStatus = true
						}
					})
				}
			},
			//联系商家
			contact() {
				uni.showModal({
					title: "",
					content: "联系商家"
				})
			},

			showStoreBoxFunc() {
				this.storeInfoBoxHeight = uni.getSystemInfoSync().screenHeight - 136;
				this.$set(this.$data, 'showFoot', false);
				this.showStoreBox = true;
				uni.pageScrollTo({
					duration: 0,
					scrollTop: 0
				})
			},
			hiddenStoreBoxFunc() {
				this.storeInfoBoxHeight = 100;
				this.showStoreBox = false;
				if (this.swiperCurrent == 0) {
					this.$set(this.$data, 'showFoot', true);
				}
			},

			mpClear(e) {
				// TODO nvue 取消冒泡
				e.stopPropagation()
			},

			//显示购物车
			showShoppingCar() {
				if (this.goodsTotalNumber == 0) {
					return;
				}
				this.footHeight = '100%';
				this.showCar = true;
				this.carGoodsScrollTop = 0;
			},
			//隐藏购物车
			hideShoppingCar() {
				this.footHeight = '0';
				this.showCar = false;
			},
			//清空该门店的购物车
			clearShoppingCart() {
				let that = this;
				that.shoppCart = [];
				that.storeData.shopping_cart = [];
				for (let i in that.shoppingCartAll) {
					if (that.shoppingCartAll[i].store_id == that.storeData.store_id) {
						that.shoppingCartAll[i] = that.storeData
					}
				}
				uni.setStorageSync(that.shoppingCartStorageName, that.shoppingCartAll);

				for (let i in that.goodsList) {
					that.goodsList[i].number = 0;
				}
				for (let i in that.categoryList) {
					that.categoryList[i].number = 0;
				}
				//购物车商品价格合计
				that.goodsTotalPrice = 0;
				//购物车商品包装费合计
				that.goodsTotalPacking = 0;
				//购物车商品数量合计
				that.goodsTotalNumber = 0;
				that.hideShoppingCar();
			},
			hrefGoodsInfo(id) {
				this.navTo('/pages/product/product?id=' + id)
			},
			//拨打电话
			goCall(phone) {
				if (!phone) {
					return;
				}
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
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
		},

		onReady() {
			const that = this
			let sysInfo = uni.getSystemInfoSync();
			let q = uni.createSelectorQuery()
			setTimeout(function() {
				q.select('.cart').boundingClientRect(data => {
					that.cartBasketRect = data
				}).exec();
			}, 100)
			// that.calcSize();
		},
		onBackPress(event) {
			if (this.showFormBox) {
				this.hiddenForm()
				return true
			}
			if (!this.isBack) {
				this.$refs.popup.close()
				return true
			}

		},
		onShow() {
			this.init();
		},
		mounted() {
			let that = this

		},
		watch: {
			showStoreBox(val, oldVal) {
				if (val == true) {
					this.showStoreBoxFunc();
				} else {
					this.hiddenStoreBoxFunc();
				}
			}
		},

		computed: {
			bgImageHeight() {
				let CustomBar = this.CustomBar;
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
			// 点击获取数据
		}
	}
</script>

<style lang="scss">
	page {
		background: #ffffff;
	}

	//主题颜色
	$hx-theme-color: #FFC107;
	$hx-theme-color-light: #FFEB3B;

	.add {
		position: fixed;
		right: 60upx;
		top: 300upx;
		z-index: 999;
	}

	.miniBtn {
		position: relative;
		padding: 0 10px;
		border-radius: 20px;
		height: 24px;
		line-height: 24px;
		text-align: center;
		background: linear-gradient(100deg, #0099ff, #0078ff);
		font-size: 10px;
		color: #FFFFFF;

		.num {
			position: absolute;
			right: 0;
			top: -10px;
			width: 18px;
			height: 18px;
			line-height: 18px;
			font-size: 10px;
			color: #fff;
			background-color: #ff5722;
			text-align: center;
			border-radius: 50%;
		}
	}

	.hx-store {
		.container {
			margin: 0 32upx;
		}

		#mainSwiper {
			background-color: #eeeeee;
			position: sticky;
			top: calc(40px + 44px + var(--status-bar-height));

		}

		.foot {
			position: fixed;
			display: flex;
			z-index: 999;
			justify-content: center;
			align-items: center;
			bottom: 0;
			height: 100%;
			width: 100%;

			/*width: calc(100% - 32px);*/
			.btn-box {
				position: absolute;
				display: flex;
				bottom: 15px;
				justify-content: center;
				align-items: center;
				margin: 0;
				height: 50px;
				width: calc(100% - 32px);
				z-index: 9;

				&-left {
					background: #222222;
					border-top-left-radius: 50px;
					border-top-right-radius: 9px;
					border-bottom-left-radius: 50px;
					border-bottom-right-radius: 9px;
					padding-left: 6upx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-self: center;
					width: 70px;
					height: 100%;
					color: #fff;
					text-align: center;

					.imgBox {
						display: flex;
						text-align: center;
						justify-content: center;

						image {
							width: 20px;
							height: 20px;
						}
					}

					text {
						font-size: 20upx;
					}
				}

				&-line {
					background: #ffffff;
					width: 2px;
					height: 100%;
				}

				&-center {
					height: 100%;
					flex: auto;
					display: flex;
					justify-content: flex-start;
					align-self: center;
					align-items: center;
					background: #222222;
					border-top-left-radius: 8upx;
					border-bottom-left-radius: 8upx;
					padding-left: 10upx;

					.cart {
						position: relative;
						width: 36px;
						height: 36px;

						image {
							width: 100%;
							height: 100%;
						}

						.tag {
							position: absolute;
							right: -10upx;
							top: -10upx;
							height: 18px;
							width: 18px;
							background-color: #ff4000;
							color: #ffffff;
							border-radius: 50%;
							z-index: 1;
							font-size: 10px;
							text-align: center;
							line-height: 18px;
						}
					}
				}

				&-right {
					width: 70px;
					height: 100%;
					position: relative;
					display: flex;
					justify-content: flex-start;
					align-self: center;
					align-items: center;


					.pscj {
						width: 100%;
						height: 100%;
						border-top-right-radius: 100upx;
						border-bottom-right-radius: 100upx;
						background: #222222;
						text-align: center;
						display: flex;
						justify-content: center;
						align-self: center;
						align-items: center;
					}

					.jiesuan {
						width: 100%;
						height: 100%;
						font-size: 28upx;
						border-top-right-radius: 100upx;
						border-bottom-right-radius: 100upx;
						text-align: center;
						display: flex;
						justify-content: center;
						align-self: center;
						align-items: center;
						// background: linear-gradient(45deg, $hx-theme-color-light, $hx-theme-color);
						background: linear-gradient(45deg, #0099ff, #0078ff);
						font-weight: bold;
						color: #FFFFFF;
					}
				}
			}

			.zz {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background-color: rgba(0, 0, 0, .7);
				z-index: 1;
			}

			.cart-box {
				display: flex;
				justify-content: flex-start;
				flex-flow: column;
				background: #ffffff;
				position: absolute;
				bottom: 0;
				z-index: 2;
				max-height: 66%;

				padding-bottom: 62px;
				border-top-left-radius: 16px;
				border-top-right-radius: 16px;
				overflow: hidden;
				width: 100%;

				.rebate-box {
					height: 30px;
					background: #0099ff;
					color: #FFFFFF;
					text-align: center;
					line-height: 30px;
					font-size: 14px;
				}

				.box-container {
					box-sizing: border-box;
					padding: 0 16px;
				}

				.operating-box {
					font-size: 12px;
					line-height: 40px;
					height: 40px;
					border-bottom: 1px solid #f6f6f6;
					color: #666666;
					display: flex;
					flex-direction: row;

					&_right {
						flex: 1;
					}

					&_left {
						display: flex;
						flex-direction: row;
					}

				}

				.goods-box {
					height: 100%;
					overflow: hidden;
					flex: 1;
					display: flex;

					.goods-list-scroll {
						height: 100%;

						.goods-list {

							width: 100%;
							display: flex;
							flex-wrap: wrap;

							.box {
								width: 100%;
								border-bottom: 1px solid #f6f6f6;
								box-sizing: border-box;
								padding: 0 16px;

								.m-store-item {
									display: flex;
									flex-direction: row;
									width: 100%;
									justify-content: space-between;
									align-items: flex-end;
									padding-top: 15px;
									padding-bottom: 15px;

									.m-img {
										flex: 0 0 85px;
										height: 85px;
										background: #eee;
										border-radius: 4px;
									}

									.m-text {
										flex: 1;
										position: relative;
										height: 85px;
										padding: 0 6px;
										display: flex;
										align-content: space-between;
										flex-direction: column;

										.m-title {
											font-size: 16px;
											color: #555555;
											height: 21px;
											font-weight: bold;
										}

										.m-descripe {
											font-size: 12px;
											color: #999999;
											margin-top: 5px;
											height: 35px;
										}

										.m-price-box {
											height: 24px;
											font-weight: bold;
											display: flex;
											flex-direction: row;
											align-items: flex-end;

											.symbol {
												color: #ff582b;
												font-size: 12px;
											}

											.m-price {
												position: relative;
												top: 2px;
												font-size: 18px;
												color: #ff582b;
											}

											.m-old-price {
												margin-left: 3px;
												display: flex;
												flex-direction: row;
												font-size: 10px;
												color: #999999;
												margin-top: 5upx;
												text-decoration: line-through;
												font-weight: normal;
											}
										}

										.m-distance {
											position: absolute;
											right: 0;
											bottom: -4px;
											z-index: 16;
											color: #b2b2b2;
											font-size: 20upx;
											text-align: right;

											.jumpPosition {
												position: absolute;
												bottom: 23px;
												right: 0;
												z-index: 2;
												width: 28px;
												height: 28px;
											}
										}

									}

								}
							}
						}
					}
				}
			}
		}
	}

	.form-main {
		display: flex;
		flex-direction: column;
		justify-content: left;
		padding: 15px;

		.form-main_ctn {
			display: flex;
			flex-direction: column;
			justify-content: left;
			padding: 22px;
			background-color: #fff;
			border-radius: 8px;

			.godos_tit {
				margin-top: 4px;
				margin-bottom: 6px;
				font-size: 18px;
				font-weight: bold;
				color: #333;
			}

			.gg_tit {
				margin-top: 8px;
				font-size: 14px;
				font-weight: bold;
				color: #555;
			}

			.gg_box {
				margin-top: 8px;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				font-size: 22rpx;
				color: #222;

				.item {
					margin-right: 14px;
					margin-bottom: 14px;
					border: 1px solid #B8B8B8;
					border-radius: 4px;
					padding: 6px 8px;
				}

				.item.active {
					border-color: #0099FF;
					background: #99CCFF;
					color: #0099FF;
				}
			}

			.select_gg {
				margin: 26px -12px 0;
				padding: 6px 12px;
				color: #999;
				background-color: #f9f9f9;
				display: flex;
				flex-direction: row;

				.select_gg_box {
					flex: 1;
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;

					.gg-item {
						color: #333;

						.gg-item-cut {
							margin-left: 3px;
							margin-right: 3px;
						}
					}

					.gg-item:last-child {
						.gg-item-cut {
							display: none;
						}
					}
				}
			}

			.bottom {
				position: relative;
				display: flex;
				flex-direction: row;
				margin-top: 12px;

				.price_box {
					flex: 1;
					lign-items: baseline;
					color: #ff582b;
					font-size: 14px;
					position: relative;
					top: 4px;

					.price {
						font-size: 24px;
					}
				}

				.jumpPosition {
					position: absolute;
					right: 16px;
					top: 2px;
				}

				.form-btn-box {
					height: 30px;
					line-height: 30px;

					.add-btn {
						border-radius: 50px;
						background: linear-gradient(45deg, #0099ff, #0078ff);
						padding: 0 12px;
						display: flex;
						height: 30px;
						line-height: 30px;
						align-items: center;

						i {
							font-weight: bold;
							font-size: 18px;
							margin-right: 3px;
							margin-left: -4px;
						}

						text {
							font-size: 14px;
							font-weight: bold;
							color: #FFFFFF;
						}
					}
				}
			}
		}

		.close {
			position: absolute;
			left: 50%;
			margin-left: -20px;
			bottom: -56px;
			border-radius: 50%;
			height: 40px;
			width: 40px;
			background-color: #fff;
			opacity: 0.7;
			text-align: center;
			line-height: 43px;
		}
	}

	@import "store.css"
</style>
