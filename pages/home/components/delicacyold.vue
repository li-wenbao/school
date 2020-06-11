<template>
	<!-- 筛选条件框 -->
	<view>
		<view id="nav" class="bg-white flex justify-between 
		align-center padding-tb-sm padding-lr border-bottom" 
		style="height:40px;z-index:10000;">
			<view class="flex justify-start">
				<view style="min-width:7em" @tap="showModal" data-target="sort">
					{{sortName}}
					<text :class="modalName=='sort'?'cuIcon-fold':'cuIcon-unfold'"></text>
				</view>
				<view :class="sortCur == 7?'text-blue':''" style="min-width:7em" @click="sortSelect" :data-id="7">销量最高</view>
				<view :class="sortCur == 8?'text-blue':''" style="min-width:7em" @click="sortSelect" :data-id="8">起送价最低</view>
			</view>
			<view @tap="showModal" data-target="screen">
				<text>筛选</text>
				<text class="cuIcon-filter"></text>
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
						<!-- <view class="my-tag">
						<view class="bg-gray radius padding-tb-xs margin-bottom-sm" style="width:220upx;" v-for="(item,index) in activeTagList"
						 :key="index">{{item}}</view>
					</view> -->
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
	// // 引入post请求
	// import {publicing} from '../../../api/api.js'
	// // 引入请求地址
	// import {startingurl,multipleurl} from '../../../api/request.js'
	export default {
		data() {
			return {
				flag: false,
				synthesize: "综合排序",
				drop: false,
				sortmen: false,
				ying: false,
				num: 0,
				scrnum: -1,
				// 接收筛选的对象
				multiobj: {},
				sortlist: [{
						"name": "综合排序",
						"screen": "_id",
						"nums": 1
					},
					{
						"name": "起送价最低",
						"screen": "delivering",
						"nums": 1
					},
					{
						"name": "配送费最低",
						"screen": "physical",
						"nums": 1
					},
					{
						"name": "人均高到低",
						"screen": "capita",
						"nums": -1
					},
					{
						"name": "人均低到高",
						"screen": "capita",
						"nums": 1
					}
				],
				// 多选
				screendata: [{
					"title": "商家特色(可多选)",
					"datas": [{
							"id": 1,
							"sign": 'duration',
							"name": '配送最快'
						},
						{
							"id": 1,
							"sign": 'deliver',
							"name": '0元起送'
						},
						{
							"id": 1,
							"sign": 'physi',
							"name": '免配送费'
						}
					],
				}],
				// 人均价筛选
				person: [{
					"title": "人均价",
					"datas": [{
							"name": "20元以下",
							"per": {
								"$lt": 20
							},
						},
						{
							"name": "20-40元",
							"per": {
								"$lte": 40,
								"$gte": 20
							},
						},
						{
							"name": "40元以上",
							"per": {
								"$gt": 40
							},
						},
					]
				}],
			}
		},
		methods: {
			// 综合排序
			multiple() {
				this.drop = true
				this.sortmen = false
				this.backOne()
			},
			// 综合排序替换
			sortClick(index, name, screen, nums) {
				this.synthesize = name
				this.num = index
				console.log(screen + nums)
				this.backClic()
				this.starTing(screen, nums)
			},
			// 综合排序的请求
			starTing(screen, nums) {
				let Data = {
					screen,
					nums
				}
				publicing(startingurl, Data)
					.then((res) => {
						// console.log(res)
						// 存储到vuex数据仓库
						this.$store.commit('screenmuta', res.data)
					})
					.catch((err) => {
						console.log(err)
					})
			},
			// 销量，速度，津贴
			saLes() {
				this.backClic()
			},
			// 筛选
			scReen() {
				this.drop = false
				this.sortmen = true
				this.backOne()
			},
			// 透明背景
			backOne() {
				setTimeout(() => {
					this.ying = true
				}, 310)
			},
			// 隐藏透明背景
			backClic() {
				this.ying = false
				this.drop = false
				this.sortmen = false
			},
			// 商家特色（多选）
			screenchoIce(indexs, sign) {
				console.log(sign)
				if (this.screendata[0].datas[indexs].id == 1) {
					// 选中
					this.screendata[0].datas[indexs].id = 2
					// console.log('选中')
					this.$set(this.multiobj, sign, sign)
					// this.$set给对象添加一个属性
					console.log(this.multiobj)
				} else {
					// 未选中
					this.screendata[0].datas[indexs].id = 1
					// console.log('未选中')
					this.$delete(this.multiobj, sign)
					console.log(this.multiobj)
				}
			},
			// 人均价（单选）
			personchoIce(index, name) {
				if (this.scrnum == index) {
					// 未选中
					this.scrnum = -1
					this.$delete(this.multiobj, 'capita')
					console.log(this.multiobj)
				} else {
					// 选中
					this.scrnum = index
					this.$set(this.multiobj, 'capita', name)
					console.log(this.multiobj)
				}
			},
			// 完成
			compLete() {
				this.backClic()
				// 作业：完成没有商品数据的提示
				publicing(multipleurl, this.multiobj)
					.then((res) => {
						console.log(res)
						// 存储到vuex数据仓库
						this.$store.commit('screenmuta', res.data)
					})
					.catch((err) => {
						console.log(err)
					})
			},
			// 清空
			emPty() {
				// 商家特色
				this.screendata.forEach((item) => {
					let arr = item.datas.map((items) => {
						items.id = 1
						return items
					})
					console.log(arr)
				})
				this.multiobj = {}
				// 人均价
				this.scrnum = -1
				this.backClic()
			},
		},
		// 如果用户没有点击任何筛选条件，完成按钮应该被禁用
		computed: {
			// this.multiobj如果是空对象，禁止点击完成按钮，反之。。。。
			emptyIng() {
				let obj = JSON.stringify(this.multiobj) == '{}'
				console.log(obj) //true:空对象
				if (obj == true) {
					this.flag = false
				} else {
					this.flag = true
				}
			}
		}
	}
