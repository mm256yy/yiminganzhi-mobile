<template>
  <view class="test-wrap">{{ state }}</view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const state = ref('test')
</script>

<style lang="scss">
.test-wrap {
  color: skyblue;
}
</style>
