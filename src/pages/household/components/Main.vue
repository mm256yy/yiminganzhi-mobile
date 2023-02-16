<template>
  <view class="main-wrap">
    <Back class="main-nav" />

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
                  <image class="icon" src="@/static/images/icon_header.png" mode="scaleToFill" />
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
              <Tabs :dataList="tabsList" @select-tabs="selectTabs" />

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
            </view>
          </view>
        </view>
      </view>

      <view :class="['tree-wrapper', showExpand ? 'w-0' : 'expand']">
        <Tree :treeData="treeData" @tree-item-click="treeItemClick" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Back from '@/components/Back/Index.vue'
import Tree from '@/components/Tree/Index.vue'
import Tabs from '@/components/Tabs/Index.vue'
import householdInfo from '../householdInfo/index.vue' // 引入居民户信息组件
import demographicInfo from '../demographicInfo/index.vue' // 引入人口信息组件
import houseInfo from '../houseInfo/index.vue' // 引入房屋信息组件
import accessoryInfo from '../accessoryInfo/index.vue' // 引入附属物信息组件
import treeInfo from '../treeInfo/index.vue' // 引入零星（林）果木信息组件

const tabsList = ref([
  { label: '居民户信息', value: 1 },
  { label: '人口信息', value: 2 },
  { label: '房屋信息', value: 3 },
  { label: '附属物信息', value: 4 },
  { label: '零星 (林) 果木信息', value: 5 },
  { label: '安置意愿信息', value: 6 },
  { label: '坟墓信息', value: 7 },
  { label: '附件上传', value: 8 }
])

const showExpand = ref<boolean>(false)
const tabVal = ref<number>(1)

const treeData = ref([
  {
    id: 1,
    name: '清溪镇',
    children: [
      {
        id: 11,
        name: '清溪行政村',
        children: [
          {
            id: 111,
            name: '杨村自然村',
            children: [
              {
                id: 1111,
                name: '邵丽',
                accountNo: 1040092345321464,
                finish: 2,
                total: 8
              },
              {
                id: 1112,
                name: '孔毓希',
                accountNo: 1040092345321465,
                finish: 0,
                total: 8
              }
            ]
          },
          {
            id: 222,
            name: '李村自然村',
            children: [
              {
                id: 1111,
                name: '邵西',
                accountNo: 1040092345321454,
                finish: 3,
                total: 8
              }
            ]
          }
        ]
      }
    ]
  }
])

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

      .icon {
        width: 16rpx;
        height: 16rpx;
        margin: 0 5rpx 0 8rpx;
      }

      .name {
        margin-right: 5rpx;
        font-size: 11rpx;
        color: #171718;
      }

      .account-no {
        font-size: 11rpx;
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
        height: 21rpx;
        border-radius: 2rpx;

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
  height: calc(100vh - 102rpx);
  padding: 6rpx;
  background-color: #fff;
  box-sizing: border-box;
  flex-direction: column;
}

.tree-wrapper {
  position: absolute;
  top: 6rpx;
  bottom: 10rpx;
  left: 6rpx;
  z-index: 3;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 68rpx);
  overflow-y: scroll;
  background-color: #fff;

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
