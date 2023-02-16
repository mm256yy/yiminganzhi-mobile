<template>
  <view class="accessory-info-wrapper">
    <view class="accessory-container">
      <view class="row">
        <view class="col">序号</view>
        <view class="col w-117">项目</view>
        <view class="col w-57">规格</view>
        <view class="col">单位</view>
        <view class="col w-94">数量</view>
        <view class="col w-183">备注</view>
      </view>

      <view class="row">
        <view class="col">1</view>
        <view class="col w-117">有线电视</view>
        <view class="col w-57">-</view>
        <view class="col">处</view>
        <view class="col w-94">
          <view class="input-wrapper">
            <label class="reduce">—</label>
            <input class="num" />
            <label class="plus">+</label>
          </view>
        </view>
        <view class="col w-183">
          <input class="remark" placeholder="请输入内容" />
        </view>
      </view>

      <view class="row">
        <view class="col">2</view>
        <view class="col w-117">网络宽带</view>
        <view class="col w-57">-</view>
        <view class="col">处</view>
        <view class="col w-94">
          <view class="input-wrapper">
            <label class="reduce">—</label>
            <input class="num" />
            <label class="plus">+</label>
          </view>
        </view>
        <view class="col w-183">
          <input class="remark" placeholder="请输入内容" />
        </view>
      </view>

      <view class="row">
        <view class="col">3</view>
        <view class="col w-117">空调</view>
        <view class="col w-57">-</view>
        <view class="col">台</view>
        <view class="col w-94">
          <view class="input-wrapper">
            <label class="reduce">—</label>
            <input class="num" />
            <label class="plus">+</label>
          </view>
        </view>
        <view class="col w-183">
          <input class="remark" placeholder="请输入内容" />
        </view>
      </view>

      <view class="row">
        <view class="col">4</view>
        <view class="col w-117">电话</view>
        <view class="col w-57">-</view>
        <view class="col">处</view>
        <view class="col w-94">
          <view class="input-wrapper">
            <label class="reduce">—</label>
            <input class="num" />
            <label class="plus">+</label>
          </view>
        </view>
        <view class="col w-183">
          <input class="remark" placeholder="请输入内容" />
        </view>
      </view>

      <view class="row">
        <view class="col">5</view>
        <view class="col w-117">动力电表</view>
        <view class="col w-57">-</view>
        <view class="col">只</view>
        <view class="col w-94">
          <view class="input-wrapper">
            <label class="reduce">—</label>
            <input class="num" />
            <label class="plus">+</label>
          </view>
        </view>
        <view class="col w-183">
          <input class="remark" placeholder="请输入内容" />
        </view>
      </view>

      <view class="row">
        <view class="col">6</view>
        <view class="col w-117">太阳能热水器</view>
        <view class="col w-57">-</view>
        <view class="col">处</view>
        <view class="col w-94">
          <view class="input-wrapper">
            <label class="reduce">—</label>
            <input class="num" />
            <label class="plus">+</label>
          </view>
        </view>
        <view class="col w-183">
          <input class="remark" placeholder="请输入内容" />
        </view>
      </view>

      <view class="row">
        <view class="col">1</view>
        <view class="col w-117">台阶</view>
        <view class="col w-57">-</view>
        <view class="col">m²</view>
        <view class="col w-94">
          <view class="input-wrapper">
            <label class="reduce">—</label>
            <input class="num" />
            <label class="plus">+</label>
          </view>
        </view>
        <view class="col w-183">
          <input class="remark" placeholder="请输入内容" />
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.accessory-info-wrapper {
  display: flex;
  flex-direction: column;

  .accessory-container {
    display: table;
    border-collapse: collapse;

    .row {
      display: table-row;
      width: 100%;
      height: 28rpx;

      &:nth-child(2n - 1) {
        background-color: #f8f8f8;
      }

      &:first-child {
        font-size: 9rpx;
        color: #737374;

        .col {
          padding: 0;
          text-align: center;
        }
      }

      .col {
        display: table-cell;
        width: 35rpx;
        height: 28rpx;
        padding-left: 9rpx;
        font-size: 9rpx;
        line-height: 28rpx;
        color: #171718;
        border: 1rpx solid #f0f0f0;

        &.w-117 {
          width: 117rpx;
        }

        &.w-57 {
          width: 57rpx;
        }

        &.w-94 {
          width: 94rpx;
        }

        &.w-183 {
          width: 183rpx;
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 73rpx;
          margin-left: 3rpx;
          border: 1rpx solid #ebebeb;
          border-radius: 2rpx;

          .reduce {
            display: flex;
            width: 21rpx;
            height: 21rpx;
            background: #f8f8f8;
            border-right: 1rpx solid #ebebeb;
            border-radius: 2rpx 0 0 2rpx;
            align-items: center;
            justify-content: center;
          }

          .num {
            width: 30rpx;
            height: 21rpx;
            font-size: 9rpx;
            line-height: 21rpx;
            text-align: center;
          }

          .plus {
            display: flex;
            width: 21rpx;
            height: 21rpx;
            background: #f8f8f8;
            border-left: 1rpx solid #ebebeb;
            border-radius: 2rpx 0 0 2rpx;
            align-items: center;
            justify-content: center;
          }
        }

        .remark {
          height: 19rpx;
          font-size: 9rpx;
        }
      }
    }
  }
}
</style>
