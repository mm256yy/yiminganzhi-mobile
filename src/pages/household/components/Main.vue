<template>
  <view class="main-wrap">
    <Back class="main-nav" title="居民户填报" />

    <view class="main-cont">
      <view class="list-content">
        <view :class="['list-box', showExpand ? '' : 'list-expand']">
          <view class="box" v-if="JSON.stringify(props.dataInfo) !== '{}'">
            <!-- 头部 -->
            <Header
              :dataInfo="dataInfo"
              :type="MainType.PeasantHousehold"
              :templateType="PrintType.print"
              @update-tree="updateTree"
              @update-data="updateData"
              @expand-toggle="expandToggle"
            />

            <view class="tabs-content">
              <!-- tab 切换 -->
              <Tabs
                :dataList="tabsList"
                :expand="showExpand"
                :current-index="tabVal"
                @select-tabs="selectTabs"
              />

              <!-- 居民户信息 -->
              <household-info v-if="tabVal === 0" :dataInfo="dataInfo" @update-tree="updateTree" />

              <!-- 人口信息 -->
              <demographic-info
                v-if="tabVal === 1"
                :dataList="dataInfo.demographicList"
                :dataInfo="dataInfo"
                :occupationOptions="occupationOptions"
                @delete-demographic="deleteDemographic"
              />

              <!-- 房屋信息 -->
              <house-info
                v-if="tabVal === 2"
                :dataList="dataInfo.immigrantHouseList"
                :dataInfo="dataInfo"
                @delete-house="deleteHouse"
              />

              <!-- 附属物信息 -->
              <accessory-info
                v-if="tabVal === 3"
                :dataInfo="dataInfo"
                :dataList="dataInfo.immigrantAppendantList"
                @submit="updateAccessoryInfo"
              />

              <!-- 零星（林）果木信息 -->
              <tree-info
                v-if="tabVal === 4"
                :dataList="dataInfo.immigrantTreeList"
                :dataInfo="dataInfo"
                @delete-tree="deleteTree"
                @update-fruit-tree-info="updateFruitTreeInfo"
              />

              <!-- 坟墓信息 -->
              <grave-info v-if="tabVal === 5" :dataList="dataInfo.immigrantGraveList" />

              <!-- 家庭收入信息 -->
              <revenue-info
                v-if="tabVal === 6"
                :dataList="dataInfo.immigrantIncomeList"
                :dataInfo="dataInfo"
                @submit="updateRevenueInfo"
              />

              <!-- 安置意愿信息 -->
              <willingness-info
                v-if="tabVal === 7"
                :willData="dataInfo.immigrantWill"
                :dataInfo="dataInfo"
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

          <view class="box" v-else>
            <view class="null-wrapper">
              <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
              <view class="tips">请先选择要填报的居民户</view>
            </view>
          </view>
        </view>
      </view>

      <view :class="['tree-wrapper', showExpand ? 'w-0' : 'expand']">
        <Tree
          :treeData="props.treeData"
          :expend-codes="props.expendCodes"
          :uid="props.uid"
          :iconSrc="iconSrc"
          @tree-item-click="treeItemClick"
          @add-click="addClick('add')"
        />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import { routerForward } from '@/utils'
import { MainType, PrintType } from '@/types/common'
import Back from '@/components/Back/Index.vue'
import Header from '@/components/Header/Index.vue'
import Tree from '@/components/Tree/Index.vue'
import Tabs from '@/components/Tabs/Index.vue'
import householdInfo from '../householdInfo/index.vue' // 引入居民户信息组件
import demographicInfo from '../demographicInfo/index.vue' // 引入人口信息组件
import houseInfo from '../../common/houseInfo/index.vue' // 引入房屋信息组件
import accessoryInfo from '../../common/accessoryInfo/index.vue' // 引入附属物信息组件
import treeInfo from '../../common/treeInfo/index.vue' // 引入零星（林）果木信息组件
import graveInfo from '../graveInfo/index.vue' // 引入坟墓信息组件
import revenueInfo from '../revenueInfo/index.vue' // 引入安置意愿信息组件
import willingnessInfo from '../willingnessInfo/index.vue' // 引入安置意愿信息组件
import attachmentUpload from '../../common/attachmentUpload/index.vue' // 引入附件上传组件

import {
  deleteLandlordPeopleApi,
  deleteLandlordHouseApi,
  deleteLandlordTreeApi,
  updateLandlordTreeApi,
  updateLandlordAppendantApi,
  updateLandlordFamilyIncomeApi,
  updateLandlordWillApi,
  updateLandlordImmigrantFileApi
} from '@/service'

