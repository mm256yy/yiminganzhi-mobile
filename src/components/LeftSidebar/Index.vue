<template>
  <view class="sidebar-wrapper">
    <view class="main">
      <view class="content">
        <view class="title">{{ title }}</view>
        <view class="list">
          <view
            v-for="(item, index) in dataList"
            :key="item.label"
            :class="['item', currentIndex === index ? 'active' : '']"
            @click="switchTab(item, index)"
          >
            <image
              :src="currentIndex === index ? item.iconSel : item.iconDef"
              class="icon"
              mode="aspectFill"
            />
            {{ item.label }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  dataList: {
    type: Array as any,
    default: () => []
  }
})

const currentIndex = ref<number>(0)
const emit = defineEmits(['change'])

const switchTab = (item: any, index: number) => {
  currentIndex.value = index
  emit('change', item, index)
}
</script>
<style lang="scss" scoped>
.sidebar-wrapper {
  width: 200rpx;
  height: calc(100vh - 33rpx - 12rpx - var(--status-bar-height));
  background-color: #fff;
  border-radius: 7rpx;
  box-shadow: 0 0 12rpx 0 rgba(0, 0, 0, 0.08);

  .title {
    width: 100%;
    height: 33rpx;
    font-size: 11rpx;
    line-height: 33rpx;
    color: #171718;
    text-align: center;
    box-shadow: 0 1rpx 9rpx -2rpx rgba(0, 0, 0, 0.18);
  }

  .list {
    display: flex;
    height: calc(100vh - 33rpx - 33rpx - 12rpx - var(--status-bar-height));
    padding: 0 9rpx 14rpx 9rpx;
    overflow-y: scroll;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    .item {
      display: flex;
      width: 86rpx;
      height: 28rpx;
      margin-top: 14rpx;
      font-size: 9rpx;
      color: #171718;
      border: 1rpx solid #ebebeb;
      border-radius: 2rpx;
      align-items: center;
      justify-content: center;

      &.active {
        color: #fff;
        background: #3e73ec;
        border: 1rpx solid #3e73ec;
      }

      .icon {
        width: 12rpx;
        height: 12rpx;
        margin-right: 2rpx;
      }
    }
  }
}
</style>
