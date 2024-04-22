<template>
  <view class="main-wrap">
    <!-- 移民实物采集阶段  —— 居民户信息采集 -->
    <Back class="main-nav" title="居民户填报" />

    <view class="main-cont">
      <view class="list-content">
        <view class="list-box">
          <view class="box" v-if="JSON.stringify(props.dataInfo) !== '{}'">
            <!-- 头部 -->
            <Header
              :dataInfo="dataInfo"
              :type="MainType.PeasantHousehold"
              :templateType="PrintType.print"
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
                <household-info v-if="tabVal === 0" :dataInfo="dataInfo" />

                <!-- 人口信息 -->
                <demographic-info
                  v-if="tabVal === 1"
                  :dataList="dataInfo.demographicList"
                  :dataInfo="dataInfo"
                  :occupationOptions="occupationOptions"
                  :populationSortTree="populationSortTree"
                  :updateLogList="fmtUpdateLog(dataInfo.updateLogList, '人口信息')"
                  @delete-demographic="deleteDemographic"
                />

                <!-- 房屋信息 -->
                <house-info
                  v-if="tabVal === 2"
                  :dataList="dataInfo.immigrantHouseList"
                  :dataInfo="dataInfo"
                  :updateLogList="fmtUpdateLog(dataInfo.updateLogList, '房屋信息')"
                  :mainType="MainType.PeasantHousehold"
                  @delete-house="deleteHouse"
                />

                <!-- 附属物信息 -->
                <appendant-info
                  v-if="tabVal === 3"
                  :dataInfo="dataInfo"
                  :dataList="dataInfo.immigrantAppendantList"
                  :updateLogList="fmtUpdateLog(dataInfo.updateLogList, '附属物信息')"
                  :mainType="MainType.PeasantHousehold"
                  @update-data="updateData"
                />

                <!-- 零星（林）果木信息 -->
                <tree-info
                  v-if="tabVal === 4"
                  :dataList="dataInfo.immigrantTreeList"
                  :dataInfo="dataInfo"
                  :updateLogList="fmtUpdateLog(dataInfo.updateLogList, '果树信息')"
                  :mainType="MainType.PeasantHousehold"
                />

                <!-- 坟墓信息 -->
                <grave-info
                  v-if="tabVal === 5"
                  :dataInfo="dataInfo"
                  :dataList="dataInfo.immigrantGraveList"
                  :updateLogList="fmtUpdateLog(dataInfo.updateLogList, '坟墓信息')"
                  @delete-grave-info="deleteGraveInfo"
                />

                <!-- 家庭收入信息 -->
                <revenue-info
                  v-if="tabVal === 6"
                  :dataList="dataInfo.immigrantIncomeList"
                  :dataInfo="dataInfo"
                  :updateLogList="fmtUpdateLog(dataInfo.updateLogList, '收入信息')"
                  @update-data="updateData"
                />

                <!-- 安置意愿信息 -->
                <willingness-info
                  v-if="tabVal === 7"
                  :willData="dataInfo.immigrantWill"
                  :dataInfo="dataInfo"
                  :updateLog="fmtUpdateLog(dataInfo.updateLogList, '安置意愿信息')"
                  @submit="updateWillingnessInfo"
                />

                <!-- 附件上传 -->
                <attachment-upload
                  v-if="tabVal === 8"
                  :dataInfo="dataInfo"
                  @submit="updateAttachment"
                />
              </view>
            </view>
          </view>

          <view class="box" v-else>
            <view class="null-wrapper">
              <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
              <view class="tips">请先选择要填报的居民户</view>
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
import { fmtUpdateLog } from '@/utils'
import { MainType, PrintType } from '@/types/common'
import Back from '@/components/Back/Index.vue'
import Header from '@/components/Header/Index.vue'
import Tabs from '@/components/Tabs/Index.vue'
import householdInfo from '../householdInfo/index.vue' // 引入居民户信息组件
import demographicInfo from '../demographicInfo/index.vue' // 引入人口信息组件
import houseInfo from '../../common/houseInfo/index.vue' // 引入房屋信息组件
import appendantInfo from '../../common/appendantInfo/index.vue' // 引入附属物信息组件
import treeInfo from '../../common/treeInfo/index.vue' // 引入零星（林）果木信息组件
import graveInfo from '../graveInfo/index.vue' // 引入坟墓信息组件
import revenueInfo from '../revenueInfo/index.vue' // 引入安置意愿信息组件
import willingnessInfo from '../willingnessInfo/index.vue' // 引入安置意愿信息组件
import attachmentUpload from '../../common/attachmentUpload/index.vue' // 引入附件上传组件

import {
  deleteLandlordPeopleApi,
  deleteLandlordHouseApi,
  deleteLandlordGraveApi,
  updateLandlordWillApi,
  updateLandlordImmigrantFileApi
} from '@/service'

