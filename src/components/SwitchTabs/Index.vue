<template>
  <view class="tablist">
    <view
      class="tab-bg"
      v-for="(item, index) in props.tabList"
      :key="index"
      :class="{ current: currentIndex === index }"
      @click="selectTabs(item, index)"
      >{{ item }}</view
    >
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  tabList: {
    type: Array as any,
    default: () => []
  }
})

const emit = defineEmits(['selectTabs'])
const currentIndex = ref<number>(0)

const selectTabs = (name: string, index: number) => {
  currentIndex.value = index
  const attrs = {
    name,
    index
  }
  emit('selectTabs', attrs)
}
</script>

<style lang="scss" scoped>
.tablist {
  width: 90rpx;
  border: 1rpx solid #3e73ec;
  color: #fff;
  border-radius: 8rpx;
  display: flex;
  overflow: hidden;

  .tab-bg {
    width: 45rpx;
    line-height: 18rpx;
    height: 18rpx;
    background: #fff;
    text-align: center;
    font-size: 10rpx;
    font-weight: 400;
    color: #3e73ec;

    &.current {
      background-color: #3e73ec;
      color: #fff;
    }
  }
}
</style>
