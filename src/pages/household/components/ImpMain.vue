<template>
  <view class="main-wrap">
    <!-- 移民实施阶段 —— 居民户实施 -->
    <Back title="居民户实施" />

    <view class="content">
      <LeftSidebar @switch-tab="switchTab" :dataList="sidebarList" />

      <view class="right">
        <!-- 头部 -->
        <Header :dataInfo="dataInfo" :type="MainType.PeasantHousehold" />

        <view class="box">
          <!-- 居民户信息 -->
          <base-info-imp v-if="tabVal === 1" :dataInfo="dataInfo" />

          <!-- 人口核定 -->
          <population-verfication
            v-if="tabVal === 2"
            :dataList="dataInfo.demographicList"
            :dataInfo="dataInfo"
          />

          <!-- 房屋确权 -->
          <house-confirm
            v-if="tabVal === 3"
            :dataList="dataInfo.immigrantHouseList"
            :dataInfo="dataInfo"
          />

          <!-- 模拟安置 -->
          <ImitateResettle v-if="tabVal === 6" :dataInfo="(dataInfo as any)" />

          <!--移民建卡-->
          <migrateCard
            v-if="tabVal === 13"
            :dataInfo="dataInfo"
            :dataList="dataInfo.demographicList"
          />

          <!-- 过渡安置 -->
          <trans-resettlement v-if="tabVal === 16" :dataInfo="dataInfo" />

          <!-- 动迁协议 -->
          <Agreement v-if="tabVal === 17" />
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { MainType } from '@/types/common'
import { sidebarList } from '../config'
import Back from '@/components/Back/Index.vue'
import LeftSidebar from '@/components/LeftSidebar/Index.vue' // 引入左侧边栏组件
import Header from '@/components/Header/ImpIndex.vue' // 引入头部组件
import baseInfoImp from '../baseInfoImp/index.vue' // 引入居民户信息组件
import populationVerfication from '../populationVerfication/index.vue' // 引入人口核定组件
import houseConfirm from '../houseConfirm/index.vue' // 引入房屋确权组件

import ImitateResettle from '../imitateResettle/index.vue' // 引入模拟安置组件
import Agreement from '../agreement/index.vue' // 引入动迁协议组件
import migrateCard from '../migrateCard/index.vue' // 引入移民建卡组件
import transResettlement from '../transResettlement/index.vue' // 引入过渡安置组件

const props = defineProps({
  dataInfo: {
    type: Object,
    default: () => {}
  }
})

const tabVal = ref<number>(1)

const switchTab = (item: any) => {
  tabVal.value = item.value
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
