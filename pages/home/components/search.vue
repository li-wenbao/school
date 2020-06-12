<template>
	<block>
		<view v-if="!isLocation" @click="getCurLocation" class="cu-load margin-left-sm text-left" :class="locationError?'erro over':'loading'"
		 style="width:400rpx;"></view>
		<navigator style="width:400rpx;" class="flex align-center" v-else url="/pages/home/location" hover-class="none">
			<image src="/static/location.png" class="location-img margin-left-sm" mode="aspectFit" />
			<text>{{addressModify}}</text>
			<text class="cuIcon-right" style="color: #FFFFFF;"></text>
		</navigator>
		<navigator class="search-form round" url="/pages/home/search" hover-class="none">
			<text class="cuIcon-search text-grey text-xl"></text>
			<input type="text" placeholder="搜索" confirm-type="search" />
		</navigator>
	</block>
</template>

<script>
	export default {
		
		data() {
			return {
				isLocation: false,
				locationError: false,
				address: "昆明市",
			}
		},
		mounted:function(){
			this.getCurLocation();
		},
		
		methods:{
			
			//获取当前位置
			getCurLocation: function() {
				this.locationModel.getLocation(data => {
					if (!data.locationError) {
						let gloablMyLocation = this.gloablMyLocation;
						let baseInfo = data.baseInfo;
						gloablMyLocation.city = baseInfo.city;
						gloablMyLocation.aois = baseInfo.aois;
						gloablMyLocation.address = baseInfo.address;
						gloablMyLocation.location = baseInfo.location;
						gloablMyLocation.formattedAddress = baseInfo.formattedAddress;
						gloablMyLocation.addressComponent = baseInfo.addressComponent;
						this.address = baseInfo.address;
						this.isLocation = true;
					}
					this.locationError = data.locationError;
				});
			},
		},
		computed: {
			// 计算属性的 getter
			addressModify: function() {
				// `this` 指向 vm 实例
				let address = this.address;
				return address.length < 12 ? address : address.substr(0, 10) + "...";
			},
			
		},
		
		
	}
</script>

<style>
	.location-img {
		width: 40rpx;
		height: 40rpx;
	}
</style>