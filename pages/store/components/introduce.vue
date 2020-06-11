<template>
	<view class="introduce-back">
		<!-- 商家信息 -->
		<view class="cu-list menu sm-border margin-top-sm">
			<view class="cu-item">
				<view class="content">
					<image src="/static/menu/location.png" class="png" mode="aspectFit" />
					<text class="text-grey">{{busidata.address}}</text>
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
					<text class="text-grey">配送服务：由xx提供配送服务</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<image src="/static/menu/help.png" class="png" mode="aspectFit" />
					<text class="text-grey">配送时间：{{busidata.times}}</text>
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
</template>

<script>
	export default{
		props:{
			busidata:Object
		},
		data() {
			return {
				
			}
		},
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: row;
	}
</style>
