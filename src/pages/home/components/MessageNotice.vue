<template>
  <view class="statistic">
    <view class="inner">
      <view class="title-region">
        <view
          class="echart-title"
          :class="[menuIndex === 0 ? 'active' : '']"
          @click="handleItemClick(0)"
        >
          <image src="@/static/images/icon_notice.png" class="icon" />
          <view>消息通知</view>
        </view>
        <view
          class="echart-title"
          :class="[menuIndex === 1 ? 'active' : '']"
          @click="handleItemClick(1)"
        >
          <image src="@/static/images/icon_feed.png" class="icon" />
          <view>消息反馈</view>
        </view>
      </view>
      <!--消息通知-->
      <div v-if="menuIndex === 0" class="list-wrapper">
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
      </div>
      <!--消息反馈-->
      <div v-else class="list-wrapper">
        <view class="top-title">
          <view>
            <text class="title-index">序号</text>
            <text class="title-content">内容</text>
          </view>
          <text class="time">提交时间</text>
        </view>
        <view class="list">
          <view class="item-title" v-for="(item, index) in feedbackList" :key="index">
            <view>
              <text class="item-index">{{ index + 1 }}</text>
              <text class="item-content">{{ item.remark }}</text>
            </view>
            <text class="item-time">{{
              item.createdDate ? dayjs(item.createdDate).format('YYYY-MM-DD') : '-'
            }}</text>
          </view>
        </view>
      </div>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getOtherItemApi } from '@/service'
import { OtherDataType } from '@/database'
import dayjs from 'dayjs'

const currentTab = ref(0)
let menuIndex = ref(1)
const feedbackList = ref<any[]>([])

const tabChange = (id: number) => {
  if (currentTab.value === id) {
    return
  }
  currentTab.value = id
}

const handleItemClick = (index: number) => {
  menuIndex.value = index
}

// 消息反馈列表
const getFeedbackList = async () => {
  const res = await getOtherItemApi(OtherDataType.FeedbackDtoList)
  feedbackList.value = res || []
}

onMounted(() => {
  getFeedbackList()
})
</script>

<style lang="scss" scoped>
.statistic {
  display: flex;
  width: 264rpx;
  height: 175rpx;
  margin-right: 11rpx;
  background: linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  border-radius: 9rpx;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.08);
  align-items: center;
  justify-content: center;

  .inner {
    display: flex;
    width: 264rpx;
    height: 175rpx;
    padding: 6rpx;
    background: linear-gradient(180deg, #deebf6 0%, #ffffff 100%);
    border-radius: 9rpx;
    flex-direction: column;
  }
}

.title-region {
  display: flex;

  .echart-title {
    display: flex;
    height: 21rpx;
    padding-left: 30rpx;
    margin-right: 8rpx;
    font-size: 10rpx;
    font-weight: 600;
    line-height: 21rpx;
    color: #3e73ec;
    text-align: center;
    background: #ffffff;
    border-radius: 5rpx;
    flex: 1 auto;
    align-items: center;

    &:last-child {
      margin-right: 0;
    }

    &.active {
      color: #ffffff;
      background: linear-gradient(135deg, #1a63ff 0%, rgba(255, 255, 255, 0) 100%);
    }

    .icon {
      width: 11rpx;
      height: 11rpx;
      margin-right: 6rpx;
      line-height: 21rpx;
    }

    .text {
      font-family: YouSheBiaoTiHei-Regular, YouSheBiaoTiHei;
      font-size: 10rpx;
      font-weight: 400;
    }
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
      overflow: hidden;
      font-weight: 500;
      color: #131313;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
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
