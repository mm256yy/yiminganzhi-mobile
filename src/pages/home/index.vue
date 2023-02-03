<template>
  <view class="home-wrap">
    <view class="map-content">
      <map class="map"></map>
      <button type="primary">测试</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { routerForward } from '@/utils'

const jump = () => {
  routerForward('login')
}
</script>

<style scoped lang="scss">
.home-wrap {
  width: 750rpx;
  height: 300rpx;
}
</style>
