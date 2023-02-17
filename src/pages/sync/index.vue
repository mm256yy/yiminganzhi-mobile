<template>
  <view class="sync-wrap">
    <view :style="{ height: `${statusBarHeight}px` }" />
    <view class="header">
      <view class="back" @click="onBack"><text class="back-txt">返回</text></view>
      <view class="btn-box" @click="onSync">
        <text class="btn-txt"> 同步数据 </text>
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
            <text class="tit">居民户 >></text>
          </view>
          <view class="inner-box">
            <view class="table-th">
              <view class="tr">
                <view class="td">
                  <text class="txt">行政村</text>
                </view>
                <view class="td">
                  <text class="txt">行政村</text>
                </view>
                <view class="td">
                  <text class="txt">行政村</text>
                </view>
                <view class="td">
                  <text class="txt">行政村</text>
                </view>
              </view>
            </view>

            <scroll-view scroll-y class="table-tb">
              <view class="tr">
                <view class="td">
                  <text class="txt txt-primary">测试</text>
                </view>
                <view class="td">
                  <text class="txt">测试</text>
                </view>
                <view class="td">
                  <text class="txt">测试</text>
                </view>
                <view class="td">
                  <text class="txt txt-num">测试</text>
                </view>
              </view>
              <view class="tr">
                <view class="td">
                  <text class="txt txt-primary">测试</text>
                </view>
                <view class="td">
                  <text class="txt">测试</text>
                </view>
                <view class="td">
                  <text class="txt">测试</text>
                </view>
                <view class="td">
                  <text class="txt txt-num">测试</text>
                </view>
              </view>
              <view class="tr">
                <view class="td">
                  <text class="txt txt-primary">测试</text>
                </view>
                <view class="td">
                  <text class="txt">测试</text>
                </view>
                <view class="td">
                  <text class="txt">测试</text>
                </view>
                <view class="td">
                  <text class="txt txt-num">测试</text>
                </view>
              </view>
            </scroll-view>
          </view>
        </view>

        <view class="list-item">
          <image class="bg" src="@/static/images/head_2.png" mode="scaleToFill" />
          <view class="title">
            <text class="tit">个体户 >></text>
          </view>
          <view class="inner-box">
            <view class="table-th">
              <view class="tr">
                <view class="td">
                  <text class="txt">行政村</text>
                </view>
                <view class="td">
                  <text class="txt">行政村</text>
                </view>
                <view class="td">
                  <text class="txt">行政村</text>
                </view>
                <view class="td">
                  <text class="txt">行政村</text>
                </view>
              </view>
            </view>

            <scroll-view scroll-y class="table-tb">
              <view class="tr">
                <view class="td">
                  <text class="txt txt-primary">测试</text>
                </view>
                <view class="td">
                  <text class="txt">测试</text>
                </view>
                <view class="td">
                  <text class="txt">测试</text>
                </view>
                <view class="td">
                  <text class="txt txt-num">测试</text>
                </view>
              </view>
            </scroll-view>
          </view>
        </view>

        <view class="list-item">
          <image class="bg" src="@/static/images/head_3.png" mode="scaleToFill" />
          <view class="title">
            <text class="tit">企业 >></text>
          </view>
          <view class="inner-box">
            <view class="table-th">
              <view class="tr">
                <view class="td">
                  <text class="txt">行政村</text>
                </view>
                <view class="td">
                  <text class="txt">行政村</text>
                </view>
                <view class="td">
                  <text class="txt">行政村</text>
                </view>
                <view class="td">
                  <text class="txt">行政村</text>
                </view>
              </view>
            </view>

            <scroll-view scroll-y class="table-tb">
              <view class="tr">
                <view class="td">
                  <text class="txt txt-primary">测试</text>
                </view>
                <view class="td">
                  <text class="txt">测试</text>
                </view>
                <view class="td">
                  <text class="txt">测试</text>
                </view>
                <view class="td">
                  <text class="txt txt-num">测试</text>
                </view>
              </view>
            </scroll-view>
          </view>
        </view>

        <view class="list-item">
          <image class="bg" src="@/static/images/head_4.png" mode="scaleToFill" />
          <view class="title">
            <text class="tit">村集体 >></text>
          </view>
          <view class="inner-box">
            <view class="table-th">
              <view class="tr">
                <view class="td">
                  <text class="txt">行政村</text>
                </view>
                <view class="td">
                  <text class="txt">行政村</text>
                </view>
                <view class="td">
                  <text class="txt">行政村</text>
                </view>
                <view class="td">
                  <text class="txt">行政村</text>
                </view>
              </view>
            </view>

            <scroll-view scroll-y class="table-tb">
              <view class="tr">
                <view class="td">
                  <text class="txt txt-primary">测试</text>
                </view>
                <view class="td">
                  <text class="txt">测试</text>
                </view>
                <view class="td">
                  <text class="txt">测试</text>
                </view>
                <view class="td">
                  <text class="txt txt-num">测试</text>
                </view>
              </view>
            </scroll-view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
// import { ref } from 'vue'
import { pullInstance, pushInstance } from '@/sync/index'
import { routerBack } from '@/utils'

const sysInfo = uni.getSystemInfoSync()
const statusBarHeight = sysInfo.statusBarHeight || 0

const checkFirst = () => {
  console.log('is first sync')
}

const onBack = () => {
  routerBack()
}
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
  display: flex;
  height: 100%;
  padding: 0 6rpx 9rpx 6rpx;
  background-color: #e7edfd;
  border-radius: 9rpx 9rpx 0rpx 0rpx;

  flex: 1;
  flex-direction: column;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 40rpx;
  }

  .back {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .back-txt {
    font-size: 10rpx;
    color: #333333;
  }

  .btn-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 67rpx;
    height: 21rpx;
    background: #3e73ec;
    border-radius: 2rpx;
  }

  .btn-txt {
    font-size: 9rpx;
    color: #ffffff;
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
    flex-wrap: nowrap;
    align-items: stretch;
    overflow-x: scroll;
  }

  ::-webkit-scrollbar {
    width: 0rpx;
    height: 0rpx;
  }

  .list-item {
    position: relative;
    display: flex;
    width: 246rpx;
    padding: 0 6rpx 5rpx;
    margin-right: 9rpx;
    background-color: #d8e6fe;
    border-radius: 5rpx;
    flex: none;
    flex-direction: column;
  }

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 246rpx;
    height: 64rpx;
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

  .inner-box {
    position: relative;
    z-index: 2;
    display: flex;
    padding: 10rpx 6rpx 5rpx;
    background-color: #fff;
    border: 1rpx solid #ffffff;
    border-radius: 5rpx;
    flex: 1;
    flex-direction: column;
  }

  .table-th {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 28rpx;
  }

  .tr {
    display: flex;
    height: 28rpx;
    flex: 1;
    flex-direction: row;
    align-items: center;
  }

  .td {
    flex: 25%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .txt {
    font-size: 9rpx;
    font-weight: 500;
    color: #333333;
  }

  .txt-primary {
    color: #3e73ec;
  }

  .txt-num {
    color: #30a952;
  }

  .table-tb {
    flex: 1;
  }
}
</style>