import iconSrc from '@/static/images/icon_add_household.png' // 侧边栏，添加 icon
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
  treeData: {
    // 左侧树列表
    type: Array as any,
    default: () => []
  },
  expendCodes: {
    type: Array as any,
    default: () => []
  },
  uid: {
    type: String,
    default: ''
  },
  occupationOptions: {
    type: Array as any,
    default: () => []
  }
})

const tabsList = ref([
  { label: '居民户信息', value: 0, defIcon: iconHouseholdDef, selIcon: iconHouseholdSel },
  { label: '人口信息', value: 1, defIcon: iconDemographicDef, selIcon: iconDemographicSel },
  { label: '房屋信息', value: 2, defIcon: iconHouseDef, selIcon: iconHouseSel },
  { label: '附属物信息', value: 3, defIcon: iconAccessoryDef, selIcon: iconAccessorySel },
  { label: '零星 (林) 果木', value: 4, defIcon: iconTreeDef, selIcon: iconTreeSel },
  { label: '坟墓信息', value: 5, defIcon: iconGraveDef, selIcon: iconGraveSel },
  { label: '家庭收入信息', value: 6, defIcon: iconRevenueDef, selIcon: iconRevenueSel },
  { label: '安置意愿信息', value: 7, defIcon: iconWillingnessDef, selIcon: iconWillingnessSel },
  { label: '附件上传', value: 8, defIcon: iconAttachmentDef, selIcon: iconAttachmentSel }
])

const showExpand = ref<boolean>(false)
const tabVal = ref<number>(0)
const areaCode = ref<string>('')
const townCode = ref<string>('')
const villageCode = ref<string>('')
const virutalVillageCode = ref<string>('')
const emit = defineEmits(['treeItemClick', 'updateData', 'updateTree'])

const treeItemClick = (data: any) => {
  console.log('click-tree-data:', data)
  tabVal.value = 0
  areaCode.value = data.areaCode
  townCode.value = data.townCode
  villageCode.value = data.villageCode
  virutalVillageCode.value = data.virutalVillageCode
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
 * 新增居民户
 * @param(type) 类型，edit 编辑， add 新增
 */
const addClick = (type: string) => {
  routerForward('householdInfoEdit', {
    type,
    areaCode: areaCode.value,
    townCode: townCode.value,
    villageCode: villageCode.value,
    virutalVillageCode: virutalVillageCode.value
  })
}

/**
 * 人口信息 - 删除
 * @param(Object) data 被删除的行信息
 */
const deleteDemographic = (data: any) => {
  deleteLandlordPeopleApi(props.dataInfo.uid, data.uid)
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
 * 零星（林）果木信息 - 删除
 * @param(Object) data 被删除的行信息
 */
const deleteTree = (data: any) => {
  deleteLandlordTreeApi(props.dataInfo.uid, data.uid)
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
 * 零星（林）果木信息 - 更新
 * @param(Array) data 提交的参数集合
 */
const updateFruitTreeInfo = (data: any) => {
  const params = [...data]
  updateLandlordTreeApi(props.dataInfo.uid, params)
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
 * 更新附属物信息
 * @param(Array) data
 */
const updateAccessoryInfo = (data: any) => {
  const params = [...data]
  updateLandlordAppendantApi(props.dataInfo.uid, params)
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
 * 更新家庭收入信息
 * @param(Array) data
 */
const updateRevenueInfo = (data: any) => {
  const params = [...data]
  updateLandlordFamilyIncomeApi(props.dataInfo.uid, params)
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
        updateTree()
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

// 更新左侧树列表
const updateTree = () => {
  emit('updateTree')
  console.log('开始更新')
}
</script>

<style lang="scss">
.main-wrap {
  display: flex;
  flex-direction: column;
  flex: 1;
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

.tabs-content {
  display: flex;
  width: 100%;
  height: calc(100vh - 33rpx - 12rpx - 33rpx - var(--status-bar-height));
  padding: 6rpx;
  background-color: #fff;
  box-sizing: border-box;
  flex-direction: column;
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

.tree-wrapper {
  position: absolute;
  top: 6rpx;
  left: 6rpx;
  z-index: 3;
  display: flex;
  height: calc(100vh - 33rpx - 12rpx - var(--status-bar-height));
  overflow: hidden;
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
