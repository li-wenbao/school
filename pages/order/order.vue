<template>
	<view>
		<view class="head">
			<view class="status"></view>
			<view class="search" @click="goSearch">
				<i class="hxicon-search"></i>
				<text class="tit">搜索我的订单</text>
			</view>
		</view>
		<view class="tabs-box">
			<view class="hx-tabs">
				<view class="hx-tabs-item" v-for="(item,i) in tabs" :key="i" :class="{'hx-tabs-active': swiperCurrent == i}" @click="swiperChange(i)" :style="{transition: transtionTime + 'ms'}">
					<text>{{item.name}}</text>
				</view>
				<view class="hx-tabs-slider-box" :style="{width: (100/tabs.length) + '%',transition: transtionTime + 'ms',left:swiperCurrentSliderLeft + '%'}">
					<view class="hx-tabs-slider"></view>
				</view>
			</view>
		</view>
		
		<view class="main" :style="{height: mainHeight}" >
			<swiper 
			id="mainSwiper"
			style="height: 100%;"
			:current="swiperCurrent" 
			:duration="transtionTime"
			@animationfinish="animationfinish">
				
				<swiper-item class="swiper-item" >
					<view class="scroll-items">
							<scroll-view 
							style="height: 100%;width: 100%;"
							scroll-with-animation 
							:scroll-y="true" 
							refresher-background="#eee" 
							:refresher-enabled="reloadDown"  
							:refresher-triggered="triggered"
							:refresher-threshold="100" 
							@refresherrefresh="onRefresh" 
							@refresherrestore="onRestore" >
								<!-- 标签为全部时，有推广图 -->
								<view class=" bannerimg-box">
									<swiper  circular duration="400" interval="10000" autoplay >
										<swiper-item class="swiper-item bannerImg" v-for="(banner,k) in bannerData" :key="k" v-if="banner">
											<!-- 图片尺寸为 750*250 -->
											<image :src="banner.src" class="loaded" mode="widthFix"></image>
										</swiper-item>
									</swiper>
								</view>
								<view class="nullOrder" v-if="tabs[0].data && tabs[0].data.length == 0 && tabs[4].hide_load">
									<image src="../../static/img/order_icon.png" mode=""></image>
									<text class="tit">暂无订单</text>
								</view>
								<block v-for="(order,j) in tabs[0].data" :key="j" v-else>
									
								<view class="order-item" v-if="order">
									<view class="item-top">
										<image :src="order.tag" mode=""></image>
										<view class="tit">
											<text>{{order.store_name}}</text>
											<text v-if="order.community">({{order.community}})</text>
											<i class="hxicon-right"></i>
										</view>
										<view class="right" v-if="order.status == 1"><text>已取消</text></view>
										<view class="right" v-else-if="order.status == 2"><text>待支付</text></view>
										<view class="right" v-else-if="order.status == 3"><text>待收取</text></view>
										<view class="right" v-else-if="order.status == 4"><text>待评价</text></view>
										<view class="right" v-else-if="order.status == 5"><text>已完成</text></view>
										<view class="right" v-else-if="order.status == 6"><text>退款中</text></view>
										<view class="right" v-else-if="order.status == 7"><text>退款成功</text></view>
									</view>
									<view class="item-center">
										<image :src="order.avatar" mode=""></image>
										<view class="right">
											<view class="row" v-if="order.goods_name">
												<text>{{order.goods_name}}</text>
											</view>
											<view class="row">
												<text>下单时间：{{order.create_time}}</text>
											</view>
											<view class="row">
												<text>总价：￥{{order.total}}</text>
											</view>
										</view>
									</view>
									<view class="item-bottom">
										<view class="left"></view>
										<view class="btn" v-if="order.status == 1 || order.status == 5" @click="goStore(order.id)">再来一单</view>
										<view class="btn bg-yellow" v-else-if="order.status == 2" @click="goPay(order.id)">去支付</view>
										<view class="btn" v-else-if="order.status == 3" @click="goOrderInfo(order.id)">查看</view>
										<view class="btn bg-yellow" v-else-if="order.status == 4" @click="goComment(order.id)">去评价</view>
										<view class="btn" v-else-if="order.status == 6 || order.status == 7" @click="goRefund(order.id)">退款进度</view>
									</view>
								</view>
								</block>
							</scroll-view>
					</view>
				</swiper-item>
				
				
				<swiper-item class="swiper-item" >
					<view class="scroll-items">
							<scroll-view 
							style="height: 100%;width: 100%;"
							scroll-with-animation 
							:scroll-y="true" 
							refresher-background="#eee" 
							:refresher-enabled="reloadDown"  
							:refresher-triggered="triggered"
							:refresher-threshold="100" 
							@refresherrefresh="onRefresh" 
							@refresherrestore="onRestore" >
								
								<view class="nullOrder" v-if="tabs[1].data && tabs[1].data.length == 0 && tabs[4].hide_load">
									<image src="../../static/img/order_icon.png" mode=""></image>
									<text class="tit">暂无订单</text>
								</view>
								<block v-for="(order,j) in tabs[1].data" :key="j" v-else>
									
								<view class="order-item" v-if="order">
									<view class="item-top">
										<image :src="order.tag" mode=""></image>
										<view class="tit">
											<text>{{order.store_name}}</text>
											<text v-if="order.community">({{order.community}})</text>
											<i class="hxicon-right"></i>
										</view>
										<view class="right" v-if="order.status == 1"><text>已取消</text></view>
										<view class="right" v-else-if="order.status == 2"><text>待支付</text></view>
										<view class="right" v-else-if="order.status == 3"><text>待收取</text></view>
										<view class="right" v-else-if="order.status == 4"><text>待评价</text></view>
										<view class="right" v-else-if="order.status == 5"><text>已完成</text></view>
										<view class="right" v-else-if="order.status == 6"><text>退款中</text></view>
										<view class="right" v-else-if="order.status == 7"><text>退款成功</text></view>
									</view>
									<view class="item-center">
										<image :src="order.avatar" mode=""></image>
										<view class="right">
											<view class="row" v-if="order.goods_name">
												<text>{{order.goods_name}}</text>
											</view>
											<view class="row">
												<text>下单时间：{{order.create_time}}</text>
											</view>
											<view class="row">
												<text>总价：￥{{order.total}}</text>
											</view>
										</view>
									</view>
									<view class="item-bottom">
										<view class="left"></view>
										<view class="btn" v-if="order.status == 1 || order.status == 5" @click="goStore(order.store_id,order.id)">再来一单</view>
										<view class="btn bg-yellow" v-else-if="order.status == 2" @click="goPay(order.id)">去支付</view>
										<view class="btn" v-else-if="order.status == 3" @click="goOrderInfo(order.id)">查看</view>
										<view class="btn bg-yellow" v-else-if="order.status == 4" @click="goComment(order.id)">去评价</view>
										<view class="btn" v-else-if="order.status == 6 || order.status == 7" @click="goRefund(order.id)">退款进度</view>
									</view>
								</view>
								</block>
							</scroll-view>
					</view>
				</swiper-item>
				
				
				<swiper-item class="swiper-item" >
					<view class="scroll-items">
							<scroll-view 
							style="height: 100%;width: 100%;"
							scroll-with-animation 
							:scroll-y="true" 
							refresher-background="#eee" 
							:refresher-enabled="reloadDown"  
							:refresher-triggered="triggered"
							:refresher-threshold="100" 
							@refresherrefresh="onRefresh" 
							@refresherrestore="onRestore" >
								
								<view class="nullOrder" v-if="tabs[2].data && tabs[2].data.length == 0 && tabs[4].hide_load">
									<image src="../../static/img/order_icon.png" mode=""></image>
									<text class="tit">暂无订单</text>
								</view>
								<block v-for="(order,j) in tabs[2].data" :key="j" v-else>
									
								<view class="order-item" v-if="order">
									<view class="item-top">
										<image :src="order.tag" mode=""></image>
										<view class="tit">
											<text>{{order.store_name}}</text>
											<text v-if="order.community">({{order.community}})</text>
											<i class="hxicon-right"></i>
										</view>
										<view class="right" v-if="order.status == 1"><text>已取消</text></view>
										<view class="right" v-else-if="order.status == 2"><text>待支付</text></view>
										<view class="right" v-else-if="order.status == 3"><text>待收取</text></view>
										<view class="right" v-else-if="order.status == 4"><text>待评价</text></view>
										<view class="right" v-else-if="order.status == 5"><text>已完成</text></view>
										<view class="right" v-else-if="order.status == 6"><text>退款中</text></view>
										<view class="right" v-else-if="order.status == 7"><text>退款成功</text></view>
									</view>
									<view class="item-center">
										<image :src="order.avatar" mode=""></image>
										<view class="right">
											<view class="row" v-if="order.goods_name">
												<text>{{order.goods_name}}</text>
											</view>
											<view class="row">
												<text>下单时间：{{order.create_time}}</text>
											</view>
											<view class="row">
												<text>总价：￥{{order.total}}</text>
											</view>
										</view>
									</view>
									<view class="item-bottom">
										<view class="left"></view>
										<view class="btn" v-if="order.status == 1 || order.status == 5" @click="goStore(order.id)">再来一单</view>
										<view class="btn bg-yellow" v-else-if="order.status == 2" @click="goPay(order.id)">去支付</view>
										<view class="btn" v-else-if="order.status == 3" @click="goOrderInfo(order.id)">查看</view>
										<view class="btn bg-yellow" v-else-if="order.status == 4" @click="goComment(order.id)">去评价</view>
										<view class="btn" v-else-if="order.status == 6 || order.status == 7" @click="goRefund(order.id)">退款进度</view>
									</view>
								</view>
								</block>
							</scroll-view>
					</view>
				</swiper-item>
				
				
				<swiper-item class="swiper-item" >
					<view class="scroll-items">
							<scroll-view 
							style="height: 100%;width: 100%;"
							scroll-with-animation 
							:scroll-y="true" 
							refresher-background="#eee" 
							:refresher-enabled="reloadDown"  
							:refresher-triggered="triggered"
							:refresher-threshold="100" 
							@refresherrefresh="onRefresh" 
							@refresherrestore="onRestore" >
								
								<view class="nullOrder" v-if="tabs[3].data && tabs[3].data.length == 0 && tabs[4].hide_load">
									<image src="../../static/img/order_icon.png" mode=""></image>
									<text class="tit">暂无订单</text>
								</view>
								<block v-for="(order,j) in tabs[3].data" :key="j" v-else>
									
								<view class="order-item" v-if="order">
									<view class="item-top">
										<image :src="order.tag" mode=""></image>
										<view class="tit">
											<text>{{order.store_name}}</text>
											<text v-if="order.community">({{order.community}})</text>
											<i class="hxicon-right"></i>
										</view>
										<view class="right" v-if="order.status == 1"><text>已取消</text></view>
										<view class="right" v-else-if="order.status == 2"><text>待支付</text></view>
										<view class="right" v-else-if="order.status == 3"><text>待收取</text></view>
										<view class="right" v-else-if="order.status == 4"><text>待评价</text></view>
										<view class="right" v-else-if="order.status == 5"><text>已完成</text></view>
										<view class="right" v-else-if="order.status == 6"><text>退款中</text></view>
										<view class="right" v-else-if="order.status == 7"><text>退款成功</text></view>
									</view>
									<view class="item-center">
										<image :src="order.avatar" mode=""></image>
										<view class="right">
											<view class="row" v-if="order.goods_name">
												<text>{{order.goods_name}}</text>
											</view>
											<view class="row">
												<text>下单时间：{{order.create_time}}</text>
											</view>
											<view class="row">
												<text>总价：￥{{order.total}}</text>
											</view>
										</view>
									</view>
									<view class="item-bottom">
										<view class="left"></view>
										<view class="btn" v-if="order.status == 1 || order.status == 5" @click="goStore(order.id)">再来一单</view>
										<view class="btn bg-yellow" v-else-if="order.status == 2" @click="goPay(order.id)">去支付</view>
										<view class="btn" v-else-if="order.status == 3" @click="goOrderInfo(order.id)">查看</view>
										<view class="btn bg-yellow" v-else-if="order.status == 4" @click="goComment(order.id)">去评价</view>
										<view class="btn" v-else-if="order.status == 6 || order.status == 7" @click="goRefund(order.id)">退款进度</view>
									</view>
								</view>
								</block>
							</scroll-view>
					</view>
				</swiper-item>
				
				
				<swiper-item class="swiper-item" >
					<view class="scroll-items">
							<scroll-view 
							style="height: 100%;width: 100%;"
							scroll-with-animation 
							:scroll-y="true" 
							refresher-background="#eee" 
							:refresher-enabled="reloadDown"  
							:refresher-triggered="triggered"
							:refresher-threshold="100" 
							@refresherrefresh="onRefresh" 
							@refresherrestore="onRestore" >
								
								<view class="nullOrder" v-if="tabs[4].data && tabs[4].data.length == 0 && tabs[4].hide_load">
									<image src="/static/img/order_icon.png" mode=""></image>
									<text class="tit">暂无订单</text>
								</view>
								<block v-for="(order,j) in tabs[4].data" :key="j" v-else>
									
								<view class="order-item" v-if="order">
									<view class="item-top">
										<image :src="order.tag" mode=""></image>
										<view class="tit">
											<text>{{order.store_name}}</text>
											<text v-if="order.community">({{order.community}})</text>
											<i class="hxicon-right"></i>
										</view>
										<view class="right" v-if="order.status == 1"><text>已取消</text></view>
										<view class="right" v-else-if="order.status == 2"><text>待支付</text></view>
										<view class="right" v-else-if="order.status == 3"><text>待收取</text></view>
										<view class="right" v-else-if="order.status == 4"><text>待评价</text></view>
										<view class="right" v-else-if="order.status == 5"><text>已完成</text></view>
										<view class="right" v-else-if="order.status == 6"><text>退款中</text></view>
										<view class="right" v-else-if="order.status == 7"><text>退款成功</text></view>
									</view>
									<view class="item-center">
										<image :src="order.avatar" mode=""></image>
										<view class="right">
											<view class="row" v-if="order.goods_name">
												<text>{{order.goods_name}}</text>
											</view>
											<view class="row">
												<text>下单时间：{{order.create_time}}</text>
											</view>
											<view class="row">
												<text>总价：￥{{order.total}}</text>
											</view>
										</view>
									</view>
									<view class="item-bottom">
										<view class="left"></view>
										<view class="btn" v-if="order.status == 1 || order.status == 5">再来一单</view>
										<view class="btn bg-yellow" v-else-if="order.status == 2">去支付</view>
										<view class="btn" v-else-if="order.status == 3">查看</view>
										<view class="btn bg-yellow" v-else-if="order.status == 4">去评价</view>
										<view class="btn" v-else-if="order.status == 6 || order.status == 7">退款进度</view>
									</view>
								</view>
								</block>
							</scroll-view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
	</view>
