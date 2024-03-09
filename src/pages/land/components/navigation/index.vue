<template>
  <view class="main-wrap">
    <!-- 只征地不搬迁实施 -->
    <Container title="只征地不搬迁实施">
      <view class="content">
        <LeftSidebar @switch-tab="switchTab" :dataList="tabList" />

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
          </view>
        </view>
      </view>
    </Container>
  </view>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { LandlordType } from '@/types/sync'
import Container from '@/components/Container/index.vue'
// import { deepClone } from '@/utils'
import { landNoMoveList } from '../../../common/config.ts'
import Report from './Report.vue' // 资产评估报告
import Arrangement from './Arrangement.vue' // 安置确认
import CompensateCard from './CompensateCard.vue' // 补偿卡
import AcquisitionLand from './AcquisitionLand.vue' // 征地协议
import LandTransfer from './LandTransfer.vue' // 土地腾让

import LeftSidebar from '@/components/LeftSidebar/Index.vue' // 引入左侧边栏组件
import Header from '@/pages/land/components/navigation/TopHeader.vue' // 引入头部组件

// interface PropsType {
//   dataInfo: LandlordType
// }

// const props = defineProps<PropsType>()
const tabVal = ref<number>(1)
const emit = defineEmits(['updateData'])
const dataInfo = ref<any>(null)

const tabList = computed(() => {
  return landNoMoveList
})

onLoad((option) => {
  if (option && option.data) {
    dataInfo.value = JSON.parse(option.data)
  }
})

const switchTab = (item: any) => {
  tabVal.value = item.value
}

// 更新整体数据
const updateData = () => {
  emit('updateData', dataInfo.value.uid)
}
</script>
<style lang="scss" scoped>
.main-wrap {
  display: flex;
  flex-direction: column;
  flex: 1;
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
