<template>
  <view class="list-header">
    <view class="list-header-rt">
      <view class="list-header-left">
        <view class="name">{{ props.dataInfo?.name }}</view>
        <view class="account-no">{{ props.dataInfo?.doorNo }}</view>
        <view class="fill-number">
          填报表单：&nbsp;
          <text class="green">3</text>
          /6
        </view>
      </view>
      <!-- <view class="list-header-right">
        <view class="btn blue-btn" @click="infoFeedback">
          <image class="icon" src="@/static/images/icon_dqxy_sel.png" mode="scaleToFill" />
          <text class="txt">信息反馈</text>
        </view>
      </view> -->
    </view>
  </view>
</template>

<script lang="ts" setup>
// import { filterViewDoorNo } from '@/utils'
// import { MainType } from '@/types/common'
// import { routerForward } from '@/utils'
import { LandlordType } from '@/types/sync'

interface PropsType {
  dataInfo: LandlordType
}

const props = defineProps<PropsType>()

</script>

<style lang="scss" scoped>
.list-header {
  display: flex;
  height: 33rpx;
  padding: 0 6rpx 0 9rpx;
  box-shadow: 0 0 6rpx 0 rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;

  .list-header-rt {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    height: 33rpx;

    .list-header-left {
      display: flex;
      flex-direction: row;
      align-items: center;

      .name {
        margin: 0 6rpx 0 0;
        font-size: 13rpx;
        color: #171718;
      }

      .account-no {
        font-size: 13rpx;
        color: #1c5df1;
      }

      .fill-number {
        display: flex;
        height: 24rpx;
        padding: 0 18rpx;
        margin-left: 14rpx;
        font-size: 11rpx;
        font-weight: 500;
        color: #171718;
        background-color: #e1f0ff;
        border-radius: 28rpx;
        align-items: center;
        justify-content: center;

        .green {
          color: #30a952;
        }
      }
    }

    .list-header-right {
      display: flex;
      flex-direction: row;
      align-items: center;

      .btn-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 68rpx;
        height: 23rpx;
        border-radius: 11rpx;

        &:active {
          opacity: 0.7;
        }

        &.print {
          background-color: #30a952;
        }

        &.report {
          margin-left: 7rpx;
          background-color: #3e73ec;
        }

        .icon {
          width: 7rpx;
          height: 7rpx;
          margin-right: 3rpx;
        }

        .txt {
          font-size: 9rpx;
          color: #fff;
        }
      }
    }
  }
}
</style>