</script>

<style scoped>
	/* 筛选区 */
	.delica-view image {
		width: 30upx;
		height: 30upx;
		display: block;
	}

	.delica-view {
		font-size: 30upx;
		display: flex;
		align-items: center;
		color: #666666;
		height: 70upx;
		padding: 0 15upx;
		background: #FFFFFF;
	}

	.delica-list {
		display: flex;
		align-items: center;
	}

	.delica-right {
		justify-content: flex-end;
		flex-grow: 5;
	}

	.delica-grow {
		flex-grow: 1;
	}

	.prefer-posi {
		position: absolute;
		left: 0;
		right: 0;
		width: 100%;
		z-index: 99;
	}

	/* 排序 */
	.sortlist {
		background: #ffffff;
	}

	.sortliteltle text {
		padding: 0 15upx;
		display: block;
		font-size: 30upx;
		height: 70upx;
		line-height: 70upx;
		border-top: 1rpx solid #ededed;
	}

	.activeb {
		color: #f89903 !important;
	}

	/* 选择 */
	/*相对定位*/
	.sortlist-view {
		height: 700upx;
		overflow: hidden;
		overflow-y: scroll;
		position: relative;
	}

	.sortlist-title {
		padding: 0 15upx;
		font-size: 30upx;
		height: 60upx;
		line-height: 60upx;
	}

	.Choice {
		font-size: 28upx;
		background: #f8f8f8;
		height: 55upx;
		line-height: 55upx;
		color: #666666;
		width: calc((100% / 3) - 15px) !important;
		margin: 7.5px;
		text-align: center;
		display: block;
		border-radius: 5upx;
	}

	.sortlist-flex {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		margin-bottom: 30upx;
	}

	.sortlist-bottom {
		background: #ffffff;
		height: 80upx;
		border-top: 1upx solid #e4e4e4;
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.sortlist-bottom text {
		flex-grow: 1;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
	}

	.sortlist-bottom text:nth-child(1) {
		border-right: 1upx solid #e4e4e4;
	}

	.sortlist-bottom text:nth-child(2) {
		background: #ffd348;
	}

	.yin {
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	/* 商家特色加样式 */
	.scractive {
		background: #fef6df !important;
		color: #f29909 !important;
	}
</style>
