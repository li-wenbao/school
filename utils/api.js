import uniFly from '../utils/uniFly.js'
// var Fly=require("flyio/dist/npm/wx")
// var uniFly=new Fly

import utils from '../utils/utils.js'
import store from '../store'
//基础路由
uniFly.baseUrl = store.getters.baseApiUrl
//APICloud签名校验
let now = Date.now()
let appId = store.getters.appId
let appKey = store.getters.appKey
// appKey = utils.SHA1(appId + 'UZ' + appKey + 'UZ' + now) + '.' + now
//设置请求头
// uniFly.headers['X-APICloud-AppId'] = appId
// uniFly.headers['X-APICloud-AppKey'] = appKey
//全局请求超时时间
uniFly.timeOut = 20000

//自定义请求拦截
uniFly.requestInterceptors.success = function(request) {
	// console.log('自定义请求拦截')
	//配置基本信息
	request.headers = uniFly.headers
	request.headers['client_token'] = store.getters.token;
	// console.log("store.getters.token: " + JSON.stringify(store.getters.token));
	uni.showLoading()
	// let hData = {}
	// uni.setStorageSync('hStorage', 'hData')
	let d = uni.getStorageSync('')
	console.log("hData: " + JSON.stringify(d));
	return request
}

uniFly.responseInterceptors.success = function(request) {
	// console.log('自定义响应拦截')
	// console.log("success: " + JSON.stringify(request));
	uni.hideLoading()
	return Promise.resolve(request)
}

uniFly.responseInterceptors.error = function(request) {
	// console.log('自定义响应拦截')
	console.log("error: " + JSON.stringify(request));
	uni.hideLoading()
	return Promise.resolve(request)
}

//所有的接口请在此处统一定义
const $api = {
	init:function(){
		var info = uni.getStorageSync("userInfo");
		let token =  info.token;
		// console.info(token);
		 //自定义请求拦截
		 uniFly.requestInterceptors.success = function(request) {
		 	// console.log('自定义请求拦截')
		 	//配置基本信息
		 	request.headers = uniFly.headers
		 	request.headers['client_token'] =token;
		 	uni.showLoading()
		 	return request
		 }
	},
	
	//post方法请求示例
	postTest: function(data) {
		return uniFly.get({
			url: '/reserves/eaReserves/check',
			params: data
		})
	},
	//get方法请求示例
	getTest: function(data) {
		return uniFly.get({
			url: '/product/eaProducts/listJson',
			params: data
		})
	},
	//post登录
	login: function(data) {
		return uniFly.post({
			url: '/sys/user/login',
			params: data
		})
	},
	
	//微信登录
	// weixinlogin: function(data) {
	// 	return uniFly.post({
	// 		url: '/sys/user/wxlogin',
	// 		params: data
	// 	})
	// },
	
	// 分类cuIconList
	cuIconListApi: function(data) {
		return uniFly.get({
			url: '/cuiconlist',
			params: data
		})
	},
	// 分类catelist
	catelistApi: function(data) {
		return uniFly.get({
			url: '/catelist',
			params: data
		})
	},
	// storeListApi
	storeListApi: function(data) {
		return uniFly.get({
			url: '/storeList',
			params: data
		})
	},
	// getSwiperList
	swiperListApi: function(data) {
		return uniFly.get({
			url: '/swiperList',
			params: data
		})
	},
}

export default $api
