<template>
  <view class="map-info-wrap">
    <view class="title-box">
      <text class="title">居民户简介</text>
      <uni-icons type="closeempty" :size="14" />
    </view>

    <view class="info-box">
      <view class="info-item">
        <image class="user-icon" src="@/static/images/icon_header.png" mode="scaleToFill" />
        <text class="name user-name">张江</text>
        <text class="text primary">张江</text>
      </view>

      <view class="info-item">
        <view class="icon-dot">
          <view class="dot" />
        </view>
        <text class="name">身份证号：</text>
        <text class="text">332444</text>
      </view>

      <view class="info-item">
        <view class="icon-dot">
          <view class="dot" />
        </view>
        <text class="name">户籍所在地：</text>
        <text class="text">范德萨龙卷风嗲了几分劳动就撒了风急浪大撒娇了范德萨</text>
      </view>

      <view class="info-item">
        <view class="icon-dot">
          <view class="dot" />
        </view>
        <text class="name">家庭总人数：</text>
        <text class="text primary">332444</text>
        <text class="text"> 人</text>
      </view>

      <view class="info-item">
        <view class="icon-dot">
          <view class="dot" />
        </view>
        <text class="name">房屋总数：</text>
        <text class="text primary">332444</text>
        <text class="text"> 幢</text>
      </view>
    </view>

    <view class="fill-box">
      <view class="btn-box">
        <text class="btn">数据填报</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.map-info-wrap {
  width: 245rpx;
  background-color: rgba(255, 255, 255, 0.83);
  border: 1rpx solid #eeeeee;
  border-radius: 2rpx;
  box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(45, 71, 103, 0.1);
}

.title-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 26rpx;
  padding: 0 6rpx 0 12rpx;
}

.title {
  font-size: 11rpx;
  font-weight: 500;
  color: #171718;
}

.info-box {
  padding: 3rpx 12rpx;
  border-top: 1rpx solid rgba(0, 0, 0, 0.1);
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
}

.info-item {
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 21rpx;
}

.user-icon {
  width: 16rpx;
  height: 16rpx;
  margin-right: 6rpx;
}

.name {
  font-size: 9rpx;
  color: #333333;
}

.user-name {
  margin-right: 7rpx;
}

.text {
  font-size: 9rpx;
  color: #171718;
}

.icon-dot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16rpx;
  height: 16rpx;
  margin-right: 6rpx;
}

.dot {
  width: 5rpx;
  height: 5rpx;
  background-color: #ff862f;
  border-radius: 50%;
}

.primary {
  font-weight: 500;
  color: #1c5df1;
}

.fill-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 4rpx 7rpx 7rpx 0;
}

.btn-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 56rpx;
  height: 21rpx;
  background-color: #3e6cd7;
}

.btn {
  font-size: 9rpx;
  color: #ffffff;
}
</style>
