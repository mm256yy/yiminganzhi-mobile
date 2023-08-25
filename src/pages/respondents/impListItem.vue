<template>
  <view class="company-item">
    <view class="head">
      <view class="head-lt">
        <image class="user-icon" src="@/static/images/respondents_tit.png" mode="scaleToFill" />
        <view class="name">{{ props.data.name }}</view>
        <view class="number">{{ props.data.showDoorNo }}</view>
      </view>
      <view class="head-rt"> 人口核定滞后 </view>
    </view>

    <view class="cont">
      <view class="cont-item">
        <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
        <view class="label">联系方式:</view>
        <view class="value">{{ props.data.phone }}</view>
      </view>

      <template v-if="props.data.type !== MainType.PeasantHousehold">
        <view class="cont-item">
          <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
          <view class="label">所属区域:</view>
          <view class="value">{{ props.data.areaCodeText }}/{{ props.data.townCodeText }}</view>
        </view>
        <view class="cont-item">
          <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
          <view class="label">行政村名称:</view>
          <view class="value">{{ props.data.villageCodeText }}</view>
        </view>
      </template>
      <template v-else>
        <view class="cont-item">
          <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
          <view class="label">是否财产户:</view>
          <view class="value">
            {{ dictOption(yesAndNoEnums, props.data.hasPropertyAccount) }}
          </view>
        </view>
        <view class="cont-item">
          <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
          <view class="label">户籍地址:</view>
          <view class="value">{{ props.data.address }}</view>
        </view>
      </template>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { dictOption } from '@/utils'
import { LandlordType } from '@/types/sync'
import { yesAndNoEnums } from '@/config/common'
import { MainType } from '@/types/common'

interface PropsType {
  data: LandlordType
}

const props = defineProps<PropsType>()
</script>

<style lang="scss" scoped>
.company-item {
  position: relative;
  width: 346rpx;
  height: 110rpx;
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
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding-bottom: 6rpx;

    .head-lt {
      display: flex;
      align-items: center;

      .user-icon {
        width: 19rpx;
        height: 19rpx;
        margin-right: 6rpx;
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

      .number {
        font-size: 10rpx;
        font-weight: 500;
        color: #0a54ff;
      }
    }

    .head-rt {
      width: 54rpx;
      height: 14rpx;
      font-size: 7rpx;
      font-weight: 400;
      line-height: 14rpx;
      color: #ff2d2d;
      text-align: center;
      background: #fff1f1;
      border-radius: 14rpx;
    }
  }

  .cont {
    .cont-item {
      display: flex;
      height: 16rpx;
      margin-top: 6rpx;
      align-items: center;
      flex-direction: row;

      .icon {
        width: 9rpx;
        height: 9rpx;
        margin-right: 6rpx;
      }

      .label {
        width: 56rpx;
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
