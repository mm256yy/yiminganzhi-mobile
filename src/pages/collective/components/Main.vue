<template>
  <view class="main-wrap">
    <Back title="村集体填报" />

    <view class="main-cont">
      <view class="list-content">
        <view class="list-box">
          <view class="box" v-if="JSON.stringify(props.dataInfo) !== '{}'">
            <!-- 头部 -->
            <Header
              :dataInfo="dataInfo"
              :type="MainType.Village"
              :templateType="PrintType.printCollective"
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
                <!-- 村集体基本情况 -->
                <base-info v-if="tabVal === 0" :dataInfo="dataInfo" />

                <!-- 房屋信息 -->
                <house-info
                  v-if="tabVal === 1"
                  :dataList="dataInfo.immigrantHouseList"
                  :dataInfo="dataInfo"
                  @delete-house="deleteHouse"
                />

                <!-- 零星（林）果木信息 -->
                <tree-info
                  v-if="tabVal === 2"
                  :dataList="dataInfo.immigrantTreeList"
                  :dataInfo="dataInfo"
                />

                <!-- 附属物信息 -->
                <appendant-info
                  v-if="tabVal === 3"
                  :dataInfo="dataInfo"
                  :dataList="dataInfo.immigrantAppendantList"
                  @update-data="updateData"
                />

                <!-- 坟墓信息 -->
                <grave-info
                  v-if="tabVal === 4"
                  :dataList="dataInfo.immigrantGraveList"
                  :dataInfo="dataInfo"
                  @delete-grave-info="deleteGraveInfo"
                />

                <!-- 农村专项及设施 -->
                <equipment-info
                  v-if="tabVal === 5"
                  :dataList="dataInfo.immigrantFacilitiesList"
                  :dataInfo="dataInfo"
                  @delete-equipment="deleteEquipment"
                />

                <!-- 照片上传 -->
                <attachment-upload
                  v-if="tabVal === 6"
                  :dataInfo="dataInfo"
                  @submit="updateAttachment"
                />
              </view>
            </view>
          </view>

          <view class="box" v-else>
            <view class="null-wrapper">
              <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
              <view class="tips">请先选择要填报的村集体</view>
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
import baseInfo from '../baseInfo/index.vue' // 引入村集体基本情况组件
import houseInfo from '../../common/houseInfo/index.vue' // 引入房屋信息组件
import treeInfo from '../../common/treeInfo/index.vue' // 引入零星（林）果木信息组件
import appendantInfo from '../../common/appendantInfo/index.vue' // 引入附属物信息组件
import graveInfo from '../graveInfo/index.vue' // 引入坟墓信息组件
import equipmentInfo from '../equipmentInfo/index.vue' // 引入农村专项及设施组件
import attachmentUpload from '../../common/attachmentUpload/index.vue' // 引入照片上传组件

import {
  deleteLandlordHouseApi,
  deleteLandlordFacilitiesApi,
  deleteLandlordGraveApi,
  updateLandlordImmigrantFileApi
} from '@/service'

import iconBaseDef from '@/static/images/icon_collect_info_default.png' // 引入村集体基本情况默认 icon
import iconBaseSel from '@/static/images/icon_collect_info_select.png' // 引入村集体基本情况选中 icon
import iconHouseDef from '@/static/images/icon_ent_house_default.png' // 引入房屋信息默认 icon
import iconHouseSel from '@/static/images/icon_ent_house_select.png' // 引入房屋信息选中 icon
import iconTreeDef from '@/static/images/icon_tree_default.png' // 引入零星(林)果木默认 icon
import iconTreeSel from '@/static/images/icon_tree_select.png' // 引入零星(林)果木默认 icon icon
import iconAppurtenanceDef from '@/static/images/icon_appurtenance_default.png' // 引入附属物信息默认 icon
import iconAppurtenanceSel from '@/static/images/icon_appurtenance_select.png' // 引入附属物信息选中 icon
import iconGraveDef from '@/static/images/icon_grave_default.png' // 引入坟墓默认 icon
import iconGraveSel from '@/static/images/icon_grave_select.png' // 引入坟墓选中 icon
import iconEquipmentDef from '@/static/images/icon_collect_equipment_default.png' // 引入农村专项及设施默认 icon
import iconEquipmentSel from '@/static/images/icon_collect_equipment_select.png' // 引入农村专项及设施选中 icon
import iconPhotoDef from '@/static/images/icon_photo_default.png' // 引入照片上传默认 icon
import iconPhotoSel from '@/static/images/icon_photo_select.png' // 引入照片上传默认 icon

interface PropsType {
  dataInfo: any
}

const props = withDefaults(defineProps<PropsType>(), {
  dataInfo: {}
})

const tabsList = computed(() => {
  const {
    immigrantAppendantList,
    immigrantGraveList,
    immigrantHouseList,
    immigrantTreeList,
    immigrantFacilitiesList,
    immigrantFile
  } = props.dataInfo
  return [
    {
      label: '村集体基本情况',
      value: 0,
      filled: true,
      defIcon: iconBaseDef,
      selIcon: iconBaseSel
    },
    {
      label: '房屋信息',
      value: 1,
      filled: isNotNullArray(immigrantHouseList),
      defIcon: iconHouseDef,
      selIcon: iconHouseSel
    },
    {
      label: '零星 (林) 果木',
      value: 2,
      filled: isNotNullArray(immigrantTreeList),
      defIcon: iconTreeDef,
      selIcon: iconTreeSel
    },
    {
      label: '附属物信息',
      value: 3,
      filled: isNotNullArray(immigrantAppendantList),
      defIcon: iconAppurtenanceDef,
      selIcon: iconAppurtenanceSel
    },
    {
      label: '坟墓信息',
      value: 4,
      filled: isNotNullArray(immigrantGraveList),
      defIcon: iconGraveDef,
      selIcon: iconGraveSel
    },
    {
      label: '农村专项及设施',
      value: 5,
      filled: isNotNullArray(immigrantFacilitiesList),
      defIcon: iconEquipmentDef,
      selIcon: iconEquipmentSel
    },
    {
      label: '照片上传',
      value: 6,
      filled: immigrantFile && immigrantFile.otherPic,
      defIcon: iconPhotoDef,
      selIcon: iconPhotoSel
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
 * 房屋信息 - 删除
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
    .catch((e) => {
      showToast(ERROR_MSG)
    })
}

/**
 * 删除农村专项设施设备信息
 * @param data
 */
const deleteEquipment = (data: any) => {
  deleteLandlordFacilitiesApi(props.dataInfo.uid, data.uid)
    .then((res) => {
      if (res) {
        showToast(SUCCESS_MSG)
        updateData()
      }
    })
    .catch((e) => {
      showToast(ERROR_MSG)
    })
}

/**
 * 删除坟墓信息
 * @param data
 */
const deleteGraveInfo = (data: any) => {
  deleteLandlordGraveApi(props.dataInfo.uid, data.uid)
    .then((res) => {
      if (res) {
        showToast(SUCCESS_MSG)
        updateData()
      }
    })
    .catch((e) => {
      showToast(ERROR_MSG)
    })
}

// 更新附件
const updateAttachment = (params: any) => {
  updateLandlordImmigrantFileApi(props.dataInfo.uid, params)
    .then((res) => {
      if (res) {
        showToast(SUCCESS_MSG)
        updateData()
      }
    })
    .catch((e) => {
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
