<template>
  <view class="page-wrap">
    <image src="@/static/images/head_bg.png" class="head-bg" />
    <view class="home-wrap" :style="{ height: `${pageHeight}px` }">
      <view class="home-body">
        <Main
          :uid="uid"
          :expend-codes="expendCodes"
          :treeData="treeData"
          :dataInfo="dataInfo"
          :occupationOptions="occupationOptions"
          @tree-item-click="treeItemClick"
          @update-tree="getTreeData"
          @update-data="getLandlordDetail"
        />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getLandlordTreeApi, getLandlordItemApi, getOtherItemApi } from '@/service'
import { MainType } from '@/types/common'
import { OtherDataType } from '@/database'
import Main from './components/Main.vue'
import { onLoad, onShow } from '@dcloudio/uni-app'

const sysInfo = uni.getSystemInfoSync()
const statusBarHeight = sysInfo.statusBarHeight || 0
const screenHeight = sysInfo.screenHeight
const pageHeight = screenHeight - statusBarHeight
const treeData = ref<any>([])
const dataInfo = ref<any>({})
// 默认选择的业主
const expendCodes = ref<string[]>([])
const uid = ref<string>('')
// 职业选项
const occupationOptions = ref<any>([])

onShow(() => {
  if (dataInfo.value.uid) {
    getLandlordDetail(dataInfo.value.uid)
  }
  initOccpationData()
  getTreeData()
})

onLoad((option) => {
  if (option && option.uid) {
    uid.value = option.uid
  }
  if (option && option.expendCodes) {
    expendCodes.value = option.expendCodes.split(',')
  }
})

// 获取左侧树列表
const getTreeData = async () => {
  // showLoading()
  const result = await getLandlordTreeApi(MainType.PeasantHousehold)
  // hideLoading()
  treeData.value = [...result]
}

/**
 * 点击左侧列表
 * @params (object) data 点击的当前节点返回的数据
 */
const treeItemClick = (data: any) => {
  uid.value = data.uid
  getLandlordDetail(data.uid)
}

/**
 * 获取业主详情
 * @param(object) uid
 */
const getLandlordDetail = (uid: string) => {
  getLandlordItemApi(uid).then((res: any) => {
    // console.log('res:', res)
    dataInfo.value = { ...res }
    expendCodes.value = [
      dataInfo.value.areaCode,
      dataInfo.value.townCode,
      dataInfo.value.villageCode,
      dataInfo.value.virutalVillageCode
    ]
  })
}

// 初始化职业选择框数据
const initOccpationData = async () => {
  // console.log('执行了')
  const res = await getOtherItemApi(OtherDataType.ProfessionalTree)
  // console.log('occupationOptions:', res)
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
