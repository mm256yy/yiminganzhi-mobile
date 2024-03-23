<template>
  <!-- 设施设备评估报告（实施） -->
  <view class="base-info-wrapper">
    <view class="title">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      设施设备评估报告
    </view>
    <view class="equipment-title"> 设施及其他资产评估报告 </view>
    <view class="equipment-txt">镜岭采石场有限公司设施设备出具评估报告结果如下：</view>
    <view class="equipment-txt">一、设施设备情况</view>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

interface PropsType {
  dataInfo: any
}

const props = defineProps<PropsType>()
</script>

<style lang="scss" scoped>
.base-info-wrapper {
  width: 100%;

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

  .equipment-title {
    text-align: center;
    display: block;
    color: #333;
    font-size: 12rpx;
    font-weight: 600;
    line-height: 18rpx;
  }

  .equipment-txt {
    display: block;
    color: #666;
    font-size: 8rpx;
    line-height: 16rpx;
    height: 16rpx;
  }

  .table-wrap {
    overflow: auto;
  }
}
</style>
