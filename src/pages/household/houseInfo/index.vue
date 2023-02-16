<template>
  <view class="house-info-wrapper">
    <view class="list">
      <view class="list-item">
        <view class="list-1">
          <view class="left">
            <text class="txt">3幢</text>
          </view>
          <view class="right">
            <image
              class="icon m-r-10"
              src="@/static/images/icon_delete_mini.png"
              mode="scaleToFill"
            />
          </view>
        </view>
        <view class="list-2">
          <view class="row">
            <view class="col">
              <view class="label">
                <text class="txt">房屋用途：</text>
              </view>
              <view class="content">
                <text class="txt">住宅</text>
              </view>
            </view>
            <view class="col">
              <view class="label">
                <text class="txt">房屋高程：</text>
              </view>
              <view class="content">
                <text class="txt">10（米）</text>
              </view>
            </view>
            <view class="col">
              <view class="label">
                <text class="txt">房屋类别：</text>
              </view>
              <view class="content">
                <text class="txt">生活办公用房</text>
              </view>
            </view>
          </view>

          <view class="row">
            <view class="col">
              <view class="label w-90">
                <text class="txt">层高：</text>
              </view>
              <view class="content">
                <text class="txt">10（米）</text>
              </view>
            </view>
            <view class="col">
              <view class="label w-90">
                <text class="txt">土地所有权证编号：</text>
              </view>
              <view class="content">
                <text class="txt">888682323232</text>
              </view>
            </view>
            <view class="col">
              <view class="label w-90">
                <text class="txt">建筑面积：</text>
              </view>
              <view class="content">
                <text class="txt">100（m³）</text>
              </view>
            </view>
          </view>

          <view class="row">
            <view class="col">
              <view class="label w-90">
                <text class="txt">层数：</text>
              </view>
              <view class="content">
                <text class="txt">3（层）</text>
              </view>
            </view>
            <view class="col">
              <view class="label w-90">
                <text class="txt">房屋所有权证编号：</text>
              </view>
              <view class="content">
                <text class="txt">224234255555</text>
              </view>
            </view>
            <view class="col">
              <view class="label w-90">
                <text class="txt">竣工日期</text>
              </view>
              <view class="content">
                <text class="txt">200年8月</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.house-info-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;

  .list {
    width: 100%;

    .list-item {
      display: flex;
      flex-direction: column;
      margin-bottom: 7rpx;
      box-shadow: 0 1rpx 9rpx -2rpx rgba(0, 0, 0, 0.18);

      .list-1 {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 6rpx 0;
        border-bottom: 1rpx dotted #d0cbcb;

        .left {
          display: flex;
          flex-direction: row;
          align-items: center;
          flex: 1;
          padding-left: 6rpx;

          .txt {
            font-size: 9rpx;
            color: #171718;
          }
        }

        .right {
          display: flex;
          flex-direction: row;

          .icon {
            width: 20rpx;
            height: 20rpx;

            &.m-r-10 {
              margin-right: 10rpx;
            }
          }
        }
      }

      .list-2 {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 4rpx 6rpx 6rpx 0;

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

              &.w-90 {
                width: 90rpx;
              }

              .txt {
                font-size: 9rpx;
                line-height: 16rpx;
                color: #171718;
              }
            }

            .content {
              height: 16rpx;

              .txt {
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
}
</style>