</template>

<script>
	var sysInfo = uni.getSystemInfoSync();
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
	//引入测试数据
	import testData from "@/common/testdata.js";
	export default {
		data() {
			return {
				mainHeight: 0,
				statusBarHeight,
				tabs: [
					{name:'全部', data:[], api:'',load: false},
					{name:'待付款', data:[], api:'', load: false},
					{name:'待使用', data:[], api:'', load: false},
					{name:'待评价', data:[], api:'', load: false},
					{name:'退款', data:[], api:'', load: false},
				],
				bannerData:[
					{page: '/pages/product/product?id=457', src: '//imgs.1op.cn/i/hxshop/banner/banner.jpg'},
					{page: '/pages/product/product?id=57', src:'//imgs.1op.cn/i/hxshop/banner/banner.jpg'},
					{page: '/pages/product/product?id=95', src:'//imgs.1op.cn/i/hxshop/banner/banner.jpg'},
					{page: '/pages/product/product?id=45', src:'//imgs.1op.cn/i/hxshop/banner/banner.jpg'}
				],
				
				swiperCurrent: 0,
				transtionTime:100,
				swiperCurrentSliderLeft: 0,
				orderData: [
					//1,2,3,4,5,6,7,8,9,10
				],
				triggered: true,
				//下拉刷新
				reloadDown: false,
				
			}
		},
		onLoad(option) {
			
			this.mainHeight = sysInfo.screenHeight - statusBarHeight - 50 - 60 - 50 + 'px';
			this._freshing = false;
			if(option.state){
				this.swiperChange(option.state) 
				console.log(option.state);
			}else{
				// 全部订单 index为0
				this.tabs[0].data= testData.ordersData
			}
		},
		mounted() {
			
		},
		methods: {
			animationfinish({detail: { current }}) {
				/* this.$refs.tabs.setFinishCurrent(current); */
				this.swiperCurrent = current;
				this.current = current;
				this.swiperChange(current);
			},
			swiperChange(index) {
				this.swiperCurrent = index;
				this.swiperCurrentSliderLeft= (100/this.tabs.length) * index;
				let url = this.tabs[index].api;
				
				// index 0全部，1待支付，2待收货，3待评价，4退款
				// 假如滑动了tab则 去获取对应的数据
				if(this.tabs[index].data.length == 0){
					// 只获取一次数据
					this.getOrderData(index)
				}
			},
			getOrderData(index){
				var orderData = []
				//------------------------------------------
				//--------------------------------------------
				// 假如这为请求
				for(let i in testData.ordersData){
					if(!testData.ordersData[i]){
						console.log("不存在:"+i)
					}
					if(index == 1 && testData.ordersData[i].status == 2){
						orderData.push(testData.ordersData[i]);
					}else if(index == 2 && testData.ordersData[i].status == 3){
						orderData.push(testData.ordersData[i]);
					}else if(index == 3 && testData.ordersData[i].status == 4){
						orderData.push(testData.ordersData[i]);
					}else if(index == 4 && (testData.ordersData[i].status == 6 || testData.ordersData[i].status == 7)){
						orderData.push(testData.ordersData[i]);
					}
				}
				//--------------------------------------------
				//--------------------------------------------
				uni.showLoading()
				// 假如 orderData 为返回的数据，我们吧数据赋给对应的index 即可
				setTimeout(()=>{
					this.tabs[index].data= orderData
					this.tabs[index].hide_load = true
					uni.hideLoading()
				},1000)
			},
			// 下拉刷新
			onRefresh() {
				if (this._freshing) return;
				this._freshing = true;
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
				}, 1500)
			},
			onRestore() {
				this.triggered = 'restore'; // 需要重置
				console.log("重置刷新");
			},
			//去支付
			goPay(orderId){
				uni.redirectTo({
				    url: '/pages/order/pay?id=' + orderId
				});
			},
			//去门店
			goStore(storeId,orderId){
				uni.redirectTo({
				    url: '/pages/store/index?sid=' + storeId + '&oid=' + orderId
				});
			},
			//去订单详情
			goOrderInfo(orderId){
				uni.redirectTo({
				    url: '/pages/map/location?id=' + orderId
				});
			},
			//去评论
			goComment(orderId){
				// uni.redirectTo({
				//     url: '/pages/order/pay?id=' + orderId
				// });
			},
			//查看退款详情
			goRefund(orderId){
				// uni.redirectTo({
				//     url: '/pages/order/pay?id=' + orderId
				// });
			},
			//搜索
			goSearch(){
				uni.navigateTo({
					url: '/pages/search/search?type=order'
				})
			}
		}
	}
