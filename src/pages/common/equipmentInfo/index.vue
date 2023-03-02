<template>
  <view class="equipment-info-wrapper">
    <!-- 个人信息 -->
    <view class="list">
      <view class="list-item">
        <view class="list-1">
          <view class="left">
            <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
            <view class="name">织布机</view>
          </view>
          <view class="right">
            <image
              class="icon m-r-10"
              src="@/static/images/icon_delete_mini.png"
              mode="scaleToFill"
            />
          </view>
        </view>
        <view class="list-2" @click="toLink">
          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">用途：</view>
                <view class="content">织布</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">建造/购置年份：</view>
                <view class="content">2006年</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">原值：</view>
                <view class="content">10（万元）</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">搬迁方式：</view>
                <view class="content">可搬迁</view>
              </view>
            </uni-col>
            <uni-col :span="16">
              <view class="col">
                <view class="label">规格型号：</view>
                <view class="content">规格型号</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">备注：</view>
                <view class="content">备注信息备注信息备注信息备注信息备注信息</view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>
    <image class="add-btn" src="@/static/images/icon_add.png" mode="scaleToFill" @click="toLink" />
  </view>
</template>

<script lang="ts" setup>
import { routerForward } from '@/utils'

const toLink = () => {
  routerForward('equipmentInfoEdit')
}
</script>

<style lang="scss" scoped>
.equipment-info-wrapper {
  width: 100%;
  overflow-y: scroll;

  .list {
    width: 100%;

    .list-item {
      margin-bottom: 7rpx;
      box-shadow: 0 1rpx 9rpx -2rpx rgba(0, 0, 0, 0.18);

      .list-1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 28rpx;
        border-bottom: 1rpx dotted #d0cbcb;

        .left {
          display: flex;
          align-items: center;

          .icon {
            width: 10rpx;
            height: 10rpx;
            margin-left: 10rpx;
          }

          .name {
            margin-left: 5rpx;
            font-size: 9rpx;
            color: #171718;
          }
        }

        .right {
          display: flex;

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
            width: 70rpx;
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

  .add-btn {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 66rpx;
    height: 66rpx;
  }
}
</style>
