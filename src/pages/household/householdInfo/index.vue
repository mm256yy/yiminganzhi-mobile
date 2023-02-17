<template>
  <view class="household-wrapper">
    <!-- 居民户登记 -->
    <view class="main">
      <view class="row">
        <view class="label">户主姓名：</view>
        <view class="content">杨汉中</view>
      </view>

      <view class="row">
        <view class="label">户号：</view>
        <view class="content">1040092345321464</view>
      </view>

      <view class="row">
        <view class="label">自然村/村民小组：</view>
        <view class="content">浙江省金华市武义县清溪行政村</view>
      </view>

      <view class="row">
        <view class="label">是否财产户：</view>
        <view class="content">否</view>
      </view>

      <view class="row">
        <view class="label">联系方式：</view>
        <view class="content">17289436274</view>
      </view>

      <view class="row">
        <view class="label">户籍所在地：</view>
        <view class="content">浙江省金华市武义县清溪镇杨村234号</view>
      </view>

      <view class="row">
        <view class="label">所在位置：</view>
        <view class="content">淹没区</view>
      </view>

      <view class="row">
        <view class="label">淹没范围：</view>
        <view class="content">-</view>
      </view>

      <view class="row">
        <view class="label">高程：</view>
        <view class="content">1.5m</view>
      </view>

      <view class="row">
        <view class="label">经纬度：</view>
        <view class="content">29.997117</view>
      </view>

      <view class="edit" @click="toEdit">
        <image class="icon" src="@/static/images/icon_edit.png" mode="scaleToFill" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { routerForward } from '@/utils'

const toEdit = () => {
  routerForward('householdInfoEdit')
}
</script>

<style lang="scss" scoped>
.household-wrapper {
  width: 100%;
  padding: 6rpx;
  box-sizing: border-box;

  .main {
    position: relative;
    top: 0;
    left: 0;

    .row {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 15rpx;

      &:first-child {
        margin-top: 0;
      }

      .label {
        width: 80rpx;
        margin-right: 6rpx;
        font-size: 9rpx;
        line-height: 1;
        color: #171718;
      }

      .content {
        font-size: 9rpx;
        line-height: 1;
        color: #171718;
        flex: 1;
      }
    }

    .edit {
      position: fixed;
      right: 6rpx;
      bottom: 6rpx;
      width: 80rpx;
      height: 80rpx;
      border-radius: 40rpx;

      .icon {
        width: 80rpx;
        height: 80rpx;
      }
    }
  }
}
</style>
