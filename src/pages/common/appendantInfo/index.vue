<template>
  <view class="appendant-info-wrapper">
    <view class="appendant-container" v-if="formData && formData.length">
      <view class="row">
        <view class="row-wrapper">
          <view class="col w-50">序号</view>
          <view class="col">项目</view>
          <view class="col">规格</view>
          <view class="col w-50">单位</view>
          <view class="col w-50">数量</view>
          <view class="col w-334">备注</view>
        </view>
      </view>
      <view class="row" />
      <view class="row" v-for="(item, index) in formData" :key="item.id">
        <view class="col w-50">{{ index + 1 }}</view>
        <view class="col">{{ item.name }}</view>
        <view class="col">{{ item.size }}</view>
        <view class="col w-50">{{ item.unit }}</view>
        <view class="col w-50">{{ item.number }}</view>
        <view class="col w-334">{{ item.remark }}</view>
      </view>
    </view>

    <view class="null-wrapper" v-else>
      <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
      <view class="tips">请先配置附属物信息</view>
    </view>

    <image
      v-if="stage === MainStage.review && mainType === MainType.PeasantHousehold"
      class="btn record"
      src="@/static/images/icon_record.png"
      mode="scaleToFill"
      @click="showModifyRecord"
    />

    <image
      class="btn edit"
      src="@/static/images/icon_edit.png"
      mode="scaleToFill"
      @click="toEdit"
    />

    <!-- 复核修改记录 -->
    <modify-records v-if="showRecord" :dataList="updateLogList" @close="closeModifyRecords" />
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { MainStage, MainType } from '@/types/common'
import { getStorage, StorageKey, routerForward } from '@/utils'
import modifyRecords from '../modifyRecords/index.vue' // 引入修改记录组件

const props = defineProps({
  dataInfo: {
    type: Object as any,
    default: () => {}
  },
  dataList: {
    type: Array as any,
    default: () => []
  },
  // 主体类型，如居民户、企业、个体户、村集体
  mainType: {
    type: String,
    default: ''
  },
  // 复核记录
  updateLogList: {
    type: Array as any,
    default: () => []
  }
})

const projectInfo = getStorage(StorageKey.PROJECTINFO)
// 阶段，如 survey 调查填报阶段， review 复核阶段
const stage = projectInfo?.status ? projectInfo.status : MainStage.survey
const showRecord = ref<boolean>(false)

const formData = ref<any>([])
const emit = defineEmits(['updateData'])

const initData = async () => {
  if (props.dataList && props.dataList.length > 0) {
    let arr = props.dataList.filter((item: any) => item.number || item.remark)
    formData.value = [...arr]
  }
}

onShow(() => {
  // 接收来自编辑页派发的 updateData 事件
  uni.$on('updateData', (data: any) => {
    formData.value = [...JSON.parse(data)]
    emit('updateData')
  })
})

// 编辑
const toEdit = () => {
  const { uid } = props.dataInfo
  routerForward('appendantInfoEdit', { uid })
}

// 展示修改记录
const showModifyRecord = () => {
  showRecord.value = true
}

// 关闭修改记录弹窗
const closeModifyRecords = () => {
  showRecord.value = false
}
onMounted(() => {
  initData()
})
</script>

<style lang="scss" scoped>
.appendant-info-wrapper {
  width: 100%;
  overflow-y: scroll;

  .appendant-container {
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
            width: 121rpx;
            height: 28rpx;
            padding: 0;
            font-size: 9rpx;
            line-height: 28rpx;
            color: #171718;
            text-align: center;
            vertical-align: middle;
            border: none;

            &.w-50 {
              width: 50rpx;
            }

            &.w-334 {
              width: 334rpx;
            }
          }
        }
      }

      .col {
        display: table-cell;
        width: 121rpx;
        height: 28rpx;
        padding-left: 9rpx;
        font-size: 9rpx;
        line-height: 28rpx;
        color: #171718;
        vertical-align: middle;
        border: 1rpx solid #f0f0f0;

        &.w-50 {
          width: 50rpx;
        }

        &.w-334 {
          width: 334rpx;
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 73rpx;
          margin-left: 3rpx;
          border: 1rpx solid #ebebeb;
          border-radius: 2rpx;

          .reduce {
            display: flex;
            width: 21rpx;
            height: 21rpx;
            background: #f8f8f8;
            border-right: 1rpx solid #ebebeb;
            border-radius: 2rpx 0 0 2rpx;
            align-items: center;
            justify-content: center;
          }

          .num {
            width: 30rpx;
            height: 21rpx;
            font-size: 9rpx;
            line-height: 21rpx;
            text-align: center;
          }

          .plus {
            display: flex;
            width: 21rpx;
            height: 21rpx;
            background: #f8f8f8;
            border-left: 1rpx solid #ebebeb;
            border-radius: 2rpx 0 0 2rpx;
            align-items: center;
            justify-content: center;
          }
        }

        .remark {
          height: 19rpx;
          font-size: 9rpx;
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

    &.edit {
      bottom: 16rpx;
    }

    &.record {
      bottom: 54rpx;
    }
  }
}
</style>
