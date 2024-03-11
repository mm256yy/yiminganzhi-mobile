<template>
  <view class="company-item" @click="toDetail(data)">
    <view class="head">
      <view class="head-lt">
        <view class="label">户主</view>
        <view class="name">{{ data?.name }}</view>
      </view>
      <view class="right">
        <image
          class="icon m-r-10"
          @click.stop="handleDeleteItem"
          src="@/static/images/icon_delete_mini.png"
          mode="scaleToFill"
        />
      </view>
    </view>
    <view class="cont">
      <view class="cont-item">
        <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
        <view class="label">身份证号:</view>
        <view class="value"> {{ data.card }} </view>
      </view>
      <view class="cont-item">
        <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
        <view class="label">联系方式:</view>
        <view class="value"> {{ data.phone }} </view>
      </view>
      <view class="cont-item">
        <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
        <view class="label">生产安置方式:</view>
        <view class="value"> {{ formatDict(data.settingWay, 375) }} </view>
      </view>
    </view>

    <!-- 删除确认框 -->
    <uni-popup ref="alertDialogRef" type="dialog">
      <uni-popup-dialog
        type="warn"
        cancelText="取消"
        confirmText="确认"
        title="是否确认删除该条数据？"
        @confirm="dialogConfirm"
        @close="dialogClose"
      />
    </uni-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { LandlordType } from '@/types/sync'
import { formatDict, routerForward } from '@/utils'
// import { MainType } from '@/types/common'

interface PropsType {
  data: LandlordType
  parentUId: any
  parentDoorNo: any
}

const props = defineProps<PropsType>()
const emit = defineEmits(['deleteItem', 'toDetail', 'refresh'])
const alertDialogRef = ref()

// 跳转详细页面
const toDetail = (data: LandlordType) => {
  emit('toDetail', data)
}

const dialogConfirm = () => {
  let params = {
    ...props.data,
    parentUId: props.parentUId,
    parentDoorNo: props.parentDoorNo
  }
  emit('deleteItem', params)
  alertDialogRef.value.close()
}

const dialogClose = () => {
  alertDialogRef.value.close()
}

/**
 * 删除当前行数据
 * @param {Object} data 当前行数据
 */
const handleDeleteItem = (data: LandlordType) => {
  alertDialogRef.value?.open()
  // currentItem.value = { ...data }
  // 暂缺删除接口
  // const {uid}=data||{}
  //deleteLandlordPeopleApi(uid)
}
</script>

<style lang="scss" scoped>
.company-item {
  position: relative;
  width: 480rpx;
  padding: 12rpx;
  margin: 0 7rpx 7rpx 0;
  background-color: #ffffff;
  border-radius: 7rpx;
  box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.08);

  &:nth-child(2n) {
    margin-right: 0rpx;
  }

  .bg {
    position: absolute;
    top: -20rpx;
    right: -20rpx;
    width: 30rpx;
    height: 30rpx;
  }

  .head {
    display: flex;
    align-items: center;
    flex-direction: row;
    padding-bottom: 6rpx;
    justify-content: space-between;

    .head-lt {
      display: flex;
      align-items: center;
      flex-direction: row;

      .user-icon {
        width: 19rpx;
        height: 19rpx;
        margin-right: 6rpx;
      }

      .label {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 12rpx;
        font-size: 9rpx;
        color: #fff;
        padding: 2rpx 5rpx;
        background: #faad14;
        border-top-right-radius: 5rpx;
        border-bottom-right-radius: 5rpx;
        margin-right: 10rpx;
      }

      .name {
        margin-right: 6rpx;
        overflow: hidden;
        font-size: 12rpx;
        font-weight: 600;
        color: #171718;
        text-overflow: ellipsis;
        word-break: keep-all;
        white-space: nowrap;
      }

      .landNo {
        font-size: 10rpx;
        color: #666;
        font-weight: 500;
      }
    }

    .head-rt {
      display: flex;
      align-items: center;
      flex-direction: row;

      .edit-box {
        display: flex;
        width: 16rpx;
        height: 16rpx;
        border: 1rpx solid #ff4242;
        border-radius: 50%;
        align-items: center;
        justify-content: center;

        .remove-icon {
          width: 9rpx;
          height: 9rpx;
        }
      }
    }

    .right {
      display: flex;
      flex-direction: row;

      .icon {
        width: 24rpx;
        height: 24rpx;
      }
    }
  }

  .status {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 12rpx;
    padding: 0 6rpx;
    margin-right: 8rpx;
    font-size: 7rpx;
    color: #199f38;
    background: #fff1f1;
    border-radius: 8rpx;

    .circle {
      height: 12rpx;
      margin-right: 2rpx;
      border-radius: 50%;
      line-height: 12rpx;
    }
  }

  .cont {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;

    .cont-item {
      display: flex;
      height: 16rpx;
      width: 50%;
      margin-top: 6rpx;
      align-items: center;
      flex-direction: row;

      .icon {
        width: 9rpx;
        height: 9rpx;
        margin-right: 6rpx;
      }

      .label {
        width: 55rpx;
        overflow: hidden;
        font-size: 9rpx;
        color: #171718;
        word-break: keep-all;
      }

      .value {
        font-size: 9rpx;
        color: #171718;
      }
    }
  }
}
</style>
