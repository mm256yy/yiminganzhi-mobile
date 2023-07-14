<template>
  <view class="desc-wrap">
    <view class="desc-header">
      <view class="title">安置说明</view>
      <image
        class="close"
        @click="close"
        src="@/static/images/resettle_close.png"
        mode="scaleToFill"
      />
    </view>

    <view class="desc-box">
      <view class="common-head">
        <image class="icon" src="" mode="scaleToFill" />
        <text>宅基地安置说明</text>
      </view>

      <view class="detail">
        <view>宅基地以户为单位按大、中、小户安排，具体标准为：</view>
        <view>①1-2 人为小户，安排宅基地 63 平方米</view>
        <view>②3-4人为中户，安排宅基地 105 平方米</view>
        <view>③5-6 人为大户，安排宅基地 125 平方米</view>
        <view>④家庭人口 7 人（含 7 人）以上的，根据相关规定办理。</view>
      </view>

      <view class="common-head">
        <image class="icon" src="" mode="scaleToFill" />
        <text>公寓安置说明</text>
      </view>

      <view class="detail">
        <view>①公寓房以户为单位按人口数安排建筑面积，标准为每人40平方米。</view>
        <view>②公寓房建筑面积分65平方米、85平方米、110平方米、140平方米左右四种户型。</view>
        <view>③在安排面积内由移民户自行搭配选购房型。 </view>
        <view> 如仅选购一套公寓房的，可就近上靠一档选定房型。 </view>
        <view>
          如需选购多套公寓房的，在扣除已购公寓房面积后的剩余购买面积达到公寓房型的一半面积
          以上时，才允许满套选购。
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
.common-head {
  display: flex;
  width: 100%;
  height: 28rpx;
  padding: 0 14rpx;
  margin-top: 9rpx;
  font-size: 9rpx;
  font-weight: 500;
  color: #171718;
  background: #ffffff;
  border-radius: 5rpx 5rpx 0px 0px;
  align-items: center;

  .icon {
    width: 4rpx;
    height: 4rpx;
    margin-right: 6rpx;
    background-color: #3e73ec;
  }
}

.desc-wrap {
  width: 527rpx;
  padding-bottom: 20rpx;
  background-color: #fff;
  border-radius: 7rpx;

  .desc-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32rpx;
    padding: 0 12rpx;
    border-bottom: 1rpx solid #f0f0f0;

    .title {
      font-size: 12rpx;
      font-weight: bold;
      color: #171718;
    }

    .close {
      width: 14rpx;
      height: 14rpx;
    }
  }
}

.detail {
  padding: 0 18rpx;
  margin-bottom: 9rpx;
  font-size: 9rpx;
  line-height: 11rpx;
  color: rgba(23, 23, 24, 0.6);
}
</style>
