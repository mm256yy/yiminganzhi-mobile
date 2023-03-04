<template>
  <view class="main-wrap">
    <Back title="村集体填报" />

    <view class="main-cont">
      <view class="list-content">
        <view :class="['list-box', showExpand ? '' : 'list-expand']">
          <view class="box">
            <view class="list-header">
              <view class="list-header-lt" @click="expandToggle">
                <image class="expand-img" src="@/static/images/expand.png" mode="scaleToFill" />
              </view>

              <view class="list-header-rt">
                <view class="list-header-left">
                  <view class="name">大溪村村集体</view>
                  <view class="account-no">JT1030004</view>
                </view>

                <view class="list-header-right">
                  <view class="btn-wrapper print">
                    <image class="icon" src="@/static/images/icon_print.png" mode="scaleToFill" />
                    <text class="txt">打印表格</text>
                  </view>

                  <view class="btn-wrapper report">
                    <image class="icon" src="@/static/images/icon_report.png" mode="scaleToFill" />
                    <text class="txt">数据上报</text>
                  </view>
                </view>
              </view>
            </view>

            <view class="tabs-content">
              <!-- tab 切换 -->
              <Tabs :dataList="tabsList" :expand="showExpand" @select-tabs="selectTabs" />

              <!-- 村集体基本情况 -->
              <base-info v-if="tabVal === 1" :dataInfo="dataInfo" />

              <!-- 房屋信息 -->
              <house-info
                v-if="tabVal === 2"
                :dataList="dataInfo.immigrantHouseList"
                @delete-house="deleteHouse"
              />

              <!-- 零星（林）果木信息 -->
              <tree-info
                v-if="tabVal === 3"
                :dataList="dataInfo.immigrantTreeList"
                :dataInfo="dataInfo"
                @delete-tree="deleteTree"
                @update-fruit-tree-info="updateFruitTreeInfo"
              />

              <!-- 附属物信息 -->
              <accessory-info
                v-if="tabVal === 4"
                :dataList="dataInfo.immigrantAppendantList"
                @submit="updateAccessoryInfo"
              />

              <!-- 坟墓信息 -->
              <grave-info
                v-if="tabVal === 5"
                :dataList="dataInfo.immigrantGraveList"
                :dataInfo="dataInfo"
                @delete-grave-info="deleteGraveInfo"
              />

              <!-- 农村专项及设施 -->
              <equipment-info
                v-if="tabVal === 6"
                :dataList="dataInfo.immigrantFacilitiesList"
                :dataInfo="dataInfo"
                @delete-equipment="deleteEquipment"
              />

              <!-- 照片上传 -->
              <photo-upload v-if="tabVal === 7" />
            </view>
          </view>
        </view>
      </view>

      <view :class="['tree-wrapper', showExpand ? 'w-0' : 'expand']">
        <Tree :treeData="treeData" :iconSrc="iconSrc" @tree-item-click="treeItemClick" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Back from '@/components/Back/Index.vue'
import Tree from '@/components/Tree/Index.vue'
import Tabs from '@/components/Tabs/Index.vue'
import baseInfo from '../baseInfo/index.vue' // 引入村集体基本情况组件
import houseInfo from '../../common/houseInfo/index.vue' // 引入房屋信息组件
import treeInfo from '../../common/treeInfo/index.vue' // 引入零星（林）果木信息组件
import accessoryInfo from '../../common/accessoryInfo/index.vue' // 引入附属物信息组件
import graveInfo from '../graveInfo/index.vue' // 引入坟墓信息组件
import equipmentInfo from '../equipmentInfo/index.vue' // 引入农村专项及设施组件
import photoUpload from '../photoUpload/index.vue' // 引入照片上传组件

import {
  deleteLandlordHouseApi,
  deleteLandlordTreeApi,
  updateLandlordTreeApi,
  updateLandlordAppendantApi,
  deleteLandlordFacilitiesApi,
  deleteLandlordGraveApi
} from '@/service'

import iconSrc from '@/static/images/icon_add_enterprise.png' // 侧边栏，添加 icon
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

const props = defineProps({
  dataInfo: {
    type: Object,
    default: () => {}
  },
  treeData: {
    // 左侧树列表
    type: Array,
    default: () => []
  }
})

