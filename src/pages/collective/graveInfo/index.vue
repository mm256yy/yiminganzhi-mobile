<template>
  <view class="grave-info-wrapper">
    <!-- 坟墓信息 -->
    <view class="list" v-if="props.dataList && props.dataList.length > 0">
      <view class="list-item" v-for="item in dataList" :key="item.id">
        <view class="list-1">
          <view class="left">
            <view class="icon">登记人</view>
            <view class="name">{{ formatStr(item.registrantName) }}</view>
          </view>
          <label class="right" @click="deleteGraveInfo(item)">
            <image class="icon" src="@/static/images/icon_delete_mini.png" />
          </label>
        </view>
        <view class="list-2" @click="toLink('edit', item)">
          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">与登记人关系：</view>
                <view class="content">{{ formatDict(item.relation, 307) }}</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">户号：</view>
                <view class="content">{{ formatStr(item.registrantDoorNo) }}</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">穴位：</view>
                <view class="content">{{ formatDict(item.graveType, 345) }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">数量：</view>
                <view class="content">{{ formatStr(item.number, '（坐）') }}</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">材料：</view>
                <view class="content">{{ formatDict(item.materials, 295) }}</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">立墓年份：</view>
                <view class="content">
                  {{ formatStr(item.graveYear) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">所处位置：</view>
                <view class="content">{{ formatDict(item.gravePosition, 288) }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">备注：</view>
                <view class="content">{{ formatStr(item.remark) }}</view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>

    <view class="null-wrapper" v-else>
      <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
      <view class="tips">请先添加坟墓信息</view>
    </view>

    <image
      class="add-btn"
      src="@/static/images/icon_add.png"
      mode="scaleToFill"
      @click="toLink('add')"
    />

    <uni-popup ref="alertDialog" type="dialog">
      <uni-popup-dialog
        type="warn"
        cancelText="取消"
        confirmText="确认"
        title="确认删除？"
        content=""
        @confirm="dialogConfirm"
        @close="dialogClose"
      />
    </uni-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { formatStr, formatDict, routerForward } from '@/utils'

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

const emit = defineEmits(['deleteGraveInfo'])
const alertDialog = ref<any>(null)
const currentItem = ref<any>({})

/**
 * 删除当前行信息
 * @param {Object} data 当前行数据
 */
const deleteGraveInfo = (data: any) => {
  alertDialog.value?.open()
  currentItem.value = { ...data }
}

const dialogConfirm = () => {
  emit('deleteGraveInfo', currentItem.value)
}

const dialogClose = () => {
  alertDialog.value.close()
}

/**
 * 页面跳转
 * @param type 类型，edit 编辑，add 新增
 * @param data type 为 edit 时，当前行数据
 */
const toLink = (type: string, data?: any) => {
  const { uid, householdId, villageCode } = props.dataInfo
  let commonParams = { type, uid, householdId, villageCode }
  if (type === 'edit') {
    let newCommonParams = {
      ...commonParams,
      doorNo: data.doorNo
    }

    routerForward('collectiveGraveInfoEdit', {
      params: JSON.stringify(data),
      commonParams: JSON.stringify(newCommonParams)
    })
  } else {
    const params = {
      graveType: '',
      number: null,
      materials: '',
      graveYear: '',
      gravePosition: '',
      remark: ''
    }
    routerForward('collectiveGraveInfoEdit', {
      params: JSON.stringify(params),
      commonParams: JSON.stringify(commonParams)
    })
  }
}
</script>

<style lang="scss" scoped>
.grave-info-wrapper {
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
        width: 100%;
        height: 28rpx;
        border-bottom: 1rpx dotted #d0cbcb;

        .left {
          display: flex;
          align-items: center;

          .icon {
            display: flex;
            width: 42rpx;
            height: 16rpx;
            font-size: 9rpx;
            color: #fff;
            background: #faad14;
            border-top-right-radius: 5rpx;
            border-bottom-right-radius: 5rpx;
            align-items: center;
            justify-content: center;
          }

          .name {
            margin-left: 5rpx;
            font-size: 9rpx;
            color: #171718;
          }
        }

        .right {
          display: flex;
          align-items: center;

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
            width: 65rpx;
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
            text-align: justify;
            word-break: break-all;
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

  .add-btn {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 66rpx;
    height: 66rpx;
  }
}
</style>
