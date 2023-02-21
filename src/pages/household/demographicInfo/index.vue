<template>
  <view class="demographic-wrapper">
    <view class="list">
      <view class="list-item">
        <view class="list-1">
          <view class="left">
            <view class="icon">户主</view>
            <view class="name">杨汉中</view>
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
                <view class="label">性别：</view>
                <view class="content">男</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">民族：</view>
                <view class="content">汉</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">出生年月：</view>
                <view class="content">1999年1月</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">身份证：</view>
                <view class="content">33252196701305515</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">婚姻状况：</view>
                <view class="content">已婚</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">人口类型：</view>
                <view class="content">册内人口</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">职业：</view>
                <view class="content">种植生产人员</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">户籍所在地：</view>
                <view class="content">浙江省新昌县镜岭镇下潘村438号2-37</view>
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

const toLink = () => {
  routerForward('demographicInfoEdit')
}
</script>

<style lang="scss" scoped>
.demographic-wrapper {
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
        width: 100%;
        height: 28rpx;
        border-bottom: 1rpx dotted #d0cbcb;

        .left {
          display: flex;
          align-items: center;

          .icon {
            display: flex;
            width: 32rpx;
            height: 16rpx;
            font-size: 9rpx;
            color: #fff;
            background: #3db6f2;
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
            width: 56rpx;
            height: 16rpx;
            margin-left: 9rpx;
            font-size: 9rpx;
            line-height: 16rpx;
            color: #171718;
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
