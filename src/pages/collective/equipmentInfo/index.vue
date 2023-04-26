<template>
  <view class="equipment-info-wrapper">
    <!-- 农村小型专项及农副业设施信息 -->
    <view class="list" v-if="dataList && dataList.length > 0">
      <view class="list-item" v-for="item in dataList" :key="item.id">
        <view class="list-1">
          <view class="left">
            <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
            <view class="name">{{ formatStr(item.facilitiesName) }}</view>
          </view>
          <view class="right">
            <image
              class="icon m-r-10"
              src="@/static/images/icon_delete_mini.png"
              mode="scaleToFill"
              @click="deleteEquipment(item)"
            />
          </view>
        </view>
        <view class="list-2" @click="toLink('edit', item)">
          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">设施类别：</view>
                <view class="content">{{ formatDict(item.facilitiesType, 236) }}</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">数量：</view>
                <view class="content">{{ formatStr(item.number) }}</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">建成年月：</view>
                <view class="content">
                  {{ item.completedTime ? dayjs(item.completedTime).format('YYYY年MM月') : '-' }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">所在位置：</view>
                <view class="content">
                  {{ formatDict(item.locationType, 326) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="16">
              <view class="col">
                <view class="label">具体位置：</view>
                <view class="content">{{ formatStr(item.specificLocation) }}</view>
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
      <view class="tips">请先添加设施设备信息</view>
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
import dayjs from 'dayjs'
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

const emit = defineEmits(['deleteEquipment'])
const alertDialog = ref<any>(null)
const currentItem = ref<any>({})

/**
 * 删除设施设备信息
 * @param {Object} data 当前行数据
 */
const deleteEquipment = (data: any) => {
  alertDialog.value?.open()
  currentItem.value = { ...data }
}

const dialogConfirm = () => {
  emit('deleteEquipment', currentItem.value)
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
  const { uid, doorNo, householdId } = props.dataInfo
  const commonParams: any = { type, uid, doorNo, householdId }
  if (type === 'edit') {
    let params = {
      ...data,
      completedTime: data.completedTime ? dayjs(data.completedTime).format('YYYY-MM-DD') : null
    }
    routerForward('collectiveEquipmentInfoEdit', {
      params: JSON.stringify(params),
      commonParams: JSON.stringify(commonParams)
    })
  } else {
    const params = {
      facilitiesName: '',
      facilitiesType: '',
      locationType: null,
      specificLocation: '',
      competentUnit: '',
      facilitiesCode: '',
      number: null,
      unit: '',
      completedTime: '',
      scopes: '',
      benefit: null,
      cost: null,
      netBal: null,
      originalInvest: null,
      workersNum: null,
      altitude: null,
      inundationRang: '',
      remark: ''
    }
    routerForward('collectiveEquipmentInfoEdit', {
      params: JSON.stringify(params),
      commonParams: JSON.stringify(commonParams)
    })
  }
}
</script>

<style lang="scss" scoped>
.equipment-info-wrapper {
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
            width: 10rpx;
            height: 10rpx;
            margin-left: 10rpx;
          }

          .name {
            margin-left: 5rpx;
            font-size: 9rpx;
            color: #171718;
          }
        }

        .right {
          display: flex;

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
            width: 70rpx;
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

  .add-btn {
    position: fixed;
    right: 25rpx;
    bottom: 16rpx;
    width: 28rpx;
    height: 28rpx;
    border-radius: 50%;
  }
}
</style>
