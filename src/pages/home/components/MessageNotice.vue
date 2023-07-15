<template>
  <view class="statistic">
    <view class="inner">
      <view class="echart-title">
        <image src="@/static/images/statistic_head.png" class="icon" />
        <view class="text">消息通知</view>
      </view>
      <view class="top5-tabs">
        <view
          v-for="item in tabs"
          :key="item.id"
          class="top5-tab-item"
          :class="[item.id === currentTab ? 'active' : '']"
          @click="tabChange(item.id)"
        >
          {{ item.name }}
        </view>
      </view>
      <view class="top-title">
        <view>
          <text class="title-index">序号</text>
          <text class="title-content">内容</text>
        </view>
        <text class="time">发送时间</text>
      </view>
      <view class="list">
        <view class="item-title">
          <view>
            <text class="item-index">1</text>
            <text class="item-content">您有5还有居民已严重滞后，请推进实施工作</text>
          </view>
          <text class="item-time">2023-05-11</text>
        </view>
        <view class="item-title">
          <view>
            <text class="item-index">2</text>
            <text class="item-content">您有2户居民未开始填报，请推进实施工作</text>
          </view>
          <text class="item-time">2023-05-11</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentTab = ref(0)
const tabs = ref([
  {
    name: '全部',
    id: 0
  },
  {
    name: '已读',
    id: 1
  },
  {
    name: '未读',
    id: 2
  }
])

const tabChange = (id: number) => {
  if (currentTab.value === id) {
    return
  }
  currentTab.value = id
}
</script>

<style lang="scss" scoped>
.statistic {
  display: flex;
  width: 264rpx;
  height: 142rpx;
  margin-right: 11rpx;
  background: linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  border-radius: 9rpx;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.08);
  align-items: center;
  justify-content: center;

  .inner {
    display: flex;
    width: 264rpx;
    height: 142rpx;
    padding: 6rpx;
    background: linear-gradient(180deg, #deebf6 0%, #ffffff 100%);
    border-radius: 9rpx;
    flex-direction: column;
  }
}

.echart-title {
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 21rpx;
  padding: 0 6rpx;
  background: linear-gradient(135deg, #1a63ff 0%, rgba(255, 255, 255, 0) 100%);
  border-radius: 5rpx;

  .icon {
    width: 11rpx;
    height: 11rpx;
    margin-right: 6rpx;
  }

  .text {
    font-family: YouSheBiaoTiHei-Regular, YouSheBiaoTiHei;
    font-size: 12rpx;
    font-weight: 400;
    color: #ffffff;
  }
}

.top5-tabs {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5rpx 0;

  .top5-tab-item {
    display: flex;
    width: 43rpx;
    height: 19rpx;
    margin-right: 6rpx;
    font-size: 8rpx;
    color: #666666;
    background-color: #ffffff;
    border-radius: 2rpx;
    align-items: center;
    justify-content: center;

    &.active {
      color: #ffffff;
      background-color: #2f72fe;
    }
  }
}

.top-title {
  display: flex;
  height: 22rpx;
  font-size: 8rpx;
  font-weight: 400;
  line-height: 22rpx;
  color: #171718;
  align-items: center;
  justify-content: space-between;

  .title-index {
    padding-right: 6rpx;
  }

  .title-content {
    padding-left: 6rpx;
  }

  .time {
    padding-right: 6rpx;
  }
}

.list {
  max-height: 60rpx;
  overflow-y: auto;
  background: #ffffff;

  .item-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 8rpx;

    .item-index {
      width: 28rpx;
      height: 26rpx;
      padding-left: 5rpx;
      font-weight: 500;
      line-height: 26rpx;
      color: #131313;
      text-align: center;
    }

    .item-content {
      width: 154rpx;
      height: 26rpx;
      padding-left: 18rpx;
      font-weight: 500;
      color: #131313;
      text-align: left;
    }

    .item-time {
      padding-right: 6rpx;
      font-size: 8rpx;
      font-weight: 500;
      color: rgba(19, 19, 19, 0.4);
    }
  }
}
</style>
