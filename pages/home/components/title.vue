<template>
	<view class="flex justify-between align-center margin-top">
		<view class="text-black text-bold text-sxl">{{title}}</view>
		<view v-if="showMore" @click="goToMore" :data-id="titleData">
			<text class="check-more">更多</text>
			<text class="cuIcon-right"></text>
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
			title:String,
			titleData:String,
			showMore:{
				type:Boolean,
				default: false
			}
		},
		methods:{
			goToMore(e){
				this.$emit("goToMore",e)
			}
		}
	}
</script>

<style scoped>
</style>