</script>

<style lang="scss">
.head{
	
	background: linear-gradient(100deg, #FFEB3B, #FFC107);
	padding-bottom: 10px;
	padding-top: 10px;
	.status{
		height: var(--status-bar-height);
	}
	.search{
		height: 40px;
		background-color: #fff;
		border-radius: 10px;
		margin: 0 15px;
		display: flex;
		align-items: center;
		padding: 0 15px;
		font-size: 14px;
		color: #888;
		i{
			font-weight: bold;
			font-size: 16px;
		}
		.tit{
			margin-left: 6px;
		}
	}
}
.tabs-box{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	position: sticky;
	top: calc(44px + var(--status-bar-height));
	z-index: 10;
	background-color: white;
	height: 50px;
	padding-bottom: 10px;
	
	.hx-tabs{
		position: relative;
		display: flex;
		height:100%;
		width: 100%;
		justify-content: space-evenly;
		&-item{
			display: flex;
			flex: 1;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			width: 70px;
			color:#666666;
			text{
				font-size: 16px;
			}
			
		}
		&-active{
			color:#333333;
			font-weight: bold;
		}
		&-slider-box{
			position: absolute;
			display: flex;
			justify-content: center;
			bottom: 0;
			width: 20%;
		}
		&-slider{
			display: flex;
			background: #f6d200;
			width: 30px;
			height: 3px;
		}
	}
}
.main{
	position: relative;
	background-color: #ffffff;
	#mainSwiper{
		background-color: #eeeeee;
		height: 100%;
		width: 100%;
		.bannerimg-box{
			border-bottom-left-radius:10upx;
			border-bottom-right-radius:10upx;
			padding: 15px 24rpx 7px;
			swiper{
				height: 233rpx;
				width: 699rpx;
			}
			.swiper-item {
				
				display: flex;
				justify-content: center;
				align-content: center;
				overflow: hidden;
				
				width: 100%;
				height: 100%;
				image {
					border-radius: 8px;
					width: 100%;
				}
			}
		}
		.nullOrder{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin: 40px auto;
			image{
				width: 283px;
				height: 200px;
			}
			.tit{
				display: flex;
				flex-direction: column;
				font-size: 16px;
				font-weight: bold;
				color: #555;
				margin-top: 6px;
				
			}
		}
		.scroll-items{
			height: 100%;
			.order-item{
				display: flex;
				flex-direction: column;
				background-color: #fff;
				margin: 8px 15px;
				border-radius: 10px;
				padding: 0 15px;
				.item-top{
					display: flex;
					flex-direction: row;
					align-items: center;
					padding: 12px 0;
					border-bottom: 1px solid #f5f5f5;
					image{
						border-radius: 50%;
						width: 24px;
						height: 24px;
					}
					.tit{
						flex: 1;
						margin-left: 6px;
						font-size: 16px;
						font-weight: bold;
						color: #333;
						padding-right: 40px;
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						flex-direction: row;

					}
					.right{
						font-size: 14px;
						color: #666;
					}
				}
				.item-center{
					display: flex;
					flex-direction: row;
					margin-top: 12px;
					color: #666;
					font-size: 14px;
					image{
						border-radius: 6px;
						height: 60px;
						width: 60px;
					}
					.right{
						flex: 1;
						margin-left: 10px;
					}
				}
				.item-bottom{
					display: flex;
					flex-direction: row;
					margin-top: 12px;
					margin-bottom: 15px;
					.left{
						flex: 1;
					}
					.btn{
						padding: 7px 14px;
						border: 1px solid #cdcdcd;
						font-size: 14px;
						color: #555;
						border-radius: 10px;
						transition: all 0.2s;
						background: #fff;
					}
					.btn:active{
						color: #888;
						background: #f1f1f1;
					}
					.bg-yellow{
						background: linear-gradient(100deg, #FFEB3B, #FFC107);
						border-color: #ffe635;
						font-weight: bold;
					}
					.bg-yellow:active{
						background: linear-gradient(100deg, #e8d536, #dda809);
					}
				}
			}
		}
		// position: sticky;
		//top: calc(50px + 44px + var(--status-bar-height));
		
	}
	
}
</style>
