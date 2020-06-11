if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


  var AFAppX = self.AFAppX.getAppContext
    ? self.AFAppX.getAppContext().AFAppX
    : self.AFAppX;
  self.getCurrentPages = AFAppX.getCurrentPages;
  self.getApp = AFAppX.getApp;
  self.Page = AFAppX.Page;
  self.App = AFAppX.App;
  self.my = AFAppX.bridge || AFAppX.abridge;
  self.abridge = self.my;
  self.Component = AFAppX.WorkerComponent || function(){};
  self.$global = AFAppX.$global;
  self.requirePlugin = AFAppX.requirePlugin;
          

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../colorui/components/cu-custom?hash=591ac642b6f57a184fac9330fa292ccf33c32471');
require('../../components/list/list?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/uni-icons/uni-icons?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/uni-rate/uni-rate?hash=993ca45dec9dcdb8f19451ba17e5ec831eb613a0');
require('../../components/hx-comment/hx-comment?hash=01079165cb88e1295a1226321ac51befcbe5cfb2');
require('../../components/uni-transition/uni-transition?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/uni-popup/uni-popup?hash=63f3d097e78ac04213190ce4a92c81860617f7b4');
require('../../components/hx-jump-ball/hx-jump-ball?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/uni-number-box/uni-number-box?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/flyInCart?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../colorui/components/my-cart?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../colorui/components/cu-rate?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../colorui/components/cu-cart?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../pages/user/components/userProfile?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../pages/home/home?hash=103465ac8c4368f3ba0a9c3b1d50280b327ef8f1');
require('../../pages/store/index?hash=a221dc0285077e5c627e93bab3b0332f21633331');
require('../../pages/index/store?hash=a221dc0285077e5c627e93bab3b0332f21633331');
require('../../pages/order/pay?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/order/preview?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/home/paymentest?hash=2909b0595cc074a800c82bd83333e67a1b0495ef');
require('../../pages/home/payment?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/home/location?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/home/store?hash=5ad1440235f639701509838fed89207e10dac12f');
require('../../pages/home/morestore?hash=103465ac8c4368f3ba0a9c3b1d50280b327ef8f1');
require('../../pages/home/search?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/order/home?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/order/details?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/order/evaluate?hash=f3a5c908d36145d3e6c49ffc5540a37284adf852');
require('../../pages/order/refund?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/user/user?hash=5002821eb3970d38df61d98c0571178fedd9455e');
require('../../pages/user/address/address?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/user/address/addAddress?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/user/address/fixAddress?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/user/address?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/user/addAddress?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/user/fixAddress?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/user/map?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/user/city?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/user/favor?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/user/help?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
require('../../pages/user/accModification?hash=95d79ca6da7a76257b48d7e1ba67915091a71a00');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}