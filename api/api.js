// 封装请求：get post
// 面向对象es6 promise  等等。。。

// 引进提示
import {errdata} from 'api/errdata.js'

// GET
let listing = function(urling,shopdata){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:urling,
			method:'GET',
			data:shopdata
		})
		.then((res)=>{
			console.log("封装处",res[1])
			if(res[1].data.status==false){
				let errs = '服务器错误 请稍后再试'
				errdata.errlist(errs)
				reject(err)
				return
			}
			resolve(res[1].data)
			
		})
		.catch((err)=>{
			let errs = '服务器错误 请稍后再试'
			errdata.errlist(errs)
			reject(err)
		})
	})
}

// POST请求
let publicing = function(urling,shopdata){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:urling,
			method:'POST',
			data:shopdata
		})
		.then((res)=>{
			// console.log(res[1])
			resolve(res[1])
		})
		.catch((err)=>{
			let errs = '服务器错误 请稍后再试'
			errdata.errlist(errs)
			reject(err)
		})
	})
}

export{listing,publicing}