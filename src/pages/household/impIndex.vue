<template>
  <!-- 移民实施阶段 —— 居民户实施 -->
  <view class="page-wrap">
    <image src="@/static/images/common_bg.png" class="head-bg" mode="widthFix" />
    <view class="home-wrap" :style="{ height: `${pageHeight}px` }">
      <view class="home-body">
        <ImpMain :dataInfo="dataInfo" @update-data="getLandlordDetail" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getImpLandlordItemApi } from '@/service'
import ImpMain from './components/ImpMain.vue'
import { onLoad, onShow } from '@dcloudio/uni-app'

const sysInfo = uni.getSystemInfoSync()
const statusBarHeight = sysInfo.statusBarHeight || 0
const screenHeight = sysInfo.screenHeight
const pageHeight = screenHeight - statusBarHeight
const dataInfo = ref<any>({})

onShow(() => {
  if (dataInfo.value.uid) {
    getLandlordDetail(dataInfo.value.uid)
  }
})

onLoad((option) => {
  if (option && option.uid) {
    getLandlordDetail(option.uid)
  }
})

/**
 * 获取业主详情
 * @param(object) uid
 */
const getLandlordDetail = (uid: string) => {
  uni.showLoading({
    title: '加载中'
  })
  getImpLandlordItemApi(uid).then((res: any) => {
    dataInfo.value = { ...res }
    console.log('测试数据-获取业主详情', res)
    uni.hideLoading()
  })
}
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
    height: 100%;
  }

  .home-wrap {
    position: relative;
    display: flex;
    width: 750rpx;
    flex-direction: column;

    .home-body {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  }
}
</style>
