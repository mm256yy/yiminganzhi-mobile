<template>
  <view class="tabs-wrapper">
    <view class="tabs-list">
      <view
        v-for="(item, index) in tabsList"
        :key="item.value"
        :class="['tabs-item', currentIndex === index ? 'active' : '']"
        @click="selectTabs(item, index)"
      >
        {{ item.label }}
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

interface PropsType {
  dataList: any[]
}

const props = defineProps<PropsType>()
const emit = defineEmits(['selectTabs'])

const tabsList = ref<any>([])
const currentIndex = ref<number>(0)

onMounted(() => {
  if (props.dataList && props.dataList.length) {
    tabsList.value = JSON.parse(JSON.stringify(props.dataList))
  }
})

const selectTabs = (data: string, index: number) => {
  currentIndex.value = index
  emit('selectTabs', data)
}
</script>

<style lang="scss" scoped>
.tabs-wrapper {
  width: 100%;
  height: 23rpx;
  margin: 5rpx 0;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  &::-moz-scrollbar {
    display: none;
  }

  &::-ms-scrollbar {
    display: none;
  }

  .tabs-list {
    display: flex;
    flex-direction: row;
    align-items: center;

    .tabs-item {
      display: flex;
      width: auto;
      height: 23rpx;
      padding: 5rpx 9rpx;
      margin-right: 5rpx;
      font-size: 11rpx;
      color: #171718;
      cursor: pointer;
      background-color: #ebeef5;
      box-sizing: border-box;
      justify-content: center;

      &.active {
        color: #3e73ec;
        background-color: #e9f0ff;
        border: 1rpx solid #3e73ec;
        border-radius: 2rpx;
      }
    }
  }
}
</style>
