<template>
  <view class="revenue-info-wrapper">
    <view class="sub-title">第一产业收入</view>
    <uni-row>
      <uni-col :span="12">
        <view class="col">
          <view class="label">农业种植收入：</view>
          <view :class="['input-wrapper', focusIndex === 1 ? 'focus' : '']">
            <input
              class="input-txt"
              placeholder="请输入"
              type="number"
              v-model="formData.plantIncome"
              @focus="inputFocus(1)"
              @blur="inputBlur"
            />
            <view class="unit">万元</view>
          </view>
        </view>
      </uni-col>
      <uni-col :span="12">
        <view class="col">
          <view class="label">林业收入：</view>
          <view :class="['input-wrapper', focusIndex === 2 ? 'focus' : '']">
            <input
              class="input-txt"
              placeholder="请输入"
              type="number"
              v-model="formData.forestryIncome"
              @focus="inputFocus(2)"
              @blur="inputBlur"
            />
            <view class="unit">万元</view>
          </view>
        </view>
      </uni-col>
      <uni-col :span="12">
        <view class="col">
          <view class="label">牧业收入：</view>
          <view :class="['input-wrapper', focusIndex === 3 ? 'focus' : '']">
            <input
              class="input-txt"
              placeholder="请输入"
              type="number"
              v-model="formData.animalIncome"
              @focus="inputFocus(3)"
              @blur="inputBlur"
            />
            <view class="unit">万元</view>
          </view>
        </view>
      </uni-col>
      <uni-col :span="12">
        <view class="col">
          <view class="label">渔业收入：</view>
          <view :class="['input-wrapper', focusIndex === 4 ? 'focus' : '']">
            <input
              class="input-txt"
              placeholder="请输入"
              type="number"
              v-model="formData.fisheryIncome"
              @focus="inputFocus(4)"
              @blur="inputBlur"
            />
            <view class="unit">万元</view>
          </view>
        </view>
      </uni-col>
      <uni-col class="m-t-10" :span="24">
        <view class="txt-wrapper">
          <view class="label">小计：</view>
          <view class="amount">0</view>
          <view class="unit">（万元）</view>
        </view>
      </uni-col>
      <uni-col class="m-b-10" :span="24">
        <view class="txtarea-wrapper">
          <view class="label">备注：</view>
          <textarea
            :class="['txt', focusIndex === 5 ? 'focus' : '']"
            placeholder="请输入"
            type="number"
            v-model="formData.remark"
            @focus="inputFocus(5)"
            @blur="inputBlur"
          ></textarea>
        </view>
      </uni-col>
    </uni-row>
    <view class="sub-title">第二、三产业收入</view>
    <uni-row>
      <uni-col :span="12">
        <view class="col">
          <view class="label">工业收入：</view>
          <view :class="['input-wrapper', focusIndex === 6 ? 'focus' : '']">
            <input
              class="input-txt"
              placeholder="请输入"
              type="number"
              v-model="formData.plantIncome"
              @focus="inputFocus(6)"
              @blur="inputBlur"
            />
            <view class="unit">万元</view>
          </view>
        </view>
      </uni-col>
      <uni-col :span="12">
        <view class="col">
          <view class="label">建筑业收入：</view>
          <view :class="['input-wrapper', focusIndex === 7 ? 'focus' : '']">
            <input
              class="input-txt"
              placeholder="请输入"
              type="number"
              v-model="formData.forestryIncome"
              @focus="inputFocus(7)"
              @blur="inputBlur"
            />
            <view class="unit">万元</view>
          </view>
        </view>
      </uni-col>
      <uni-col :span="12">
        <view class="col">
          <view class="label">运输业收入：</view>
          <view :class="['input-wrapper', focusIndex === 8 ? 'focus' : '']">
            <input
              class="input-txt"
              placeholder="请输入"
              type="number"
              v-model="formData.animalIncome"
              @focus="inputFocus(8)"
              @blur="inputBlur"
            />
            <view class="unit">万元</view>
          </view>
        </view>
      </uni-col>
      <uni-col :span="12">
        <view class="col">
          <view class="label">服务业收入：</view>
          <view :class="['input-wrapper', focusIndex === 9 ? 'focus' : '']">
            <input
              class="input-txt"
              placeholder="请输入"
              type="number"
              v-model="formData.fisheryIncome"
              @focus="inputFocus(9)"
              @blur="inputBlur"
            />
            <view class="unit">万元</view>
          </view>
        </view>
      </uni-col>
      <uni-col :span="12">
        <view class="col">
          <view class="label">餐饮业收入：</view>
          <view :class="['input-wrapper', focusIndex === 10 ? 'focus' : '']">
            <input
              class="input-txt"
              placeholder="请输入"
              type="number"
              v-model="formData.fisheryIncome"
              @focus="inputFocus(10)"
              @blur="inputBlur"
            />
            <view class="unit">万元</view>
          </view>
        </view>
      </uni-col>
      <uni-col :span="12">
        <view class="col">
          <view class="label">打工收入：</view>
          <view :class="['input-wrapper', focusIndex === 11 ? 'focus' : '']">
            <input
              class="input-txt"
              placeholder="请输入"
              type="number"
              v-model="formData.fisheryIncome"
              @focus="inputFocus(11)"
              @blur="inputBlur"
            />
            <view class="unit">万元</view>
          </view>
        </view>
      </uni-col>
      <uni-col class="m-t-10" :span="24">
        <view class="txt-wrapper">
          <view class="label">小计：</view>
          <view class="amount">0</view>
          <view class="unit">（万元）</view>
        </view>
      </uni-col>
      <uni-col class="m-b-10" :span="24">
        <view class="txtarea-wrapper">
          <view class="label">备注：</view>
          <textarea
            :class="['txt', focusIndex === 12 ? 'focus' : '']"
            placeholder="请输入"
            type="number"
            v-model="formData.remark"
            @focus="inputFocus(12)"
            @blur="inputBlur"
          ></textarea>
        </view>
      </uni-col>
    </uni-row>
    <view class="sub-title">其他收入</view>
    <uni-row>
      <uni-col class="m-b-10" :span="24">
        <view class="col">
          <view class="label">其他收入：</view>
          <view :class="['input-wrapper', focusIndex === 13 ? 'focus' : '']">
            <input
              class="input-txt"
              placeholder="请输入金额"
              type="number"
              v-model="formData.plantIncome"
              @focus="inputFocus(13)"
              @blur="inputBlur"
            />
            <view class="unit">万元</view>
          </view>
        </view>
      </uni-col>
    </uni-row>
    <view class="sub-title">合计</view>
    <uni-row>
      <uni-col :span="24">
        <view class="txt-wrapper">
          <view class="label">合计：</view>
          <view class="amount">0</view>
          <view class="unit">（万元）</view>
        </view>
      </uni-col>
    </uni-row>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const formData = ref<any>({})

