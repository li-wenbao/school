<template>
	<view>
		<view class="cu-btn xs bg-appblue" style="padding: 0 8upx;" :data-show="true" @click="addRule(rulefood)">选规格</view>
	</view>
</template>

<script>
	export default {
		props: {
			rulefood: {
				type: Object,
			},
		},
		data() {
			return {
			
			};
		},
		methods: {
			addRule(item) {
				console.log("rule++++++++++++++++",item)
				this.$emit('rule', item)
			},
		}
	}
</script>

<style>
</style>
