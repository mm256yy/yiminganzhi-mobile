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
          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">房屋用途：</view>
                <view class="content">住宅</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">层高：</view>
                <view class="content">10（米）</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">层数：</view>
                <view class="content">3（层）</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">房屋高程：</view>
                <view class="content">10（米）</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">建筑面积：</view>
                <view class="content">100（m³）</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">竣工日期：</view>
                <view class="content">2000年8月</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">所在位置：</view>
                <view class="content">淹没区</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">淹没范围：</view>
                <view class="content">线下</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label"></view>
                <view class="content"></view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { routerForward } from '@/utils'

const toEdit = () => {
  routerForward('entHouseInfoEdit')
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
        padding: 4rpx 6rpx 6rpx 0;
        box-sizing: border-box;

        .col {
          display: flex;
          flex-direction: row;

          .label {
            width: 56rpx;
            height: 16rpx;
            margin-left: 9rpx;
            font-size: 9rpx;
            line-height: 16rpx;
            color: rgba(23, 23, 24, 0.6);
          }

          .content {
            font-size: 9rpx;
            line-height: 16rpx;
            color: #171718;
          }
        }
      }
    }
  }
}
</style>
