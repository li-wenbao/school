<template>
	<swiper class="swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true" :autoplay="true"
	 interval="4000" duration="1000">
		<swiper-item v-for="(item,index) in swiperList" :key="index">
			<view style="padding:0 5rpx">
				<image style="height:200rpx;width:680rpx;border-radius:20rpx;overflow:hidden;" :src="item.url" mode="scaleToFill"
				 v-if="item.type=='image'" />
			</view>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		
		data(){
			return {
				
			}
		},
		props:{
			swiperList:Array,
			dotStyle:Boolean
		}
	}
</script>

<style>
</style>