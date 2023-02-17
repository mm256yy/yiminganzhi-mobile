<template>
  <view class="tabs-wrapper">
    <view class="tabs-list">
      <view
        v-for="(item, index) in tabsList"
        :key="item.value"
        :class="['tabs-item', currentIndex === index ? 'active' : '']"
        @click="selectTabs(item, index)"
      >
        <text :class="['label', currentIndex === index ? 'active' : '']">{{ item.label }}</text>
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

const selectTabs = (data: any, index: number) => {
  currentIndex.value = index
  emit('selectTabs', data, index)
}
</script>

<style lang="scss" scoped>
.tabs-wrapper {
  width: 100%;
  height: 23rpx;
  margin: 5rpx 0;

  .tabs-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 520rpx;
    height: 23rpx;
    overflow-x: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    &::-moz-scrollbar {
      display: none;
    }

    .tabs-item {
      display: flex;
      height: 23rpx;
      padding: 5rpx 9rpx;
      margin-right: 5rpx;
      font-size: 11rpx;
      color: #171718;
      background-color: #ebeef5;
      box-sizing: border-box;
      align-items: center;
      justify-content: center;

      &:last-child {
        margin-right: 0;
      }

      &.active {
        color: #3e73ec;
        background-color: #e9f0ff;
        border: 1rpx solid #3e73ec;
        border-radius: 2rpx;
      }

      .label {
        font-size: 11rpx;
        color: #171718;
        word-break: break-all;
        white-space: nowrap;

        &.active {
          color: #3e73ec;
        }
      }
    }
  }
}
</style>
