<template>
  <view
    class="company-item"
    @click="toDetail(data)"
    v-if="data.isPadDelete === '0' || !data.isPadDelete"
  >
    <view class="head">
      <view class="head-lt">
        <view class="label">{{ formatDict(data.relation, 307) }}</view>
        <view class="name">{{ data?.name }}</view>
      </view>
      <view class="right">
        <image
          class="icon m-r-10"
          @click.stop="handleDeleteItem(data)"
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
  </view>
</template>

<script lang="ts" setup>
import { LandlordType } from '@/types/sync'
import { formatDict } from '@/utils'

interface PropsType {
  data: LandlordType
}

const props = defineProps<PropsType>()
const emit = defineEmits(['deleteItem', 'toDetail'])

// 跳转详细页面
const toDetail = (data: LandlordType) => {
  emit('toDetail', data)
}

/**
 * 删除当前行数据
 * @param {Object} data 当前行数据
 */
const handleDeleteItem = (data: LandlordType) => {
  emit('deleteItem', data)
}
</script>

<style lang="scss" scoped>
.company-item {
  position: relative;
  width: 492rpx;
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
    border-bottom: 1rpx dotted #d0cbcb;

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
