<template>
	<!-- 为你优选开始 -->
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
</template>

<script>
	export default {
		props: {
			preferdata: Array,
			cateList: Array,
		},
		data() {
			return {}
		},
		methods:{
			goToStore(e){
				this.$emit("goToStore",e)
			}
		}
	}
</script>

<style scoped>

	.prefer-dis {
		display: flex;
		justify-content: space-between;
	}

	.prefer-view {
		height: 256upx;
		width: 300upx;
		padding: 0 8upx;
	}

	.prefer-view image {
		width: 300upx;
		height: 186upx;
		/* max-height: 200upx; */
		border-radius: 8upx;
	}

	.prefer-dis view:nth-child(2) {
		padding: 0 7upx !important;
	}
</style>
