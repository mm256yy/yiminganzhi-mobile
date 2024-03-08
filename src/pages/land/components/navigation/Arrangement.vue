<!--生产安置确认-->
<template>
  <view class="main-wrapper">
    <view class="row-1">
      <view class="left" />
      <view class="right">
        <view class="btn green">
          <image class="icon" src="@/static/images/icon_print.png" mode="scaleToFill" />
          <text class="txt">打印报表</text>
        </view>
        <view class="btn blue" @click="onArchives">
          <image class="icon" src="@/static/images/icon_upload_white.png" mode="scaleToFill" />
          档案上传
        </view>
      </view>
    </view>
    <view class="row-label-title">
      本户共计征收土地：1.5亩，参保系数为：0.5，可参保3人，请添加参保人员
    </view>
  </view>
</template>

<script setup lang="ts">
const onArchives = () => {}
</script>

<style lang="scss" scoped>
.main-wrapper {
  width: 100%;
  height: calc(100vh - 80rpx - var(--status-bar-height));
  overflow-y: scroll;

  .row-1 {
    display: flex;
    align-items: center;
    margin: 9rpx 0;
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

  .row-label-title {
    color: #666;
    size: 10rpx;
  }
}
</style>
