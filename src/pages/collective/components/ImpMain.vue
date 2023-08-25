<template>
  <view class="main-wrap">
    <!-- 移民实施阶段 —— 村集体实施 -->
    <Back title="村集体实施" />

    <view class="content">
      <LeftSidebar @switch-tab="switchTab" :dataList="collectiveSidebarList" />

      <view class="right">
        <!-- 头部 -->
        <Header :dataInfo="dataInfo" :type="MainType.Village" />

        <view class="box">
          <!-- 房屋/附属物评估报告 -->
          <house-accessory-eva-report
            v-if="tabVal === 1"
            :dataInfo="dataInfo.immigrantDocumentation"
          />

          <!-- 土地/附着物评估报告 -->
          <land-accessory-eva-report
            v-if="tabVal === 2"
            :dataInfo="dataInfo.immigrantDocumentation"
          />

          <!-- 农村小型专项设施设备评估报告 -->
          <special-equipment-eva-report
            v-if="tabVal === 3"
            :dataInfo="dataInfo.immigrantDocumentation"
          />

          <!-- 房屋腾空 -->
          <house-vacate v-if="tabVal === 4" :dataInfo="dataInfo" />

          <!-- 动迁安置协议 -->
          <relocation-agreement v-if="tabVal === 5" />

          <!-- 过渡安置协议 -->
          <transition-agreement v-if="tabVal === 6" />

          <!-- 集体资产处置方法 -->
          <asset-disposal
            v-if="tabVal === 7"
            :dataInfo="dataInfo.immigrantDocumentation"
            :uid="dataInfo.uid"
            @update-data="updateData"
          />
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { MainType } from '@/types/common'
import { LandlordType } from '@/types/sync'
import { collectiveSidebarList } from '../../common/config'

import Back from '@/components/Back/Index.vue'
import LeftSidebar from '@/components/LeftSidebar/Index.vue' // 引入左侧边栏组件
import Header from '@/components/Header/ImpIndex.vue' // 引入头部组件

import houseAccessoryEvaReport from '../../common/houseAccessoryEvaReport/index.vue' // 引入资产评估 -- 房屋/附属物评估报告组件
import landAccessoryEvaReport from '../../common/landAccessoryEvaReport/index.vue' // 引入资产评估 -- 土地/附着物评估报告组件
import specialEquipmentEvaReport from '../specialEquipmentEvaReport/index.vue' // 引入资产评估 -- 农村小型专项设施设备评估报告组件
import houseVacate from '../../common/vacate/house.vue' // 引入腾空 -- 房屋腾空组件
import relocationAgreement from '../relocationAgreement/index.vue' // 引入动迁协议组件
import transitionAgreement from '../transitionAgreement/index.vue' // 引入过渡安置协议组件
import assetDisposal from '../assetDisposal/index.vue' // 引入集体资产处置方法组件

interface PropsType {
  dataInfo: LandlordType
}

const props = defineProps<PropsType>()
const tabVal = ref<number>(1)
const emit = defineEmits(['updateData'])

const switchTab = (item: any) => {
  tabVal.value = item.value
}

// 更新整体数据
const updateData = () => {
  emit('updateData', props.dataInfo.uid)
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
