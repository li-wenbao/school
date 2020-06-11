<template>
	<scroll-view scroll-x class="bg-white nav" scroll-left="0">
		<view class="flex cu-bar search border-bottom">
			<view class="flex flex-twice align-center">
				<view class="cu-item" style="position: relative;" v-for="(item,index) in order" :key="index" >
					<view @click="menubtn(index)">
						<text :class="{tabText:index == num?'text-blue':''}" >{{item}}</text>
						<view :class="{cur:index == num?'cur':''}"></view>
					</view>
				</view>
			</view>
			<view class="search-form round flex-sub" >
				<text class="cuIcon-search text-grey text-sxl"></text>
				<input type="text" placeholder="搜索" confirm-type="search" />
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				num: 0,
				order: ['点菜', '评价', '商家']
			}
		},
		methods: {
			menubtn(index) {
				this.num = index
				// 子组件调试父组件方法 ：parent
				this.$parent.fatherMethod(index)
			}
		}
	}
</script>

<style scoped>
	.tabText{
		color: #0099FF;
	}
</style>
