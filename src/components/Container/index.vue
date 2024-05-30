<template>
  <view class="container-wrap">
    <image class="bg" src="@/static/images/common_bg.png" mode="widthFix" />
    <view class="common-header">
      <view class="header-left">
        <view class="back-box" @click="onBack">
          <uni-icons type="back" color="#ffffff" size="14rpx" />
        </view>
        <slot name="left">
          <text />
        </slot>
      </view>

      <view class="header-center">
        <slot name="title">
          <text class="tit">{{ props.title || '' }}</text>
        </slot>
      </view>

      <view class="header-right">
        <slot name="right">
          <text />
        </slot>
      </view>
    </view>
    <view class="content">
      <slot></slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { routerBack } from '@/utils'
interface PropsType {
  title?: string
  onBack?: () => void
}

const props = defineProps<PropsType>()

const onBack = () => {
  props.onBack ? props.onBack() : routerBack()
}
</script>

<style lang="scss">
.container-wrap {
  position: relative;
  width: 750rpx;
  height: 100vh;
  padding-top: var(--status-bar-height);
  overflow: hidden;
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 750rpx;
  height: 100%;
}

.common-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 33rpx;
  padding: 0 6rpx;

  .header-left {
    display: flex;
    width: 33%;
    flex: none;
    align-items: center;
    justify-content: flex-start;
  }

  .header-center {
    display: flex;
    width: 33%;
    flex: none;
    align-items: center;
    justify-content: center;
  }

  .header-right {
    display: flex;
    width: 33%;
    flex: none;
    align-items: center;
    justify-content: flex-end;
  }

  .back-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26rpx;
    height: 26rpx;
  }

  .tit {
    font-size: 15rpx;
    font-weight: 600;
    color: #ffffff;
  }
}

.content {
  width: 750rpx;
  height: calc(100% - 33rpx - var(--status-bar-height));
  box-sizing: border-box;
}
</style>
