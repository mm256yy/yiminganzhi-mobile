<template>
  <view class="page-wrap">
    <image src="@/static/images/head_bg.png" class="head-bg" />
    <view :style="{ height: `${statusBarHeight}px` }" />
    <view class="home-wrap" :style="{ height: `${pageHeight}px` }">
      <view class="home-header">
        <view class="header-lt">
          <image class="logo" src="@/static/images/logo.png" />
          <text class="project">清晰水库</text>
          <text class="status">（实物采集 — 居民户）</text>
        </view>

        <view class="header-rt">
          <view class="btn-item">
            <image class="icon" src="@/static/images/admin.png" mode="scaleToFill" />
            <text class="name">admin</text>
          </view>
        </view>
      </view>

      <view class="home-body">
        <Main />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
import Main from './components/Main.vue'

const sysInfo = uni.getSystemInfoSync()
const statusBarHeight = sysInfo.statusBarHeight || 0
const screenHeight = sysInfo.screenHeight

const pageHeight = screenHeight - statusBarHeight
</script>

<style scoped lang="scss">
.page-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 750rpx;
  height: 100vh;

  .head-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 750rpx;
    height: 95rpx;
  }

  .home-wrap {
    position: relative;
    display: flex;
    width: 750rpx;
    flex-direction: column;

    .home-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 33rpx;
      padding: 0 9rpx;
      overflow: hidden;

      .header-lt {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 33rpx;

        .logo {
          width: 22rpx;
          height: 22rpx;
          margin-right: 6rpx;
        }

        .project {
          font-size: 14rpx;
          font-weight: 600;
          color: #ffffff;
        }

        .status {
          font-size: 11rpx;
          font-weight: normal;
          color: #ffffff;
        }
      }

      .header-rt {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 33rpx;

        .btn-item {
          display: flex;
          height: 12rpx;
          padding: 0 11rpx;
          font-size: 11rpx;
          font-weight: 500;
          color: #ffffff;
          flex-direction: row;
          align-items: center;
          justify-content: center;

          .icon {
            width: 13rpx;
            height: 13rpx;
            margin-right: 2rpx;
          }

          .name {
            font-size: 11rpx;
            font-weight: 400;
            color: #fff;
          }
        }
      }
    }

    .home-body {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  }
}
</style>
