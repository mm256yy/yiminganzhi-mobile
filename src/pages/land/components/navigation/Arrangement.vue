<!--生产安置确认-->
<template>
  <view class="main-wrapper">
    <view class="row-1">
      <view class="left" />
      <view class="right">
        <view class="btn green">
          <image class="icon" src="@/static/images/icon_print.png" mode="scaleToFill" />
          <text class="txt">打印报表</text>
        </view>
        <view class="btn blue" @click="onArchives">
          <image class="icon" src="@/static/images/icon_upload_white.png" mode="scaleToFill" />
          档案上传
        </view>
      </view>
    </view>
    <view class="row-label-title">
      本户共计征收土地：1.5亩，参保系数为：0.5，可参保3人，请添加参保人员
    </view>
    <view class="main-list">
      <scroll-view v-if="list && list.length" class="scroll-view" scroll-y :enable-flex="true">
        <view class="scroll">
          <!-- <LandListItem v-for="(item, index) in list" :data="item" :key="index" /> -->
        </view>
      </scroll-view>
      <NoData v-else />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const onArchives = () => {}
const list = ref<any[]>([])
const isLoading = ref<boolean>(false) //是否正在加载
const isEnd = ref<boolean>(false) // 是否加载到底
const page = ref<number>(1)
const pageSize = ref<number>(10)

const init = () => {
  page.value = 1
  isEnd.value = false
  isLoading.value = false
}

// const loadMore = () => {
//   if (isEnd.value || isLoading.value) {
//     return
//   }
//   console.log('load more')
// }
</script>

<style lang="scss" scoped>
.main-wrapper {
  width: 100%;
  height: calc(100vh - 80rpx - var(--status-bar-height));
  overflow-y: scroll;
  padding: 12rpx;

  .row-1 {
    display: flex;
    align-items: center;
    margin: 9rpx 0;
    justify-content: space-between;

    .right {
      display: flex;
      align-items: center;

      .btn {
        display: flex;
        height: 23rpx;
        padding: 0 9rpx;
        margin-right: 6rpx;
        font-size: 9rpx;
        color: #fff;
        border-radius: 23rpx;
        box-sizing: border-box;
        align-items: center;
        justify-content: center;

        &.green {
          background-color: #30a952;
        }

        &.blue {
          background-color: #3e73ec;
        }

        .icon {
          width: 9rpx;
          height: 9rpx;
          margin-right: 2rpx;
        }
      }
    }
  }

  .row-label-title {
    color: #333;
    font-size: 10rpx;
  }

  .main-list {
    flex: 1;
    width: 100%;
    margin-top: 7rpx;
  }

  .scroll-view {
    width: 100%;
    height: calc(100vh - var(--status-bar-height) - 33rpx - 18rpx - 6rpx - 10rpx - 42rpx);
  }

  .scroll {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
  }
}
</style>
