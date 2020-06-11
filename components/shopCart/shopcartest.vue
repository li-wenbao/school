<template>
	<view class="shopcart">
		<view class="cu-car">
			<view class="margin-lr-xl flex justify-between align-center round" style="height:90upx;background-color: #5C5C5C;">
				<view class="" style="position:relative;bottom:10upx;left:20upx;">
					<text class="allcount" v-if="getAllCount">{{getAllCount}}</text>
					<image class="" style="width:130upx;height:130upx;" src="/static/car.png" />
				</view>
				<view class="text-white" @click="toggleList">
					<text class="price" :class="getAllCount ?　'active': ''">￥{{getAllPrice}}</text>
					<view class="text-xs">另需配送费￥3</view>
				</view>
				<view v-if="getDvalue<getAllPrice" class="round bg-grey padding-lr-xl flex align-center" style="height:90upx;">
					还差￥{{getDvalue}}
				</view>
				<view v-else class="round bg-orange padding-lr-xl flex align-center text-white" style="height:90upx;" @click="topay">
					去支付
				</view>
			</view>
		</view>

		<!-- 选择的商品 -->
		<view class="cartList" v-show="isShowList && getList.length">
			<scroll-view scroll-y style="max-height: 300px;border-top-left-radius:20px;border-top-right-radius: 20rpx;">
				<view class="title">
					<text>购物车</text>
					<view class="clear" @click="delShopcart">
						清空
					</view>
				</view>
				<view class="list">
					<view class="list-text" v-for="(item,index) in getList" :key="index">
						<text style="flex:1">{{item.name}}</text>
						<text style="flex:1">￥{{item.price}}</text>
						<cartcontrol :food="item" @add="addCart" @dec="decreaseCart"></cartcontrol>
					</view>
				</view>
			</scroll-view>
			<!-- 占个位 -->
			<view style="height: 70px;"></view>
		</view>
		<view class="listMask" v-show="isShowList && getList.length" @click="toggleList"></view>
	</view>
</template>

<script>
	import cartcontrol from '@/components/shopCart/cartcontrol.vue'
	// import {mul} from '@/utils/lib'
	export default {
		props: {
			goods: {
				type: Array
			}
		},
		data() {
			return {
				isShowList: false,
			};
		},
		components: {
			cartcontrol
		},
		computed: {
			getList() {
				let result = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if (food.count) {
							result.push(food)
							// console.log('res', JSON.stringify(result))
						}
					})
				})
				return result
			},
			// 获得购物车所有商品数量
			getAllCount() {
				let result = 0;
				this.getList.forEach((food) => {
					result += food.count
				})
				return result
			},

			// 总价
			getAllPrice() {
				let result = 0;
				let result1 = 0;
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						result1 += this.accMul(food.count, food.price)
						result = result1.toFixed(2);
					})
				})
				return result
			},

			// 差几块钱 小数点后保留两位数
			getDvalue() {
				let result = 0;
				let result1 = 0;
				let result2 = 0;
				let qisong = 15;
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						result1 += this.accMul(food.count, food.price) //点的菜
						result2 = this.accAdd(result1,this.accAdd(3,5)) //点的菜 + 服务费 + 配送费
						console.log("result2+++++++++++++",result2)
						if(qisong>result2){
							result = (qisong - result2).toFixed(2);
						}
					})
				})
				return result
			},

		},
		methods: {
			// 解决浮点数 运算出现多位小数
			accMul(arg1, arg2) {
				let m = 0,
					s1 = '',
					s2 = '';
				if (arg1 && arg1 != null)
					s1 = arg1.toString();
				if (arg2 && arg2 != null)
					s2 = arg2.toString();
				// console.log('m1',s2.replace('.',''))
				try {
					m += s1.split('.')[1].length
				} catch (e) {}
				try {
					m += s2.split('.')[1].length
				} catch (e) {}

				return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
			},
			// 加法函数
			accAdd(arg1, arg2) {
				var r1, r2, m;
				try {
					r1 = arg1.toString().split(".")[1].length
				} catch (e) {
					r1 = 0
				}
				try {
					r2 = arg2.toString().split(".")[1].length
				} catch (e) {
					r2 = 0
				}
				m = Math.pow(10, Math.max(r1, r2))
				return (arg1 * m + arg2 * m) / m
			},

			toggleList() {
				console.log('tog')
				if (this.getList.length) {
					this.isShowList = !this.isShowList;
				}
			},
			delShopcart() {
				this.$emit('delAll');
			},
			addCart: function(item) {
				this.$emit('add', item)
			},
			decreaseCart(item) {
				this.$emit('dec', item)
			},
			topay: function(item) {
				this.$emit('topay', item)
			},
		},
	}
</script>

<style scoped>
	
	.list-text {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.shopcart .cartBottom {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 54px;
		z-index: 99;
		display: flex;
		background-color: #FFFFFF;
	}

	.carIcon {
		flex: 1;
	}

	.iconBox {
		position: absolute;
		bottom: 0px;
		left: 18px;
		z-index: 101;
		/* background-color: rgb(70, 73, 75); */
		border-radius: 50%;
		height: 48px;
		width: 48px;
		line-height: 55px;
		/* border: 6px solid #141d27; */
	}

	.allcount {
		position: absolute;
		right: -6px;
		top: 0;
		z-index: 101;
		display: inline-block;
<<<<<<< HEAD
		padding: 0 5px;
=======
		padding: 0 4.5px;
>>>>>>> 6b221cc28e510b1e6a911729bb8b594d333f8bad
		font-size: 20upx;
		line-height: 16px;
		font-weight: 400;
		border-radius: 10px;
		background-color: #f01414;
		color: #ffffff;
	}

	.img {
		font-size: 24px;
		line-height: 24px;
		width: 30px;
		height: 30px;
		padding-left: 6px;
		padding-top: 6px;
		color: #cccccc;
		border-radius: 50%;
	}

	.carIcon .active {
		background-color: #00a0dc;
	}

	.middle {
		display: flex;
		flex-direction: column;
		flex: 2;
		color: #ffffff;
	}

	.BtnRight {
		flex: 1;
	}

	.cartList {
		position: fixed;
		background: #FFFFFF;
		bottom: 0px;
		left: 0;
		right: 0;
		z-index: 90;
	}

	.cartList .title,
	.cartList .list-text {
		display: flex;
		flex-direction: row;
	}

	.cartList .title {
		background: #F3F5F7;
		justify-content: space-between;
		padding:8px;
	}

	.cartList .list-text {
		padding: 10px 6px 10px 8px;
		text-align: center;
	}

	.list {

		padding-bottom: 10px;
	}


	/* 遮布 */
	.listMask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 89;
		opacity: 0.5;
		background: #6a7076;
	}


	/* 添加的 */
	.cu-car {
		position: fixed;
		width: 100%;
		bottom: 10px;
		min-height: 0px;
		box-shadow: 0px 0px 0px;
		z-index: 999;
	}

	.cu-tag.badge {
		border-radius: 50%;
		position: absolute;
		top: 10upx;
		right: -5upx;
		font-size: 20upx;
		height: 30upx;
		width: 30upx;
		line-height: 30upx;
		text-align: center;
		color: #ffffff;
		z-index: 1000;
	}

	.cu-tag.badge:not([class*="bg-"]) {
		background-color: #FA0000;
	}
</style>
