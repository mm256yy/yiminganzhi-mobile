<template>
  <view class="modify-record-wrapper">
    <uni-drawer ref="drawerModal" mode="right" :width="500" :mask-click="false">
      <view class="scroll-view">
        <view class="title-wrapper">
          <view class="title">修改日志</view>
          <image
            class="icon-close"
            src="@/static/images/icon_close.png"
            mode="scaleToFill"
            @click="close"
          />
        </view>
        <view class="list">
          <view class="list-col">
            <view class="col-line-container">
              <view class="col-line-item">
                <image class="line icon" src="@/static/images/icon_ok.png" mode="scaleToFill" />
                <view class="line after" />
              </view>
              <view class="col-line-item">
                <image class="line icon" src="@/static/images/icon_ok.png" mode="scaleToFill" />
                <view class="line after" />
              </view>
              <view class="col-line-item">
                <image class="line icon" src="@/static/images/icon_ok.png" mode="scaleToFill" />
                <view class="line after-line" />
              </view>
            </view>
            <view class="col-text-container">
              <view class="col-text-item">
                <view class="time">2023-04-07 12:00:05</view>
                <view class="content-box">
                  <view class="text"> 操作人员姓名：张三 </view>
                  <view class="text"> 修改居民户姓名：杨汉中 </view>
                  <view class="text"> 修改出生年月：1960年1月 修改为 1964年1月 </view>
                  <view class="text"> 修改婚姻状况：未婚 修改为 已婚 </view>
                  <view class="text"> 修改参保情况：其他 修改为 养老保险 </view>
                </view>
              </view>
              <view class="col-text-item">
                <view class="time">2023-04-07 12:00:05</view>
                <view class="content-box">
                  <view class="text"> 操作人员姓名：张三 </view>
                  <view class="text"> 修改居民户姓名：杨汉中 </view>
                  <view class="text"> 修改出生年月：1960年1月 修改为 1964年1月 </view>
                  <view class="text"> 修改婚姻状况：未婚 修改为 已婚 </view>
                  <view class="text"> 修改参保情况：其他 修改为 养老保险 </view>
                </view>
              </view>
              <view class="col-text-item">
                <view class="time">2023-04-07 12:00:05</view>
                <view class="content-box">
                  <view class="text"> 操作人员姓名：张三 </view>
                  <view class="text"> 修改居民户姓名：杨汉中 </view>
                  <view class="text"> 修改出生年月：1960年1月 修改为 1964年1月 </view>
                  <view class="text"> 修改婚姻状况：未婚 修改为 已婚 </view>
                  <view class="text"> 修改参保情况：其他 修改为 养老保险 </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </uni-drawer>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const drawerModal = ref<any>(null)
const emit = defineEmits(['close'])

const showDrawer = () => {
  drawerModal.value.open()
}

const close = () => {
  drawerModal.value.close()
  emit('close')
}

onMounted(() => {
  showDrawer()
})
</script>

<style lang="scss" scoped>
.modify-record-wrapper {
  width: 100%;
  height: 100vh;

  .scroll-view {
    position: relative;
    flex: 1;
    width: 100%;
    height: 100%;
    border-radius: 12rpx 0 0 12rpx;

    .title-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 58rpx;
      padding: 0 12rpx;
      border-bottom: 1rpx solid #ebebeb;

      .title {
        font-size: 20rpx;
        color: #131313;
      }

      .icon-close {
        width: 16rpx;
        height: 16rpx;
      }
    }

    .list {
      display: flex;
      flex: 1;
      height: calc(100vh - 58rpx - 1rpx);
      overflow-y: scroll;

      .list-col {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: max-content;
        padding: 20rpx 24rpx 20rpx 10rpx;

        .col-line-container {
          display: inline-flex;
          flex-direction: column;
          width: 50rpx;

          .col-line-item {
            display: flex;
            flex-direction: column;
            flex: 1;
            align-items: center;
            justify-content: center;

            .line {
              width: 1rpx;
              background-color: #b7bdc6;

              &.before-line {
                width: 0;
                height: 6rpx;
                transform: translateY(-20rpx);
              }

              &.icon {
                width: 40rpx;
                height: 40rpx;
                background-color: transparent;
              }

              &.after {
                margin: 10rpx 0;
                transform: translateY(1rpx);
                flex: 1;
              }

              &.after-line {
                width: 0;
                margin: 10rpx 0;
                transform: translateY(1rpx);
                flex: 1;
              }
            }
          }
        }

        .col-text-container {
          display: flex;
          flex-direction: column;
          flex: 1;

          .col-text-item {
            .time {
              padding: 6rpx 0;
              font-size: 20rpx;
              font-weight: bold;
              color: #171718;
            }

            .content-box {
              display: flex;
              flex-direction: column;
              padding: 30rpx;
              background-color: #f6f6f6;

              .text {
                height: 22rpx;
                font-size: 16rpx;
                line-height: 22rpx;
                color: #131313;
              }
            }
          }
        }
      }
    }
  }
}
</style>
