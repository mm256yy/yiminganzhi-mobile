<template>
  <div>
    移民首页
    <div @click="jump">跳转到登录页面</div>
  </div>
</template>

<script setup lang="ts">
import { routerForward } from '@/utils'

const jump = () => {
  routerForward('login')
}
</script>
