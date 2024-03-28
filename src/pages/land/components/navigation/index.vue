<template>
  <view class="main-wrap">
    <Back title="只征地不搬迁实施" needConfirm />
    <!-- 只征地不搬迁实施 -->
    <view class="content">
      <LeftSidebar @switch-tab="switchTab" :dataList="tabList" @time="getTime" />

      <view class="right">
        <!-- 头部 -->
        <Header :dataInfo="dataInfo" />

        <view class="box">
          <!-- 资产评估报告 -->
          <Report v-if="tabVal === 1" :dataInfo="dataInfo" @update-data="updateData" />
          <!-- 安置确认 -->
          <Arrangement v-if="tabVal === 2" :dataInfo="dataInfo" @update-data="updateData" />
          <!-- 补偿卡 -->
          <CompensateCard v-if="tabVal === 3" :dataInfo="dataInfo" @update-data="updateData" />
          <!-- 征地协议 -->
          <AcquisitionLand v-if="tabVal === 4" :dataInfo="dataInfo" @update-data="updateData" />
          <!-- 土地腾让 -->
          <LandTransfer v-if="tabVal === 5" :dataInfo="dataInfo" @update-data="updateData" />
          <!-- 自谋职业 -->
          <FindSelf v-if="tabVal === 6" :dataInfo="dataInfo" @update-data="updateData" />
          <!-- 养老保险 -->
          <Insure v-if="tabVal === 7" :dataInfo="dataInfo" @update-data="updateData" />
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { deepClone } from '@/utils'
import { landNoMoveList, landNoMoveOtherList } from '../../../common/config'
import Report from './Report.vue' // 资产评估报告
import Arrangement from './Arrangement.vue' // 安置确认
import CompensateCard from './CompensateCard.vue' // 补偿卡
import AcquisitionLand from './AcquisitionLand.vue' // 征地协议
import LandTransfer from './LandTransfer.vue' // 土地腾让
import FindSelf from '@/pages/household/productionResettle/findself.vue'
import Insure from '@/pages/household/productionResettle/insure.vue'
import Back from '@/components/Back/Index.vue'
import LeftSidebar from '@/components/LeftSidebar/Index.vue' // 引入左侧边栏组件
import Header from '@/pages/land/components/navigation/TopHeader.vue' // 引入头部组件
import { getLandlordListBySearchApi } from '@/service'

const tabVal = ref<number>(1)
const emit = defineEmits(['updateData'])
const dataInfo = ref<any>(null)
const startTime = ref<any>(0)

onShow(() => {
  if (dataInfo.value?.doorNo) {
    getLandlordDetail(dataInfo.value.doorNo)
  }
})

onLoad((option) => {
  if (option && option.data) {
    const result = JSON.parse(option.data)
    console.log('KRESULT:', result)
    if (result?.doorNo) {
      getLandlordDetail(result.doorNo)
    }
  }
})

const getLandlordDetail = (doorNo: string) => {
  const params = {
    doorNo
  }
  getLandlordListBySearchApi(params).then((res: any) => {
    dataInfo.value = res[0]
    console.log('resAPI:', dataInfo.value)
  })
}

const getTime = (time: any) => {
  startTime.value = time
}

const tabList = computed(() => {
  const { immigrantFilling = {}, landEstimateDtoList } = dataInfo.value || {}
  const list =
    dataInfo.value?.landUserType === 'PeasantHousehold' ? landNoMoveList : landNoMoveOtherList
  const arr: any = deepClone(list)
  // 资产评估报告
  if (landEstimateDtoList && landEstimateDtoList.length > 0) {
    arr[0].list[0].list[0].filled = true
  }

  console.log('immigrantFilling-PPP', immigrantFilling)
  if (immigrantFilling) {
    if (dataInfo.value?.landUserType === 'PeasantHousehold') {
      // 生产安置确认
      if (immigrantFilling.productionArrangementStatus === '1') {
        arr[0].list[0].list[1].filled = true
      }
      // 补偿卡
      if (immigrantFilling.cardStatus === '1') {
        arr[0].list[0].list[2].filled = true
      }
      // 征地协议
      if (immigrantFilling.agreementStatus === '1') {
        arr[0].list[0].list[3].filled = true
      }
      // 土地腾让
      if (immigrantFilling.landSoarStatus === '1') {
        arr[0].list[0].list[4].filled = true
      }
      // 自谋职业
      if (immigrantFilling.selfEmploymentStatus === '1') {
        arr[1].list[0].list[0].filled = true
      }
      // 养老保险
      if (immigrantFilling.retirementStatus === '1') {
        arr[1].list[0].list[1].filled = true
      }
    } else {
      // 补偿卡
      if (immigrantFilling.cardStatus === '1') {
        arr[0].list[0].list[1].filled = true
      }
      // 征地协议
      if (immigrantFilling.agreementStatus === '1') {
        arr[0].list[0].list[2].filled = true
      }
      // 土地腾让
      if (immigrantFilling.landSoarStatus === '1') {
        arr[0].list[0].list[3].filled = true
      }
    }
  }
  return [...arr]
})

const switchTab = (item: any) => {
  tabVal.value = item.value
  recordClickTime()
}

const recordClickTime = () => {
  setTimeout(() => {
    let responseTime = Date.now() - startTime.value
    console.log(`响应时间: ${responseTime} 毫秒`)
  }, 0)
}

// 更新整体数据
const updateData = () => {
  emit('updateData', dataInfo.value?.uid)
}
</script>
<style lang="scss" scoped>
.main-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: url('../../../../static/images/common_bg.png') no-repeat;
  background-size: 100% 100%;
  overflow: hidden;

  .content {
    display: flex;
    padding: 0 9rpx 9rpx 9rpx;
    box-sizing: border-box;

    .right {
      width: 533rpx;
      height: calc(100vh - 33rpx - 12rpx - var(--status-bar-height));
      margin-left: 6rpx;
      background-color: #fff;
      border-radius: 7rpx;
      box-shadow: 0 0 12rpx 0 rgba(0, 0, 0, 0.08);

      .box {
        width: 100%;
        height: calc(100vh - 33rpx - 12rpx - 33rpx - var(--status-bar-height));
        padding: 0 6rpx;
        overflow-y: scroll;
        box-sizing: border-box;
      }
    }
  }
}
</style>
