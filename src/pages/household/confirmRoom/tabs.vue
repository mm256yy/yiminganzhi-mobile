<template>
  <view class="tab-list">
    <view
      v-for="item in tabList"
      :key="item.value"
      :class="['tab-item', tabVal === item.value ? 'active' : '']"
      @click="switchTab(item)"
    >
      {{ item.name }}
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const tabVal = ref<number>(1)
const emit = defineEmits(['switchTab'])

const tabList = [
  { name: '选房摇号', value: 1 },
  { name: '房屋列表', value: 2 },
  { name: '签字', value: 3 },
  { name: '打印表格', value: 4 },
  { name: '档案上传', value: 5 },
  { name: '无需办理', value: 6 }
]

const switchTab = (item: any) => {
  tabVal.value = item.value
  emit('switchTab', item)
}
</script>
<style lang="scss" scoped>
.tab-list {
  display: flex;
  align-items: center;
  margin: 9rpx 0;

  .tab-item {
    display: flex;
    width: 50rpx;
    height: 23rpx;
    margin-right: 5rpx;
    font-size: 9rpx;
    color: #333;
    border: 1rpx solid #ebebeb;
    border-radius: 2rpx;
    align-items: center;
    justify-content: center;

    &.active {
      color: #fff;
      background: #3e73ec;
    }
  }
}
</style>
