<template>
  <view class="main-wrap">
    <!-- 移民实施阶段 —— 居民户评估 -->
    <Back class="main-nav" title="居民户评估" />

    <view class="main-cont">
      <view class="list-content">
        <view class="list-box">
          <view class="box" v-if="JSON.stringify(props.dataInfo) !== '{}'">
            <!-- 头部 -->
            <Header
              :dataInfo="dataInfo"
              :type="MainType.PeasantHousehold"
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
                <base-info-eva v-if="tabVal === 0" :dataInfo="dataInfo" />

                <!-- 房屋主体评估 -->
                <house-subject-eva
                  v-if="tabVal === 1"
                  :dataList="dataInfo.immigrantHouseList"
                  :dataInfo="dataInfo"
                  @update-data="updateData"
                />

                <!-- 房屋装修评估 -->
                <house-decoration-eva
                  v-if="tabVal === 2"
                  :dataList="dataInfo.assetHouseFitUpList"
                  :dataInfo="dataInfo"
                  @delete-house-decoration="deleteHouseDecoration"
                  @update-data="updateData"
                />

                <!-- 附属设施评估 -->
                <accessory-eva
                  v-if="tabVal === 3"
                  :dataInfo="dataInfo"
                  :dataList="dataInfo.immigrantAppendantList"
                  @delete-accessory="deleteAccessory"
                  @update-data="updateData"
                />

                <!-- 零星（林）果木评估 -->
                <tree-eva
                  v-if="tabVal === 4"
                  :dataList="dataInfo.immigrantTreeList"
                  :dataInfo="dataInfo"
                  @delete-tree="deleteTree"
                  @update-data="updateData"
                />

                <!-- 土地基本情况评估 -->
                <land-eva
                  v-if="tabVal === 5"
                  :dataInfo="dataInfo"
                  :dataList="dataInfo.assetLandList"
                  @delete-land="deleteLand"
                  @update-data="updateData"
                />

                <!-- 土地青苗及附着物评估 -->
                <seedlings-eva
                  v-if="tabVal === 6"
                  :dataList="dataInfo.assetAppendantList"
                  :dataInfo="dataInfo"
                  @delete-seedlings="deleteSeedlings"
                  @update-data="updateData"
                />

                <!-- 坟墓评估 -->
                <!-- <grave-eva
                  v-if="tabVal === 7"
                  :dataList="dataInfo.immigrantGraveList"
                  :dataInfo="dataInfo"
                /> -->
              </view>
            </view>
          </view>

          <view class="box" v-else>
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
import Header from '@/components/Header/EvaIndex.vue'
import Tabs from '@/components/Tabs/Index.vue'
import baseInfoEva from '../baseInfoEva/index.vue' // 引入居民户信息组件
import houseSubjectEva from '../../common/houseSubjectEva/index.vue' // 引入人房屋主体评估组件
import houseDecorationEva from '../../common/houseDecorationEva/index.vue' // 引入房屋装修组件
import accessoryEva from '../../common/accessoryEva/index.vue' // 引入附属设施评估组件
import treeEva from '../../common/treeEva/index.vue' // 引入零星（林）果木评估组件
import landEva from '../../common/landEva/index.vue' // 引入土地基本情况评估组件
import seedlingsEva from '../../common/seedlingsEva/index.vue' // 引入土地青苗及附着物评估组件
// import graveEva from '../graveEva/index.vue' // 引入坟墓评估组件

import {
  deleteImpLandlordHouseFitUpApi,
  deleteImpLandlordAppendantApi,
  deleteImpLandlordTreeApi,
  deleteImpLandlordAssetLandApi,
  deleteImpLandlordAssetAppendantApi
} from '@/service'

