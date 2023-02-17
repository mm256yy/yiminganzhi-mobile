<template>
  <view class="sync-wrap">
    <view class="header">
      <view class="back"><text>返回</text></view>
      <view class="btn-box">
        <button @click="onSync"> 同步数据 </button>
      </view>
    </view>

    <view class="body">
      <view class="pull-time">
        <text class="time">最新同步时间：2022-01-22 12:40</text>
      </view>

      <view class="list-wrap">
        <view class="list-item">
          <image class="bg" src="@/static/images/head_1.png" mode="scaleToFill" />
          <view class="title">
            <text class="tit">居民户</text>
          </view>
          <view class="inner-box"> 范德萨 </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const onSync = () => {}
</script>

<style lang="scss" scoped>
uni-page-body {
  /* #ifdef H5 */
  height: 100%;
  /* #endif */

  /* #ifdef APP-PLUS */
  flex: 1;
  /* #endif */
}

.sync-wrap {
  /* #endif */
  display: flex;
  /* #ifdef H5 */
  height: 100%;
  padding: 0 6rpx 9rpx 6rpx;
  background-color: #e7edfd;
  border-radius: 9rpx 9rpx 0rpx 0rpx;
  /* #endif */

  /* #ifdef APP-PLUS */
  flex: 1;
  flex-direction: column;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 40rpx;
  }

  .body {
    display: flex;
    padding: 0 12rpx 25rpx;
    background-color: #ffffff;
    border-radius: 5rpx;
    box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.08);
    flex: 1;
    flex-direction: column;
  }

  .pull-time {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 38rpx;
  }

  .time {
    font-size: 9rpx;
    color: #333333;
  }

  .list-wrap {
    flex: 1;
    display: flex;
    flex-direction: row;
  }

  .list-item {
    position: relative;
    width: 246rpx;
    background-color: #d8e6fe;
    border-radius: 5rpx;
  }

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 246rpx;
    height: auto;
  }

  .title {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 36rpx;
    padding: 2rpx 0 0 13rpx;

    .tit {
      font-size: 14rpx;
      font-weight: 600;
      color: #3e73ec;
    }
  }
}
</style>
