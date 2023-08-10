<template>
  <!-- 土地青苗及附着物评估 -->
  <view class="seedlings-wrapper">
    <view class="list" v-if="props.dataList && props.dataList.length">
      <view class="list-item" v-for="item in props.dataList" :key="item.id">
        <view class="list-1">
          <view class="left">
            {{ formatStr(item.name) }}
          </view>
          <view class="right">
            <image
              class="icon m-r-10"
              src="@/static/images/icon_delete_mini.png"
              mode="scaleToFill"
              @click="deleteSeedlings(item)"
            />
          </view>
        </view>

        <view class="list-2" @click="toLink('edit', item.uid)">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">地块编号：</view>
                <view class="content">
                  {{ formatStr(item.landNumber) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">单价(元/㎡)：</view>
                <view class="content">
                  {{ formatStr(item.price) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">费率：</view>
                <view class="content">
                  {{ formatStr(item.rate, '%') }}
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
                <view class="label">数量(㎡)：</view>
                <view class="content">
                  {{ formatStr(item.number) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">补偿金额(元)：</view>
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
      <view class="tips">请先添加土地青苗及附着物</view>
    </view>

    <image
      class="btn add"
      src="@/static/images/icon_add.png"
      mode="scaleToFill"
      @click="toLink('add')"
    />

    <!-- 删除确认框 -->
    <uni-popup ref="alertDialog" type="dialog">
      <uni-popup-dialog
        type="warn"
        mode="input"
        cancelText="取消"
        confirmText="确认"
        title="确认删除？"
        :value="deleteReason"
        placeholder="请输入删除原因"
        @confirm="dialogConfirm"
        @close="dialogClose"
      />
    </uni-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { formatStr, routerForward } from '@/utils'
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

const emit = defineEmits(['deleteSeedlings'])
const alertDialog = ref<any>(null)
const currentItem = ref<any>({})
const deleteReason = ref<string>('') // 删除原因

const toLink = (type: string, itemUid?: any) => {
  const { uid, doorNo } = props.dataInfo

  if (type === 'edit') {
    let params = { type, uid, doorNo, itemUid }
    routerForward('seedlingsEvaEdit', {
      params: JSON.stringify(params)
    })
  } else if (type === 'add') {
    let params = { type, uid, doorNo }
    routerForward('seedlingsEvaEdit', {
      params: JSON.stringify(params)
    })
  }
}

/**
 * 删除当前行数据
 * @param {Object} data 当前行数据
 */
const deleteSeedlings = (data: any) => {
  alertDialog.value?.open()
  currentItem.value = { ...data }
}

const dialogConfirm = (data: any) => {
  if (!data) {
    showToast('请输入删除原因')
    return
  }
  let params = {
    ...currentItem,
    deleteReason: data
  }
  emit('deleteSeedlings', params)
}

const dialogClose = () => {
  alertDialog.value.close()
}
</script>

<style lang="scss" scoped>
.seedlings-wrapper {
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
          flex: 1;

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
            width: 66rpx;
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
