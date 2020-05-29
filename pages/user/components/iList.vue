<template>
	<view class="cu-list menu sm-border margin-top-sm">
		<view class="cu-item arrow">
			<navigator class="content" url="/pages/user/address" hover-class="none">
				<image src="/static/menu/location.png" class="png" mode="aspectFit" />
				<text>我的地址</text>
			</navigator>
		</view>
		<view class="cu-item arrow" @click="goTel">
			<button class="cu-btn content" open-type="contact">
				<image src="/static/menu/service.png" class="png" mode="aspectFit" />
				<text>联系客服</text>
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
          goTel(){
			  
		  }
		}
	}
</script>

<style>

</style>
