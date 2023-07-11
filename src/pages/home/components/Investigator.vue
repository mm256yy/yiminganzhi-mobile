<template>
  <view>
    <view class="admin-collect">
      <view v-if="userInfo" class="admin">
        <view class="avater-box" v-if="userInfo.avatar">
          <image class="avater" :src="userInfo.avatar" mode="scaleToFill" />
        </view>
        <image v-else class="avater-box" src="@/static/images/avater.png" mode="scaleToFill" />

        <view class="info">
          <view class="name">{{ userInfo.userName || userInfo.username }}</view>
          <view class="desc">{{ userInfo.phone }}</view>
        </view>
      </view>
      <view v-else class="admin" @click="loginIn">
        <image class="avater-box" src="@/static/images/avater.png" mode="scaleToFill" />

        <view class="info">
          <view class="name">请登录</view>
        </view>
      </view>
      <view class="collect" v-if="collection">
        <view class="collect-item">
          <view class="num">{{ collection.todayReport || 0 }}</view>
          <view class="tit">今日填报</view>
        </view>
        <view class="collect-item">
          <view class="num">{{ collection.hasReport || 0 }}</view>
          <view class="tit">历史填报</view>
        </view>
        <view class="collect-item">
          <view class="num">{{ collection.noReport || 0 }}</view>
          <view class="tit">未调查</view>
        </view>
      </view>
      <view v-else />
    </view>

    <view class="main-enter">
      <!-- top5 -->
      <Echart />

      <view class="enter-item" @click="toLink('householdList')">
        <view class="inner">
          <view class="top">
            <image class="enter-icon" src="@/static/images/peple_enter.png" mode="scaleToFill" />
            <view class="enter-name">居民户</view>
          </view>

          <view class="enter-common">
            <text class="txt">数据填报</text>
            <image class="arrow" src="@/static/images/home_arrow_lite.png" mode="scaleToFill" />
          </view>
        </view>
      </view>

      <view class="enter-item" @click="toLink('enterpriseList')">
        <view class="inner">
          <view class="top">
            <image class="enter-icon" src="@/static/images/company_enter.png" mode="scaleToFill" />
            <view class="enter-name">企业</view>
          </view>

          <view class="enter-common">
            <text class="txt">数据填报</text>
            <image class="arrow" src="@/static/images/home_arrow_lite.png" mode="scaleToFill" />
          </view>
        </view>
      </view>

      <view class="enter-item" @click="toLink('selfPersonList')">
        <view class="inner">
          <view class="top">
            <image class="enter-icon" src="@/static/images/single_enter.png" mode="scaleToFill" />
            <view class="enter-name">个体户</view>
          </view>

          <view class="enter-common">
            <text class="txt">数据填报</text>
            <image class="arrow" src="@/static/images/home_arrow_lite.png" mode="scaleToFill" />
          </view>
        </view>
      </view>

      <view class="enter-item" @click="toLink('collectiveList')">
        <view class="inner">
          <view class="top">
            <image class="enter-icon" src="@/static/images/jt_enter.png" mode="scaleToFill" />
            <view class="enter-name">村集体</view>
          </view>

          <view class="enter-common">
            <text class="txt">数据填报</text>
            <image class="arrow" src="@/static/images/home_arrow_lite.png" mode="scaleToFill" />
          </view>
        </view>
      </view>
    </view>

    <view class="other-enter">
      <view class="other-item" @click="toLink('sync')">
        <view class="inner">
          <image class="other-icon" src="@/static/images/sync_enter.png" mode="scaleToFill" />
          <text class="other-tit">数据同步</text>
        </view>
        <image class="arrow-icon" src="@/static/images/home_arrow.png" mode="scaleToFill" />
      </view>

      <view class="other-item" @click="toLink('work')">
        <view class="inner">
          <image class="other-icon" src="@/static/images/work_enter.png" mode="scaleToFill" />
          <text class="other-tit">我的工作</text>
        </view>
        <image class="arrow-icon" src="@/static/images/home_arrow.png" mode="scaleToFill" />
      </view>

      <view class="other-item" @click="toLink('mapList')">
        <view class="inner">
          <image class="other-icon" src="@/static/images/map_enter.png" mode="scaleToFill" />
          <text class="other-tit">查看地图</text>
        </view>
        <image class="arrow-icon" src="@/static/images/home_arrow.png" mode="scaleToFill" />
      </view>
      <view class="other-item" @click="toLink('village')">
        <view class="inner">
          <image class="other-icon" src="@/static/images/yimin_enter.png" mode="scaleToFill" />
          <text class="other-tit">自然村清单</text>
        </view>
        <image class="arrow-icon" src="@/static/images/home_arrow.png" mode="scaleToFill" />
      </view>
    </view>

    <view class="other-enter">
      <view class="other-item" @click="toLink('database')">
        <view class="inner">
          <image class="other-icon" src="@/static/images/sync_enter.png" mode="scaleToFill" />
          <text class="other-tit">数据库</text>
        </view>
        <image class="arrow-icon" src="@/static/images/home_arrow.png" mode="scaleToFill" />
      </view>
      <view class="other-item" @click="toLink('login')">
        <view class="inner">
          <image class="other-icon" src="@/static/images/sync_enter.png" mode="scaleToFill" />
          <text class="other-tit">登录页</text>
        </view>
        <image class="arrow-icon" src="@/static/images/home_arrow.png" mode="scaleToFill" />
      </view>

      <view class="other-item" @click="toLink('imphome')">
        <view class="inner">
          <image class="other-icon" src="@/static/images/sync_enter.png" mode="scaleToFill" />
          <text class="other-tit">实施页</text>
        </view>
        <image class="arrow-icon" src="@/static/images/home_arrow.png" mode="scaleToFill" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Echart from './components/Echart.vue'
