<template>
  <view class="main-wrap">
    <!-- 移民实施阶段 —— 个体工商户评估 -->
    <Back title="个体工商户评估" />

    <view class="main-cont">
      <view class="list-content">
        <view class="list-box">
          <view class="box" v-if="JSON.stringify(props.dataInfo) !== '{}'">
            <!-- 头部 -->
            <Header
              :dataInfo="dataInfo"
              :type="MainType.IndividualHousehold"
              :templateType="PrintType.printIndividualHousehold"
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
                <!-- 基本信息 -->
                <base-info-eva v-if="tabVal === 0" :dataInfo="dataInfo.company" />

                <!-- 房屋主体评估 -->
                <house-subject-eva
                  v-if="tabVal === 1"
                  :dataList="dataInfo.immigrantHouseList"
                  :dataInfo="dataInfo"
                  @delete-house="deleteHouse"
                />

                <!-- 房屋装修评估 -->
                <house-decoration-eva
                  v-if="tabVal === 2"
                  :dataList="dataInfo.assetHouseFitUpList"
                  :dataInfo="dataInfo"
                  @delete-house="deleteHouseDecoration"
                />

                <!-- 附属设施评估 -->
                <accessory-eva
                  v-if="tabVal === 3"
                  :dataInfo="dataInfo"
                  :dataList="dataInfo.immigrantAppendantList"
                  @delete-accessory="deleteAccessory"
                />

                <!-- 零星(林)果木信息 -->
                <tree-eva
                  v-if="tabVal === 4"
                  :dataList="dataInfo.immigrantTreeList"
                  :dataInfo="dataInfo"
                  @delete-tree="deleteTree"
                />

                <!-- 土地基本情况评估 -->
                <land-eva
                  v-if="tabVal === 5"
                  :dataList="dataInfo.assetLandList"
                  :dataInfo="dataInfo"
                  @delete-land="deleteLand"
                />

                <!-- 土地青苗及附着物评估 -->
                <seedlings-eva
                  v-if="tabVal === 6"
                  :dataList="dataInfo.assetAppendantList"
                  :dataInfo="dataInfo"
                  @delete-seedlings="deleteSeedlings"
                />

                <!-- 设施设备评估 -->
                <equipment-eva
                  v-if="tabVal === 7"
                  :dataList="dataInfo.immigrantEquipmentList"
                  :dataInfo="dataInfo"
                  @delete-equipment="deleteEquipment"
                />
              </view>
            </view>
          </view>

          <view class="box" v-else>
            <view class="null-wrapper">
              <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
              <view class="tips">请先选择要填报的个体工商户</view>
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
import { MainType, PrintType } from '@/types/common'
import Back from '@/components/Back/Index.vue'
import Header from '@/components/Header/Index.vue'
import Tabs from '@/components/Tabs/Index.vue'
import baseInfoEva from '../baseInfoEva/index.vue' // 引入基本信息组件
import houseSubjectEva from '../../common/houseSubjectEva/index.vue' // 引入房屋主体评估组件
import houseDecorationEva from '../../common/houseDecorationEva/index.vue' // 引入房屋装修评估组件
import accessoryEva from '../../common/accessoryEva/index.vue' // 引入附属设施评估组件
import treeEva from '../../common/treeEva/index.vue' // 引入零星（林）果木评估组件
import landEva from '../../common/landEva/index.vue' // 引入土地基本情况评估组件
import seedlingsEva from '../../common/seedingsEva/index.vue' // 引入土地青苗及附着物评估组件
import equipmentEva from '../../common/equipmentEva/index.vue' // 引入设施设备评估组件

import {
  deleteLandlordHouseApi,
  deleteLandlordEquipmentApi,
  updateLandlordImmigrantFileApi,
  deleteLandlordPeopleApi
} from '@/service'

