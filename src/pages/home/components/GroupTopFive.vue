<template>
  <view class="statistic">
    <view class="inner">
      <view class="echart-title">
        <image src="@/static/images/statistic_head.png" class="icon" />
        <view class="text">工作进度晾晒</view>
      </view>
      <div class="bottom-wrapper">
        <view class="top5-tabs">
          <view
            v-for="item in tabs1"
            :key="item.id"
            class="top5-tab-item"
            :class="[item.id === currentTab ? 'active' : '']"
            @click="tabChange(item.id)"
          >
            {{ item.name }}
          </view>
        </view>

        <view class="echart-wrap">
          <view class="echart-item" v-for="item in list" :key="item.userId">
            <view class="echart-item-lt">
              <image class="top-img" :src="item.img" mode="scaleToFill" />
              <text class="user-name">{{ item.userName }}</text>
            </view>

            <view class="echart-item-ct">
              <view
                class="progress"
                :style="{ width: `${(item.countComplete * 100) / item.max}%` }"
              />
            </view>

            <view class="echart-item-rt">
              <text class="txt">{{ item.countComplete }}户</text>
            </view>
          </view>
        </view>
      </div>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getStatisticApi } from '@/service'
import { OtherDataType } from '@/database'
import top5_1 from '@/static/images/statistic_top1.png'
import top5_2 from '@/static/images/statistic_top2.png'
import top5_3 from '@/static/images/statistic_top3.png'
import top5_4 from '@/static/images/statistic_top4.png'
import top5_5 from '@/static/images/statistic_top5.png'
interface OptionsType {
  userName?: string
  countComplete?: number
  index?: any
}

const echartOptions = ref<any>([])
let list = ref<any>([])
const getStatisticDataRequest = async (id) => {
  console.log('11111111111111111')
  const data: any = await getStatisticApi(OtherDataType.PgTop)
  echartOptions.value = data
  console.log(data, 'data')
  tabs.value = 0
  currentTab.value = id
  list.value = echartOptions.value.filter((item: any) => {
    if (item.type == id) {
      tabs.value += item.countComplete
    }
    return item.type == id
  })
  list.value.sort((a: any, b: any) => {
    return b.countComplete - a.countComplete
  })
  list.value = list.value.map((item: any, index: number) => {
    return { ...item, max: tabs.value, img: getImg(index) }
  })
}
const tabs = ref<any>(0)
const tabs1 = ref<any>([
  {
    name: '居民户',
    id: 'PeasantHousehold'
  },
  {
    name: '企业',
    id: 'Company'
  },
  {
    name: '个体工商户',
    id: 'IndividualHousehold'
  },
  {
    name: '村集体',
    id: 'Village'
  }
])
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
let currentTab = ref('PeasantHousehold')
const tabChange = (id: any) => {
  if (currentTab.value === id) {
    return
  }
  tabs.value = 0
  currentTab.value = id
  list.value = echartOptions.value.filter((item: any) => {
    if (item.type == id) {
      tabs.value += item.countComplete
    }
    return item.type == id
  })
  list.value.sort((a: any, b: any) => {
    return b.countComplete - a.countComplete
  })
  list.value = list.value.map((item: any, index: number) => {
    return { ...item, max: tabs.value, img: getImg(index) }
  })
}
onMounted(() => {
  getStatisticDataRequest('PeasantHousehold')
  currentTab.value = 'PeasantHousehold'
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
  min-height: 145rpx;
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
      border: 1px solid rgb(201, 200, 200);
      margin-right: 5rpx;

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