import { onShow } from '@dcloudio/uni-app'
import { getStorage, StorageKey } from '@/utils'
import { getHomeCollectionApi } from '@/service'

interface CollectionType {
  hasReport: number
  noReport: number
  todayReport: number
}

const emit = defineEmits(['toLink', 'loginIn'])
const userInfo = ref<any>(null)
const collection = ref<CollectionType | null>(null)

const toLink = (name: string) => {
  emit('toLink', name)
}

const loginIn = () => {
  emit('loginIn')
}

onShow(() => {
  const user = getStorage(StorageKey.USERINFO)
  userInfo.value = user

  getHomeCollectionApi().then((res) => {
    collection.value = res || null
  })
})
</script>

<style lang="scss" scoped>
.admin-collect {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22rpx 24rpx 42rpx;

  .admin {
    display: flex;
    flex-direction: row;
    align-items: center;

    .avater-box {
      display: flex;
      width: 40rpx;
      height: 40rpx;
      margin-right: 6rpx;
      overflow: hidden;

      background: linear-gradient(143deg, #ffffff 0%, #a5bcff 100%);
      border-radius: 50%;
      align-items: center;
      justify-content: center;

      .avater {
        width: 36rpx;
        height: 36rpx;
        background-color: #86a3c4;
        border-radius: 50%;
      }
    }

    .info {
      display: flex;
      flex-direction: column;

      .name {
        font-size: 13rpx;
        font-weight: 600;
        line-height: 18rpx;
        color: #ffffff;
      }

      .desc {
        margin-top: 5rpx;
        font-size: 11rpx;
        line-height: 15rpx;
        color: #ffffff;
      }
    }
  }

  .collect {
    display: flex;
    flex-direction: row;

    .collect-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 53rpx;

      .num {
        font-size: 23rpx;
        font-weight: 600;
        line-height: 33rpx;
        color: #ffffff;
      }

      .tit {
        font-size: 11rpx;
        font-weight: 600;
        line-height: 15rpx;
        color: #ffffff;
      }

      &:last-child {
        margin-right: 0rpx;
      }
    }
  }
}

.main-enter {
  display: flex;
  flex-direction: row;
  width: 750rpx;
  justify-content: center;

  .enter-item {
    display: flex;
    width: 117rpx;
    height: 141rpx;
    margin-right: 6rpx;
    background: linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
    border-radius: 11rpx;
    box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.08);
    align-items: center;
    justify-content: center;

    .inner {
      display: flex;
      width: 115rpx;
      height: 139rpx;
      padding: 28rpx 12rpx 12rpx 22rpx;
      background: linear-gradient(180deg, #deebf6 0%, #ffffff 100%);
      border-radius: 11rpx;
      flex-direction: column;
      justify-content: space-between;
    }

    .top {
      display: flex;
      flex-direction: column;
    }

    .enter-icon {
      width: 33rpx;
      height: 33rpx;
      transform: scale(1.2);
    }

    .enter-name {
      margin-top: 5rpx;
      font-size: 13rpx;
      font-weight: 600;
      line-height: 18rpx;
      color: #171718;
    }

    .enter-common {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .txt {
        margin-right: 2rpx;
        font-size: 8rpx;
        line-height: 12rpx;
        color: #171718;
      }

      .arrow {
        width: 9rpx;
        height: 9rpx;
      }
    }

    &:last-child {
      margin-right: 0rpx;
    }
  }
}

.other-enter {
  display: flex;
  justify-content: center;
  width: 750rpx;
  margin-top: 36rpx;

  &.self {
    display: none;
    margin-top: 10rpx;
  }

  .other-item {
    display: flex;
    width: 117rpx;
    height: 33rpx;
    padding: 0 9rpx 0 4rpx;
    margin-right: 14rpx;
    background-color: #cfdffa;
    border-radius: 9rpx;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .inner {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .other-icon {
      width: 26rpx;
      height: 26rpx;
    }

    .other-tit {
      margin-left: 9rpx;
      font-size: 9rpx;
      font-weight: 600;
      color: #0a54ff;
    }

    .arrow-icon {
      width: 9rpx;
      height: 9rpx;
    }

    &:last-child {
      margin-right: 0rpx;
    }
  }
}
</style>