import iconHouseholdDef from '@/static/images/icon_household_default.png' // 引入居民户信息默认 icon
import iconHouseholdSel from '@/static/images/icon_household_select.png' // 引入居民户信息选中 icon
import iconDemographicDef from '@/static/images/icon_demographic_default.png' // 引入人口信息默认 icon
import iconDemographicSel from '@/static/images/icon_demographic_select.png' // 引入人口信息选中 icon
import iconHouseDef from '@/static/images/icon_house_default.png' // 引入房屋信息默认 icon
import iconHouseSel from '@/static/images/icon_house_select.png' // 引入房屋信息选中 icon
import iconAccessoryDef from '@/static/images/icon_accessory_default.png' // 引入附属物信息默认 icon
import iconAccessorySel from '@/static/images/icon_accessory_select.png' // 引入附属物信息选中 icon
import iconTreeDef from '@/static/images/icon_tree_default.png' // 引入零星(林)果木默认 icon
import iconTreeSel from '@/static/images/icon_tree_select.png' // 引入零星(林)果木默认 icon
import iconGraveDef from '@/static/images/icon_grave_default.png' // 引入坟墓信息默认 icon
import iconGraveSel from '@/static/images/icon_grave_select.png' // 引入坟墓信息选中 icon
import iconAttachmentDef from '@/static/images/icon_attachment_default.png' // 引入附件上传默认 icon
import iconAttachmentSel from '@/static/images/icon_attachment_select.png' // 引入附件上传选中 icon
import iconRevenueDef from '@/static/images/icon_revenue_default.png' // 引入家庭收入信息默认 icon
import iconRevenueSel from '@/static/images/icon_revenue_select.png' // 引入家庭收入信息默认 icon
import iconWillingnessDef from '@/static/images/icon_willingness_default.png' // 引入安置意愿调查默认 icon
import iconWillingnessSel from '@/static/images/icon_willingness_select.png' // 引入安置意愿调查默认 icon

const props = defineProps({
  dataInfo: {
    type: Object,
    default: () => {}
  },
  occupationOptions: {
    type: Array as any,
    default: () => []
  },
  populationSortTree: {
    type: Array as any,
    default: () => []
  },
})

const tabsList = computed(() => {
  const {
    demographicList,
    immigrantAppendantList,
    immigrantGraveList,
    immigrantHouseList,
    immigrantIncomeList,
    immigrantTreeList,
    immigrantWill,
    immigrantFile
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
      label: '人口信息',
      value: 1,
      filled: isNotNullArray(demographicList),
      defIcon: iconDemographicDef,
      selIcon: iconDemographicSel
    },
    {
      label: '房屋信息',
      value: 2,
      filled: isNotNullArray(immigrantHouseList),
      defIcon: iconHouseDef,
      selIcon: iconHouseSel
    },
    {
      label: '附属物信息',
      value: 3,
      filled: isNotNullArray(immigrantAppendantList),
      defIcon: iconAccessoryDef,
      selIcon: iconAccessorySel
    },
    {
      label: '零星 (林) 果木',
      value: 4,
      filled: isNotNullArray(immigrantTreeList),
      defIcon: iconTreeDef,
      selIcon: iconTreeSel
    },
    {
      label: '坟墓信息',
      value: 5,
      filled: isNotNullArray(immigrantGraveList),
      defIcon: iconGraveDef,
      selIcon: iconGraveSel
    },
    {
      label: '家庭收入信息',
      value: 6,
      filled: isNotNullArray(immigrantIncomeList),
      defIcon: iconRevenueDef,
      selIcon: iconRevenueSel
    },
    {
      label: '安置意愿信息',
      value: 7,
      filled: immigrantWill && (immigrantWill.productionType || immigrantWill.removalType),
      defIcon: iconWillingnessDef,
      selIcon: iconWillingnessSel
    },
    {
      label: '附件上传',
      value: 8,
      filled: immigrantFile && immigrantFile.otherPic && immigrantFile.otherPic !== '[]',
      defIcon: iconAttachmentDef,
      selIcon: iconAttachmentSel
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

/**
 * 人口信息 - 删除
 * @param{Object} data 被删除的行信息
 * @param{Object} reason 删除原因（填报阶段没有此参数，复核阶段有此参数）
 */
const deleteDemographic = (data: any, reason?: string) => {
  console.log(data,reason,'删除的是什么')
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
 * 房屋信息 - 删除
 * @param{Object} data 被删除的行信息
 * @param{Object} reason 删除原因（填报阶段没有此参数，复核阶段有此参数）
 */
const deleteHouse = (data: any, reason?: string) => {
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

/*
 * 更新安置意愿信息
 * @param(Array) data
 */
const updateWillingnessInfo = (data: any) => {
  const params = { ...data }
  updateLandlordWillApi(props.dataInfo.uid, params)
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

// 更新附件
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