import iconBaseDef from '@/static/images/icon_base_default.png' // 引入基本信息默认 icon
import iconBaseSel from '@/static/images/icon_base_select.png' // 引入基本信息选中 icon
import iconHouseDef from '@/static/images/icon_house_default.png' // 引入房屋主体评估默认 icon
import iconHouseSel from '@/static/images/icon_house_select.png' // 引入房屋主体评估选中 icon
import iconDecorationDef from '@/static/images/icon_decoration_default.png' // 引入房屋装修评估默认 icon
import iconDecorationSel from '@/static/images/icon_decoration_select.png' // 引入房屋装修评估选中 icon
import iconAccessoryDef from '@/static/images/icon_appurtenance_default.png' // 引入附属设施评估默认 icon
import iconAccessorySel from '@/static/images/icon_appurtenance_select.png' // 引入附属设施评估选中 icon
import iconTreeDef from '@/static/images/icon_tree_default.png' // 引入零星(林)果木评估默认 icon
import iconTreeSel from '@/static/images/icon_tree_select.png' // 引入零星(林)果木评估选中
import iconLandDef from '@/static/images/icon_land_default.png' // 引入土地基本情况评估默认 icon
import iconLandSel from '@/static/images/icon_land_select.png' // 引入土地基本情况评估选中 icon
import iconSeedlingsDef from '@/static/images/icon_seedlings_default.png' // 引入土地青苗及附着物评估默认 icon
import iconSeedlingsSel from '@/static/images/icon_seedlings_select.png' // 引入土地青苗及附着物评估选中 icon
import iconEquipmentDef from '@/static/images/icon_equipment_default.png' // 引入设施设备评估默认 icon
import iconEquipmentSel from '@/static/images/icon_equipment_select.png' // 引入设施设备评估选中 icon

interface PropsType {
  dataInfo: any
}

const props = withDefaults(defineProps<PropsType>(), {
  dataInfo: {}
})

const tabsList = computed(() => {
  const {
    immigrantHouseList,
    assetHouseFitUpList,
    immigrantAppendantList,
    immigrantTreeList,
    assetLandList,
    assetAppendantList,
    immigrantEquipmentList
  } = props.dataInfo
  return [
    {
      label: '基本信息',
      value: 0,
      filled: true,
      defIcon: iconBaseDef,
      selIcon: iconBaseSel
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
      label: '附属设施评估',
      value: 3,
      filled: isNotNullArray(immigrantAppendantList),
      defIcon: iconAccessoryDef,
      selIcon: iconAccessorySel
    },
    {
      label: '零星(林)果木评估',
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
    },
    {
      label: '设施设备评估',
      value: 7,
      filled: isNotNullArray(immigrantEquipmentList),
      defIcon: iconEquipmentDef,
      selIcon: iconEquipmentSel
    }
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

// 更新整体数据
const updateData = () => {
  emit('updateData', props.dataInfo.uid)
}

/**
 * 房屋主体评估 - 删除
 * @param(Object) data 被删除的行信息
 */
const deleteHouse = (data: any) => {
  deleteLandlordHouseApi(props.dataInfo.uid, data.uid)
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
 * 房屋装修评估 - 删除
 * @param{Object} data 被删除的行信息
 * @param{Object} reason 删除原因（填报阶段没有此参数，复核阶段有此参数）
 */
const deleteHouseDecoration = (data: any, reason?: string) => {
  deleteLandlordHouseApi(props.dataInfo.uid, data.uid, reason)
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
  deleteLandlordHouseApi(props.dataInfo.uid, data.uid, reason)
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
  deleteLandlordHouseApi(props.dataInfo.uid, data.uid, reason)
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
  deleteLandlordPeopleApi(props.dataInfo.uid, data.uid, reason)
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
  deleteLandlordPeopleApi(props.dataInfo.uid, data.uid, reason)
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

/*
 * 设施设备评估 - 删除
 * @param(Object) data 被删除的行信息
 */
const deleteEquipment = (data: any) => {
  deleteLandlordEquipmentApi(props.dataInfo.uid, data.uid)
    .then((res: any) => {
      if (res) {
        showToast(SUCCESS_MSG)
        updateData()
      }
    })
    .catch(() => {
      showToast(ERROR_MSG)
    })
}

// 更新照片
const updateAttachment = (params: any) => {
  updateLandlordImmigrantFileApi(props.dataInfo.uid, params)
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
</script>

<style lang="scss">
.main-wrap {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
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
