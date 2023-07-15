<template>
  <view class="sign-wrapper">
    <!-- 选房确认 —— 签字 -->
    <view class="title">请在下方区域内横向书写</view>
    <view class="content">
      <textarea disabled :value="signTxt" cols="30" rows="10"></textarea>
    </view>
    <view class="btn" @click="confirm">确认</view>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { showToast } from '@/config/msg'

const signTxt = ref<string>('')

const confirm = () => {
  if (signTxt.value) {
    showToast('签字完成')
  } else {
    showToast('请签字')
  }
}
</script>
<style lang="scss" scoped>
.sign-wrapper {
  .title {
    margin: 9rpx 0;
    font-size: 9rpx;
    color: #666;
  }

  .content {
    padding: 6rpx;
    margin-bottom: 9rpx;
    font-size: 10rpx;
    background: #ebebeb;
    box-sizing: border-box;
  }

  .btn {
    display: flex;
    width: 60rpx;
    height: 26rpx;
    font-size: 9rpx;
    color: #fff;
    background: #3e73ec;
    border-radius: 2rpx;
    align-items: center;
    justify-content: center;
  }
}
</style>
