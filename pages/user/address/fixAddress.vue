<template>
	<view class="page">
		<cu-custom :bgColor="'bg-blue'" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">
				修改地址
			</block>
			<block slot="right">
				<view class="action"></view>
			</block>
		</cu-custom>
		<view>
			<form @submit="formSubmit">
				<view class="cu-form-group">
					<view class="title">联系人</view>
					<input placeholder="姓名" name="username" />
				</view>
				<view class="cu-form-group">
					<view class="title"></view>
					<view class="flex my-width">
						<block v-for="(item,index) in sexList" :key="index">
							<button v-if="sex === item" class="margin-right cu-btn sm line-blue text-blue" @click="_chooseSex(item)">{{item}}</button>
							<button v-else class="margin-right cu-btn sm line-grey" @click="_chooseSex(item)">{{item}}</button>
						</block>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">电话</view>
					<input type="number" placeholder="手机号码" name="tel" maxlength="11" />
					<!-- <text v-if="cphone"></text> -->
				</view>
				<view class="cu-form-group">
					<view class="title">收货地址</view>
					<view class="flex my-width align-center" @click="_chooseLocation()">
						<text class="cuIcon-location text-grey margin-right-xs"></text>
						<input placeholder="点击选择" name="address" :value="address" disabled />
						<text class="cuIcon-right text-grey"></text>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">门牌号</view>
					<input placeholder="例：5号楼203室" name="doorplate" />
				</view>
				<view class="cu-form-group">
					<view class="title">标签</view>
					<view class="flex my-width">
						<block v-for="(item,index) in tagList" :key="index">
							<button v-if="tag === item" class="margin-right cu-btn sm line-blue text-blue" @click="_chooseTag(item)">{{item}}</button>
							<button v-else class="margin-right cu-btn sm line-grey" @click="_chooseTag(item)">{{item}}</button>
						</block>
					</view>
				</view>
				<view class="padding flex flex-direction margin-tb-sm">
					<button class="cu-btn bg-blue round lg" role="button" aria-disable="false" form-type="submit">保存并使用</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import utils from '@/utils/utils.js';
	export default {
		/*
		初始化数据
		*/
		data() {
			return {
				address: "",
				myLocation: null,
				sexList: ["先生", "女士"],
				sex: "",
				tagList: ["家", "公司", "学校"],
				tag: ""
			};
		},
		computed: {
			// 计算属性的 getter
		},
		onLoad: function() {
			// console.log("utils=====+++", utils)
		},
		onShow: function() {
			// console.log("pages/user/addAddress");
		},
		methods: {
			_chooseLocation() {
				var _this = this;
				uni.chooseLocation({
					success: function(res) {
						_this.address = res.name;
						_this.myLocation = res;
					}
				});
			},
			_chooseSex(value) {
				this.sex = value;
			},
			_chooseTag(value) {
				this.tag = value;
			},

			formSubmit: function(e) {
				var data = e.detail.value;
				
				//参数校验
				let tel = data.tel
				let username = data.username
				let phone = utils.checkPhone(tel)
				let doorplate = data.doorplate
				let address = data.address
				if (tel == "") {
					uni.showToast({
						title: "请填写手机号码",
						icon: 'none',
					})
					return false
				}
				if (!phone) {
					uni.showToast({
						title: "请填写正确的手机号码",
						icon: 'none',
					})
					return false
				}
				if (username == "") {
					uni.showToast({
						title: "请填写您的名字",
						icon: 'none',
					})
					return false
				}

				if (address == "") {
					uni.showToast({
						title: "请选择地址",
						icon: 'none',
					})
					return false
				}

				if (doorplate == "") {
					uni.showToast({
						title: "请填写详细地址",
						icon: 'none',
					})
					return false
				}


				data.sex = this.sex;
				data.tag = this.tag;

				console.log("表单提交数据：", data);
			}
		}
	};
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 40upx);
	}

	.my-width {
		width: 100%;
	}
</style>
