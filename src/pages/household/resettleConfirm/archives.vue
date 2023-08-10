<template>
  <view>
    <view class="common-head">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      <text>坟墓安置档案上传</text>
    </view>

    <view class="arch-box">
      <view class="arch-item">
        <view class="arch-label">坟墓安置确认单：</view>
        <view class="arch-value">
          <uploadFiles
            :limit="20"
            show-type="grid"
            :file-list="pic1"
            :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
            v-model="pic1"
          />
        </view>
      </view>

      <view class="arch-item">
        <view class="arch-label">其他附件：</view>
        <view class="arch-value">
          <uploadFiles
            :limit="20"
            show-type="grid"
            :file-list="pic2"
            :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
            v-model="pic2"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import uploadFiles from '@/components/UploadFile/index.vue'

const pic1 = ref<string>('[]')
const pic2 = ref<string>('[]')
</script>

<style lang="scss" scoped>
.common-head {
  display: flex;
  width: 100%;
  height: 28rpx;
  margin-top: 9rpx;
  font-size: 9rpx;
  font-weight: 500;
  color: #171718;
  background: #ffffff;
  border-bottom: 1rpx solid #f0f0f0;
  border-radius: 5rpx 5rpx 0px 0px;
  flex-direction: row;
  align-items: center;

  .icon {
    width: 10rpx;
    height: 10rpx;
    margin-right: 6rpx;
  }
}

.arch-box {
  .arch-item {
    display: flex;
    padding: 5rpx 12rpx;
    margin-top: 9rpx;

    .arch-label {
      width: 75rpx;
      font-size: 9rpx;
      color: #171718;
      text-align: right;
    }

    .arch-value {
      flex: 1;
      display: flex;
      align-items: center;
    }
  }
}
</style>
