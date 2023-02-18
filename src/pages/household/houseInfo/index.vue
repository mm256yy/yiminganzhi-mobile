<template>
  <view class="house-info-wrapper">
    <view class="list">
      <view class="list-item">
        <view class="list-1">
          <view class="left">3幢</view>
          <view class="right">
            <image
              class="icon m-r-10"
              src="@/static/images/icon_delete_mini.png"
              mode="scaleToFill"
            />
          </view>
        </view>
        <view class="list-2" @click="toEdit">
          <view class="row">
            <view class="col">
              <view class="label">房屋用途：</view>
              <view class="content">住宅</view>
            </view>
            <view class="col">
              <view class="label">房屋高程：</view>
              <view class="content">10（米）</view>
            </view>
            <view class="col">
              <view class="label">房屋类别：</view>
              <view class="content">生活办公用房</view>
            </view>
          </view>

          <view class="row">
            <view class="col">
              <view class="label w-90">层高：</view>
              <view class="content">10（米）</view>
            </view>
            <view class="col">
              <view class="label w-90">土地所有权证编号：</view>
              <view class="content">888682323232</view>
            </view>
            <view class="col">
              <view class="label w-90">建筑面积：</view>
              <view class="content">100（m³）</view>
            </view>
          </view>

          <view class="row">
            <view class="col">
              <view class="label w-90">层数：</view>
              <view class="content">3（层）</view>
            </view>
            <view class="col">
              <view class="label w-90">房屋所有权证编号：</view>
              <view class="content">224234255555</view>
            </view>
            <view class="col">
              <view class="label w-90">竣工日期</view>
              <view class="content">200年8月</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { routerForward } from '@/utils'

const toEdit = () => {
  routerForward('houseInfoEdit')
}
</script>

<style lang="scss" scoped>
.house-info-wrapper {
  width: 100%;

  .list {
    width: 100%;

    .list-item {
      margin-bottom: 7rpx;
      box-shadow: 0 1rpx 9rpx -2rpx rgba(0, 0, 0, 0.18);

      .list-1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6rpx 0;
        border-bottom: 1rpx dotted #d0cbcb;

        .left {
          display: flex;
          padding-left: 6rpx;
          font-size: 9rpx;
          color: #171718;
          align-items: center;
          flex: 1;
        }

        .right {
          display: flex;
          flex-direction: row;

          .icon {
            width: 20rpx;
            height: 20rpx;
          }
        }
      }

      .list-2 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4rpx 6rpx 6rpx 0;
        box-sizing: border-box;

        .row {
          display: flex;
          flex-direction: column;

          .col {
            display: flex;
            flex-direction: row;
            align-items: center;

            .label {
              width: 56rpx;
              height: 16rpx;
              margin-left: 9rpx;
              font-size: 9rpx;
              line-height: 16rpx;
              color: #171718;

              &.w-90 {
                width: 90rpx;
              }
            }

            .content {
              height: 16rpx;
              font-size: 9rpx;
              line-height: 16rpx;
              color: #171718;
            }
          }
        }
      }
    }
  }
}
</style>
