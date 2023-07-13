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

      <view />
    </view>

    <!-- 具体内容 -->

    <view class="main-enter">
      <view class="enter-item" @click="toLink('householdList')">
        <view class="inner">
          <view class="top">
            <image class="enter-icon" src="@/static/images/peple_enter.png" mode="scaleToFill" />
            <view class="enter-name">居民户</view>
          </view>

          <view class="enter-common">
            <text class="txt">移民实施</text>
            <image class="arrow" src="@/static/images/home_arrow_lite.png" mode="scaleToFill" />
          </view>
        </view>
      </view>
    </view>

    <view class="other-enter self">
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
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { getStorage, StorageKey } from '@/utils'

const emit = defineEmits(['toLink', 'loginIn'])
const userInfo = ref<any>(null)
const projectInfo = ref<any>(null)

const toLink = (name: string) => {
  emit('toLink', name)
}

const loginIn = () => {
  emit('loginIn')
}

onShow(() => {
  const user = getStorage(StorageKey.USERINFO)
  const project = getStorage(StorageKey.PROJECTINFO)
  userInfo.value = user
  projectInfo.value = project
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
