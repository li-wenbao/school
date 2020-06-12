<template>
	<navigator style="width:400rpx;" class="flex align-center" v-else url="/pages/home/location" hover-class="none">
		<image src="/static/location.png" class="location-img margin-left-sm" mode="aspectFit" />
		<text>{{addressModify}}</text>
		<text class="cuIcon-right" style="color: #FFFFFF;"></text>
	</navigator>
	<navigator class="search-form round" url="/pages/home/search" hover-class="none">
		<text class="cuIcon-search text-grey text-xl"></text>
		<input type="text" placeholder="搜索" confirm-type="search" />
	</navigator>
</template>

<script>
	export default {
		
		data(){
			return {
				
			}
		},
		props:{
			addressModify:Object	
		}
	}
</script>

<style>
	
</style>
