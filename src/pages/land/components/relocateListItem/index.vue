<template>
  <view class="company-item" @click="toDetail">
    <view class="head">
      <view class="head-lt">
         <image class="user-icon" src="@/static/images/people_icon.png" mode="scaleToFill" />
        <view class="name">{{ props.data?.name }}</view>
        <view class="landNo">{{ props.data?.doorNo }}</view>
      </view>
      <view class="head-rt">
        <view
            class="status"
            ><text class="circle" />
              '1/6'</view>
      </view>
    </view>
    <view class="cont">
      <view class="cont-item">
        <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
        <view class="label">所属区域:</view>
        <view class="value">文本</view>
      </view>
      <view class="cont-item">
        <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
        <view class="label">类别:</view>
        <view class="value">
          文本
        </view>
      </view>
      <view class="cont-item">
        <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
        <view class="label">所在区域:</view>
        <view class="value">文本</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
// import { ref } from 'vue'
import { LandlordType } from "@/types/sync";
import { routerForward } from '@/utils'

interface PropsType {
  data: LandlordType;
}

const props = defineProps<PropsType>();
const emit = defineEmits(["delete"]);

// 跳转详细页面
const toDetail = () => { 
const routeName='landNavigation'
  const params = {
    data:props.data
  }

  routerForward(routeName, {
    ...params
  })
};

</script>

<style lang="scss" scoped>
.company-item {
  position: relative;
  width: 338rpx;
  padding: 2rpx 12rpx 12rpx 12rpx;
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
  }

  .status {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 14rpx;
    padding: 0 6rpx;
    margin-right: 8rpx;
    font-size: 7rpx;
    color: #ff2d2d;
    background: #fff1f1;
    border-radius: 8rpx;

    .circle {
      width: 4rpx;
      height: 4rpx;
      margin-right: 2rpx;
      background-color: #ff6767;
      border-radius: 50%;
    }

    &.success {
      color: #199f38;

      .circle {
        background-color: #30b950;
      }
    }
  }

  .cont {
    display: flex;
    align-items: center;
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

.btn {
  display: flex;
  height: 20rpx;
  padding: 0 9rpx;
  margin-left: 6rpx;
  background: #3e73ec;
  border-radius: 10rpx;
  align-items: center;
  justify-content: center;

  &.green-btn {
    background-color: #30a952;
  }

  &.blue-btn {
    background: #3e73ec;
  }

  &.red {
    background-color: #e43030;
  }

  &.yellow {
    background-color: #fec44c;
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
</style>
