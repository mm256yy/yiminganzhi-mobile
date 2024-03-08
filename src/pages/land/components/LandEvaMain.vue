<template>
  <view class="main-wrap">
    <!-- 土地评估 -->
    <Back class="main-nav" title="土地评估" />

    <view class="main-cont">
      <view class="list-content">
        <view class="list-box">
          <view class="box">
            <!-- 头部 -->
            <Header
              :dataInfo="dataInfo"
              :type="MainType.LandNoMove"
              :tabVal="tabVal"
              @update-data="updateData"
            />

            <view class="tabs-content">
              <!-- tab 切换 -->
              <Tabs :dataList="tabsList" :current-index="tabVal" @select-tabs="selectTabs" />

              <view
                class="touch-content"
                v-touch:swipe.left="touchLeft"
                v-touch:swipe.right="touchRight"
              >
                <!-- 居民户信息 -->
                <base-info-eva v-if="tabVal == 0" :dataInfo="dataInfo" type="land" />

                <!-- 土地基本情况评估 -->
                <land-eva
                  v-if="tabVal === 1"
                  :dataInfo="dataInfo"
                  :dataList="landList"
                  @delete-land="deleteLand"
                  @update-data="updateData"
                />

                <!-- 土地青苗及附着物评估 -->
                <seedlings-eva
                  v-if="tabVal === 2"
                  :dataList="dataInfo.assetAppendantList"
                  :dataInfo="dataInfo"
                  @delete-seedlings="deleteSeedlings"
                  @update-data="updateData"
                />
              </view>
            </view>
          </view>

          <view class="box">
            <view class="null-wrapper">
              <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
              <view class="tips">请先选择要评估的居民户</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import { MainType } from '@/types/common'
import Back from '@/components/Back/Index.vue'
import Header from './Header.vue'
import Tabs from '@/components/Tabs/Index.vue'
import baseInfoEva from './baseInfo/index.vue' // 引入居民户信息组件
import landEva from './landEva/index.vue' // 引入土地基本情况评估组件
import seedlingsEva from './seedlingsEva/index.vue' // 引入土地青苗及附着物评估组件

import { deleteImpLandlordAssetLandApi, deleteImpLandlordAssetAppendantApi } from '@/service'
import iconHouseholdDef from '@/static/images/icon_household_default.png' // 引入居民户信息默认 icon
import iconHouseholdSel from '@/static/images/icon_household_select.png' // 引入居民户信息选中 icon
import iconLandDef from '@/static/images/icon_land_default.png' // 引入土地基本情况评估默认 icon
import iconLandSel from '@/static/images/icon_land_select.png' // 引入土地基本情况评估选中 icon
import iconSeedlingsDef from '@/static/images/icon_seedlings_default.png' // 引入土地青苗及附着物评估默认 icon
import iconSeedlingsSel from '@/static/images/icon_seedlings_select.png' // 引入土地青苗及附着物评估选中 icon
import { LandlordType } from '@/types/sync'

const props = defineProps({
  dataInfo: {
    type: Object,
    default: () => {}
  },
  occupationOptions: {
    type: Array as any,
    default: () => []
  }
})

const tabsList = computed(() => {
  const { immigrantFilling } = props.dataInfo as LandlordType
  return [
    {
      label: '基本信息',
      value: 0,
      filled: true,
      defIcon: iconHouseholdDef,
      selIcon: iconHouseholdSel
    },
    {
      label: '土地基本情况评估',
      value: 1,
      filled: immigrantFilling?.landStatus === '1',
      defIcon: iconLandDef,
      selIcon: iconLandSel
    },
    {
      label: '土地青苗及附着物评估',
      value: 2,
      filled: immigrantFilling?.landSeedlingStatus === '1',
      defIcon: iconSeedlingsDef,
      selIcon: iconSeedlingsSel
    }
  ]
})

const tabVal = ref<number>(0)
const emit = defineEmits(['updateData'])

const landList = computed(() => {
  return props.dataInfo.landEstimateDtoList.filter((item: any) => item.landNature === '4')
})

// tab 切换
const selectTabs = (data: any) => {
  tabVal.value = data.value
}

// 页面向左滑动, tab 跟随页面一起动
const touchLeft = () => {
  tabVal.value += 1
  if (tabVal.value > tabsList.value.length - 1) {
    tabVal.value = 0
  }
}

// 页面向右滑动, tab 跟随页面一起动
const touchRight = () => {
  tabVal.value -= 1
  if (tabVal.value < 0) {
    tabVal.value = tabsList.value.length - 1
  }
}

/**
 * 土地基本情况评估 - 删除
 * @param{Object} data 被删除的行信息
 * @param{Object} reason 删除原因（填报阶段没有此参数，复核阶段有此参数）
 */
const deleteLand = (data: any, reason?: string) => {
  deleteImpLandlordAssetLandApi(props.dataInfo.uid, data.uid, reason)
    .then((res) => {
      if (res) {
        showToast(SUCCESS_MSG)
        updateData()
      }
    })
    .catch(() => {
      showToast(ERROR_MSG)
    })
}

/**
 * 土地青苗及附着物评估 - 删除
 * @param{Object} data 被删除的行信息
 * @param{Object} reason 删除原因（填报阶段没有此参数，复核阶段有此参数）
 */
const deleteSeedlings = (data: any, reason?: string) => {
  deleteImpLandlordAssetAppendantApi(props.dataInfo.uid, data.uid, reason)
    .then((res) => {
      if (res) {
        showToast(SUCCESS_MSG)
        updateData()
      }
    })
    .catch(() => {
      showToast(ERROR_MSG)
    })
}

// 更新整体数据
const updateData = () => {
  emit('updateData', props.dataInfo.uid)
}
</script>

<style lang="scss">
.main-wrap {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.main-nav {
  border-radius: 9rpx 9rpx 0 0;
}

.view-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 9rpx;
}

.icon {
  width: 9rpx;
  height: 9rpx;
}

.name {
  margin-left: 4rpx;
  font-size: 9rpx;
  color: #262626;
}

.active {
  color: #1059ff;
}

.main-cont {
  flex: 1;
  position: relative;
  background-color: #fff;
}

.scroll {
  flex: 1;
}

.list-content {
  display: flex;
  width: 750rpx;
  padding: 6rpx;
  background-color: #e7edfd;
  border-radius: 2rpx;
  box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  flex: 1;
  flex-direction: row;
  align-items: stretch;
}

.list-box {
  flex: 1;
  width: 750rpx;
}

.box {
  flex: 1;
  background-color: #ffffff;
}

.tabs-content {
  display: flex;
  width: 100%;
  height: calc(100vh - 33rpx - 12rpx - 33rpx - var(--status-bar-height));
  padding: 6rpx;
  background-color: #fff;
  box-sizing: border-box;
  flex-direction: column;

  .touch-content {
    width: 100%;
    height: calc(100vh - 33rpx - 12rpx - 33rpx - 60rpx - var(--status-bar-height));
    overflow-y: scroll;
  }
}

.null-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 33rpx - 12rpx - var(--status-bar-height));
  background-color: #fff;

  .icon {
    width: 152rpx;
    height: 92rpx;
  }

  .tips {
    margin-top: 17rpx;
    font-size: 9rpx;
    line-height: 1;
    color: #171718;
  }
}
</style>
