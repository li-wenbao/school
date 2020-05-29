import Vue from 'vue'
import App from './App'

import {
	Location
} from './utils/locationModel'
Vue.prototype.locationModel = new Location()
Vue.prototype.gloablMyLocation = {
	city: null,
	aois: null,
	address: null,
	location: null,
	formattedAddress: null,
	addressComponent: null,
}
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)
Vue.config.productionTip = false


const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 500)
	})
}

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

App.mpType = 'app'

Vue.prototype.$api = {msg, json, prePage};

//全局注册api模块
import api from './utils/api'
Vue.prototype.$api = api
import store from './store'
Vue.prototype.$store = store
const app = new Vue({
	store,
	...App
})
app.$mount()
