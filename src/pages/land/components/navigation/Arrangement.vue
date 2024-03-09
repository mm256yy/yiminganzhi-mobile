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
      <scroll-view
        v-if="dataInfo.demographicList && dataInfo.demographicList.length"
        class="scroll-view"
        scroll-y
        :enable-flex="true"
      >
        <view class="scroll">
          <ArrangementListItem
            v-for="(item, index) in dataInfo.demographicList"
            :data="item"
            :key="index"
            @to-detail="handleClickDetail"
          />
        </view>
      </scroll-view>
      <NoData style="margin-top: 60rpx" v-else />
    </view>
    <image
      class="fix-btn add"
      src="@/static/images/icon_add.png"
      mode="scaleToFill"
      @click="toLink('add', {})"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ArrangementListItem from './ArrangementListItem.vue'
import NoData from '@/components/NoData/index.vue'
import { formatStr, routerForward } from '@/utils'

const onArchives = () => {}

const props = defineProps({
  dataInfo: {
    type: Object as any,
    default: () => {}
  }
})

const toLink = (type: string, item: any) => {
  if (type === 'edit') {
    routerForward('arrangementEdit', {
      params: JSON.stringify({
        item,
        type
      })
    })
  } else if (type === 'add') {
    routerForward('arrangementEdit', {
      params: JSON.stringify({
        type
      })
    })
  }
}

const handleClickDetail = (data: any) => {
  toLink('edit', data)
}
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

  .fix-btn {
    position: fixed;
    right: 25rpx;
    width: 28rpx;
    height: 28rpx;
    border-radius: 50%;

    &.add {
      bottom: 16rpx;
    }

    &.record {
      bottom: 54rpx;
    }
  }
}
</style>
