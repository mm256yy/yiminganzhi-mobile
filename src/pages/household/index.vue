<template>
  <view class="page-wrap">
    <image src="@/static/images/head_bg.png" class="head-bg" />
    <view class="home-wrap" :style="{ height: `${pageHeight}px` }">
      <view class="home-body">
        <Main :treeData="treeData" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getLandlordTreeApi } from '@/service'
import { MainType } from '@/types/common'
import Main from './components/Main.vue'

const sysInfo = uni.getSystemInfoSync()
const statusBarHeight = sysInfo.statusBarHeight || 0
const screenHeight = sysInfo.screenHeight
const treeData = ref<any>([])

const pageHeight = screenHeight - statusBarHeight

// 获取左侧树列表
const getTreeData = async () => {
  const result = await getLandlordTreeApi(MainType.PeasantHousehold)
  treeData.value = [...result]
}

onMounted(() => {
  getTreeData()
})
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
