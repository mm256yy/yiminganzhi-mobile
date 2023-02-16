<template>
  <view class="household-wrapper">
    <!-- 居民户登记 -->
    <view class="main">
      <view class="row">
        <view class="label">
          <text class="txt">户主姓名：</text>
        </view>
        <view class="content">
          <text class="txt">杨汉中</text>
        </view>
      </view>

      <view class="row">
        <view class="label">
          <text class="txt">户号：</text>
        </view>
        <view class="content">
          <text class="txt">1040092345321464</text>
        </view>
      </view>

      <view class="row">
        <view class="label">
          <text class="txt">自然村/村民小组：</text>
        </view>
        <view class="content">
          <text class="txt">浙江省金华市武义县清溪行政村</text>
        </view>
      </view>

      <view class="row">
        <view class="label">
          <text class="txt">是否财产户：</text>
        </view>
        <view class="content">
          <text class="txt">否</text>
        </view>
      </view>

      <view class="row">
        <view class="label">
          <text class="txt">联系方式：</text>
        </view>
        <view class="content">
          <text class="txt">17289436274</text>
        </view>
      </view>

      <view class="row">
        <view class="label">
          <text class="txt">户籍所在地：</text>
        </view>
        <view class="content">
          <text class="txt">浙江省金华市武义县清溪镇杨村234号</text>
        </view>
      </view>

      <view class="row">
        <view class="label">
          <text class="txt">所在位置：</text>
        </view>
        <view class="content">
          <text class="txt">淹没区</text>
        </view>
      </view>

      <view class="row">
        <view class="label">
          <text class="txt">淹没范围：</text>
        </view>
        <view class="content">
          <text class="txt">-</text>
        </view>
      </view>

      <view class="row">
        <view class="label">
          <text class="txt">高程：</text>
        </view>
        <view class="content">
          <text class="txt">1.5m</text>
        </view>
      </view>

      <view class="row">
        <view class="label">
          <text class="txt">经纬度：</text>
        </view>
        <view class="content">
          <text class="txt">29.997117</text>
        </view>
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
  display: flex;
  flex-direction: row;
  padding: 6rpx;

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

        /* #ifdef H5 */
        width: 110rpx;
        margin-right: 6rpx;
        /* #endif */

        line-height: 1;

        .txt {
          font-size: 9rpx;
          color: #171718;
        }
      }

      .content {
        flex: 1;
        line-height: 1;

        .txt {
          font-size: 9rpx;
          color: #171718;
        }
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
