<template>
  <view class="grave-info-wrapper">
    <!-- 坟墓信息 -->
    <view class="list">
      <view class="list-item">
        <view class="list-1">
          <view class="icon">登记人</view>
          <view class="name">杨汉中</view>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">与登记人关系：</view>
                <view class="content">父子</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">立墓年份：</view>
                <view class="content">1999年11月</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">穴位：</view>
                <view class="content">单穴</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">数量：</view>
                <view class="content">1（坐）</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">材料：</view>
                <view class="content">泥土</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">所在位置：</view>
                <view class="content">线内</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">备注：</view>
                <view class="content"
                  >撒法的发发是撒法的发发是撒法的发发是撒法的发发是撒法的发发是</view
                >
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.grave-info-wrapper {
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
          width: 42rpx;
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
            width: 65rpx;
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
            text-align: justify;
            word-break: break-all;
          }
        }
      }
    }
  }
}
</style>
