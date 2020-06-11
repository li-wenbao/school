<template>
  <view>
    <cu-custom :bgColor="'bg-appblue'" :isBack="true">
      <block slot="backText">搜索</block>
      <block slot="content"></block>
    </cu-custom>
    <view>
      <!-- 搜索栏开始 -->
      <form @submit="formSubmit">
        <view class="cu-bar search bg-white" style="height:50px;z-index: 9999;">
          <view class="search-form radius">
            <text class="cuIcon-search"></text>
            <input
              type="text"
              name="word"
              placeholder="搜索商家、商品名称"
              confirm-type="search"
              @confirm="bindConfirm"
              @input="onKeyInput"
              :value="keyword"
            />
          </view>
          <view class="action" style="height:30px;">
            <button class="cu-btn line-blue" form-type="submit">搜索</button>
          </view>
        </view>
      </form>
      <!-- 搜索栏结束 -->
      <view v-if="isLoad">
        <!-- 导航栏开始 -->
        <view
          class="flex justify-between bg-white padding-lr padding-tb-sm solid-top solids-bottom"
          style="height:39px;z-index: 9999;"
        >
          <view
            class="text-right"
            style="width:168rpx;margin-right:42rpx"
            @tap="showModal"
            data-target="sort"
          >
            {{sortName}}
            <text :class="modalName=='sort'?'cuIcon-fold':'cuIcon-unfold'"></text>
          </view>
          <view
            :class="sortCur == 7?'text-black':''"
            style="width:160rpx"
            @click="sortSelect"
            :data-id="7"
          >销量最高</view>
          <view
            :class="sortCur == 8?'text-black':''"
            style="width:160rpx"
            @click="sortSelect"
            :data-id="8"
          >速度最快</view>
          <view
            class="solid-left"
            style="width:160rpx;padding-left:50rpx;"
            @tap="showModal"
            data-target="screen"
          >筛选</view>
        </view>
        <!-- 导航栏结束 -->
        <!-- 排序拟态窗口开始 -->
        <view
          class="cu-modal drawer-modal justify-start"
          :class="modalName=='sort'?'show':''"
          @tap="hideModal"
        >
          <view class="cu-dialog" @tap.stop :style="[{top:CustomBar + 89+'px'}]">
            <view class="cu-list menu">
              <view
                class="cu-item"
                v-for="(item,index) in sortList"
                :key="index"
                @click="sortSelect"
                :data-id="index"
              >
                <view class="content">
                  <view :class="sortCur == index?'text-blue':''">{{item}}</view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <!-- 排序拟态窗口结束 -->
        <!-- 筛选拟态窗口开始 -->
        <view
          class="cu-modal drawer-modal justify-start"
          :class="modalName=='screen'?'show':''"
          @tap="hideModal"
        >
          <view
            class="cu-dialog"
            @tap.stop
            :style="[{top:CustomBar + 89+'px'}]"
            style="height:600upx;"
          >
            <view class="padding-lr-sm bg-white" style="height:100%;">
              <scroll-view style="height:600upx" scroll-y="true">
                <view class="my-tag">
                  <view
                    class="bg-gray radius padding-tb-xs margin-bottom-sm"
                    style="width:220upx;"
                    v-for="(item,index) in storeTagList"
                    :key="index"
                  >{{item}}</view>
                </view>
                <view class="padding-tb-sm text-left text-black">人均价</view>
                <view class="my-tag">
                  <view
                    class="bg-gray radius padding-tb-xs margin-bottom-sm"
                    style="width:220upx;"
                    v-for="(item,index) in averageConsume"
                    :key="index"
                  >{{item}}</view>
                </view>
                <view class="padding-tb-sm text-left text-black">优惠活动(可多选)</view>
                <view class="my-tag">
                  <view
                    class="bg-gray radius padding-tb-xs margin-bottom-sm"
                    style="width:220upx;"
                    v-for="(item,index) in activeTagList"
                    :key="index"
                  >{{item}}</view>
                </view>
                <view style="height:49px"></view>
              </scroll-view>
            </view>
            <view class="flex solid-top" style="position:fixed;bottom:0upx;">
              <view class="bg-white padding-tb" @click="screenClear" style="width:375upx">清空</view>
              <view class="bg-blue padding-tb" @click="screenComplete" style="width:375upx">完成</view>
            </view>
          </view>
        </view>
        <!-- 筛选拟态窗口结束 -->
        <scroll-view :style="scrollHeight" scroll-y="true">
          <!-- 商家搜索结果列表开始 -->
          <view
            class="bg-white flex justify-between padding-lr padding-tb-sm"
            v-for="(item,index) in storeList"
            :key="index"
            :data-id="item.id"
            :data-goods="''"
            @click="goToStore"
          >
            <view class="margin-right-sm" style="width:160upx;height:120upx;overflow: hidden;">
              <image
                style="width:160upx;height:120upx;border-radius:4upx; "
                mode="scaleToFill"
                lazy-load="true"
                :src="item.imgUrl"
              />
              <view
                v-if="item.isRest"
                class="bg-grey text-center text-sm"
                style="position:relative;top:-40upx;width:160upx;"
              >休息中</view>
            </view>
            <view style="width:530upx">
              <view
                class="padding-bottom-xs text-bold text-xl"
                :class="item.isRest?'text-grey':'text-black'"
              >{{item.name}}</view>
              <view
                class="flex justify-between padding-bottom-xs text-sm"
                :class="item.isRest?'text-grey':''"
              >
                <view>
                  <text class="cuIcon-favorfill text-orange"></text>
                  <text>{{item.grade}}</text>
                  <text class="margin-left-sm">月销{{item.sales}}</text>
                </view>
                <view>
                  <text>{{item.time}}分钟</text>
                  <text class="margin-left-sm">{{item. distance}}km</text>
                </view>
              </view>
              <view
                class="text-sm padding-bottom-sm solid-bottom"
                :class="item.isRest?'text-grey':''"
              >
                <text>起送</text>
                <text class="text-price">{{item.basePrice}}</text>
                <text class="margin-left-sm">配送</text>
                <text class="text-price">{{item.distribution}}</text>
                <text class="margin-left-sm">人均</text>
                <text class="text-price">{{item.averageConsume}}</text>
              </view>
            </view>
          </view>
          <!-- 商家搜索结果列表结束 -->
          <!-- 商品搜索结果列表开始 -->
          <view
            class="bg-white flex justify-between padding-lr padding-tb-sm margin-bottom-sm"
            v-for="(item,index) in goodsList"
            :key="index"
          >
            <view
              class="margin-right-sm"
              style="width:80upx;height:80upx;overflow: hidden;"
              :data-id="item.id"
              :data-goods="''"
              @click="goToStore"
            >
              <image
                style="width:80upx;height:80upx;border-radius:4upx; "
                mode="scaleToFill"
                lazy-load="true"
                :src="item.imgUrl"
              />
            </view>
            <view style="width:600upx">
              <view
                class="flex justify-between align-center"
                :data-id="item.id"
                :data-goods="''"
                @click="goToStore"
              >
                <view
                  class="text-black text-bold text-xl text-cut"
                  style="width:420upx"
                >{{item.name}}</view>
                <view class="text-sm" style="width:180upx">
                  <text>{{item.time}}分钟</text>
                  <text class="margin-left-sm">{{item. distance}}km</text>
                </view>
              </view>
              <view class="text-sm" :data-id="item.id" :data-goods="''" @click="goToStore">
                <text class="cuIcon-favorfill text-orange"></text>
                <text>{{item.grade}}</text>
                <text class="margin-left-sm">月销{{item.sales}}</text>
                <text>起送</text>
                <text class="text-price">{{item.basePrice}}</text>
                <text class="margin-left-sm">配送</text>
                <text class="text-price">{{item.distribution}}</text>
                <text class="margin-left-sm">人均</text>
                <text class="text-price">{{item.averageConsume}}</text>
              </view>
              <scroll-view style="width:600upx" scroll-x="true">
                <view class="flex">
                  <view
                    class="margin-top margin-right-sm"
                    v-for="(cItem,cIndex) in item.list"
                    :key="cIndex"
                    :data-id="item.id"
                    :data-goods="cItem.id"
                    @click="goToStore"
                  >
                    <view style="width:220upx;height:220upx;overflow: hidden;">
                      <image
                        style="width:220upx;height:220upx;border-radius:8upx; "
                        mode="scaleToFill"
                        lazy-load="true"
                        :src="cItem.imgUrl"
                      />
                    </view>
                    <view class="padding-tb-xs text-cut" style="width:220upx;">{{cItem.name}}</view>
                    <view>
                      <text class="text-price text-xl text-red margin-right-xs">{{cItem.price}}</text>
                      <text
                        v-if="cItem.isDiscount"
                        class="text-price text-sm"
                      >{{cItem.originalPrice}}</text>
                    </view>
                  </view>
                </view>
              </scroll-view>
            </view>
          </view>
          <!-- 商品搜索结果列表结束 -->
        </scroll-view>
      </view>
      <view v-else>
        <!-- 热门搜索开始 -->
        <view class="bg-white padding-lr">
          <view class="padding-tb-sm flex justify-between align-center solid-bottom">
            <view class>热门搜索</view>
            <view>
              <!-- <text class="cuIcon-delete text-grey"></text> -->
            </view>
          </view>
          <view class="my-tag">
            <view
              class="cu-tag line-gray radius xl margin-bottom-sm"
              v-for="(item,index) in hotList"
              :key="index"
              :data-tag="item"
              @click="tagSearch"
            >{{item}}</view>
          </view>
        </view>
        <!-- 热门搜索结束 -->
        <!-- 历史搜索开始 -->
        <view v-if="historyList.length > 0" class="bg-white padding-lr margin-top">
          <view class="padding-tb-sm flex justify-between align-center solid-bottom">
            <view class>历史搜索</view>
            <view @click="delHistory">
              <text class="cuIcon-delete text-grey"></text>
            </view>
          </view>
          <view class="my-tag">
            <view
              class="cu-tag line-gray radius xl margin-bottom-sm"
              v-for="(item,index) in historyList"
              :key="index"
              :data-tag="item"
              @click="tagSearch"
            >{{item}}</view>
          </view>
        </view>
        <!-- 历史搜索结束 -->
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
      CustomBar: this.CustomBar,
      keyword: "",
      historyList: [],
      hotList: ["炸洋芋", "黄焖鸡米饭", "羊肉米线", "炸鸡", "北京烤鸭"],
      storeList: [],
      goodsList: [],
      isLoad: false,
      modalName: null,
      sortCur: 0,
      sortList: [
        "综合排序",
        "距离最近",
        "评分最高",
        "起送价最低",
        "配送费最低",
        "人均高到低",
        "人均低到高"
      ],
      storeTagList: [
        "校园专送",
        "到店自取",
        "放心吃",
        "点评分高",
        "品牌商家",
        "免配送费",
        "新商家"
      ],
      averageConsume: ["20元一下", "20-40元", "40元以上"],
      activeTagList: [
        "满减优惠",
        "进店领券",
        "折扣商品",
        "新人立减",
        "满赠活动",
        "减配送费"
      ]
    };
  },
  computed: {
    sortName() {
      let sortCur = this.sortCur;
      let sortList = this.sortList;
      return sortCur > 6 ? sortList[0] : sortList[sortCur];
    },
    scrollHeight() {
      let CustomBar = this.CustomBar;
      return `height:calc(100vh - ${CustomBar + 50 + 39}px);`;
    },
    screenHeight() {
      let CustomBar = this.CustomBar;
      return `height:calc(70vh - ${CustomBar + 50 + 39}px);`;
    }
  },
  watch: {
    keyword: function(newKeyword, oldKeyword) {
      if (newKeyword == "" && oldKeyword != "") {
        this.isLoad = false;
        this.sortCur = 0;
      }
    }
  },
  onLoad: function() {
    this.getHistory();
  },
  onShow: function() {
    console.log("pages/home/home");
  },
  methods: {
    getHistory: function() {
      uni.getStorage({
        key: "historySearch",
        success: res => {
          this.historyList = res.data ? res.data : [];
        }
      });
    },
    delHistory: function() {
      uni.removeStorage({
        key: "historySearch",
        success: res => {
          this.historyList = [];
        }
      });
    },
    onKeyInput: function(event) {
      this.keyword = event.target.value;
    },
    tagSearch: function(e) {
      this.keyword = e.target.dataset.tag;
      this.formSubmit();
    },
    bindConfirm: function(e) {
      this.formSubmit();
    },
    formSubmit: function() {
      let word = this.keyword;
      let historyList = this.historyList;
      //参数校验
      if (word == "") {
        return false;
      }
      if (historyList.length > 0) {
        let index = historyList.indexOf(word);
        if (index != -1) {
          historyList.splice(index, 1);
        }
      }
      let data = [word].concat(historyList);
      uni.setStorage({
        key: "historySearch",
        data: data,
        success: res => {
          this.historyList = data;
        }
      });
      setTimeout(res => {
        if (word == "炸洋芋") {
          this.storeList = [];
          this.goodsList = [
            {
              id: 61,
              name: "清真昭通牛肉王小肉串(月牙塘店)",
              imgUrl: "/static/ddd.jpg",
              grade: 4.9,
              sales: 258,
              time: 30,
              distance: 2.4,
              basePrice: 15,
              distribution: 3,
              averageConsume: 21,
              list: [
                {
                  id: 100,
                  name: "昭通炸洋芋",
                  imgUrl: "/static/zyy1.jpg",
                  price: 5.2,
                  originalPrice: 8,
                  isDiscount: true,
                  discount: 3.8
                },
                {
                  id: 230,
                  name: "炸洋芋拼炸石屏豆腐",
                  imgUrl: "/static/zyy2.jpg",
                  price: 8.7,
                  originalPrice: 10,
                  isDiscount: true,
                  discount: 3.8
                },
                {
                  id: 101,
                  name: "番茄拌炸洋芋",
                  imgUrl: "/static/zyy3.jpg",
                  price: 9.8,
                  originalPrice: 18,
                  isDiscount: true,
                  discount: 3.8
                },
                {
                  id: 105,
                  name: "番茄拌炸洋芋",
                  imgUrl: "/static/zyy3.jpg",
                  price: 10,
                  originalPrice: 18,
                  isDiscount: true,
                  discount: 3.8
                }
              ]
            },
            {
              id: 61,
              name: "四禾小吃坊 (花甲米线)",
              imgUrl: "/static/ldd.jpg",
              grade: 4.9,
              sales: 258,
              time: 30,
              distance: 2.4,
              basePrice: 15,
              distribution: 3,
              averageConsume: 21,
              list: [
                {
                  id: 100,
                  name: "黄金炸洋芋",
                  imgUrl: "/static/zyy5.jpg",
                  price: 9.7,
                  originalPrice: 18,
                  isDiscount: true,
                  discount: 3.8
                },
                {
                  id: 100,
                  name: "秘制炸洋芋",
                  imgUrl: "/static/zyy4.jpg",
                  price: 8.8,
                  originalPrice: 18,
                  isDiscount: true,
                  discount: 3.8
                },
                {
                  id: 100,
                  name: "蒜泥狠炸洋芋",
                  imgUrl: "/static/zyy3.jpg",
                  price: 8.7,
                  originalPrice: 18,
                  isDiscount: true,
                  discount: 3.8
                }
              ]
            },
            {
              id: 61,
              name: "德胜桥豆花米线 (红云店)",
              imgUrl: "/static/hg.jpg",
              grade: 4.9,
              sales: 258,
              time: 30,
              distance: 2.4,
              basePrice: 15,
              distribution: 3,
              averageConsume: 21,
              list: [
                {
                  id: 100,
                  name: "昭通炸洋芋",
                  imgUrl: "/static/zyy1.jpg",
                  price: 5.2,
                  originalPrice: 8,
                  isDiscount: true,
                  discount: 3.8
                },
                {
                  id: 100,
                  name: "炸洋芋拼炸石屏豆腐",
                  imgUrl: "/static/zyy2.jpg",
                  price: 8.6,
                  originalPrice: 10,
                  isDiscount: true,
                  discount: 3.8
                },
                {
                  id: 100,
                  name: "番茄拌炸洋芋",
                  imgUrl: "/static/zyy3.jpg",
                  price: 8.8,
                  originalPrice: 18,
                  isDiscount: true,
                  discount: 3.8
                },
                {
                  id: 100,
                  name: "番茄拌炸洋芋",
                  imgUrl: "/static/zyy3.jpg",
                  price: 9.9,
                  originalPrice: 18,
                  isDiscount: true,
                  discount: 3.8
                }
              ]
            }
          ];
        } else {
          this.goodsList = [];
          this.storeList = [
            {
              id: 61,
              name: "豚骨拉面(怡园风味)",
              imgUrl: "/static/ddd.jpg",
              grade: 4.9,
              sales: 258,
              time: 30,
              distance: 2.4,
              basePrice: 15,
              distribution: 3,
              averageConsume: 21,
              isRest: false
            },
            {
              id: 28,
              name: "大牌火锅冒菜十三年老店",
              imgUrl: "/static/hg.jpg",
              grade: 4.5,
              sales: 356,
              time: 30,
              distance: 1.6,
              basePrice: 20,
              distribution: 2,
              averageConsume: 25,
              isRest: false
            },
            {
              id: 35,
              name: "叫了只炸鸡 (北市区店)",
              imgUrl: "/static/jlzj.jpg",
              grade: 4.6,
              sales: 186,
              time: 30,
              distance: 3.7,
              basePrice: 15,
              distribution: 2,
              averageConsume: 18,
              isRest: false
            },
            {
              id: 44,
              name: "乐多多炸鸡汉堡(农大店)",
              imgUrl: "/static/ldd.jpg",
              grade: 4.6,
              sales: 186,
              time: 30,
              distance: 3.7,
              basePrice: 15,
              distribution: 2,
              averageConsume: 18,
              isRest: false
            },
            {
              id: 57,
              name: "鸭旭北京烤鸭(百富琪店)",
              imgUrl: "/static/ky.jpg",
              grade: 4.6,
              sales: 186,
              time: 30,
              distance: 3.7,
              basePrice: 15,
              distribution: 2,
              averageConsume: 18,
              isRest: false
            },
            {
              id: 68,
              name: "兰州拉面",
              imgUrl: "/static/ddd.jpg",
              grade: 4.9,
              sales: 258,
              time: 30,
              distance: 2.4,
              basePrice: 15,
              distribution: 3,
              averageConsume: 21,
              isRest: true
            },
            {
              id: 75,
              name: "98K炸鸡汉堡(盘龙店)",
              imgUrl: "/static/98k.jpg",
              grade: 4.2,
              sales: 258,
              time: 30,
              distance: 2.9,
              basePrice: 15,
              distribution: 3,
              averageConsume: 21,
              isRest: true
            }
          ];
        }
        this.isLoad = true;
      }, 1000);
    },
    showModal(e) {
      this.modalName = e.currentTarget.dataset.target;
    },
    hideModal(e) {
      this.modalName = null;
    },
    //排序方式切换
    sortSelect(e) {
      console.log(e);
      this.sortCur = e.currentTarget.dataset.id;
    },
    //筛选栏切换
    tabSelect(e) {
      console.log(e);
      this.tabCur = e.currentTarget.dataset.id;
    },
    //筛选条件清空
    screenClear(e) {
      console.log("清空筛选条件");
    },
    //筛选条件确定
    screenComplete() {
      this.modalName = null;
    },
    //跳转至商家店铺
    goToStore(e) {
      console.log(e);
      let data = e.currentTarget.dataset;
      uni.navigateTo({
        url: "/pages/home/store?id=" + data.id + "&goods=" + data.goods
      });
    }
  }
};
</script>

<style>
.my-tag {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 10px;
}

/* ==================
         模态窗口
 ==================== */

.cu-modal.show {
  opacity: 1;
  transition-duration: 0.3s;
  -ms-transform: scale(1);
  transform: scale(1);
  overflow-x: hidden;
  overflow-y: auto;
  pointer-events: auto;
}

.cu-dialog {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin-left: auto;
  margin-right: auto;
  width: 750upx;
  max-width: 100%;
  background-color: #f8f8f8;
  border-radius: 10upx;
  overflow: hidden;
}

.cu-modal.drawer-modal .cu-dialog {
  height: 500upx;
  width: 750upx;
  border-radius: 0;
  margin: initial;
  transition-duration: 0.3s;
}

.cu-modal.drawer-modal.justify-start .cu-dialog {
  transform: translateY(-100%);
}

.cu-modal.drawer-modal.justify-end .cu-dialog {
  transform: translateY(100%);
}

.cu-modal.drawer-modal.show .cu-dialog {
  transform: translateY(0%);
}
</style>
