<template>
  <view class="confirm-address-wrapper">
    <!-- 居民户实施 —— 选址确认 -->
    <view class="title">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      家庭情况
    </view>
    <view class="row-1">
      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">户主姓名：</view>
            <view class="content">{{ formatStr(dataInfo.name) }}</view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">户内人口：</view>
            <view class="content">
              {{ formatStr(dataInfo.demographicList.length) }}
            </view>
          </view>
        </uni-col>
      </uni-row>
      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">迁出地址：</view>
            <view class="content">新昌县镜岭镇下潘村</view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">联系方式：</view>
            <view class="content">13812300000</view>
          </view>
        </uni-col>
      </uni-row>
    </view>
    <view class="title">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      选房确认办理情况
    </view>
    <view class="row-2"> 该户无需选址 </view>
  </view>
</template>
<script lang="ts" setup>
import { formatStr } from '@/utils'

const props = defineProps({
  dataInfo: {
    type: Object as any,
    default: () => {}
  }
})
</script>
<style lang="scss" scoped>
.confirm-address-wrapper {
  .title {
    display: flex;
    height: 28rpx;
    margin-bottom: 9rpx;
    font-size: 9rpx;
    color: #171718;
    align-items: center;
    flex: 1;
    border-bottom: 1rpx solid #f0f0f0;

    .icon {
      width: 10rpx;
      height: 10rpx;
      margin-left: 6rpx;
    }
  }

  .row-1 {
    padding: 5rpx 12rpx 12rpx 0;
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
      }

      .content {
        font-size: 9rpx;
        line-height: 16rpx;
        color: #171718;
      }
    }

    .line {
      width: 100%;
      height: 1rpx;
      margin: 9rpx 0;
      background: #ebebeb;
    }
  }

  .row-2 {
    margin-top: 14rpx;
    font-size: 9rpx;
    color: #171718;
  }
}
</style>
