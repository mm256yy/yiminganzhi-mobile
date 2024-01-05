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
import { getStatisticApi } from '@/service'
import { Top5Type, Top5ItemType } from '@/types/common'

import top5_1 from '@/static/images/statistic_top1.png'
import top5_2 from '@/static/images/statistic_top2.png'
import top5_3 from '@/static/images/statistic_top3.png'
import top5_4 from '@/static/images/statistic_top4.png'
import top5_5 from '@/static/images/statistic_top5.png'
import { OtherDataType } from '@/database'

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
    name: '累计填报',
    id: 0
  },
  {
    name: '今日填报',
    id: 1
  },
  {
    name: '累计签字',
    id: 2
  },
  {
    name: '今日签字',
    id: 3
  }
])

const statisticData = ref<Top5Type>({
  homeReportTop: [],
  homeReportTopToday: [],
  homeSignTop: [],
  homeSignTopToday: []
})

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

const getStatisticDataRequest = async () => {
  const data: Top5Type = await getStatisticApi(OtherDataType.Top5)
  statisticData.value = data
  console.log(data, 'data')
  getStatisticData()
}

const getStatisticData = (id?: number) => {
  let max = 0
  let arr: any = []
  if (id) {
    arr =
      id === 1
        ? statisticData.value?.homeReportTopToday
        : id === 2
        ? statisticData.value?.homeSignTop
        : statisticData.value?.homeSignTopToday
  } else {
    arr = statisticData.value?.homeReportTop
  }
  const top5Array = arr.slice(0, 5)
  top5Array.sort(function (a: any, b: any) {
    return a.number < b.number ? 1 : -1
  })
  console.log(top5Array,'top5Array测试')
  const options = top5Array.map((item: Top5ItemType, index: number) => {
    if (index === 0) {
      max = item.number
    }
    return {
      ...item,
      index,
      progress: ((item.number / max) * 100) | 0,
      img: getImg(index)
    }
  })

  echartOptions.value = options
}

const tabChange = (id: number) => {
  if (currentTab.value === id) {
    return
  }
  currentTab.value = id
  getStatisticData(id)
}

onMounted(() => {
  getStatisticDataRequest()
})
</script>

<style lang="scss" scoped>
.statistic {
  display: flex;
  width: 205rpx;
  height: 141rpx;
  margin-right: 11rpx;
  background: linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  border-radius: 9rpx;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.08);
  align-items: center;
  justify-content: center;

  .inner {
    display: flex;
    width: 203rpx;
    height: 139rpx;
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
  width: 193rpx;
  height: 79rpx;
  padding: 3rpx 6rpx 0;
  box-sizing: border-box;

  .echart-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
    height: 15rpx;

    .echart-item-lt {
      display: flex;
      align-items: center;
      flex-direction: row;

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
      width: 90rpx;
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
      justify-content: flex-end;

      .txt {
        font-size: 8rpx;
        font-weight: 400;
        color: #333333;
      }
    }
  }
}
</style>
