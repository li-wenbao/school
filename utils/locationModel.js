import { Config } from "./config"
class Location {
  constructor() {
    this.key = Config.key;
    this.mapUrl = Config.mapUrl;
  }
  getLocation(callback) {
    var _this = this;
	
	//#ifdef MP-ALIPAY
	my.getLocation({
	  type: "gcj02",//gcj02//wgs84
	  success: function (res) {
	    //console.log(res)
	    console.log("支付宝当前位置的经度：" + res.longitude);
	    console.log("支付宝当前位置的纬度：" + res.latitude);
	    let params = {
	      longitude: res.longitude,
	      latitude: res.latitude,
	      sCallback: function (res) {
	        console.log("支付宝地图返回值！！！",res)
	        callback && callback(res);
	      },
	      eCallback: function (res) {
	        callback && callback(res);
	      }
	    }
	    _this.getAddress(params);
	  },
	  fail: function () {
	    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.userLocation" 这个 scope
	    uni.getSetting({
	      success(res) {
	        //console.log(res.authSetting);
	        //解决支付宝小程序兼容性问题
	        let userLocationScope = res.authSetting["scope.userLocation"] !== undefined ? res.authSetting["scope.userLocation"] : res.authSetting["location"]
	        console.log(" 解决支付宝小程序兼容 userLocationScope",userLocationScope)
	        if (!userLocationScope) {
	          uni.showModal({
	            title: "是否授权当前位置",
	            content: "需要获取您的地理位置，请确认授权，否则将无法使用",
	            success: function (tip) {
	              if (tip.confirm) {
	                //#ifdef MP-QQ
	                console.log("开发者工具中qq小程序调用qq.openSetting方法用户返回时默认使用reLaunch方法会报错")
	                //#endif
	                uni.openSetting({
	                  success: function (res) {
	                    //解决支付宝小程序兼容性问题
	                    let userLocationScope = res.authSetting["scope.userLocation"] !== undefined ? res.authSetting["scope.userLocation"] : res.authSetting["location"]
	                    if (userLocationScope) {
	                      uni.getLocation({
	                        type: "gcj02",//gcj02//wgs84
	                        success: function (res) {
	                          console.log(res)
	                          console.log("当前位置的经度：" + res.longitude);
	                          console.log("当前位置的纬度：" + res.latitude);
	                          let params = {
	                            longitude: res.longitude,
	                            latitude: res.latitude,
	                            sCallback: function (res) {
	                              //console.log(res)
	                              callback && callback(res);
	                            },
	                            eCallback: function (res) {
	                              callback && callback(res);
	                            }
	                          }
	                          _this.getAddress(params);
	                        }
	                      });
	                    } else {
	                      uni.showToast({
	                        title: "授权失败",
	                        icon: "fail",
	                        duration: 2000
	                      });
	                      let params = {
	                        eCallback: function (res) {
	                          callback && callback(res);
	                        }
	                      }
	                      let data = {
	                        locationError: true
	                      }
	                      params.eCallback && params.eCallback(data)
	                    }
	                  }
	                });
	              } else {
	                let params = {
	                  eCallback: function (res) {
	                    callback && callback(res);
	                  }
	                }
	                let data = {
	                  locationError: true
	                }
	                params.eCallback && params.eCallback(data)
	              }
	            }
	          });
	        }
	      }
	    });
	  }
	});
	//#endif

    //#ifdef MP
    uni.getLocation({
      type: "gcj02",//gcj02//wgs84
      success: function (res) {
        //console.log(res)
        console.log("当前位置的经度：" + res.longitude);
        console.log("当前位置的纬度：" + res.latitude);
        let params = {
          longitude: res.longitude,
          latitude: res.latitude,
          sCallback: function (res) {
            //console.log(res)
            callback && callback(res);
          },
          eCallback: function (res) {
            callback && callback(res);
          }
        }
        _this.getAddress(params);
      },
      fail: function () {
        // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.userLocation" 这个 scope
        uni.getSetting({
          success(res) {
            //console.log(res.authSetting);
            //解决支付宝小程序兼容性问题
            let userLocationScope = res.authSetting["scope.userLocation"] !== undefined ? res.authSetting["scope.userLocation"] : res.authSetting["location"]
            console.log(" 解决支付宝小程序兼容 userLocationScope",userLocationScope)
            if (!userLocationScope) {
              uni.showModal({
                title: "是否授权当前位置",
                content: "需要获取您的地理位置，请确认授权，否则将无法使用",
                success: function (tip) {
                  if (tip.confirm) {
                    //#ifdef MP-QQ
                    console.log("开发者工具中qq小程序调用qq.openSetting方法用户返回时默认使用reLaunch方法会报错")
                    //#endif
                    uni.openSetting({
                      success: function (res) {
                        //解决支付宝小程序兼容性问题
                        let userLocationScope = res.authSetting["scope.userLocation"] !== undefined ? res.authSetting["scope.userLocation"] : res.authSetting["location"]
                        if (userLocationScope) {
                          uni.getLocation({
                            type: "gcj02",//gcj02//wgs84
                            success: function (res) {
                              console.log(res)
                              console.log("当前位置的经度：" + res.longitude);
                              console.log("当前位置的纬度：" + res.latitude);
                              let params = {
                                longitude: res.longitude,
                                latitude: res.latitude,
                                sCallback: function (res) {
                                  //console.log(res)
                                  callback && callback(res);
                                },
                                eCallback: function (res) {
                                  callback && callback(res);
                                }
                              }
                              _this.getAddress(params);
                            }
                          });
                        } else {
                          uni.showToast({
                            title: "授权失败",
                            icon: "fail",
                            duration: 2000
                          });
                          let params = {
                            eCallback: function (res) {
                              callback && callback(res);
                            }
                          }
                          let data = {
                            locationError: true
                          }
                          params.eCallback && params.eCallback(data)
                        }
                      }
                    });
                  } else {
                    let params = {
                      eCallback: function (res) {
                        callback && callback(res);
                      }
                    }
                    let data = {
                      locationError: true
                    }
                    params.eCallback && params.eCallback(data)
                  }
                }
              });
            }
          }
        });
      }
    });
    //#endif
	
    //#ifdef H5
    uni.getLocation({
      type: "gcj02",//gcj02//wgs84
      success: function (res) {
        console.log("当前位置的经度：" + res.longitude);
        console.log("当前位置的纬度：" + res.latitude);
        let params = {
          longitude: res.longitude,
          latitude: res.latitude,
          sCallback: function (res) {
            callback && callback(res);
          },
          eCallback: function (res) {
            callback && callback(res);
          }
        }
        _this.getAddress(params);
      }, fail: function () {
        uni.showModal({
          title: "是否授权当前位置",
          content: "需要获取您的地理位置，请确认授权和打开GPS，否则将无法使用",
          showCancel: false,
          success: function (res) {
            console.log("success:",res)
          }
        })
        let params = {
          eCallback: function (res) {
            callback && callback(res);
          }
        }
        let data = {
          locationError: true
        }
        params.eCallback && params.eCallback(data)
      }
    })
    //#endif
  }
  getAddress(params) {
    var _this = this
    uni
      .request({
        url: this.mapUrl,
        method: "GET",
        data: {
          key: this.key,
          extensions: "all",
          location: params.longitude + "," + params.latitude
        }
      })
      .then(data => {
        //console.log(data);
        var [error, res] = data;
        console.log(res.data)
        if (error == null) {
          let formattedAddress = res.data.regeocode.formatted_address;
          let addressComponent = res.data.regeocode.addressComponent;
          let city = addressComponent.city;
          let aois = res.data.regeocode.aois;
          let pois = res.data.regeocode.pois;
          let location,address;
          if (aois.length > 0) {
            address = aois[0].name;
            location = aois[0].location;
          } else {
            //解决定位不精确问题
            location = params.longitude + "," + params.latitude
            let baseAddress = addressComponent.province + addressComponent.city;
            address = formattedAddress.replace(baseAddress, "");
          }
          let data = {
            baseInfo:{
              city:city,
              aois: aois,
              address: address,
              location: location,
              formattedAddress: formattedAddress,
              addressComponent: addressComponent,
            },
            pois:pois,
            locationError: false
          }
          params.sCallback && params.sCallback(data)
        } else {
          let data = {
            locationError: true
          }
          params.eCallback && params.eCallback(data)
        }
      });
  }
}
export {
  Location
}