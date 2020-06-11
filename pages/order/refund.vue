<template>
  <view class="page">
    <cu-custom :bgColor="'bg-blue'" :isBack="true">
      <block slot="backText">退款进度</block>
    </cu-custom>
    <view>
      <view class="margin-sm padding-lr padding-bottom radius bg-white">
        <view class="padding-tb solid-bottom text-black text-bold text-lg">退款流程</view>
        <view class="padding-tb-sm flex justify-between align-center">
          <view class="text-price text-blue">13.0 已到账</view>
          <view class="text-grey">11-21 11:34:38</view>
        </view>
        <view class="padding-tb-sm flex justify-between align-center">
          <view>自动审核通过</view>
          <view class="text-grey">11-21 11:22:38</view>
        </view>
        <view class="padding-tb-sm flex justify-between align-center">
          <view>申请退款(原因：点错了)</view>
          <view class="text-grey">11-21 11:20:38</view>
        </view>
      </view>
      <view class="margin-sm padding-lr padding-bottom radius bg-white">
        <view class="padding-tb solid-bottom text-black text-bold text-lg">退款信息</view>
        <view class="padding-tb-sm solid-bottom">
          <view
            class="flex justify-between align-center padding-tb-xs"
            v-for="(item,index) in orderList.list"
            :key="index"
          >
            <view class="flex align-center" style="width:400upx">
              <view style="width:80upx;height:80upx;overflow: hidden;">
                <image
                  style="width:80upx;height:80upx;border-radius:4upx; "
                  mode="scaleToFill"
                  lazy-load="true"
                  :src="item.imgUrl"
                />
              </view>
              <view class="margin-left-sm">{{item.name}}</view>
            </view>
            <view class="flex justify-between" style="width:250upx">
              <view>x{{item.count}}</view>
              <view
                v-if="item.isActive"
                class="text-price text-grey text-strikethrough"
              >{{item.price}}</view>
              <view class="text-price text-black">{{item.bargain}}</view>
            </view>
          </view>
        </view>
        <view class="padding-tb-sm flex justify-between">
          <view>包装费</view>
          <view class="text-price">{{orderList.packPrice}}</view>
        </view>
        <view class="padding-tb-sm flex justify-between solid-bottom">
          <view>配送费</view>
          <view class="text-price">{{orderList.distribution}}</view>
        </view>
        <view class="padding-tb-sm flex justify-between solid-bottom">
          <view></view>
          <view>
            实付：
            <text class="text-price text-blue">{{orderList.sum}}</text>
          </view>
        </view>
        <view class="padding-tb-sm flex justify-between">
          <view>退款金额</view>
          <view class="text-price">{{orderList.refund}}</view>
        </view>
        <view class="padding-tb-sm flex justify-between">
          <view>退款原因</view>
          <view>{{orderList.reason}}</view>
        </view>
        <view class="padding-tb-sm flex justify-between">
          <view>退款渠道</view>
          <view>{{orderList.type}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  /*
  初始化数据
  */
  data() {
    return {
      orderList: {
        orderId: 2019211134238,
        packPrice: 2.00,
        distribution:3.00,
        sum: 22.00,
        refund:22.00,
        type: "支付宝",
        reason:"极速退款",
        list: [
          {
            name: "薯条",
            price: 10,
            bargain: 5,
            isActive: false,
            count: 2,
            imgUrl: "/static/aaa.jpg"
          },
          {
            name: "豚骨汤",
            price: 12,
            bargain: 5,
            isActive: false,
            count: 1,
            imgUrl: "/static/aaa.jpg"
          },
          {
            name: "鸡腿",
            price: 10,
            bargain: 5,
            isActive: true,
            count: 1,
            imgUrl: "/static/aaa.jpg"
          }
        ],
      }
    };
  },
  computed: {
    // 计算属性的 getter
  },
  onLoad: function(option) {
    console.log(option);
  },
  onShow: function() {
    console.log("pages/order/refund");
  },
  methods: {}
};
</script>

<style>
</style>
