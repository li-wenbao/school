// 公用地址
let url = 'http://192.168.1.107:8888/tof-web/appModel/'

let imgurl = "http://192.168.1.107:8888/tof-web/download/"

// 附近商家
let wxshopurl = `${url}forshop/wxshop`
let getAll = `${url}getAll.json`

// 商品数据-详情
let getShop = `${url}getShopByshopId.json`

// 综合排序
let startingurl = `${url}getShopAll.json`


// 为你优选
let getpreferurl = `${url}forshop/findShopAll`

// 筛选多选
let multipleurl = `${url}forshop/multiple`

//搜索
let searchurl = `${url}forshop/search`

// 评论
let discussurl = `${url}message/discuss`

// 商家介绍
let shopurl = `${url}forshop/shop`



// 登录
let wxloginurl = `${url}wxuser/wxlogin`

// 微信支付
let wxpayingurl = `${url}wxpay/wxpaying`

// 提交评论
let commenturl = `${url}message/comment`


export{getAll,getpreferurl,getShop,wxshopurl,startingurl,multipleurl,searchurl,discussurl,shopurl,
wxloginurl,wxpayingurl,commenturl,imgurl}