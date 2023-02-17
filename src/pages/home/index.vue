<template>
  <view class="home-wrapper">
    <view class="row">
      <view class="col">
        <view class="txt">项目切换</view>
      </view>
      <view class="col" @click="toLink('household')">
        <view class="txt">居民户</view>
      </view>
      <view class="col">
        <view class="txt">企业</view>
      </view>
    </view>
    <view class="row">
      <view class="col">
        <view class="txt">个体户</view>
      </view>
      <view class="col">
        <view class="txt">村集体</view>
      </view>
      <view class="col">
        <view class="txt" @click="toLink('sync')">同步数据</view>
      </view>
    </view>
    <view class="row">
      <view class="col">
        <view class="txt">自然村填报</view>
      </view>
      <view class="col">
        <view class="txt">我的工作</view>
      </view>
      <view class="col">
        <view class="txt">地图</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { routerForward } from '@/utils'

/**
 * 路由跳转
 * @params {objcet} name 路由名
 */
const toLink = (name: string) => {
  routerForward(name)
}
</script>

<style lang="scss" scoped>
.home-wrapper {
  .row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin-top: 20rpx;

    /* #ifdef H5 */
    cursor: pointer;
    /* #endif */

    .col {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;

      .txt {
        display: flex;
        width: 100rpx;
        height: 100rpx;
        font-size: 12rpx;
        color: #171718;
        border: 1rpx solid #171718;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
