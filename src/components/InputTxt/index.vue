<template>
  <view class="input-txt-wrapper">
    <view v-if="props.type === 1" class="input-wrapper">
      <input
        class="input-txt"
        :placeholder="placeholder"
        type="number"
        readonly
        :value="modelValue"
      />
      <view class="unit">{{ props.unit }}</view>
    </view>
    <view
      v-else-if="props.type === 2"
      :class="['code-wrapper', focusIndex === props.index ? 'focus' : '']"
    >
      <view class="pre-txt">
        {{ props.villageCode ? 'Q' + props.villageCode : '' }}
      </view>
      <input
        class="input-txt"
        type="number"
        :placeholder="placeholder"
        :maxlength="max"
        :value="modelValue"
        @focus="inputFocus"
        @blur="inputBlur"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { placeholder } from '@babel/types'
import { ref } from 'vue'

const props = defineProps({
  // 类型： 1 带单位的输入框，2 户号输入框
  type: {
    type: Number,
    default: 1
  },
  // 输入框绑定的数据
  modelValue: {
    type: String,
    default: ''
  },
  // 输入提示信息
  placeholder: {
    type: String,
    default: '请输入'
  },
  // 当 type 为 2 时，企业、村集体、个体户的编码需要这个前缀
  pre: {
    type: String,
    default: ''
  },
  // input 下标
  index: {
    type: Number,
    default: 0
  },
  // 行政村 Code，对应户号的前12位
  villageCode: {
    type: String,
    default: ''
  },
  // 输入数字的最大位数, 默认4位
  max: {
    type: Number,
    default: 4
  },
  // 单位
  unit: {
    type: String,
    default: ''
  }
})

// 获得焦点的输入框下标
const focusIndex = ref<number>(-1)

// 输入框获得焦点
const inputFocus = () => {
  focusIndex.value = props.index
}

// 输入框失去焦点
const inputBlur = () => {
  focusIndex.value = -1
}
</script>

<style lang="scss" scoped>
.input-txt-wrapper {
  ::v-deep.uni-forms-item__label {
    font-size: 9rpx !important;
    color: rgba(23, 23, 24, 0.6) !important;
  }

  ::v-deep.uni-easyinput__content {
    width: 200rpx !important;

    .uni-easyinput__placeholder-class,
    .uni-input-input {
      font-size: 9rpx !important;
    }
  }

  ::v-deep.uni-data-tree,
  ::v-deep.uni-stat__select {
    flex: 0 auto !important;
    width: 200rpx !important;
  }

  ::v-deep.uni-select__input-text {
    width: 90% !important;
    font-size: 9rpx !important;
  }

  ::v-deep.uni-date,
  ::v-deep.uni-date-editor {
    width: 200rpx !important;
  }

  ::v-deep.uni-input-input,
  ::v-deep.uni-input-placeholder {
    font-size: 9rpx !important;
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    width: 200rpx;
    border: 1px solid #d9d9d9;
    border-radius: 4px;

    &.focus {
      border-color: rgb(41, 121, 255);
    }

    .input-txt {
      width: 168rpx;
      height: 35px;
      padding-left: 7rpx;
      font-size: 9rpx;
      line-height: 35px;
      color: #171718;
    }

    .unit {
      width: 23rpx;
      height: 35px;
      font-size: 9rpx;
      line-height: 35px;
      color: #171718;
      text-align: center;
      background-color: #f5f7fa;
      border-left: 1px solid #d9d9d9;
    }
  }

  .code-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 200rpx;
    border: 1px solid #d9d9d9;
    border-radius: 4px;

    &.focus {
      border-color: rgb(41, 121, 255);
    }

    .pre-txt {
      width: 104rpx;
      height: 35px;
      padding-left: 7rpx;
      font-size: 9rpx;
      line-height: 35px;
      color: #171718;
      background-color: #f5f7fa;
      border-right: 1px solid #d9d9d9;
    }

    .input-txt {
      width: 84rpx;
      height: 35px;
      padding-left: 11rpx;
      font-size: 9rpx;
      line-height: 35px;
      color: #171718;

      &.disabled {
        width: 200rpx;
        background-color: #f5f7fa;
      }
    }
  }
}
</style>
