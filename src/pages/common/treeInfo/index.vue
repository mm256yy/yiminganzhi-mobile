<template>
  <view :class="['tree-info-wrapper', treeList && treeList.length === 0 ? 'p-b-0' : '']">
    <view class="tree-container" v-if="treeList && treeList.length > 0">
      <view class="row">
        <view class="row-wrapper">
          <view class="col">序号</view>
          <view class="col w-63">品种名称</view>
          <view class="col w-63">用途</view>
          <view class="col w-63">淹没范围</view>
          <view class="col w-67">所在位置</view>
          <view class="col w-64">规格</view>
          <view class="col w-64">单位</view>
          <view class="col w-64">数量</view>
          <view class="col w-67">备注</view>
        </view>
      </view>
      <view class="row" />
      <view class="row" v-for="(item, index) in treeList" :key="item.id">
        <view class="col">{{ index + 1 }}</view>
        <view class="col w-63">
          {{ item.name }}
        </view>
        <view class="col w-63">
          {{ formatDict(item.usageType, 325) }}
        </view>
        <view class="col w-63">
          {{ formatDict(item.inundationRange, 346) }}
        </view>
         <view class="col w-67">
          {{ formatDict(item.locationType, 326) }}
        </view>
        <view class="col w-64">
          {{ formatDict(item.size, 269) }}
        </view>
        <view class="col w-64">
          {{ formatDict(item.unit, 264) }}
        </view>
        <view class="col w-64">
          {{ item.number }}
        </view>
        <view class="col w-67 remark">
          {{ item.remark }}
        </view>
      </view>
    </view>

    <view class="null-wrapper" v-else>
      <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
      <view class="tips">请先添加零星（林）果木信息</view>
    </view>

    <image
      v-if="stage === MainStage.review && mainType === MainType.PeasantHousehold"
      class="btn record"
      src="@/static/images/icon_record.png"
      mode="scaleToFill"
      @click="showModifyRecord"
    />

    <image
      class="btn add"
      src="@/static/images/icon_edit.png"
      mode="scaleToFill"
      @click="addTree"
    />

    <!-- 复核修改记录 -->
    <modify-records v-if="showRecord" :dataList="updateLog" @close="closeModifyRecords" />
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { getStorage, StorageKey, formatDict, routerForward } from '@/utils'
import { MainStage, MainType } from '@/types/common'
import modifyRecords from '../modifyRecords/index.vue' // 引入修改记录组件

const props = defineProps({
  dataList: {
    type: Array as any,
    default: () => []
  },
  dataInfo: {
    type: Object as any,
    default: () => {}
  },
  // 主体类型，如居民户、企业、个体户、村集体
  mainType: {
    type: String,
    default: ''
  },
  // 复核记录
  updateLog: {
    type: Object as any,
    default: () => {}
  }
})

const treeList = ref<any>([])

const projectInfo = getStorage(StorageKey.PROJECTINFO)
// 阶段，如 survey 调查填报阶段， review 复核阶段
const stage = projectInfo?.status ? projectInfo.status : MainStage.survey
const showRecord = ref<boolean>(false)

watch(
  () => props.dataList,
  (val) => {
    treeList.value = JSON.parse(JSON.stringify(val))
  },
  {
    immediate: true,
    deep: true
  }
)

// 新增零星（林）果木
const addTree = () => {
  routerForward('treeEdit', {
    uid: props.dataInfo.uid
  })
}

// 展示修改记录
const showModifyRecord = () => {
  showRecord.value = true
}

// 关闭修改记录弹窗
const closeModifyRecords = () => {
  showRecord.value = false
}
</script>

<style lang="scss" scoped>
.tree-info-wrapper {
  width: 100%;
  height: calc(100vh - 33rpx - 12rpx - 33rpx - 28rpx - 60rpx - var(--status-bar-height));
  padding-bottom: 80rpx;
  overflow-y: scroll;

  &.p-b-0 {
    padding-bottom: 0;
  }

  .tree-container {
    display: table;
    width: 100%;
    border-collapse: collapse;

    .row {
      display: table-row;
      width: 100%;
      height: 28rpx;

      &:nth-child(2n) {
        background-color: #f8f8f8;
      }

      &:first-child {
        position: fixed;
        z-index: 1;
        display: table;
        width: 726rpx;
        font-size: 9rpx;
        color: #737374;
        background-color: #f8f8f8;

        .row-wrapper {
          display: table-row;

          .col {
            display: table-cell;
            width: 35rpx;
            height: 28rpx;
            padding: 0;
            font-size: 9rpx;
            line-height: 28rpx;
            color: #171718;
            text-align: center;
            vertical-align: middle;
            border: none;

            &.w-29 {
              width: 29rpx;
            }

            &.w-63 {
              width: 63rpx;
            }

            &.w-64 {
              width: 64rpx;
            }

            &.w-67 {
              width: 67rpx;
            }
          }
        }
      }

      .col {
        display: table-cell;
        width: 35rpx;
        height: 28rpx;
        font-size: 9rpx;
        line-height: 28rpx;
        color: #171718;
        text-align: center;
        vertical-align: middle;
        border: 1rpx solid #f0f0f0;

        &.w-29 {
          width: 29rpx;
        }

        &.w-63 {
          width: 63rpx;
        }

        &.w-64 {
          width: 64rpx;
        }

        &.w-67 {
          width: 67rpx;
        }

        &.remark {
          font-size: 9rpx;
          line-height: 14rpx;
        }
      }
    }
  }

  .null-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 33rpx - 12rpx - 33rpx - 24rpx - 60rpx - var(--status-bar-height));
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

  .btn {
    position: fixed;
    right: 25rpx;
    width: 28rpx;
    height: 28rpx;
    border-radius: 50%;

    &.record {
      bottom: 54rpx;
    }

    &.add {
      bottom: 16rpx;
    }
  }
}
</style>
