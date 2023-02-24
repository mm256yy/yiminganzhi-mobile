<template>
  <Container>
    <template #title>
      <view class="title">
        <text class="tit">行政村</text>
        <image class="icon" src="@/static/images/respondents_select.png" mode="scaleToFill" />
      </view>
    </template>

    <view class="content">
      <view class="tabs">
        <view class="tab-item one">
          <image class="icon" src="@/static/images/respondents_village.png" mode="scaleToFill" />
          <text class="tit">自然村</text>
        </view>
        <view class="tab-item two other active">
          <image class="icon" src="@/static/images/respondents_company.png" mode="scaleToFill" />
          <text class="tit">企业</text>
        </view>
        <view class="tab-item thr other">
          <image class="icon" src="@/static/images/respondents_single.png" mode="scaleToFill" />
          <text class="tit">个体户</text>
        </view>
        <view class="tab-item for other">
          <image class="icon" src="@/static/images/respondents_jt.png" mode="scaleToFill" />
          <text class="tit">村集体</text>
        </view>
      </view>

      <view class="search-box">
        <uni-icons class="icon" type="search" color="#272636" size="9rpx" />
        <input type="text" class="ipt" placeholder="搜索名称" />
      </view>

      <view class="respondents-list">
        <view class="respondents-item">
          <image class="bg" src="@/static/images/respondents_right.png" mode="scaleToFill" />
          <view class="head">
            <view class="head-lt">
              <image
                class="user-icon"
                src="@/static/images/respondents_tit.png"
                mode="scaleToFill"
              />
              <view class="name">放假的时间啊了</view>
            </view>
            <view class="head-rt">
              <!-- <view class="status success"><text class="circle" />未上报</view> -->
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
  </Container>
</template>

<script lang="ts" setup>
import Container from '@/components/Container/index.vue'
</script>

<style lang="scss">
.title {
  display: flex;
  align-items: center;
  justify-content: center;

  .tit {
    font-size: 15rpx;
    font-weight: 500;
    color: #ffffff;
  }

  .icon {
    width: 14rpx;
    height: 14rpx;
    margin-left: 5rpx;
  }
}

.content {
  padding: 0 25rpx 25rpx;
}

.tabs {
  display: flex;
  align-items: center;

  .tab-item {
    position: relative;
    display: flex;
    width: 105rpx;
    height: 38rpx;
    padding: 5rpx 0;
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size: 105rpx 33rpx;
    align-items: center;
    justify-content: center;

    .icon {
      display: none;
      width: 15rpx;
      height: 15rpx;
      margin-right: 6rpx;
    }

    .tit {
      font-size: 12rpx;
      font-weight: 500;
      color: #ffffff;
    }

    &.one {
      z-index: 4;
      background-image: url('@/static/images/nav_default_first.png');
    }

    &.two {
      z-index: 3;
    }

    &.thr {
      z-index: 2;
    }

    &.for {
      z-index: 1;
    }

    &.other {
      margin-left: -13rpx;
      background-image: url('@/static/images/nav_default.png');
    }

    &.active {
      z-index: 5;
      background-size: 105rpx 38rpx;

      .icon {
        display: block;
      }

      .tit {
        color: #0a54ff;
      }

      &.one {
        background-image: url('@/static/images/nav_active_first.png');
      }

      &.other {
        background-image: url('@/static/images/nav_active.png');
      }
    }
  }
}

.search-box {
  position: relative;
  z-index: 10;
  display: flex;
  width: 100%;
  height: 23rpx;
  padding: 0 18rpx;
  margin-top: -5rpx;
  background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
  border-radius: 0 7rpx 7rpx 7rpx;
  align-items: center;

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

.respondents-list {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.respondents-item {
  position: relative;
  width: 229px;
  padding: 12rpx 15rpx;
  // height: 108rpx;
  margin: 7rpx 7rpx 0 0;
  background-color: #ffffff;
  border-radius: 7rpx;
  box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.08);
  flex: none;

  .bg {
    position: absolute;
    top: -20rpx;
    right: -20rpx;
    width: 30rpx;
    height: 30rpx;
  }

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
        width: 19rpx;
        height: 19rpx;
        margin-right: 6rpx;
      }

      .name {
        margin-right: 6rpx;
        font-size: 12rpx;
        font-weight: 600;
        color: #171718;
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