const focusIndex = ref<number>(-1)

// 输入框获得焦点事件
const inputFocus = (index: number) => {
  focusIndex.value = index
}

// 输入框失去焦点事件
const inputBlur = () => {
  focusIndex.value = -1
}
</script>

<style lang="scss" scoped>
.revenue-info-wrapper {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  border: 1px solid #f0f0f0;

  .sub-title {
    width: 100%;
    height: 28rpx;
    padding-left: 9rpx;
    font-size: 9rpx;
    line-height: 28rpx;
    color: #171718;
    background: #f8f8f8;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;

    &:first-child {
      border-top: none;
    }
  }

  .col {
    display: flex;
    align-items: center;
    margin-top: 10rpx;

    .label {
      width: 80rpx;
      font-size: 9rpx;
      color: #171718;
      text-align: right;
    }

    .input-wrapper {
      display: flex;
      align-items: center;
      height: 23rpx;
      border: 1px solid #d9d9d9;
      border-radius: 4px;

      &.focus {
        border-color: rgb(41, 121, 255);
      }

      .input-txt {
        width: 120rpx;
        height: 23rpx;
        padding-left: 9rpx;
        font-size: 9rpx;
        line-height: 23rpx;
        color: #171718;
      }

      .unit {
        width: 30rpx;
        height: 22rpx;
        font-size: 9rpx;
        line-height: 22rpx;
        color: #171718;
        text-align: center;
        background-color: #f5f7fa;
        border-left: 1px solid #d9d9d9;
        border-top-right-radius: 3rpx;
        border-bottom-right-radius: 3rpx;
      }
    }
  }

  .txtarea-wrapper {
    display: flex;
    align-items: center;

    .label {
      width: 80rpx;
      font-size: 9rpx;
      color: #171718;
      text-align: right;
    }

    .txt {
      width: 79%;
      height: 50rpx;
      padding: 5rpx;
      font-size: 9rpx;
      border: 1px solid #d9d9d9;
      border-radius: 4px;

      &.focus {
        border-color: rgb(41, 121, 255);
      }
    }
  }

  .txt-wrapper {
    display: flex;
    align-items: center;

    .label {
      width: 80rpx;
      font-size: 9rpx;
      color: #171718;
      text-align: right;
    }

    .amount {
      width: 124rpx;
      height: 23rpx;
      padding-left: 9rpx;
      font-size: 9rpx;
      line-height: 23rpx;
      color: #171718;
    }

    .unit {
      width: 40rpx;
      height: 23rpx;
      font-size: 9rpx;
      line-height: 23rpx;
      color: #171718;
      text-align: center;
    }
  }
}
</style>
