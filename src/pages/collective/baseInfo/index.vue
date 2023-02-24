<template>
  <view class="base-info-wrapper">
    <!-- 个人信息 -->
    <view class="list">
      <view class="list-item">
        <view class="list-1">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">村集体基本信息</view>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">村集体名称：</view>
                <view class="content">大溪村村集体</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">村集体编码：</view>
                <view class="content">JT1030004</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">所在位置：</view>
                <view class="content">淹没区</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">联系方式：</view>
                <view class="content">1301234567</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">所属区域：</view>
                <view class="content">浙江省绍兴市新昌县镜岭镇</view>
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

      <view class="list-item">
        <view class="list-1">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">村集体附件信息</view>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="list-img"> 图片列表 </view>
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
  routerForward('collectiveBaseInfoEdit')
}
</script>

<style lang="scss" scoped>
.base-info-wrapper {
  width: 100%;
  overflow-y: scroll;

  .list {
    width: 100%;

    .list-item {
      margin-bottom: 7rpx;
      border-radius: 5rpx;
      box-shadow: 0 1rpx 9rpx -2rpx rgba(0, 0, 0, 0.18);

      .list-1 {
        display: flex;
        align-items: center;
        width: 100%;
        height: 28rpx;
        border-bottom: 1rpx dotted #d0cbcb;

        .icon {
          width: 10rpx;
          height: 10rpx;
          margin-left: 10rpx;
        }

        .title {
          margin-left: 5rpx;
          font-size: 9rpx;
          font-weight: 600;
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
            width: 90rpx;
            height: 16rpx;
            margin-left: 9rpx;
            font-size: 9rpx;
            line-height: 16rpx;
            color: rgba(23, 23, 24, 0.6);

            &.w-100 {
              width: 100rpx;
            }
          }

          .content {
            font-size: 9rpx;
            line-height: 16rpx;
            color: #171718;
          }

          .list-img {
            display: flex;
            align-items: center;
            justify-content: space-between;
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
