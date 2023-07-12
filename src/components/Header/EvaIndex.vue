<template>
  <view class="list-header">
    <view class="list-header-rt">
      <view class="list-header-left">
        <view class="name">李三</view>
        <view class="account-no">767676767777</view>
        <view class="fill-number">
          填报进度&nbsp;
          <text class="green">0</text>
          /7
        </view>
      </view>

      <view class="list-header-right" />
    </view>
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.list-header {
  display: flex;
  height: 33rpx;
  padding: 0 6rpx 0 9rpx;
  border-bottom: 1rpx solid #e1e4ea;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;

  .list-header-rt {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    height: 33rpx;

    .list-header-left {
      display: flex;
      flex-direction: row;
      align-items: center;

      .name {
        margin: 0 6rpx 0 10rpx;
        font-size: 13rpx;
        color: #171718;
      }

      .account-no {
        font-size: 13rpx;
        color: #1c5df1;
      }

      .fill-number {
        display: flex;
        height: 24rpx;
        padding: 0 18rpx;
        margin-left: 14rpx;
        font-size: 11rpx;
        font-weight: 500;
        color: #171718;
        background-color: #e1f0ff;
        border-radius: 28rpx;
        align-items: center;
        justify-content: center;

        .green {
          color: #30a952;
        }
      }
    }

    .list-header-right {
      display: flex;
      flex-direction: row;
      align-items: center;

      .btn-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 68rpx;
        height: 23rpx;
        border-radius: 11rpx;

        &:active {
          opacity: 0.7;
        }

        &.print {
          background-color: #30a952;
        }

        &.report {
          margin-left: 7rpx;
          background-color: #3e73ec;
        }

        .icon {
          width: 7rpx;
          height: 7rpx;
          margin-right: 3rpx;
        }

        .txt {
          font-size: 9rpx;
          color: #fff;
        }
      }
    }
  }
}

.tips-wrapper {
  width: 344rpx;
  height: 221rpx;
  margin: 0 auto;
  vertical-align: middle;
  background-color: #f6f7f9;
  border-radius: 5rpx;

  .tips-title {
    width: 344rpx;
    height: 33rpx;
    font-size: 11rpx;
    font-weight: 600;
    line-height: 33rpx;
    color: #000;
    text-align: center;
    background: #ffffff;
    border-radius: 5rpx 5rpx 0 0;
  }

  .tips-content {
    width: 344rpx;
    height: 156rpx;
    padding: 14rpx 40rpx;
    background: #f6f7f9;
    box-sizing: border-box;

    &.completed-report {
      height: 68rpx;
      padding: 30rpx 59rpx;
    }

    .tips-list {
      width: 264rpx;
      height: 88rpx;
      padding: 16rpx 19rpx;
      overflow-y: scroll;
      background-color: #fff;
      box-sizing: border-box;

      .tips-item {
        display: flex;
        font-size: 9rpx;
        line-height: 1.5;
        color: #131313;
        align-items: center;
        flex-direction: column;
      }
    }

    .tips {
      margin-top: 14rpx;
      font-size: 9rpx;
      color: #131313;
    }

    .file-list {
      width: 264rpx;
      height: 135rpx;
      overflow-y: scroll;

      .file-item {
        display: flex;
        width: 264rpx;
        height: 40rpx;
        padding: 0 14rpx;
        margin-bottom: 7rpx;
        background-color: #fff;
        border-radius: 3rpx;
        box-sizing: border-box;
        align-items: center;
        justify-content: space-between;

        &.active {
          border: 1rpx solid #3e73ec;
        }

        .name {
          font-size: 9rpx;
          color: #131313;
        }

        .btns {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 44rpx;

          .icon {
            width: 14rpx;
            height: 14rpx;
            margin-left: 8rpx;
          }
        }
      }
    }
  }
}

.device-wrapper {
  width: 344rpx;
  height: 221rpx;
  margin: 0 auto;
  vertical-align: middle;
  background-color: #f6f7f9;
  border-radius: 5rpx;

  .device-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 264rpx;
    height: 88rpx;
    padding: 16rpx 19rpx;
    overflow-y: scroll;
    background-color: #fff;
    box-sizing: border-box;
  }
}

.btn-wrapper {
  display: flex;
  width: 344rpx;
  height: 33rpx;
  padding: 0 9rpx;
  background: #fff;
  border-radius: 0 0 5rpx 5rpx;
  box-sizing: border-box;
  align-items: center;
  justify-content: flex-end;

  .btn {
    width: 52rpx;
    height: 21rpx;
    font-size: 9rpx;
    line-height: 21rpx;
    text-align: center;
    border-radius: 3rpx;

    &.cancel {
      color: rgba(0, 0, 0, 0.85);
      background: #fff;
      border: 1rpx solid #d9d9d9;
    }

    &.confirm {
      margin-left: 6rpx;
      color: #fff;
      background: #3e73ec;
    }
  }
}
</style>