import iconHouseholdDef from '@/static/images/icon_household_default.png' // 引入居民户信息默认 icon
import iconHouseholdSel from '@/static/images/icon_household_select.png' // 引入居民户信息选中 icon
import iconHouseDef from '@/static/images/icon_house_default.png' // 引入房屋主体评估默认 icon
import iconHouseSel from '@/static/images/icon_house_select.png' // 引入房屋主体评估选中 icon
import iconDecorationDef from '@/static/images/icon_decoration_default.png' // 引入房屋装修评估默认 icon
import iconDecorationSel from '@/static/images/icon_decoration_select.png' // 引入房屋装修评估选中 icon
import iconAccessoryDef from '@/static/images/icon_accessory_default.png' // 引入附属设施评估默认 icon
import iconAccessorySel from '@/static/images/icon_accessory_select.png' // 引入附属设施评估选中 icon
import iconTreeDef from '@/static/images/icon_tree_default.png' // 引入零星(林)果木评估默认 icon
import iconTreeSel from '@/static/images/icon_tree_select.png' // 引入零星(林)果木评估选中 icon
import iconLandDef from '@/static/images/icon_land_default.png' // 引入土地基本情况评估默认 icon
import iconLandSel from '@/static/images/icon_land_select.png' // 引入土地基本情况评估选中 icon
import iconSeedlingsDef from '@/static/images/icon_seedlings_default.png' // 引入土地青苗及附着物评估默认 icon
import iconSeedlingsSel from '@/static/images/icon_seedlings_select.png' // 引入土地青苗及附着物评估选中 icon
// import iconGraveDef from '@/static/images/icon_grave_default.png' // 引入坟墓评估默认 icon
// import iconGraveSel from '@/static/images/icon_grave_select.png' // 引入坟墓评估选中 icon

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
  const {
    immigrantHouseList,
    assetHouseFitUpList,
    immigrantAppendantList,
    immigrantTreeList,
    assetLandList,
    assetAppendantList
  } = props.dataInfo
  return [
    {
      label: '居民户信息',
      value: 0,
      filled: true,
      defIcon: iconHouseholdDef,
      selIcon: iconHouseholdSel
    },
    {
      label: '房屋主体评估',
      value: 1,
      filled: isNotNullArray(immigrantHouseList),
      defIcon: iconHouseDef,
      selIcon: iconHouseSel
    },
    {
      label: '房屋装修评估',
      value: 2,
      filled: isNotNullArray(assetHouseFitUpList),
      defIcon: iconDecorationDef,
      selIcon: iconDecorationSel
    },
    {
      label: '附属物设施评估',
      value: 3,
      filled: isNotNullArray(immigrantAppendantList),
      defIcon: iconAccessoryDef,
      selIcon: iconAccessorySel
    },
    {
      label: '零星 (林) 果木评估',
      value: 4,
      filled: isNotNullArray(immigrantTreeList),
      defIcon: iconTreeDef,
      selIcon: iconTreeSel
    },
    {
      label: '土地基本情况评估',
      value: 5,
      filled: isNotNullArray(assetLandList),
      defIcon: iconLandDef,
      selIcon: iconLandSel
    },
    {
      label: '土地青苗及附着物评估',
      value: 6,
      filled: isNotNullArray(assetAppendantList),
      defIcon: iconSeedlingsDef,
      selIcon: iconSeedlingsSel
    }
    // {
    //   label: '坟墓评估',
    //   value: 7,
    //   filled: isNotNullArray(immigrantGraveList),
    //   defIcon: iconGraveDef,
    //   selIcon: iconGraveSel
    // }
  ]
})

const tabVal = ref<number>(0)
const emit = defineEmits(['updateData'])

// 是否为空数组
const isNotNullArray = (arr: any) => {
  return arr && Array.isArray(arr) && arr.length
}

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
 * 房屋主体评估 - 删除
 * @param{Object} data 被删除的行信息
 * @param{Object} reason 删除原因（填报阶段没有此参数，复核阶段有此参数）
 */
// const deleteHouse = (data: any, reason?: string) => {
//   deleteImpLandlordHouseApi(props.dataInfo.uid, data.uid, reason)
//     .then((res) => {
//       if (res) {
//         showToast(SUCCESS_MSG)
//         updateData()
//       }
//     })
//     .catch(() => {
//       showToast(ERROR_MSG)
//     })
// }

/**
 * 房屋装修评估 - 删除
 * @param{Object} data 被删除的行信息
 * @param{Object} reason 删除原因（填报阶段没有此参数，复核阶段有此参数）
 */
const deleteHouseDecoration = (data: any, reason?: string) => {
  deleteImpLandlordHouseFitUpApi(props.dataInfo.uid, data.uid, reason)
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
 * 附属设施评估 - 删除
 * @param{Object} data 被删除的行信息
 * @param{Object} reason 删除原因（填报阶段没有此参数，复核阶段有此参数）
 */
const deleteAccessory = (data: any, reason?: string) => {
  deleteImpLandlordAppendantApi(props.dataInfo.uid, data.uid, reason)
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
 * 零星(林)果木评估 - 删除
 * @param{Object} data 被删除的行信息
 * @param{Object} reason 删除原因（填报阶段没有此参数，复核阶段有此参数）
 */
const deleteTree = (data: any, reason?: string) => {
  deleteImpLandlordTreeApi(props.dataInfo.uid, data.uid, reason)
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

/**
 * 坟墓评估 - 删除
 * @param data
 */
// const deleteGrave = (data: any) => {
//   deleteImpLandlordGraveApi(props.dataInfo.uid, data.uid)
//     .then((res) => {
//       if (res) {
//         showToast(SUCCESS_MSG)
//         updateData()
//       }
//     })
//     .catch((e) => {
//       showToast(ERROR_MSG)
//     })
// }

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
