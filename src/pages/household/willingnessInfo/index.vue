<template>
  <view class="willingness-info-wrapper">
    <view class="sub-title">家庭信息</view>
    <view class="row-1">
      <view class="col">
        <view class="label">家庭总人数：</view>
        <view :class="['input-wrapper', focusIndex === 1 ? 'focus' : '']">
          <input
            class="input-txt"
            placeholder="请输入"
            type="number"
            v-model="formData.total"
            @focus="inputFocus(1)"
            @blur="inputBlur"
          />
          <view class="unit">人</view>
        </view>
      </view>
      <view class="col">
        <view class="label m-r-5">其中：农村移民人数</view>
        <view :class="['input-wrapper', focusIndex === 2 ? 'focus' : '']">
          <input
            class="input-txt"
            placeholder="请输入"
            type="number"
            v-model="formData.ruralImmigrantsNum"
            @focus="inputFocus(2)"
            @blur="inputBlur"
          />
          <view class="unit">人</view>
        </view>
      </view>
      <view class="col">
        <view class="label m-r-5">其中：非农村移民人数</view>
        <view :class="['input-wrapper', focusIndex === 3 ? 'focus' : '']">
          <input
            class="input-txt"
            placeholder="请输入"
            type="number"
            v-model="formData.noneRuralImmigrantsNum"
            @focus="inputFocus(3)"
            @blur="inputBlur"
          />
          <view class="unit">人</view>
        </view>
      </view>
    </view>
    <view class="sub-title">生产安置方式</view>
    <view class="row-2">
      <radio-group @change="productModeChange">
        <label v-for="item in productModeData" :key="item.value">
          <radio :value="item.value">{{ item.name }}</radio>
        </label>
      </radio-group>
    </view>
    <view class="sub-title">搬迁安置方式</view>
    <view class="row-3 b-b-1">
      <view class="label m-t-5">宅基地安置：</view>
      <radio-group @change="homesteadChange">
        <label v-for="item in homesteadData" :key="item.value">
          <radio :value="item.value">{{ item.name }}</radio>
        </label>
      </radio-group>
    </view>
    <view class="line" />
    <view class="row-3">
      <view class="label m-t-5">公寓房安置：</view>
      <radio-group @change="apartmentChange">
        <label v-for="item in apartmentData" :key="item.value">
          <radio :value="item.value">{{ item.name }}</radio>
        </label>
      </radio-group>
    </view>
    <view class="sub-title">备注</view>
    <view class="col-4">
      <textarea
        class="remark"
        placeholder="请输入"
        type="texarea"
        v-model="formData.remark"
      ></textarea>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const formData = ref<any>({})

// 生产安置方式数据选项
const productModeData = ref<any>([
  { name: '市内县外', value: 1 },
  { name: '县内安置（有土）', value: 2 },
  { name: '县内安置（无土）', value: 3 },
  { name: '自谋出路', value: 4 }
])

// 搬迁安置方式 —— 宅基地安置数据选项
const homesteadData = ref<any>([
  { name: '瑶畈防护地块', value: 1 },
  { name: '陈村安置地块', value: 2 },
  { name: '丽新乡本乡安置小区', value: 3 },
  { name: '自谋出路', value: 4 }
])

// 搬迁安置方式 —— 公寓房安置数据选项
const apartmentData = ref<any>([
  { name: '联城街道凤鸣区块', value: 1 },
  { name: '现房安置（联城区块已建安置小区）', value: 2 },
  { name: '现房安置（碧湖镇已建安置小区）', value: 3 }
])

// 获得焦点的输入框下标
const focusIndex = ref<number>(-1)

// 输入框获得焦点事件
const inputFocus = (index: number) => {
  focusIndex.value = index
}

// 输入框失去焦点事件
const inputBlur = () => {
  focusIndex.value = -1
}

// 生产安置方式选择
const productModeChange = (e: any) => {
  formData.value.productMode = e.detail.value
}

// 搬迁安置方式 —— 宅基地安置选择
const homesteadChange = (e: any) => {
  formData.value.homestead = e.detail.value
}

// 搬迁安置方式 —— 公寓房安置选择
const apartmentChange = (e: any) => {
  formData.value.apartment = e.detail.value
}
</script>

<style lang="scss" scoped>
.willingness-info-wrapper {
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

  .row-1 {
    display: flex;
    width: 100%;
    height: 46rpx;
    justify-content: space-around;

    .col {
      display: flex;
      align-items: center;

      .label {
        font-size: 9rpx;
        color: #171718;
      }

      .input-wrapper {
        display: flex;
        align-items: center;
        width: 64rpx;
        height: 23rpx;
        border: 1px solid #d9d9d9;
        border-radius: 4px;

        &.focus {
          border-color: rgb(41, 121, 255);
        }

        .input-txt {
          width: 40rpx;
          height: 23rpx;
          padding-left: 9rpx;
          font-size: 9rpx;
          line-height: 23rpx;
          color: #171718;
        }

        .unit {
          width: 23rpx;
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
  }

  .row-2 {
    padding-left: 18rpx;

    ::v-deep.uni-label-pointer {
      margin-right: 24rpx;

      .uni-radio-wrapper {
        font-size: 9rpx !important;
        color: #171718;

        .uni-radio-input {
          width: 8rpx !important;
          height: 8rpx !important;
        }
      }
    }
  }

  .row-3 {
    display: flex;
    align-items: center;
    padding: 0 18rpx;
    box-sizing: border-box;

    .label {
      font-size: 9rpx;
      color: #171718;
    }

    ::v-deep.uni-label-pointer {
      margin-right: 19rpx;

      &:last-child {
        margin-right: 0;
      }

      .uni-radio-wrapper {
        font-size: 9rpx !important;
        color: #171718;

        .uni-radio-input {
          width: 8rpx !important;
          height: 8rpx !important;
        }
      }
    }
  }

  .line {
    width: calc(100% - 36rpx);
    height: 1px;
    margin: 0 auto;
    border: 1px dotted #e1e4ea;
  }

  .col-4 {
    padding: 5rpx 18rpx;
    box-sizing: border-box;

    .remark {
      width: 100%;
      font-size: 9rpx;
      color: #171718;
    }
  }
}
</style>
