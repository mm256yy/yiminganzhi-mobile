<template>
  <view class="modify-record-wrapper">
    <uni-drawer ref="drawerModal" mode="right" :mask-click="false">
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
                <view class="line before" />
                <image class="line icon" src="@/static/images/icon_ok.png" mode="scaleToFill" />
                <view class="line after" />
              </view>
              <view class="col-line-item">
                <view class="line before" />
                <image class="line icon" src="@/static/images/icon_ok.png" mode="scaleToFill" />
                <view class="line after" />
              </view>
              <view class="col-line-item">
                <view class="line before" />
                <image class="line icon" src="@/static/images/icon_ok.png" mode="scaleToFill" />
                <view class="line after" />
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
  height: 100%;

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
      border-bottom: 1rpx solid #ebebeb;

      .title {
        font-size: 20px;
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

      .list-col {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 20rpx 24rpx;

        .col-line-container {
          display: inline-flex;
          flex-direction: column;
          width: 30rpx;

          .col-line-item {
            display: flex;
            flex-direction: column;
            flex: 1;
            align-items: center;
            justify-content: center;

            .line {
              width: 1rpx;
              background-color: #b7bdc6;

              &.before {
                height: 6rpx;
                transform: translateY(-13rpx);
              }

              &.icon {
                width: 40rpx;
                height: 40rpx;
              }

              &.after {
                flex: 1;
                transform: translateY(1rpx);
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
