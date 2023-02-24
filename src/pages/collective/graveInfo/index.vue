<template>
  <view class="grave-info-wrapper">
    <!-- 坟墓信息 -->
    <view class="list">
      <view class="list-item">
        <view class="list-1">
          <view class="left">
            <view class="icon">登记人</view>
            <view class="name">杨汉中</view>
          </view>
          <label class="right" @click="deleteData">
            <image class="icon" src="@/static/images/icon_delete_mini.png" />
          </label>
        </view>
        <view class="list-2" @click="toLink">
          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">与登记人关系：</view>
                <view class="content">父子</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">户号：</view>
                <view class="content">1234567890</view>
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
                <view class="label">立墓年份：</view>
                <view class="content">1989年11月</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">所处位置：</view>
                <view class="content">线内</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">备注：</view>
                <view class="content">备注</view>
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
  routerForward('collectiveGraveInfoEdit')
}

// 删除当前行信息
const deleteData = () => {}
</script>

<style lang="scss" scoped>
.grave-info-wrapper {
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

        .right {
          display: flex;
          align-items: center;

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

  .add-btn {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 66rpx;
    height: 66rpx;
  }
}
</style>
