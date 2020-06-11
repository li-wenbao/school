<template>
	<view class="padding-sm">
		<!-- 为你优选开始 -->
		<view class="flex justify-between align-center margin-top">
			<view class="text-black text-bold text-sxl">为你优选</view>
			<view @click="goToMoreStore" data-id="为你优选">
				<text class="check-more">更多</text>
				<text class="cuIcon-right"></text>
			</view>
		</view>
		<scroll-view scroll-x="true" class="scroll" scroll-with-animation="true">
			<view class="flex justify-between margin-top-sm prefer-dis">
				<block v-for="(item,index) in  preferdata" :key="index" :data-id="item.id" @click="goToStore">
					<view class="prefer-view">
						<image :src="item.image" lazy-load="true" mode="aspectFill"></image>
						<view class="text-cut text-xsl">{{item.title}}</view>
						<view class="text-grey text-sm">好评率{{item.lable}}%</view>
					</view>
				</block>
			</view>
		</scroll-view>
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
	}
</script>

<style scoped>
	.scroll {
		white-space: nowrap;
		width: 100%;
		height: 300upx;
	}

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
