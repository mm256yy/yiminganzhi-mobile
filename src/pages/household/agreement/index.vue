<template>
  <view class="agreement-wrap">
    <view class="row-1">
      <view class="left" />
      <view class="right">
        <view class="btn green">
          <image class="icon" src="@/static/images/icon_print_white.png" mode="scaleToFill" />
          打印协议
        </view>
        <view class="btn blue">
          <image class="icon" src="@/static/images/icon_sign_white.png" mode="scaleToFill" />
          签字
        </view>
        <view class="btn blue">
          <image class="icon" src="@/static/images/icon_upload_white.png" mode="scaleToFill" />
          档案上传
        </view>
      </view>
    </view>
    <view class="img-wrap">
      <image src="@/static/images/agreement_bg.png" class="img" mode="widthFix" />
    </view>
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.agreement-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 20rpx;
}

.row-1 {
  display: flex;
  align-items: center;
  padding: 9rpx 0;
  justify-content: space-between;

  .right {
    display: flex;
    align-items: center;

    .btn {
      display: flex;
      height: 23rpx;
      padding: 0 9rpx;
      margin-right: 6rpx;
      font-size: 9rpx;
      color: #fff;
      border-radius: 23rpx;
      box-sizing: border-box;
      align-items: center;
      justify-content: center;

      &.green {
        background-color: #30a952;
      }

      &.blue {
        background-color: #3e73ec;
      }

      .icon {
        width: 9rpx;
        height: 9rpx;
        margin-right: 2rpx;
      }
    }
  }
}

.img-wrap {
  flex: 1;
  overflow-y: scroll;

  .img {
    width: 500rpx;
  }
}
</style>
