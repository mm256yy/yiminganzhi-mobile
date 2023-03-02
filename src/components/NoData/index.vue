<template>
  <view class="no-data-wrap">
    <image class="no-data" src="@/static/images/icon_null.png" mode="scaleToFill" />
    <text class="no-data-txt">暂无数据</text>
  </view>
</template>

<style lang="scss" scoped>
.no-data-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.no-data {
  width: 152rpx;
  height: 92rpx;
}

.no-data-txt {
  margin-top: 16rpx;
  font-size: 9rpx;
  font-weight: 500;
  color: #171718;
  text-align: center;
}
</style>
