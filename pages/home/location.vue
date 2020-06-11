<template>
  <view class="page">
    <cu-custom :bgColor="'bg-blue'" :isBack="true">
      <block slot="backText"></block>
      <block slot="content">
        <!-- #ifndef MP-ALIPAY -->
        选择收货地址
        <!-- #endif -->
      </block>
      <block slot="right">
        <view class="action"></view>
      </block>
    </cu-custom>
    <view>
      <!-- 定位开始 -->
      <view class="bg-white cu-bar search">
        <!-- 城市定位 -->
        <navigator url="/pages/user/city" hover-class="none">
          <text class="cuIcon-location margin-left-sm"></text>
          <text class="text-black padding-lr-xs">{{city}}</text>
          <text class="cuIcon-unfold"></text>
        </navigator>
        <!-- 搜索框 -->
        <view class="search-form">
          <text class="cuIcon-search text-grey text-xxxl"></text>
          <input type="text" placeholder="请输入收货地址" confirm-type="search" />
        </view>
      </view>
      <!-- 具体定位 -->
      <view class="bg-white padding-lr cu-bar solid-top">
        <view v-if="!isLocation" class="cu-load" :class="locationError?'erro over':'loading'"></view>
        <view v-else @click="_chooseCurLocation" class="text-black">{{address}}</view>
        <view @click="_getCurLocation" class="text-blue">
          <text class="cuIcon-radiobox"></text>
          <text class="margin-left-xs">重新定位</text>
        </view>
      </view>
      <!-- 定位结束 -->
      <!-- 我的收货地址开始 -->
      <view class="bg-white padding margin-top-sm">
        <view class="padding-bottom-sm flex justify-between align-center">
          <view>
            <text class="cuIcon-home text-gray margin-right-xs"></text>
            <text class="text-gray">我的收货地址</text>
          </view>
         <navigator
            url="/pages/user/addAddress"
            hover-class="none"
          >
            <text class="text-blue">管理</text>
          </navigator>
        </view>
        <view class="padding-left margin-left-xs">
          <view v-for="(item,index) in myLocation" :key="index" class="solid-bottom padding-tb-sm">
            <view>
              <text class="margin-right-sm text-black">{{item.address}}</text>
              <text v-if="item.tag !==''" class="cu-tag bg-olive light sm">{{item.tag}}</text>
            </view>
            <view class="text-sm margin-top-xs">
              <text class="margin-right">{{item.name}}</text>
              <text>{{item.tel}}</text>
            </view>
          </view>
        </view>
      </view>
      <!-- 我的收货地址结束 -->
      <!-- 附近地址开始 -->
      <view class="bg-white padding margin-top-sm">
        <view class="padding-bottom-sm">
          <text class="cuIcon-location text-gray margin-right-xs"></text>
          <text class="text-gray">附近地址</text>
        </view>
        <view class="padding-left margin-left-xs">
          <view
            @click="_choosePoisLocation"
            v-for="(item,index) in pois"
            :key="index"
            :data-id="index"
            class="solid-bottom padding-tb"
          >
            <text class="margin-right-sm text-black">{{item.name}}</text>
          </view>
        </view>
      </view>
      <!-- 附近地址结束 -->
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      city: "昆明市",
      address: "null",
      isLocation: false,
      locationError: false,
      curLocation: null,
      myLocation: [
        {
          address: "云南农业大学13栋",
          name: "某同学",
          tel: "18211112222",
          tag: "学校"
        },
        {
          address: "云南农业大学综合楼 507",
          name: "某同学",
          tel: "18211112222",
          tag: ""
        },
        {
          address: "昆明理工大学计算机与科学技术学院",
          name: "某同学",
          tel: "18211112222",
          tag: "学校"
        }
      ],
      pois: null
    };
  },
  computed: {},
  onLoad: function() {
    uni.showLoading({
      title: "加载中...",
      mask: true
    });
    this._getCurLocation();
  },
  onReady() {
    uni.hideLoading();
  },
  onShow: function() {
    console.log("pages/user/location");
  },
  methods: {
    _getCurLocation: function() {
      this.locationModel.getLocation(data => {
        if (!data.locationError) {
          this.city = data.baseInfo.city;
          this.address = data.baseInfo.address;
          this.curLocation = data.baseInfo;
          this.pois = data.pois.slice(0, 10);
          this.locationError = false;
          this.isLocation = true;
        } else {
          this.locationError = true;
          let curLocation = {
            address: "null",
            city: "昆明市",
            location: ""
          };
          this.curLocation = curLocation;
        }
      });
    },
    _chooseCurLocation() {
      this.gloablMyLocation.address = this.curLocation.address;
      this.gloablMyLocation.location = this.curLocation.location;
      uni.switchTab({
        url: "/pages/home/home"
      });
    },
    _choosePoisLocation(e) {
      let pois = this.pois[e.currentTarget.dataset.id];
      this.gloablMyLocation.address = pois.name;
      this.gloablMyLocation.location = pois.location;
      uni.switchTab({
        url: "/pages/home/home"
      });
    }
  }
};
</script>

<style>
.cu-load::before {
  font-family: "cuIcon";
  display: inline-block;
  margin-right: 6upx;
  font-size: 28upx;
}
.cu-load.loading::after {
  content: "定位中...";
  font-size: 28upx;
}
.cu-load.erro::before {
  font-size: 28upx;
  content: "\e658";
}
.cu-load.over::after {
  content: "定位失败，重新定位";
  font-size: 28upx;
}
</style>