<template>
  <view class="statistic">
    <view class="inner">
      <view class="echart-title">
        <image src="@/static/images/statistic_head.png" class="icon" />
        <view class="text">网格进度排行榜(居民户)</view>
      </view>
      <view class="tabs-status">
        <view
          v-for="item in tabStatus"
          :key="item.id"
          class="tabs-txt"
          :class="[item.id === statusTab ? 'active' : '']"
          @click="statusTabChange(item.id)"
        >
          {{ item.name }}
        </view>
      </view>
      <div class="bottom-wrapper">
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
      </div>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getOtherItemApi } from '@/service'
import { OtherDataType } from '@/database'
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

interface TabType {
  id: number
  name: string
}

const rankList = ref<any[]>([]) // 排行榜列表
const currentTab = ref(0)
const statusTab = ref(0)

const tabStatus = ref([
  {
    id: 0,
    name: '动迁阶段'
  },
  {
    id: 1,
    name: '安置阶段'
  }
])

const tabs = ref<TabType[]>([])
const tabs1 = ref<TabType[]>([
  {
    name: '资格认定',
    id: 0
  },
  {
    name: '安置确认',
    id: 1
  },
  {
    name: '择址确认',
    id: 2
  },
  {
    name: '腾空过渡',
    id: 3
  },
  {
    name: '动迁协议',
    id: 4
  }
])

const tabs2 = ref<TabType[]>([
  {
    name: '拆迁安置',
    id: 5
  },
  {
    name: '生产安置',
    id: 6
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

const getStatisticData = (id: number) => {
  let max = 0
  let arr: any = rankList.value[`${id}`].scheduleRankList || []
  const top5Array = arr.slice(0, 5)
  const options = top5Array.map((item: any, index: number) => {
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

const statusTabChange = (id: number) => {
  statusTab.value = id
  const tabId = id === 0 ? tabs1.value[0].id : tabs2.value[0].id
  currentTab.value = tabId
  tabs.value = id === 0 ? tabs1.value : tabs2.value
  // 切换一级tab 时 二级 tab 赋值 并且需要更新图表数据
  getStatisticData(tabId)
}

onMounted(() => {
  getOtherItemApi(OtherDataType.RankDtoList).then((res) => {
    console.log(res, '排行榜')
    rankList.value = res || []
    statusTabChange(0)
  })
})
</script>

<style lang="scss" scoped>
.statistic {
  display: flex;
  height: 175rpx;
  margin-right: 11rpx;
  background: linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  border-radius: 9rpx;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.08);
  align-items: center;
  justify-content: center;

  .inner {
    display: flex;
    width: 457rpx;
    height: 175rpx;
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
    font-size: 10rpx;
    font-weight: 400;
    color: #ffffff;
  }
}

.tabs-status {
  display: flex;
  margin-top: 4rpx;
  margin-bottom: 4rpx;
  overflow: hidden;
  font-size: 8rpx;

  .tabs-txt {
    width: 58rpx;
    height: 20rpx;
    line-height: 20rpx;
    text-align: center;
    background-color: #ffffff;
    border: 1px solid #2f72fe;
    // box-sizing: content-box;

    &.active {
      color: #ffffff;
      background-color: #2f72fe;
    }

    &:first-child {
      border-bottom-left-radius: 5rpx;
      border-top-left-radius: 5rpx;
    }

    &:last-child {
      border-top-right-radius: 5rpx;
      border-bottom-right-radius: 5rpx;
    }
  }
}

.bottom-wrapper {
  background: #ffffff;

  .top5-tabs {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5rpx;

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
}
</style>
