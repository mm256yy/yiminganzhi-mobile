<template>
  <view class="household-info-wrapper">
    <!-- 个人信息 -->
    <view class="list">
      <view class="list-item">
        <view class="list-1">
          <view class="icon">户主</view>
          <view class="name">杨汉中</view>
        </view>
        <view class="list-2" @click="toLink">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">户号：</view>
                <view class="content">1040092345321464</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">自然村/村民小组：</view>
                <view class="content">浙江省金华市武义县清溪行政村</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">是否财产户：</view>
                <view class="content">否</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">联系方式：</view>
                <view class="content">17289436274</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">户籍所在地：</view>
                <view class="content">浙江省金华市武义县清溪镇杨村234号</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">所在位置：</view>
                <view class="content">淹没区</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">淹没范围：</view>
                <view class="content">-</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">高程：</view>
                <view class="content">1.5m</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">经纬度：</view>
                <view class="content">124.23528 29.997117</view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>
    <image
      class="edit-btn"
      src="@/static/images/icon_edit.png"
      mode="scaleToFill"
      @click="toLink"
    />
  </view>
</template>

<script lang="ts" setup>
import { routerForward } from '@/utils'

const toLink = () => {
  routerForward('householdInfoEdit')
}
</script>

<style lang="scss" scoped>
.household-info-wrapper {
  width: 100%;

  .list {
    width: 100%;

    .list-item {
      margin-bottom: 7rpx;
      box-shadow: 0 1rpx 9rpx -2rpx rgba(0, 0, 0, 0.18);

      .list-1 {
        display: flex;
        align-items: center;
        width: 100%;
        height: 28rpx;
        border-bottom: 1rpx dotted #d0cbcb;

        .icon {
          display: flex;
          width: 32rpx;
          height: 16rpx;
          font-size: 9rpx;
          color: #fff;
          background: #faad14;
          border-top-right-radius: 5rpx;
          border-bottom-right-radius: 5rpx;
          align-items: center;
          justify-content: center;
        }

        .name {
          margin-left: 5rpx;
          font-size: 9rpx;
          color: #171718;
        }
      }

      .list-2 {
        padding: 4rpx 6rpx 6rpx 0;
        box-sizing: border-box;

        .col {
          display: flex;
          flex-direction: row;

          .label {
            width: 80rpx;
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

  .edit-btn {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 66rpx;
    height: 66rpx;
  }
}
</style>
