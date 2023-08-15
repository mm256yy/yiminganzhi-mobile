<template>
  <!-- 移民实施阶段 —— 居民户评估 -->
  <view class="page-wrap">
    <image src="@/static/images/common_bg.png" class="head-bg" mode="widthFix" />
    <view class="home-wrap" :style="{ height: `${pageHeight}px` }">
      <view class="home-body">
        <EvaMain
          :dataInfo="dataInfo"
          :occupationOptions="occupationOptions"
          @update-data="getLandlordDetail"
        />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getEvaLandlordItemApi, getOtherItemApi } from '@/service'
import { OtherDataType } from '@/database'
import EvaMain from './components/EvaMain.vue'
import { onLoad, onShow } from '@dcloudio/uni-app'

const sysInfo = uni.getSystemInfoSync()
const statusBarHeight = sysInfo.statusBarHeight || 0
const screenHeight = sysInfo.screenHeight
const pageHeight = screenHeight - statusBarHeight
const dataInfo = ref<any>({})
// 职业选项
const occupationOptions = ref<any>([])

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

onMounted(() => {
  initOccpationData()
})

/**
 * 获取居民户详情
 * @param(object) uid
 */
const getLandlordDetail = (uid: string) => {
  getEvaLandlordItemApi(uid).then((res: any) => {
    console.log('res:', res)
    dataInfo.value = { ...res }
  })
}

// 初始化职业选择框数据
const initOccpationData = async () => {
  const res = await getOtherItemApi(OtherDataType.ProfessionalTree)
  if (res && res.length > 0) {
    occupationOptions.value = res
  }
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
