<template>
  <view class="cu-bar tabbar bg-white shadow foot">
    <view class="action" @click="NavChange" data-cur="/pages/index/index">
      <view class="cuIcon-cu-image">
        <image
          :src="'/static/img/main' + [navIndex == 0 ? '_cur' : ''] + '.png'"
        ></image>
      </view>
      <view :class="navIndex == 0 ? 'text-blue' : 'text-gray'">首页</view>
    </view>
    <view
      class="action text-gray add-action"
      @click="NavChange"
      data-cur="/pages/apply/apply"
    >
      <button
        class="cu-btn cuIcon-add shadow"
        :class="navIndex == 1 ? 'bg-blue' : 'bg-gradual-blue'"
      ></button>
      <text :class="navIndex == 1 ? 'text-blue' : 'text-gray'">物资申领</text>
    </view>
    <view class="action" @click="NavChange" data-cur="/pages/user/user">
      <view class="cuIcon-cu-image">
        <image
          :src="'/static/img/user' + [navIndex == 2 ? '_cur' : ''] + '.png'"
        ></image>
      </view>
      <view :class="navIndex == 2 ? 'text-blue' : 'text-gray'">我的</view>
    </view>
  </view>
</template>

<script>
import lodash from "@/apis/lodash.js";
export default {
  name: "tabbar",
  props: {
    navIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      PageCur: "/pages/index/index"
    };
  },
  methods: {
    $redirect(_url) {
      uni.reLaunch({
        url: _url
      });
    },
    NavChange(e) {
      this.PageCur = e.currentTarget.dataset.cur;
      // if(this.navIndex==1){
      // 	uni.navigateTo({
      // 		url: e.currentTarget.dataset.cur
      // 	});
      // }else{
      this.$redirect(e.currentTarget.dataset.cur);
      // }
    }
  }
};
</script>

<style></style>
