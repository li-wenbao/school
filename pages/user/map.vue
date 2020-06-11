<template>
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
    <!-- 地图开始 -->
    <view>
      <map
        id="map"
        style="width: 100%; height: 300px;"
        :latitude="latitude"
        :longitude="longitude"
        :markers="markers"
        :include-points="includePoints"
        :scale="16"
      ></map>
    </view>
    <!-- 地图结束 -->
    <!-- 附近地点开始 -->
    <scroll-view
      scroll-y
      :style="[{height:'calc(100vh - 50px - 300px)'}]"
      :scroll-with-animation="true"
      :enable-back-to-top="true"
    >
      <view class="bg-white padding-left">
        <view
          @click="_choosePoisLocation(index)"
          v-for="(item,index) in pois"
          :key="index"
          class="solids-bottom padding-tb"
        >
          <view>
            <text class="margin-right-sm text-black">{{item.name}}</text>
          </view>
          <view>
            <text class="text-cut text-grey text-sm">{{baseAddress+ item.address}}</text>
          </view>
        </view>
      </view>
    </scroll-view>
    <!-- 附近地点结束 -->
  </view>
</template>

<script>
export default {
  /*
  初始化数据
  */
  data() {
    return {
      city: "昆明市",
      curLocation: null,
      baseAddress: null,
      location: ",",
      markers: null,
      pois: null
    };
  },
  computed: {
    // 计算属性的 getter
    longitude: function() {
      return this.location.split(",")[0];
    },
    latitude: function() {
      return this.location.split(",")[1];
    }
  },
  onLoad: function() {
    this._getCurLocation();
  },
  onShow: function() {
    console.log("pages/user/map");
  },
  methods: {
    _getCurLocation: function() {
      this.locationModel.getLocation(data => {
        console.log(data);
        if (!data.locationError) {
          this.curLocation = data.baseInfo;
          this.location = data.baseInfo.location;
          this.city = data.baseInfo.city;
          this.pois = data.pois;
          let addressComponent = data.baseInfo.addressComponent;
          this.baseAddress =
            addressComponent.province +
            addressComponent.city +
            addressComponent.district;
          let location = data.baseInfo.location.split(",");
          this.markers = [
            {
              id: 0,
              width: 30,
              height: 30,
              longitude: location[0],
              latitude: location[1],
              iconPath: "../../static/xm.png",
              customCallout: {
                type: 1,
                time: "1"
              },
              fixedPoint: {
                originX: 400,
                originY: 400
              },
              iconAppendStr:
                "黄龙时代广场黄龙时代广场黄龙时代广场黄龙时代广场test"
            }
          ];
        } else {
          let curLocation = {
            city: "昆明市",
            baseAddress: "云南省昆明市盘龙区",
            location: "102.75205,25.11624"
          };
          this.curLocation = curLocation;
        }
      });
    },
    _choosePoisLocation(index) {
      let pois = this.pois[index];
      console.log(pois);
    },
    aaa(e){
     console.log(e)
    }
  }
};
</script>

<style>
</style>
