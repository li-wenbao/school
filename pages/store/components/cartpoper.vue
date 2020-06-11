<template>
	<view class="">
		<view @click="addRule(food)" class="rule-btn">选规格</view>
		<view v-show="show" class="cartList">
			<view class="bg-white padding-sm radius20">
				<scroll-view scroll-y="true">
					
				</scroll-view>
			</view>
			<view class="flex justify-center align-center margin-sm" @click="close">
				<text class="cuIcon-roundclose margin-top-sm" style="color: red;font-size: 32px;"></text>
			</view>
		</view>
		<view class="listMask" v-show="show"></view>
	</view>
</template>

<script>
	// import Vue from 'vue'
	let {
		log
	} = console

	// import cartcontrol from '@/components/cartcontrol.vue'
	export default {
		components: {
			// cartcontrol
		},
		props: {
			food: Object,
			foods: Array,
			checked: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				show: false,
				radio: 'radio1',
				active: 0,
				flg: 0,
				cartall: 0,
				// 商品数量
				amount: '',
				num: 0,
				cartvalue: 0
			};
		},
		mounted() {

		},
		watch: {
			food(newvalue, oldvalue) {
				log(newvalue)
				log("+++gddfgdgf++++", JSON.stringify(newvalue))
				this.food = newvalue
			}
		},
		watch: {
			'food.price'(newVal, oldVal) {
				// console.log(console.log(newVal, oldVal))
			}
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
			allPrice() {

			},
		},
		methods: {
			choItem(item, index) {
				this.num = index
				this.cartvalue = this.accAdd(item.price, this.food.price)
			},
			addRule(item) {
				this.show = true
				this.$emit('addRule', item)
				console.log(JSON.stringify(item))
			},

			aCart(item) {
				this.$emit('aCart', item)
			},
			addCart(item) {
				console.log("addCart", JSON.stringify(item))

				if (item.count >= 0) {
					item.count++
					this.cartvalue = this.accMul(this.cartvalue, item.count)
					console.log('c++', JSON.stringify(this.food.price))
				} else {
					// console.log('add')
					this.goods.forEach((good) => {
						good.foods.forEach((food) => {
							if (item.name == food.name)
								Vue.set(food, 'count', 1)
						})
					})
				}
			},
			decreaseCart(item) {
				this.$emit('dec', item)
				console.log("decreaseCart")
			},
			close() {
				this.show = false
			},

			indxChange(idx, item) {
				this.active = idx
				item.checked = !item.checked
				if (this.active = idx) {
					item.checked == true
					this.food.price = this.accAdd(this.food.price, parseInt(item.price))
				}
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
		},

	}
</script>

<style scoped>
	.cartList {
		position: fixed;
		width: 90%;
		top: 30%;
		left: 50%;
		transform: translateX(-50%);
		z-index: 90;
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
		background: #000000;
	}

	/* 自定义按钮 */
	.rule-btn {
		background: #0099FF;
		padding: 3px 6px;
		font-size: 16rpx;
		line-height: 32rpx;
		color: #ffffff;
		border-radius: 6px;
	}

	.food-control {
		display: flex;
		flex: 1;
		justify-content: space-around;
	}

	.cont {
		width: 22px;
		height: 22px;
		box-sizing: border-box;
		border-radius: 50%;
		text-align: center;
	}
</style>
