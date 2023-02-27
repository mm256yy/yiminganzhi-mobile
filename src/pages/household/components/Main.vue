<template>
  <view class="main-wrap">
    <Back class="main-nav" title="居民户填报" />

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
                  <view class="name">杨汉中</view>
                  <view class="account-no">1040092345321464</view>
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

              <!-- 居民户信息 -->
              <household-info v-if="tabVal === 1" />

              <!-- 人口信息 -->
              <demographic-info v-if="tabVal === 2" />

              <!-- 房屋信息 -->
              <house-info v-if="tabVal === 3" />

              <!-- 附属物信息 -->
              <accessory-info v-if="tabVal === 4" />

              <!-- 零星（林）果木信息 -->
              <tree-info v-if="tabVal === 5" />

              <!-- 坟墓信息 -->
              <grave-info v-if="tabVal === 6" />

              <!-- 家庭收入信息 -->
              <revenue-info v-if="tabVal === 7" />

              <!-- 安置意愿信息 -->
              <willingness-info v-if="tabVal === 8" />

              <!-- 附件上传 -->
              <attachment-upload v-if="tabVal === 9" />
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
import { getLandlordTreeApi } from '@/service'
import Back from '@/components/Back/Index.vue'
import Tree from '@/components/Tree/Index.vue'
import Tabs from '@/components/Tabs/Index.vue'
import householdInfo from '../householdInfo/index.vue' // 引入居民户信息组件
import demographicInfo from '../demographicInfo/index.vue' // 引入人口信息组件
import houseInfo from '../houseInfo/index.vue' // 引入房屋信息组件
import accessoryInfo from '../accessoryInfo/index.vue' // 引入附属物信息组件
import treeInfo from '../treeInfo/index.vue' // 引入零星（林）果木信息组件
import graveInfo from '../graveInfo/index.vue' // 引入坟墓信息组件
import revenueInfo from '../revenueInfo/index.vue' // 引入安置意愿信息组件
import willingnessInfo from '../willingnessInfo/index.vue' // 引入安置意愿信息组件
import attachmentUpload from '../attachmentUpload/index.vue' // 引入附件上传组件

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
import { MainType } from '@/types/common'

const tabsList = ref([
  { label: '居民户信息', value: 1, defIcon: iconHouseholdDef, selIcon: iconHouseholdSel },
  { label: '人口信息', value: 2, defIcon: iconDemographicDef, selIcon: iconDemographicSel },
  { label: '房屋信息', value: 3, defIcon: iconHouseDef, selIcon: iconHouseSel },
  { label: '附属物信息', value: 4, defIcon: iconAccessoryDef, selIcon: iconAccessorySel },
  { label: '零星 (林) 果木', value: 5, defIcon: iconTreeDef, selIcon: iconTreeSel },
  { label: '坟墓信息', value: 6, defIcon: iconGraveDef, selIcon: iconGraveSel },
  { label: '家庭收入信息', value: 7, defIcon: iconRevenueDef, selIcon: iconRevenueSel },
  { label: '安置意愿信息', value: 8, defIcon: iconWillingnessDef, selIcon: iconWillingnessSel },
  { label: '附件上传', value: 9, defIcon: iconAttachmentDef, selIcon: iconAttachmentSel }
])

const showExpand = ref<boolean>(false)
const tabVal = ref<number>(1)

const treeData = ref<any[]>([])

const treeItemClick = (data: any) => {
  console.log(data, 'data')
}

const expandToggle = () => {
  showExpand.value = !showExpand.value
}

// tab 切换
const selectTabs = (data: any) => {
  tabVal.value = data.value
}

const getTreeData = async () => {
  const res = await getLandlordTreeApi(MainType.PeasantHousehold)
  console.log(res, 'res')
  treeData.value = res
}
getTreeData()
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
