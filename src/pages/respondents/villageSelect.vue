<template>
  <view class="select-wrap">
    <view class="mask" />
    <view class="cont" :class="[props.show ? 'show' : '']">
      <view class="head">
        <view class="cancle" @click="cancle">取消</view>
        <view class="name">选择行政村</view>
        <view class="confirm" @click="confirm">确定</view>
      </view>
      <view class="select-item">
        <view class="select-title">街道:</view>
        <view class="select-cont">
          <view class="common-item">44444</view>
          <view class="common-item">44444</view>
          <view class="common-item">44444</view>
          <view class="common-item">44444</view>
          <view class="common-item">44444</view>
          <view class="common-item active">4555555</view>
        </view>
      </view>
      <view class="select-item">
        <view class="select-title">乡镇:</view>
        <view class="select-cont">
          <view class="common-item">44444</view>
          <view class="common-item">44444</view>
          <view class="common-item">44444</view>
          <view class="common-item">44444</view>
          <view class="common-item">44444</view>
          <view class="common-item">44444</view>
          <view class="common-item">44444</view>
          <view class="common-item active">4555555</view>
        </view>
      </view>
      <view class="line" />
      <view class="select-item">
        <view class="select-title">行政村:</view>
        <view class="select-cont">
          <view class="common-item">44444</view>
          <view class="common-item">44444</view>
          <view class="common-item">44444</view>
          <view class="common-item">44444</view>
          <view class="common-item">44444</view>
          <view class="common-item">44444</view>
          <view class="common-item">44444</view>
          <view class="common-item">44444</view>
          <view class="common-item">44444</view>
          <view class="common-item">44444</view>
          <view class="common-item">44444</view>
          <view class="common-item">44444</view>
          <view class="common-item active">4555555</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface PropsType {
  show: boolean
}

const props = defineProps<PropsType>()
const emit = defineEmits(['onClose', 'onConfirm'])

const currentSelect = ref<any>([])

const cancle = () => {
  emit('onClose')
}

const confirm = () => {
  emit('onConfirm', currentSelect.value)
}
</script>
<style lang="scss" scoped>
.select-wrap {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  height: 100%;

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .cont {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0rpx;
    padding: 12rpx 18rpx;
    background-color: #ffffff;
    border-radius: 19rpx 19rpx 0rpx 0rpx;
    transition: all 0.3s;

    &.show {
      height: 90%;
    }
  }

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 3rpx;

    .cancle {
      font-size: 9rpx;
      line-height: 13rpx;
      color: #0a54ff;
    }

    .name {
      font-size: 11rpx;
      font-weight: 500;
      line-height: 12rpx;
      color: #171718;
    }

    .confirm {
      font-size: 9rpx;
      line-height: 13rpx;
      color: #0a54ff;
    }
  }

  .line {
    width: 100%;
    margin-top: 18rpx;
    border-bottom: 1rpx dashed #d0cbcb;
  }

  .select-item {
    display: flex;
    align-items: flex-start;

    .select-title {
      display: flex;
      width: 42rpx;
      height: 47rpx;
      margin-top: 18rpx;
      font-size: 11rpx;
      font-weight: 500;
      line-height: 12rpx;
      color: #171718;
      flex: none;
      align-items: center;
      justify-content: flex-start;
    }

    .select-cont {
      flex: 1;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }

    .common-item {
      display: flex;
      width: 70rpx;
      height: 47rpx;
      margin: 18rpx 9rpx 0 0;
      font-size: 9rpx;
      line-height: 13rpx;
      color: #171718;
      background: #d6ebff;
      border-radius: 7rpx;
      box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(0, 0, 0, 0.08);
      align-items: center;
      justify-content: center;

      &.active {
        color: #ffffff;
        background: linear-gradient(360deg, #72abf7 0%, #2b64e8 100%);
        box-shadow: 2rpx 2rpx 6rpx 0rpx rgba(0, 0, 0, 0.14),
          0rpx 2rpx 0rpx 0rpx rgba(64, 118, 236, 1);
      }
    }
  }
}
</style>
