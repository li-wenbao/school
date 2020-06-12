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
// 引入colorui头部组件
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)
Vue.config.productionTip = false


//引入loading
import homeload from '@/components/element/loading.vue'
Vue.component('home-load',homeload)

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
