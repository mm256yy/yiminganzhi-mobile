<template>
  <view class="sidebar-wrapper">
    <view class="main">
      <view class="content">
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
            <image
              v-if="item.filled"
              class="filled-icon"
              src="@/static/images/tabs_fill_suc.png"
              mode="scaleToFill"
            />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  dataList: {
    type: Array as any,
    default: () => []
  }
})

const currentIndex = ref<number>(0)
const emit = defineEmits(['switchTab'])

const switchTab = (item: any, index: number) => {
  currentIndex.value = index
  emit('switchTab', item)
}
</script>
<style lang="scss" scoped>
.sidebar-wrapper {
  width: 200rpx;
  height: calc(100vh - 33rpx - 12rpx - var(--status-bar-height));
  padding: 14rpx 9rpx 0 9rpx;
  background-color: #fff;
  border-radius: 7rpx;
  box-shadow: 0 0 12rpx 0 rgba(0, 0, 0, 0.08);
  box-sizing: border-box;

  .list {
    display: flex;
    height: calc(100vh - 33rpx - 12rpx - 14rpx - var(--status-bar-height));
    overflow-y: scroll;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    .item {
      display: flex;
      width: 86rpx;
      height: 28rpx;
      margin-bottom: 14rpx;
      font-size: 9rpx;
      color: #171718;
      border: 1rpx solid #ebebeb;
      border-radius: 2rpx;
      align-items: center;
      justify-content: center;

      &:first-child {
        width: 100%;
      }

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

      .filled-icon {
        width: 9rpx;
        height: 9rpx;
        margin-left: 2rpx;
      }
    }
  }
}
</style>
