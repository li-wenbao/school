<template>
	<view class='mask' v-show="show">
		<view class='modal-content' :style="{height:Height}">
			<slot></slot>
		</view>
		<view class="close-box" @tap="closebox">
			<view class="close">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// show: false,
				Height:"120px"
			}
		},
		props: {
			//是否显示modal
			show: {
				type: Boolean,
				value: false
			},
			//modal的高度
			height: {
				type: String,
				value: ''
			}
		},
		
		methods: {
			clickMask() {
				// this.setData({show:true})
				this.show = true
			},
			clickOutMask() {
				// this.setData({ show: false })
				this.show = false
				this.$emit('clickOutMask')
			},
			closebox() {
				console.log("GGGGGGGGGGGGGGGGGGGGGGG")
				// this.setData({ show: false })
				this.show = false
				this.$emit('closebox')
			},

			cancel() {
				// this.setData({ show: false })
				this.show = false
				this.$emit('cancel')
			},

			confirm() {
				// this.setData({ show: false })
				this.show = false
				this.$emit('confirm')
			}
		}
	}
</script>
<style>
	.mask {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 9999;
	}

	.modal-content {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 90%;
		/* height: 80%; */
		background-color: #fff;
		border-radius: 20rpx;
	}

	.modal-btn-wrapper {
		display: flex;
		flex-direction: row;
		height: 100rpx;
		line-height: 100rpx;
		border-top: 2rpx solid rgba(7, 17, 27, 0.1);
	}

	.cancel-btn,
	.confirm-btn {
		flex: 1;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		font-size: 32rpx;
	}

	.cancel-btn {
		border-right: 2rpx solid rgba(7, 17, 27, 0.1);
	}

	.main-content {
		flex: 1;
		height: 100%;
		overflow-y: hidden;
	}

	.close-box {
		width: 80rpx;
		height: 80rpx;
		position: absolute;
		right: 5rpx;
		top: 5rpx;
	}

	.close {
		background-repeat: no-repeat;
		background-size: 60rpx 60rpx;
		width: 80rpx;
		height: 80rpx;
		background-position: center;
		background-image: url("data:image/png;base64,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");
	}
</style>
