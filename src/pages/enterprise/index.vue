<template>
  <view class="page-wrap">
    <image src="@/static/images/head_bg.png" class="head-bg" />
    <view class="home-wrap" :style="{ height: `${pageHeight}px` }">
      <view class="home-body">
        <Main :treeData="treeData" :dataInfo="dataInfo" @tree-item-click="treeItemClick" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref, onMounted } from 'vue'
import { getLandlordTreeApi, getLandlordItemApi } from '@/service'
import { MainType } from '@/types/common'
import { showLoading, hideLoading } from '@/config'
import Main from './components/Main.vue'

const sysInfo = uni.getSystemInfoSync()
const statusBarHeight = sysInfo.statusBarHeight || 0
const screenHeight = sysInfo.screenHeight
const pageHeight = screenHeight - statusBarHeight
const treeData = ref<any>([])
const dataInfo = ref<any>({})
// 默认选择的业主
const expendCodes = ref<string[]>([])
const uid = ref<string>('')

onShow(() => {
  if (uid.value) {
    getLandlordDetail(uid.value)
  }
})

onLoad((option) => {
  // PageQueryType
  if (option && option.uid) {
    expendCodes.value = option.expendCodes.split(',')
    uid.value = option.uid
  }
})

// 获取左侧树列表
const getTreeData = async () => {
  showLoading()
  const result = await getLandlordTreeApi(MainType.Company)
  hideLoading()
  treeData.value = [...result]
}

/**
 * 点击左侧列表
 * @params (object) data 点击的当前节点返回的数据
 */
const treeItemClick = (data: any) => {
  dataInfo.value = { ...data }
}

/**
 * 获取企业详情
 * @param(object) uid
 */
const getLandlordDetail = (uid: string) => {
  getLandlordItemApi(uid).then((res: any) => {
    dataInfo.value = { ...res }
  })
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