const tabsList = ref([
  { label: '村集体基本情况', value: 1, defIcon: iconBaseDef, selIcon: iconBaseSel },
  { label: '房屋信息', value: 2, defIcon: iconHouseDef, selIcon: iconHouseSel },
  { label: '零星 (林) 果木', value: 3, defIcon: iconTreeDef, selIcon: iconTreeSel },
  { label: '附属物信息', value: 4, defIcon: iconAppurtenanceDef, selIcon: iconAppurtenanceSel },
  { label: '坟墓信息', value: 5, defIcon: iconGraveDef, selIcon: iconGraveSel },
  { label: '农村专项及设施', value: 6, defIcon: iconEquipmentDef, selIcon: iconEquipmentSel },
  { label: '照片上传', value: 7, defIcon: iconPhotoDef, selIcon: iconPhotoSel }
])

const showExpand = ref<boolean>(false)
const tabVal = ref<number>(1)
const emit = defineEmits(['treeItemClick'])

const treeItemClick = (data: any) => {
  console.log(data, 'data')
  emit('treeItemClick', data)
}

const expandToggle = () => {
  showExpand.value = !showExpand.value
}

// tab 切换
const selectTabs = (data: any) => {
  tabVal.value = data.value
}

/**
 * 房屋信息 - 删除
 * @param(Object) data 被删除的行信息
 */
const deleteHouse = (data: any) => {
  deleteLandlordHouseApi(data.uid, data.id).then((res) => {
    console.log('res:', res)
  })
}

/**
 * 零星（林）果木信息 - 删除
 * @param(Object) data 被删除的行信息
 */
const deleteTree = (data: any) => {
  deleteLandlordTreeApi(data.uid, data.id).then((res) => {
    console.log('res:', res)
  })
}

/**
 * 零星（林）果木信息 - 更新
 * @param(Array) data 提交的参数集合
 */
const updateFruitTreeInfo = (data: any) => {
  const params = { ...data }
  updateLandlordTreeApi(props.dataInfo.uid, params).then((res) => {
    console.log('res:', res)
  })
}

/**
 * 更新附属物信息
 * @param(Array) data
 */
const updateAccessoryInfo = (data: any) => {
  const params = { ...data }
  updateLandlordAppendantApi(props.dataInfo.uid, params).then((res) => {
    console.log('res:', res)
  })
}

/**
 * 删除农村专项设施设备信息
 * @param data
 */
const deleteEquipment = (data: any) => {
  deleteLandlordFacilitiesApi(props.dataInfo.uid, data.id).then((res) => {
    console.log('res:', res)
  })
}

/**
 * 删除坟墓信息
 * @param data
 */
const deleteGraveInfo = (data: any) => {
  deleteLandlordGraveApi(props.dataInfo.uid, data.id).then((res) => {
    console.log('res:', res)
  })
}
</script>

<style lang="scss">
.main-wrap {
  display: flex;
  flex-direction: column;
  flex: 1;
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

.expand {
  width: 200rpx;
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

.list-expand {
  padding-left: 206rpx;
}

.box {
  flex: 1;
  background-color: #ffffff;
}

.list-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 33rpx;
  padding: 0 6rpx 0 9rpx;
  border-bottom: 1rpx solid #e1e4ea;

  .list-header-lt {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 12rpx;
    height: 33rpx;

    .expand-img {
      width: 12rpx;
      height: 12rpx;
      margin-right: 4rpx;
    }
  }

  .list-header-rt {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    height: 33rpx;

    .list-header-left {
      display: flex;
      flex-direction: row;
      align-items: center;

      .name {
        margin: 0 6rpx 0 10rpx;
        font-size: 13rpx;
        color: #171718;
      }

      .account-no {
        font-size: 13rpx;
        color: #1c5df1;
      }
    }

    .list-header-right {
      display: flex;
      flex-direction: row;
      align-items: center;

      .btn-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 68rpx;
        height: 23rpx;
        border-radius: 11rpx;

        &:active {
          opacity: 0.7;
        }

        &.print {
          margin-right: 7rpx;
          background-color: #30a952;
        }

        &.report {
          background-color: #3e73ec;
        }

        .icon {
          width: 7rpx;
          height: 7rpx;
          margin-right: 3rpx;
        }

        .txt {
          font-size: 9rpx;
          color: #fff;
        }
      }
    }
  }
}

.tabs-content {
  display: flex;
  width: 100%;
  height: calc(100vh - 33rpx - 12rpx - 33rpx - var(--status-bar-height));
  padding: 6rpx;
  background-color: #fff;
  box-sizing: border-box;
  flex-direction: column;
}

.tree-wrapper {
  position: absolute;
  top: 6rpx;
  left: 6rpx;
  z-index: 3;
  display: flex;
  height: calc(100vh - 33rpx - 12rpx - var(--status-bar-height));
  overflow-y: scroll;
  background-color: #fff;
  border-radius: 5px;
  flex-direction: column;

  &.w-0 {
    width: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  &::-moz-scrollbar {
    display: none;
  }
}
</style>
