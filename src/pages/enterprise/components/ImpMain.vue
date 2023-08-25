<template>
  <view class="main-wrap">
    <!-- 移民实施阶段 —— 企业实施 -->
    <Back title="企业实施" />

    <view class="content">
      <LeftSidebar @switch-tab="switchTab" :dataList="enterpriseSidebarList" />

      <view class="right">
        <!-- 头部 -->
        <Header :dataInfo="dataInfo" :type="MainType.Company" />

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

          <!-- 设施设备评估报告 -->
          <equipment-eva-report v-if="tabVal === 3" :dataInfo="dataInfo.immigrantEquipmentList" />

          <!-- 企业建卡 -->
          <create-card v-if="tabVal === 4" />

          <!-- 房屋腾空 -->
          <house-vacate v-if="tabVal === 5" :dataInfo="dataInfo" />

          <!-- 土地腾让 -->
          <land-vacate v-if="tabVal === 6" :dataInfo="dataInfo" />

          <!-- 动迁协议 -->
          <relocation-agreement v-if="tabVal === 7" />

          <!-- 相关手续 -->
          <procedures
            v-if="tabVal === 8"
            :dataInfo="dataInfo.immigrantDocumentation"
            :uid="dataInfo.uid"
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
import { enterpriseSidebarList } from '../../common/config'

import Back from '@/components/Back/Index.vue'
import LeftSidebar from '@/components/LeftSidebar/Index.vue' // 引入左侧边栏组件
import Header from '@/components/Header/ImpIndex.vue' // 引入头部组件

import houseAccessoryEvaReport from '../../common/houseAccessoryEvaReport/index.vue' // 引入资产评估 -- 房屋/附属物评估报告组件
import landAccessoryEvaReport from '../../common/landAccessoryEvaReport/index.vue' // 引入资产评估 -- 土地/附着物评估报告组件
import equipmentEvaReport from '../../common/equipmentEvaReport/index.vue' // 引入资产评估 -- 设施设备评估报告组件
import createCard from '../createCard/index.vue' // 引入企业建卡组件
import houseVacate from '../../common/vacate/house.vue' // 引入腾空 -- 房屋腾空组件
import landVacate from '../../common/vacate/land.vue' // 引入腾空 -- 土地腾让组件
import relocationAgreement from '../relocationAgreement/index.vue' // 引入动迁协议组件
import procedures from '../procedures/index.vue' // 引入相关手续组件

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
