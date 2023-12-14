<template>
  <view class="house-info-wrapper">
    <!-- 居民户实施 —— 房屋产权 -->
    <view class="btn-wrapper" v-if="props.dataInfo.immigrantFilling.propertyStatus == '0'">
      <view class="btns green" @click="onFilled">
        <image class="icon" src="@/static/images/icon_sign_white.png" mode="scaleToFill" />
        <text class="txt">填报完成</text>
      </view>
    </view>

    <view class="list" v-if="props.dataList && props.dataList.length > 0">
      <view class="list-item" v-for="item in props.dataList" :key="item.id">
        <view class="list-1">
          <view class="left">
            <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
            幢号 {{ formatStr(item.houseNo) }}
          </view>
          <view class="right">
            <!-- <image
              class="icon m-r-10"
              src="@/static/images/icon_delete_mini.png"
              mode="scaleToFill"
            /> -->
          </view>
        </view>
        <view class="list-2" @click="toLink('edit', item.uid)">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">房屋类型：</view>
                <view class="content">
                  {{ formatDict(item.usageType, 265) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">集体土地使用权证：</view>
                <view class="content">{{ formatStr(item.landNo) }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">结构类型：</view>
                <view class="content">
                  {{ formatDict(item.constructionType, 252) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">不动产权证：</view>
                <view class="content">{{ formatStr(item.propertyNo) }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">建筑面积(㎡)：</view>
                <view class="content">
                  {{ formatStr(item.landArea) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">房屋产权人：</view>
                <view class="content">{{ getPropertyOwner(item.demographicId) }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">房屋性质：</view>
                <view class="content">
                  {{ formatStr(item.houseNature) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">共有人：</view>
                <view class="content">
                  {{ formatStr(item.ownersName) }}
                </view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>

    <view class="null-wrapper" v-else>
      <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
      <view class="tips">暂无房屋信息</view>
      <!-- <view class="tips">请先添加房屋确权信息</view> -->
    </view>

    <!-- <image class="btn add" src="@/static/images/icon_add.png" mode="scaleToFill" @click="toLink('add')" /> -->

    <!-- 删除确认框 -->
    <!-- <uni-popup
      ref="alertDialog"
      type="dialog"
    >
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
    </uni-popup> -->
  </view>
</template>

<script lang="ts" setup>
// import { ref } from 'vue'
import { updateImpLandlordImmigrantFillingApi } from '@/service'
import { formatDict, formatStr, routerForward } from '@/utils'
import { showToast, SUCCESS_MSG, ERROR_MSG } from '@/config'

interface PropsType {
  dataList: any[]
  dataInfo: any
}

const props = defineProps<PropsType>()
const emit = defineEmits(['updateData'])
// const alertDialog = ref<any>(null)
// const currentItem = ref<any>({})
// const reason = ref<string>('') // 删除原因

// 填报完成
const onFilled = () => {
  const { uid } = props.dataInfo
  let params = {
    propertyStatus: '1'
  }
  updateImpLandlordImmigrantFillingApi(uid, params)
    .then((res) => {
      if (res) {
        showToast(SUCCESS_MSG)
        emit('updateData')
      }
    })
    .catch(() => {
      showToast(ERROR_MSG)
    })
}

const toLink = (type: string, itemUid?: any) => {
  const { uid, doorNo } = props.dataInfo
  if (type === 'edit') {
    let params = { type, uid, doorNo, itemUid }
    routerForward('housePropertyEdit', {
      params: JSON.stringify(params)
    })
  } else if (type === 'add') {
    let params = { type, uid, doorNo }
    routerForward('houseConfirmEdit', {
      params: JSON.stringify(params)
    })
  }
}

/**
 * 获取房屋产权人
 * @param id 产权人 id
 */
const getPropertyOwner = (demographicId: number) => {
  const { dataInfo } = props
  if (dataInfo && dataInfo.demographicList) {
    if (dataInfo.demographicList.length) {
      let arr: any = dataInfo.demographicList.filter((item: any) => item.id === demographicId)
      if (arr && arr.length) {
        return arr[0].name
      }
      return '-'
    } else {
      return '-'
    }
  } else {
    return '-'
  }
}

/**
 * 删除当前行数据
 * @param {Object} data 当前行数据
 */
// const deleteHouse = (data: any) => {
//   alertDialog.value?.open()
//   currentItem.value = { ...data }
// }

// const dialogConfirm = (data: any) => {
//   if (!data) {
//     showToast('请输入删除原因')
//     return
//   }
//   let params = {
//     ...currentItem.value,
//     reason: data
//   }
//   emit('deleteHouse', params)
// }

// const dialogClose = () => {
//   alertDialog.value.close()
// }
</script>

<style lang="scss" scoped>
.house-info-wrapper {
  width: 100%;
  overflow-y: scroll;

  .btn-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 6rpx 0;

    .btns {
      display: flex;
      height: 23rpx;
      padding: 0 9rpx;
      margin-left: 6rpx;
      background: #3e73ec;
      border-radius: 23rpx;
      align-items: center;
      justify-content: center;

      &.green {
        background-color: #30a952;
      }

      &.blue {
        background: #3e73ec;
      }

      .icon {
        width: 9rpx;
        height: 9rpx;
        margin-right: 3rpx;
      }

      .txt {
        font-size: 9rpx;
        line-height: 11rpx;
        color: #ffffff;
      }
    }
  }

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
            width: 86rpx;
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
