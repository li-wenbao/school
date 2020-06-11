<template>
	<view class="page">
		<cu-custom :bgColor="'bg-blue'" :isBack="true">
			<block slot="backText">我的收藏</block>
			<block slot="content"></block>
			<block slot="right">
				<view class="action"></view>
			</block>
		</cu-custom>
		<view>
			<view class="flex margin-sm padding-sm radius bg-white radius20" style="position: relative;" v-for="(item,index) in storeList"
			 :key="index">
				<view class="margin-right-sm" style="width:160upx;height:160upx;overflow: hidden;">
					<image style="width:160upx;height:160upx;border-radius:8upx; " mode="scaleToFill" lazy-load="true" :src="item.imgUrl"
					 :data-id="item.id" @click="_goToStore" />
				</view>
				<view style="width:530upx">
					<view class="flex justify-between padding-bottom-sm">
						<view class="text-black text-bold text-lg" :data-id="item.id" @click="_goToStore">{{item.name}}</view>
						<view class="text-xxl" :data-index="index" @click="_showModal">
							<text class="cuIcon-more text-grey"></text>
						</view>
					</view>
					<view class="flex justify-between padding-bottom-sm text-grey">
						<view @click="_goToStore">
							<text class="cuIcon-favorfill text-orange"></text>
							<text>{{item.grade}}</text>
							<text class="margin-left-sm">月销{{item.sales}}</text>
						</view>
						<!-- <view>
							<text>30分钟</text>
						</view> -->
					</view>
					<view class="text-grey padding-bottom-sm" :data-id="item.id" @click="_goToStore">
						<text>起送</text>
						<text class="text-price">{{item.basePrice}}</text>
						<text class="margin-left-sm">配送</text>
						<text class="text-price">{{item.distribution}}</text>
						<text class="margin-left-sm">人均</text>
						<text class="text-price">{{item.averageConsume}}</text>
					</view>
				</view>
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
				storeList: [{
						id: 1,
						name: "豚骨拉面(怡园风味)",
						imgUrl: "/static/ddd.jpg",
						rate: 98,
						grade: 4.9,
						sales: 258,
						basePrice: 15,
						distribution: 3,
						averageConsume: 21
					},
					{
						id: 2,
						name: "美味炸鸡",
						imgUrl: "/static/eee.jpg",
						rate: 98,
						grade: 4.5,
						sales: 356,
						basePrice: 20,
						distribution: 2,
						averageConsume: 25
					},
					{
						id: 3,
						name: "羊肉米线",
						imgUrl: "/static/fff.jpg",
						rate: 98,
						grade: 4.6,
						sales: 186,
						basePrice: 15,
						distribution: 2,
						averageConsume: 18
					}
				]
			};
		},
		computed: {
			// 计算属性的 getter
		},
		onLoad: function() {},
		onShow: function() {
			console.log("pages/user/favor");
		},
		methods: {
			_showModal(e) {
				let index = e.currentTarget.dataset.index;
				let _this = this
				uni.showModal({
					title: "提示",
					content: "取消收藏？",
					success: function(res) {
						if (res.confirm) {
							console.log(_this.storeList);
							console.log("用户点击确定");
						} else if (res.cancel) {
							console.log("用户点击取消");
						}
					}
				});
			},
			//跳转至商家店铺
			_goToStore(e) {
				console.log(e);
				uni.navigateTo({
					url: "/pages/home/storetest?id=" + e.currentTarget.dataset.id
				});
			}
		}
	};
</script>

<style>
</style>
