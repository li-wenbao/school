<template>
  <view class="page">
    <cu-custom :bgColor="'bg-blue'" :isBack="true">
      <block slot="backText">未来校园</block>
      <block slot="content"></block>
      <block slot="right">
        <view class="action"></view>
      </block>
    </cu-custom>
    <view class="cu-list menu sm-border margin-top-sm">
      <view class="cu-item arrow">
        <view class="content">
          <text>意见与反馈</text>
        </view>
      </view>
      <view class="cu-item arrow">
        <view class="content">
          <text>常见问题</text>
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
    return {};
  },
  computed: {
    // 计算属性的 getter
  },
  onLoad: function() {},
  onShow: function() {
    console.log("pages/user/help");
  },
  methods: {}
};
</script>

<style>
</style>
