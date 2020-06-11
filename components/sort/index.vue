<template name="sortBox">
	<view class="sort-box">
		<view id="nav" class="bg-white flex justify-between align-center padding-tb-sm padding-lr solids-bottom" style="height:40px;z-index:9999;">
			<view class="flex justify-start">
				<view style="min-width:7em" @tap="showModal" data-target="sort">
					{{sortName}}
					<text :class="modalName=='sort'?'cuIcon-fold':'cuIcon-unfold'"></text>
				</view>
				<view :class="sortCur == 7?'text-black':''" style="min-width:7em" @click="sortSelect" :data-id="7">销量最高</view>
				<view :class="sortCur == 8?'text-black':''" style="min-width:7em" @click="sortSelect" :data-id="8">速度最快</view>
			</view>
			<view @tap="showModal" data-target="screen">
				<text>筛选</text>
				<text class="cuIcon-right"></text>
			</view>
		</view>
		<!-- 排序拟态窗口开始 -->
		<view class="cu-modal drawer-modal justify-start" :class="modalName=='sort'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop :style="[{top:CustomBar + 90+'px'}]">
				<view class="cu-list menu">
					<view class="cu-item" v-for="(item,index) in sortList" :key="index" @click="sortSelect" :data-id="index">
						<view class="content">
							<view :class="sortCur == index?'text-blue':''">{{item}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 排序拟态窗口结束 -->
		<!-- 筛选拟态窗口开始 -->
		<view class="cu-modal drawer-modal justify-start" :class="modalName=='screen'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop :style="[{top:CustomBar + 90+'px'}]" style="height:600upx;">
				<view class="padding-lr-sm bg-white" style="height:100%;">
					<scroll-view style="height:600upx" scroll-y="true">
						<view class="my-tag">
							<view class="bg-gray radius padding-tb-xs margin-bottom-sm" style="width:220upx;" v-for="(item,index) in storeTagList"
							 :key="index">{{item}}</view>
						</view>
						<view class="padding-tb-sm text-left text-black">人均价</view>
						<view class="my-tag">
							<view class="bg-gray radius padding-tb-xs margin-bottom-sm" style="width:220upx;" v-for="(item,index) in averageConsume"
							 :key="index">{{item}}</view>
						</view>
						<view class="padding-tb-sm text-left text-black">优惠活动(可多选)</view>
						<view class="my-tag">
							<view class="bg-gray radius padding-tb-xs margin-bottom-sm" style="width:220upx;" v-for="(item,index) in activeTagList"
							 :key="index">{{item}}</view>
						</view>
						<view style="height:49px"></view>
					</scroll-view>
				</view>
				<view class="flex solid-top" style="position:fixed;bottom:0upx;">
					<view class="bg-white padding-tb" @click="screenClear" style="width:375upx">清空</view>
					<view class="bg-blue padding-tb" @click="screenComplete" style="width:375upx">完成</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				CustomBar: 72,
				sortCur: 0,
				modalName: null,
				toStore: null,
				sortList: [
					// "综合排序",
					// "距离最近",
					// "评分最高",
					// "起送价最低",
					// "配送费最低",
					// "人均高到低",
					// "人均低到高"
				],
				storeTagList: [
					// "校园专送",
					// "到店自取",
					// "放心吃",
					// "点评分高",
					// "品牌商家",
					// "免配送费",
					// "新商家"
				],
				averageConsume: ["20元一下", "20-40元", "40元以上"],
				activeTagList: [
					// "满减优惠",
					// "进店领券",
					// "折扣商品",
					// "新人立减",
					// "满赠活动",
					// "减配送费"
				],
			}
		},
		props: {
			sortList: {
				type: Array
			},
		},
		onLoad: function() {
			console.log("this.CustomBar==", this.CustomBar)
			uni.createSelectorQuery()
				.select("#nav")
				.boundingClientRect(res => {
					console.log("筛选距离：", res.top);
					this.scrollTop = res.top;
				})
				.exec();
		},
		computed: {
			sortName() {
				let sortCur = this.sortCur;
				let sortList = this.sortList;
				return sortCur > 6 ? sortList[0] : sortList[sortCur];
			},
		},
		methods: {
			showModal(e) {
				console.log("是什么？++++++++++", e)
				console.log("是什么？++++++++++", e.currentTarget.dataset)
				this.toStore = "nav";
				this.modalName = e.currentTarget.dataset.target;
				return this.$emit("showModal",this.modalName)
			},
			hideModal(e) {
				this.toStore = null;
				this.modalName = null;
				return this.$emit("hideModal", e)
			},
			//排序方式切换
			sortSelect(e) {
				console.log(e);
				this.sortCur = e.currentTarget.dataset.id;
				return this.$emit("sortSelect", this.sortCur)
			},
			//筛选栏切换
			tabSelect(e) {
				console.log(e);
				this.tabCur = e.currentTarget.dataset.id;
				return this.$emit("tabSelect", this.tabCur)
			},
			//筛选条件清空
			screenClear(e) {
				console.log("清空筛选条件");
				return this.$emit("screenClear", e)
			},
			//筛选条件确定
			screenComplete() {
				this.modalName = null;
				return this.$emit("screenComplete", e)
			},
		}
	}
</script>

<style>
	/* ==================
	        模态窗口
	==================== */

	.cu-modal.show {
		opacity: 1;
		transition-duration: 0.3s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
	}

	.cu-dialog {
		position: relative;
		display: inline-block;
		vertical-align: middle;
		margin-left: auto;
		margin-right: auto;
		width: 750upx;
		max-width: 100%;
		background-color: #f8f8f8;
		border-radius: 10upx;
		overflow: hidden;
	}

	.cu-modal.drawer-modal .cu-dialog {
		height: 500upx;
		width: 750upx;
		border-radius: 0;
		margin: initial;
		transition-duration: 0.3s;
	}

	.cu-modal.drawer-modal.justify-start .cu-dialog {
		transform: translateY(-100%);
	}

	.cu-modal.drawer-modal.justify-end .cu-dialog {
		transform: translateY(100%);
	}

	.cu-modal.drawer-modal.show .cu-dialog {
		transform: translateY(0%);
	}
</style>
