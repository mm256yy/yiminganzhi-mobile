<template>
  <view>
    移民首页
    <view @click="jump">跳转到登录页面</view>
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
