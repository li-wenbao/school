<template>
	<view class="cu-list grid no-border col-4">
		<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" :data-id="item.name" @click="goToMoreStore">
			<image style="height:70rpx" :src="item.url" mode="aspectFit" />
			<text>{{item.name}}</text>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				
			}
		},
		props:{
			cuIconList:Array
		},
	}
	
</script>

<style>
</style>