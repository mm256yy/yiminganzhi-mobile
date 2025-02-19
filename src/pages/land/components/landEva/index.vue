<template>
  <!-- 土地基本情况评估 -->
  <view class="land-eva-wrapper">
    <view class="list" v-if="props.dataList && props.dataList.length">
      <view class="list-item" v-for="item in props.dataList" :key="item.id">
        <view class="list-1">
          <view class="left">
            <text class="land-name">{{ formatStr(item.landName) }}</text>
            <text class="land-number">
              {{ formatStr(item.landNumber) }}
            </text>
          </view>
          <view class="right">
            <image
              class="icon m-r-10"
              src="@/static/images/icon_delete_mini.png"
              mode="scaleToFill"
              @click="deleteLand(item)"
            />
          </view>
        </view>
        <view class="list-2" @click="toLink('edit', item.uid, item.id)">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">村民小组：</view>
                <view class="content">
                  {{ formatStr(item.villagerGroup) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">地块位置：</view>
                <view class="content">
                  {{ formatStr(item.landSea) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">所在位置：</view>
                <view class="content">
                  <!-- {{ formatDict(props.dataInfo.locationType, 326) }} -->
                  {{ formatStr(item.areaText) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">评估单价(元/㎡)：</view>
                <view class="content">
                  {{ formatStr(item.valuationPrice) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">淹没范围：</view>
                <view class="content">
                  {{ formatStr(item.inundationRangeText) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">评估金额(元)：</view>
                <view class="content">
                  {{ formatStr(item.valuationAmount) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">地类：</view>
                <view class="content">
                  {{ formatStr(item.landTypeText) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">补偿金额：</view>
                <view class="content">
                  {{ formatStr(item.compensationAmount) }}
                </view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>

    <view class="null-wrapper" v-else>
      <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
      <view class="tips">暂无数据</view>
    </view>

    <!-- 删除确认框 -->
    <uni-popup ref="alertDialog" type="dialog">
      <uni-popup-dialog
        type="warn"
        mode="input"
        cancelText="取消"
        confirmText="确认"
        title="确认删除？"
        :value="reason"
        placeholder="请输入删除原因"
        @confirm="dialogConfirm"
        @close="dialogClose"
      />
    </uni-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { formatStr, formatDict, routerForward } from '@/utils'
import { showToast } from '@/config'

const props = defineProps({
  dataList: {
    type: Array as any,
    default: () => []
  },
  dataInfo: {
    type: Object as any,
    default: () => {}
  }
})

const emit = defineEmits(['deleteLand'])
const alertDialog = ref<any>(null)
const currentItem = ref<any>({})
const reason = ref<string>('') // 删除原因

const toLink = (type: string, itemUid: any, id: any) => {
  const { uid, doorNo, landUid } = props.dataInfo
  const idStr = props.dataInfo.landEstimateDtoList.map((item: any) => item.id).join(',')
  console.log(idStr,'数据集合')
  let params = { type, uid, doorNo, itemUid, landUid, id,idStr }
  routerForward('baseLandEvaEdit', {
    params: JSON.stringify(params)
  })
}

/**
 * 删除当前行数据
 * @param {Object} data 当前行数据
 */
const deleteLand = (data: any) => {
  console.log(props.dataList)

  alertDialog.value?.open()
  currentItem.value = { ...data }
}

const dialogConfirm = (data: any) => {
  if (!data) {
    showToast('请输入删除原因')
    return
  }
  let params = {
    ...currentItem.value,
    reason: data
  }
  emit('deleteLand', params)
}

const dialogClose = () => {
  alertDialog.value.close()
}
</script>

<style lang="scss" scoped>
.land-eva-wrapper {
  width: 100%;
  overflow-y: scroll;

  .list {
    width: 100%;

    .list-item {
      margin-bottom: 7rpx;
      box-shadow: 0 1rpx 9rpx -2rpx rgba(0, 0, 0, 0.18);

      .list-1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6rpx 0;
        border-bottom: 1rpx dotted #d0cbcb;

        .left {
          display: flex;
          padding-left: 6rpx;
          font-size: 9rpx;
          color: #171718;
          align-items: center;
          .land-name {
            color: #333;
          }

          .land-number {
            color: #666;
            margin-left: 10rpx;
          }

          .icon {
            width: 10rpx;
            height: 10rpx;
            margin-left: 10rpx;
          }
        }

        .right {
          display: flex;
          flex-direction: row;

          .icon {
            width: 20rpx;
            height: 20rpx;
          }
        }
      }

      .list-2 {
        padding: 4rpx 6rpx 6rpx 0;
        box-sizing: border-box;

        .col {
          display: flex;
          flex-direction: row;

          .label {
            width: 80rpx;
            height: 16rpx;
            margin-left: 9rpx;
            font-size: 9rpx;
            line-height: 16rpx;
            color: rgba(23, 23, 24, 0.6);
          }

          .content {
            font-size: 9rpx;
            line-height: 16rpx;
            color: #171718;
          }
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

    &.add {
      bottom: 16rpx;
    }

    &.record {
      bottom: 54rpx;
    }
  }
}
</style>
