<template>
	<view class="hx-numbox">
		<view @click="_calcValue('minus')" class="hx-numbox__minus" v-if="inputValue>0">
			<text  class="flex justify-center text-center cuIcon-move align-center item-center" :class="{ 'hx-numbox--disabled': inputValue <= min || disabled }"></text>
		</view>
		<input :disabled="true" @blur="_onBlur" class="hx-numbox__value" type="number" v-model="inputValue" v-if="inputValue>0"/>
		<view @click="_calcValue('plus')" class="hx-numbox__plus" >
			<text class="flex justify-center text-center cuIcon-add align-center item-center" :class="{ 'hx-numbox--disabled': inputValue >= max || disabled }"></text>
		</view>
	</view>
</template>
<script>
	export default {
		name: "hxNumberBox",
		props: {
			value: {
				type: [Number, String],
				default: 0
			},
			min: {
				type: Number,
				default: 0
			},
			max: {
				type: Number,
				default: 100
			},
			step: {
				type: Number,
				default: 1
			},
			disabled: {
				type: Boolean,
				default: false
			},
			rowData: {
				type: Object,
				default: ()=>{
					return {}
				}
			},
			clickTime: {
				type: Number,
				default: 0
			}
			
		},
		data() {
			return {
				inputValue: 0,
				addStaus: true,
			};
		},
		watch: {
			value(val) {
				this.inputValue = +val;
			},
			inputValue(newVal, oldVal) {
				if (+newVal !== +oldVal) {
					//this.$emit("change", newVal,this.rowData);
				}
				/* if(+newVal > +oldVal){
					
				} */
			}
		},
		created() {
			this.inputValue = +this.value;
		},
		methods: {
			_calcValue(type) {
				let that = this;
				if (this.disabled) {
					return;
				}
			
				const scale = this._getDecimalScale();
				let value = this.inputValue * scale;
				let step = this.step * scale;
				
				
				if (type === "minus") {
					this.$emit("lessChange", this.inputValue,this.rowData);
					value -= step;
					if (value < this.min) {
						return;
					}
					if(value > this.max){
						value = this.max
					}
				} else if (type === "plus") {
					this.$emit("addChange", this.inputValue,this.rowData);
					if(that.clickTime > 0){
						if(!this.addStaus){
							return;
						}else{
							this.addStaus = false;
							setTimeout(()=>{
								that.addStaus = true;
							},that.clickTime)
						}
					}
					value += step;
					if (value > this.max) {
						return;
					}
					if(value < this.min){
						value = this.min
					}
				}

				this.inputValue = String(value / scale);
				this.$emit("change", this.inputValue,this.rowData);
			},
			_getDecimalScale() {
				let scale = 1;
				// 浮点型
				if (~~this.step !== this.step) {
					scale = Math.pow(10, (this.step + "").split(".")[1].length);
				}
				return scale;
			},
			_onBlur(event) {
				let value = event.detail.value;
				if (!value) {
					// this.inputValue = 0;
					return;
				}
				value = +value;
				if (value > this.max) {
					value = this.max;
				} else if (value < this.min) {
					value = this.min;
				}
				this.inputValue = value;
			}
		}
	};
</script>

<style lang="scss" scoped>
	$box-height: 42rpx;
	$box-line-height: 42rpx;
	$box-width: 42rpx;
	.hx-numbox {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		height: $box-height;
		line-height: $box-height;
		// width: 85px;
		justify-content: flex-end;
	}

	.hx-numbox__value {
		width: $box-width;
		height: $box-height;
		text-align: center;
		font-size: $uni-font-size-lg;
		color: #222222;
	}

	.hx-numbox__minus {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
			align-center:center;
		justify-content: center;
		width: $box-width - 2;
		height: $box-height - 2;
		font-size: 34rpx;
		text-align: center;
		color: $uni-text-color;
		background-color: #f8f8f8;
		border-radius: 50%;
		// border-radius: 30%;
		border: 1.4px solid #0078ff;
		color: #0078ff;
		
	}

	.hx-numbox__plus {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		align-center:center;
		text-align: center;
		width: $box-width;
		height: $box-height;
		line-height: $box-height/2;
		background: linear-gradient(100deg, #0099ff, #0078ff);
		font-size: 36rpx;
		border-radius: 50%;
		// border-radius: 30%;
		color: #FFFFFF;
	}
	
	.hx-numbox--disabled {
		color: $uni-text-color-disable;
		text-align: center;
	}
</style>
