<template>
  <Container title="居民户清单">
    <template #right>
      <view class="icon-box">
        <image class="home-icon" src="@/static/images/icon_home.png" mode="scaleToFill" />
      </view>
    </template>

    <view class="people-box">
      <view class="search-box">
        <uni-icons class="icon" type="search" color="#272636" size="9rpx" />
        <input type="text" class="ipt" placeholder="搜索名称" />
      </view>
      <view class="people-list">
        <view class="people-item">
          <view class="head">
            <view class="head-lt">
              <image class="user-icon" src="@/static/images/people_icon.png" mode="scaleToFill" />
              <view class="name">放假的时间啊了</view>
              <view class="num">334555553333</view>
            </view>
            <view class="head-rt">
              <view class="status success"><text class="circle" />未上报</view>
              <view class="edit-box">
                <image class="remove-icon" src="@/static/images/remove.png" mode="scaleToFill" />
              </view>
            </view>
          </view>

          <view class="cont">
            <view class="cont-item">
              <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
              <view class="label">是否财产户:</view>
              <view class="value">房间打开手</view>
            </view>
            <view class="cont-item">
              <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
              <view class="label">是否财产户:</view>
              <view class="value">房间打开手</view>
            </view>
            <view class="cont-item">
              <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
              <view class="label">是否财产户:</view>
              <view class="value">房间打开手</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="add-box">
      <uni-icons type="plusempty" color="#ffffff" size="10rpx" />
    </view>
  </Container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Container from '@/components/Container/index.vue'
import { LandlordType } from '@/types/sync'

const list = ref<LandlordType[]>([])
</script>

<style lang="scss">
.icon-box {
  display: flex;
  align-items: center;
}

.home-icon {
  width: 23rpx;
  height: 23rpx;
  margin-top: 4rpx;
}

.people-box {
  padding: 0 25rpx 25rpx;
}

.search-box {
  display: flex;
  align-items: center;
  width: 100%;
  height: 23rpx;
  padding: 0 18rpx;
  background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
  border-radius: 16rpx;

  .icon {
    flex: none;
  }

  .ipt {
    height: 14rpx;
    margin-left: 7rpx;
    font-size: 9rpx;
    color: #171718;
    flex: 1;
  }
}

.people-list {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.people-item {
  width: 347rpx;
  padding: 10rpx 12rpx;
  // height: 108rpx;
  margin: 7rpx 7rpx 0 0;
  background-color: #ffffff;
  border-radius: 5rpx;
  box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.08);
  flex: none;

  .head {
    display: flex;
    align-items: center;
    flex-direction: row;
    padding-bottom: 6rpx;
    justify-content: space-between;

    .head-lt {
      display: flex;
      align-items: center;
      flex-direction: row;

      .user-icon {
        width: 14rpx;
        height: 14rpx;
        margin-right: 6rpx;
      }

      .name {
        margin-right: 6rpx;
        font-size: 12rpx;
        font-weight: 500;
        color: #171718;
      }

      .num {
        font-size: 9rpx;
        font-weight: 500;
        color: #0a54ff;
      }
    }

    .head-rt {
      display: flex;
      align-items: center;
      flex-direction: row;

      .status {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 14rpx;
        padding: 0 6rpx;
        margin-right: 8rpx;
        font-size: 7rpx;
        color: #ff2d2d;
        background: #fff1f1;
        border-radius: 8rpx;

        .circle {
          width: 4rpx;
          height: 4rpx;
          margin-right: 2rpx;
          background-color: #ff6767;
          border-radius: 50%;
        }

        &.success {
          color: #199f38;

          .circle {
            background-color: #30b950;
          }
        }
      }

      .edit-box {
        display: flex;
        width: 16rpx;
        height: 16rpx;
        border: 1rpx solid #ff4242;
        border-radius: 50%;
        align-items: center;
        justify-content: center;

        .remove-icon {
          width: 9rpx;
          height: 9rpx;
        }
      }
    }
  }

  .cont {
    .cont-item {
      display: flex;
      height: 16rpx;
      margin-top: 6rpx;
      align-items: center;
      flex-direction: row;

      .icon {
        width: 9rpx;
        height: 9rpx;
        margin-right: 6rpx;
      }

      .label {
        width: 56rpx;
        overflow: hidden;
        font-size: 9rpx;
        color: #171718;
        word-break: keep-all;
      }

      .value {
        font-size: 9rpx;
        color: #171718;
      }
    }
  }
}

.add-box {
  position: absolute;
  right: 25rpx;
  bottom: 25rpx;
  display: flex;
  width: 33rpx;
  height: 33rpx;
  background-color: #3e73ec;
  border-radius: 16rpx;
  box-shadow: 0rpx 5rpx 16rpx 5rpx rgba(0, 0, 0, 0.05), 0rpx 4rpx 9rpx 0rpx rgba(0, 0, 0, 0.08),
    0rpx 2rpx 4rpx -2rpx rgba(0, 0, 0, 0.12);
  align-items: center;
  justify-content: center;
}
</style>
