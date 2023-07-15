<template>
  <view class="statistic">
    <view class="inner">
      <view class="echart-title">
        <image src="@/static/images/statistic_head.png" class="icon" />
        <view class="text">工作组TOP5</view>
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

      <view class="echart-wrap">
        <view class="echart-item" v-for="item in echartOptions" :key="item.index">
          <view class="echart-item-lt">
            <image class="top-img" :src="item.img" mode="scaleToFill" />
            <text class="user-name">{{ item.name }}</text>
          </view>

          <view class="echart-item-ct">
            <view class="progress" :style="{ width: `${item.progress}%` }" />
          </view>

          <view class="echart-item-rt">
            <text class="txt">{{ item.number }}户</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Top5Type, Top5ItemType } from '@/types/common'

import top5_1 from '@/static/images/statistic_top1.png'
import top5_2 from '@/static/images/statistic_top2.png'
import top5_3 from '@/static/images/statistic_top3.png'
import top5_4 from '@/static/images/statistic_top4.png'
import top5_5 from '@/static/images/statistic_top5.png'

interface OptionsType {
  name: string
  number: number
  index?: number
  progress?: number
  img?: string
}

const currentTab = ref(0)
const tabs = ref([
  {
    name: '资格认定',
    id: 0
  },
  {
    name: '模拟安置',
    id: 1
  },
  {
    name: '安置确认',
    id: 2
  },
  {
    name: '协议签订',
    id: 3
  },
  {
    name: '房屋腾空',
    id: 4
  },
  {
    name: '青苗腾空',
    id: 5
  },
  {
    name: '自(统)建房',
    id: 6
  },
  {
    name: '生产安置',
    id: 7
  },
  {
    name: '相关手续',
    id: 8
  }
])
const echartOptions = ref<OptionsType[]>([])

const getImg = (index: number) => {
  if (index === 0) {
    return top5_1
  }
  if (index === 1) {
    return top5_2
  }
  if (index === 2) {
    return top5_3
  }
  if (index === 3) {
    return top5_4
  }
  if (index === 4) {
    return top5_5
  }
}

const getStatisticData = () => {
  echartOptions.value = [
    {
      name: '陈汉林',
      number: 20,
      index: 0,
      progress: 100,
      img: top5_1
    },
    {
      name: '梁柏林',
      number: 18,
      index: 1,
      progress: 95,
      img: top5_2
    },
    {
      name: '董化杰',
      number: 15,
      index: 2,
      progress: 80,
      img: top5_3
    },
    {
      name: '潘永浩',
      number: 11,
      index: 3,
      progress: 60,
      img: top5_4
    },
    {
      name: '董羽坤',
      number: 10,
      index: 4,
      progress: 55,
      img: top5_5
    }
  ]
}

onMounted(() => {
  getStatisticData()
})

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
  height: 142rpx;
  margin-right: 11rpx;
  background: linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  border-radius: 9rpx;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.08);
  align-items: center;
  justify-content: center;

  .inner {
    display: flex;
    width: 457rpx;
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
  justify-content: space-between;
  padding: 5rpx 0;

  .top5-tab-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 43rpx;
    height: 19rpx;
    font-size: 8rpx;
    color: #666666;
    background-color: #ffffff;
    border-radius: 2rpx;

    &.active {
      color: #ffffff;
      background-color: #2f72fe;
    }
  }
}

.echart-wrap {
  display: flex;
  flex-direction: column;
  width: 457rpx;
  height: 79rpx;
  padding: 3rpx 6rpx 0;
  box-sizing: border-box;

  .echart-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 15rpx;

    .echart-item-lt {
      display: flex;
      align-items: center;

      .top-img {
        width: 15rpx;
        height: 12rpx;
        margin-right: 4rpx;
      }

      .user-name {
        width: 32rpx; // 32
        overflow: hidden;
        font-size: 8rpx;
        font-weight: 400;
        color: #333333;
        text-overflow: ellipsis;
        word-break: keep-all;
      }
    }

    .echart-item-ct {
      display: flex;
      align-items: center;
      width: 340rpx;
      margin-left: 4rpx;

      .progress {
        height: 6rpx;
        background: linear-gradient(90deg, rgba(255, 197, 61, 0.3) 0%, #faad14 100%);
        transform: skewX(-15deg);
        transform-origin: 0% 0%;
      }
    }

    .echart-item-rt {
      display: flex;
      align-items: center;
      margin-right: 12rpx;

      .txt {
        font-size: 8rpx;
        font-weight: 400;
        color: #333333;
      }
    }
  }
}
</style>
