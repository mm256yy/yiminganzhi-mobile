<template>
  <view class="back-wrapper">
    <view class="status"></view>
    <view class="back">
      <image class="icon-back" src="@/static/images/back.png" mode="scaleToFill" @click="back" />
      <view class="title">{{ props.title }}</view>
      <image
        class="icon-home"
        src="@/static/images/icon_home.png"
        mode="scaleToFill"
        @click="toHome"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { routerForward } from '@/utils'

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})

const back = () => {
  uni.navigateBack({
    delta: 1
  })
}

const toHome = () => {
  routerForward('home')
}
</script>

<style lang="scss" scoped>
.back-wrapper {
  background: transparent;

  .status {
    height: var(--status-bar-height);
  }

  .back {
    display: flex;
    height: 33rpx;
    padding: 0 9rpx;

    /* #ifdef H5 */
    cursor: pointer;
    box-sizing: border-box;
    flex-direction: row;
    align-items: center;
    /* #endif */

    .icon-back {
      width: 14rpx;
      height: 14rpx;
    }

    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15rpx;
      color: #fff;
      flex: 1 auto;
    }

    .icon-home {
      width: 23rpx;
      height: 23rpx;
    }
  }
}
</style>
