//全局getters
// const getters = {
// 	baseDemain: state => state.baseDemain,
//     baseApiUrl: state => state.baseApiUrl,   
// 	vehicleShareUrl: state => state.vehicleShareUrl,
// 	token: state => state.token,
// 	hData : state => state.hData,
// 	userInfo: state => state.userInfo,
// 	hasLogin: state => state.hasLogin,
//     appId: state => state.appId,
//     appKey: state => state.appKey,
// 	wxAppId: state => state.wxAppId,
// 	wxInfoByBackUrl: state => state.wxInfoByBackUrl,
// 	wxInfoByCode: state => state.wxInfoByCode
// }
// export default getters

/*
包含多个基于state的getter计算属性的对象
 */
export default {

  totalCount (state) {
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count , 0)
  },

  totalPrice (state) {
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count*food.price , 0)
  },

  positiveSize (state) {
    return state.ratings.reduce((preTotal, rating) => preTotal + (rating.rateType===0?1:0) , 0)
  },
  
  baseDemain: state => state.baseDemain,
  baseApiUrl: state => state.baseApiUrl,   
  vehicleShareUrl: state => state.vehicleShareUrl,
  token: state => state.token,
  hData : state => state.hData,
  userInfo: state => state.userInfo,
  hasLogin: state => state.hasLogin,
  appId: state => state.appId,
  appKey: state => state.appKey,
  wxAppId: state => state.wxAppId,
  wxInfoByBackUrl: state => state.wxInfoByBackUrl,
  wxInfoByCode: state => state.wxInfoByCode
  
}