<template>
  <view class="page">
    <cu-custom :bgColor="'bg-blue'" :isBack="true">
      <block slot="backText">发表评价</block>
    </cu-custom>
    <view>
      <form @submit="formSubmit">
        <view class="cu-form-group">
          <view class="my-tag padding-tb">
            <block v-for="(item,index) in tagList" :key="index">
              <view
                v-if="myTagList.indexOf(item) != -1"
                class="cu-tag radius bg-blue"
                @click="_removeTag(item)"
              >{{item}}</view>
              <view v-else class="cu-tag radius line-grey" @click="_addTag(item)">{{item}}</view>
            </block>
          </view>
        </view>
        <view class="cu-form-group">
          <textarea maxlength="40" @input="textareaInput" placeholder="用餐后感觉如何？快来分享一下用餐感受吧"></textarea>
        </view>
        <view class="bg-white padding margin-top flex justify-between">
          <view class="text-black">图片上传</view>
          <view class>{{imgList.length}}/4</view>
        </view>
        <view class="cu-form-group">
          <view class="grid col-4 grid-square flex-sub">
            <view
              class="bg-img"
              v-for="(item,index) in imgList"
              :key="index"
              @tap="ViewImage"
              :data-url="imgList[index]"
            >
              <image :src="imgList[index]" mode="aspectFill" />
              <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
                <text class="cuIcon-close"></text>
              </view>
            </view>
            <view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
              <text class="cuIcon-cameraadd"></text>
            </view>
          </view>
        </view>
        <view class="bg-white padding margin-top">
          <view class="text-black padding-bottom-sm">店铺评价</view>
          <view class="flex padding-tb-sm">
            <view class="margin-right">美味评分</view>
            <cu-rate
              :disabled="false"
              :isFill="false"
              :value="0"
              :size="'text-xl'"
              :margin="'margin-right-sm'"
              @change="getChangeA"
            ></cu-rate>
          </view>
          <view class="flex padding-tb-sm">
            <view class="margin-right">包装服务</view>
            <cu-rate
              :disabled="false"
              :isFill="false"
              :value="0"
              :size="'text-xl'"
              :margin="'margin-right-sm'"
              @change="getChangeB"
            ></cu-rate>
          </view>
          <view class="flex padding-tb-sm">
            <view class="margin-right">配送服务</view>
            <cu-rate
              :disabled="false"
              :isFill="false"
              :value="0"
              :size="'text-xl'"
              :margin="'margin-right-sm'"
              @change="getChangeC"
            ></cu-rate>
          </view>
        </view>
        <view class="padding flex flex-direction margin-tb-sm">
          <button class="cu-btn bg-blue lg round" role="button" aria-disable="false" form-type="submit">发布</button>
        </view>
      </form>
    </view>
  </view>
</template>

<script>
import cuRate from "@/colorui/components/cu-rate.vue";
export default {
  components: { cuRate },
  /*
  初始化数据
  */
  data() {
    return {
      tagList: ["味道不错", "肉多", "辣椒很辣", "分量足"],
      myTagList: [],
      imgList: []
    };
  },
  computed: {
    // 计算属性的 getter
  },
  onLoad: function(option) {
    console.log(option);
  },
  onShow: function() {
    console.log("pages/order/evaluate");
  },
  methods: {
    _removeTag(value) {
      let myTagList = this.myTagList;
      let index = myTagList.indexOf(value);
      if (index != -1) {
        myTagList.splice(index, 1);
      }
    },
    _addTag(value) {
      this.myTagList.push(value);
    },
    ChooseImage() {
      uni.chooseImage({
        count: 4, //默认9
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"], //从相册选择
        success: res => {
          if (this.imgList.length != 0) {
            this.imgList = this.imgList.concat(res.tempFilePaths);
          } else {
            this.imgList = res.tempFilePaths;
          }
        }
      });
    },
    ViewImage(e) {
      uni.previewImage({
        urls: this.imgList,
        current: e.currentTarget.dataset.url
      });
    },
    DelImg(e) {
      uni.showModal({
        title: "提示",
        content: "确定要删除这张照片吗？",
        cancelText: "取消",
        confirmText: "确定",
        success: res => {
          if (res.confirm) {
            this.imgList.splice(e.currentTarget.dataset.index, 1);
          }
        }
      });
    },
    getChangeA(data) {
      console.log(data);
    },
    getChangeB(data) {
      console.log(data);
    },
    getChangeC(data) {
      console.log(data);
    }
  }
};
</script>

<style>
.my-tag {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: space-between;
}
</style>
