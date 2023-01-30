<template>
  <view>
    移民首页
    <view @click="jump">跳转到登录页面</view>
    <view class="test-box">测试</view>
    <Test />
  </view>
</template>

<script setup lang="ts">
import { Test } from './components'
import { routerForward } from '@/utils'

const jump = () => {
  routerForward('login')
}
</script>

<style scoped lang="scss">
.test-box {
  width: 750rpx;
  height: 200rpx;
  background-color: green;
}
</style>
