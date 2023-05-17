<template>
  <view class="page-wrap">
    <image src="@/static/images/head_bg.png" class="head-bg" />
    <view class="home-wrap" :style="{ height: `${pageHeight}px` }">
      <view class="home-body">
        <Main
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
import { getLandlordItemApi, getOtherItemApi } from '@/service'
import { OtherDataType } from '@/database'
import Main from './components/Main.vue'
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
 * 获取业主详情
 * @param(object) uid
 */
const getLandlordDetail = (uid: string) => {
  getLandlordItemApi(uid).then((res: any) => {
    // console.log('res:', res)
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
    height: 95rpx;
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
