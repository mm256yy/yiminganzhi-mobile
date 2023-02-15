<template>
  <view class="back-wrapper">
    <view class="back" @click="back">
      <image class="icon" src="@/static/images/back.png" mode="scaleToFill" />
      <text class="txt">返回</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
const back = () => {
  uni.navigateBack({
    delta: 1
  })
}
</script>

<style lang="scss" scoped>
.back-wrapper {
  height: 23rpx;
  background-color: #fff;

  .back {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
    height: 23rpx;
    padding: 0 9rpx;

    /* #ifdef H5 */
    cursor: pointer;
    /* #endif */

    .icon {
      width: 12rpx;
      height: 12rpx;
      margin-right: 2rpx;
    }

    .txt {
      font-size: 8rpx;
      color: #171718;
    }
  }
}
</style>
