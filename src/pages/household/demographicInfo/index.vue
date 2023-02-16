<template>
  <view class="demographic-wrapper">
    <view class="list">
      <view class="list-item">
        <view class="list-1">
          <view class="left">
            <view class="icon-wrapper">
              <text class="txt">户主</text>
            </view>
            <view class="name-wrapper">
              <text class="txt">杨汉中</text>
            </view>
            <image class="icon" src="@/static/images/icon_right.png" mode="scaleToFill" />
          </view>
          <view class="right">
            <image
              class="icon m-r-10"
              src="@/static/images/icon_delete_mini.png"
              mode="scaleToFill"
            />
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
                <text class="txt">性别：</text>
              </view>
              <view class="content">
                <text class="txt">男</text>
              </view>
            </view>
            <view class="col">
              <view class="label">
                <text class="txt">身份证号：</text>
              </view>
              <view class="content">
                <text class="txt">33252196701305515</text>
              </view>
            </view>
            <view class="col">
              <view class="label">
                <text class="txt">职业：</text>
              </view>
              <view class="content">
                <text class="txt">种植生产人员</text>
              </view>
            </view>
          </view>

          <view class="row">
            <view class="col">
              <view class="label">
                <text class="txt">民族：</text>
              </view>
              <view class="content">
                <text class="txt">汉</text>
              </view>
            </view>
            <view class="col">
              <view class="label">
                <text class="txt">婚姻状况：</text>
              </view>
              <view class="content">
                <text class="txt">已婚</text>
              </view>
            </view>
            <view class="col">
              <view class="label">
                <text class="txt">户籍所在地：</text>
              </view>
              <view class="content">
                <text class="txt">浙江省新昌县镜岭镇下潘村438号2-37</text>
              </view>
            </view>
          </view>

          <view class="row">
            <view class="col">
              <view class="label">
                <text class="txt">出生年月：</text>
              </view>
              <view class="content">
                <text class="txt">1999年1月</text>
              </view>
            </view>
            <view class="col">
              <view class="label">
                <text class="txt">人口类型：</text>
              </view>
              <view class="content">
                <text class="txt">册内人口</text>
              </view>
            </view>
            <view class="col">
              <view class="label">
                <text class="txt" />
              </view>
              <view class="content">
                <text class="txt" />
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
.demographic-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;

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

          .icon-wrapper {
            display: flex;
            width: 32rpx;
            height: 16rpx;
            background: #3db6f2;
            border-top-right-radius: 5rpx;
            border-bottom-right-radius: 5rpx;
            align-items: center;

            .txt {
              font-size: 9rpx;
              line-height: 16rpx;
              color: #fff;
            }
          }

          .name-wrapper {
            margin-left: 5rpx;

            .txt {
              font-size: 9rpx;
              color: #171718;
            }
          }

          .icon {
            width: 9rpx;
            height: 9rpx;
            margin-left: 5rpx;
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
