<template>
	<view class="page">
		<cu-custom :bgColor="'bg-blue'" :isBack="true">
			<block slot="backText">订单详情</block>
		</cu-custom>
		<view>
			<view class="margin-sm padding-lr padding-bottom bg-white radius20">
				<view v-if="order.status=='已完成'" class="padding-tb solid-bottom text-blue text-bold text-xxl">订单已送达</view>
				<view class="padding-tb-sm flex justify-between align-center">
					<view class="text-black">感谢您的信任，欢迎再次光临</view>
					<view class="text-grey"></view>
				</view>
			</view>
			<view class="margin-sm padding-lr padding-bottom bg-white radius20">
				<view class="padding-tb solid-bottom text-black text-bold" :data-id="order.id" @click="_goToStore">
					<text class="text-lg">{{order.name}}</text>
					<text class="cuIcon-right text-grey padding-left-sm"></text>
				</view>
				<view class="padding-tb-sm solid-bottom">
					<view class="flex justify-between align-center padding-tb-xs" v-for="(item,index) in order.list" :key="index">
						<view class="flex align-center">
							<view style="width:84upx;height:76upx;overflow: hidden;">
								<image style="width:84upx;height:76upx;border-radius:6upx; " mode="scaleToFill" lazy-load="true" :src="item.imgUrl" />
							</view>
							<view class="margin-left-sm">
								<view class="text-bold">{{goodModify}}</view>
								<view>x{{item.count}}</view>
							</view>
						</view>
						<view class="flex">
							<view v-if="item.isActive" class="text-price text-grey text-strikethrough text-bold">{{item.price}}</view>
							<view class="text-price text-black text-bold">{{item.bargain}}</view>
						</view>
					</view>
				</view>
				<view class="padding-tb-sm flex justify-between">
					<view>包装费</view>
					<view class="text-price text-bold">{{order.packPrice}}</view>
				</view>
				<view class="padding-tb-sm flex justify-between solid-bottom">
					<view>配送费</view>
					<view class="text-price text-bold">{{order.distribution}}</view>
				</view>
				<view class="padding-tb-sm flex justify-between">
					<view></view>
					<view>
						实付：
						<text class="text-price text-black text-xl text-bold">{{order.sum}}</text>
					</view>
				</view>
			</view>
			<view class="margin-sm padding-lr padding-bottom bg-white radius20">
				<view class="padding-tb solid-bottom text-black text-bold text-lg">订单信息</view>
				<view class="padding-tb-sm flex justify-between align-center">
					<view>订单号</view>
					<view class="text-grey">{{order.orderId}}</view>
				</view>
				<view class="padding-tb-sm flex justify-between">
					<view>支付渠道</view>
					<view class="text-grey">{{order.type}}</view>
				</view>
				<view class="padding-tb-sm flex justify-between align-center">
					<view>下单时间</view>
					<view class="text-grey">{{order.createTime}}</view>
				</view>
				<view class="padding-tb-sm flex justify-between">
					<view>订单备注</view>
					<view>{{order.notes}}</view>
				</view>
			</view>
			<view class="margin-sm padding-lr padding-bottom bg-white radius20">
				<view class="padding-tb solid-bottom text-black text-bold text-lg">配送信息</view>
				<view class="padding-tb-sm flex justify-between align-center">
					<view>送达时间</view>
					<view class="text-grey">{{order.completionTime}}</view>
				</view>
				<view class="padding-tb-sm flex justify-between">
					<view>收货地址</view>
					<view class="text-grey">{{order.address}}</view>
				</view>
				<view class="padding-tb-sm flex justify-between align-center">
					<view>配送方式</view>
					<view class="text-grey">{{order.distributionMode}}</view>
				</view>
			</view>
			<view class="flex justify-center align-center margin-sm  text-gray">
				到底了~
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		/*
		初始化数据
		*/
		data() {
			return {
				order: {
					id: 1,
					name: "蜜秘鸡地",
					imgUrl: "../../static/shop_logo.png",
					packPrice: 2.00,
					distribution: 3.00,
					amount: 4,
					sum: 22.00,
					list: [{
							name: "薯条",
							price: 10,
							bargain: 5,
							isActive: false,
							count: 2,
							imgUrl: "/static/aaa.jpg"
						},
						{
							name: "豚骨汤",
							price: 12,
							bargain: 5,
							isActive: false,
							count: 1,
							imgUrl: "/static/aaa.jpg"
						},
						{
							name: "鸡腿",
							price: 10,
							bargain: 5,
							isActive: true,
							count: 1,
							imgUrl: "/static/aaa.jpg"
						}
					],
					orderId: '2019211134238',
					status: "已完成",
					type: "支付宝",
					createTime: "2019-12-06 12:05",
					notes: "多辣，多放辣椒，不要生姜",
					completionTime: "2019-12-06 13:34",
					address: "昆明理工大学新校区学生宿舍12栋",
					distributionMode: "商家配送"
				}
			};
		},
		computed: {
			// 计算属性的 getter
			goodModify: function() {
				// `this` 指向 vm 实例
				
				let goodsname = this.order.list.name;
				// goodsname = "安康精髓覆盖爱韶关话说规划艾莎死哦韩国阿斯哦干哈所规划爱上改哦";
				return goodsname.length < 12 ? goodsname : goodsname.substr(0, 10) + "...";
			},
		},
		onLoad: function(option) {
			console.log(option);
		},
		onShow: function() {
			console.log("pages/order/details");
		},
		methods: {
			//跳转至商家店铺
			_goToStore(e) {
				console.log(e);
				uni.navigateTo({
					url: "/pages/home/store?id=" + e.currentTarget.dataset.id
				});
			}
		}
	};
</script>

<style>
</style>
