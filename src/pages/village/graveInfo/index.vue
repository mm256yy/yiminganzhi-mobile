<template>
  <view class="grave-info-wrapper">
    <view class="grave-container">
      <view class="row">
        <view class="col">序号</view>
        <view class="col w-64">穴位</view>
        <view class="col w-82">数量（座）</view>
        <view class="col w-64">材料</view>
        <view class="col w-110">立墓年份</view>
        <view class="col w-64">所处位置</view>
        <view class="col w-91">备注</view>
      </view>

      <view class="row">
        <view class="col">1</view>
        <view class="col w-64 p-l-2">
          <uni-data-select
            v-model="formData.acupoint"
            :localdata="acupointData"
            @change="changeAcupoint"
          />
        </view>
        <view class="col w-82 p-l-2">
          <view class="input-wrapper">
            <label class="reduce">—</label>
            <input class="num" />
            <label class="plus">+</label>
          </view>
        </view>
        <view class="col w-64 p-l-2">
          <uni-data-select
            v-model="formData.material"
            :localdata="materialData"
            @change="changeMaterial"
          />
        </view>
        <view class="col w-110 p-l-2">
          <uni-datetime-picker
            type="date"
            placeholder="选择年份"
            v-model="formData.year"
            @change="changeDate"
          />
        </view>
        <view class="col w-64 p-l-2">
          <uni-data-select
            v-model="formData.location"
            :localdata="locationData"
            @change="changeLocation"
          />
        </view>
        <view class="col w-91">
          <input class="remark" placeholder="请输入内容" />
        </view>
      </view>
    </view>
    <image class="btn" src="@/static/images/icon_add.png" mode="scaleToFill" />
    <image v-show="isEdit" class="btn" src="@/static/images/icon_submit.png" mode="scaleToFill" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const formData = ref<any>({})
const isEdit = ref<boolean>(false)

// 穴位数据列表
const acupointData = ref<any>([
  { text: '单穴', value: 1 },
  { text: '双穴', value: 2 },
  { text: '多穴', value: 3 }
])

// 用途数据列表
const materialData = ref<any>([
  { text: '泥', value: 1 },
  { text: '石', value: 2 },
  { text: '混凝土', value: 3 },
  { text: '花岗岩', value: 4 },
  { text: '其他', value: 5 }
])

// 所处位置数据列表
const locationData = ref<any>([
  { text: '线内', value: 1 },
  { text: '线外', value: 2 },
  { text: '其他', value: 3 }
])

// 穴位选择
const changeAcupoint = (data: any) => {
  console.log('data:', data)
}

// 材料选择
const changeMaterial = (data: any) => {
  console.log('data:', data)
}

// 立墓年份选择
const changeDate = (e: any) => {
  console.log('e:', e)
}

// 所处位置选择
const changeLocation = (data: any) => {
  console.log('data:', data)
}
</script>

<style lang="scss" scoped>
.grave-info-wrapper {
  display: flex;
  flex-direction: column;

  .grave-container {
    display: table;
    border-collapse: collapse;

    .row {
      display: table-row;
      width: 100%;
      height: 28rpx;

      &:nth-child(2n - 1) {
        background-color: #f8f8f8;
      }

      &:first-child {
        font-size: 9rpx;
        color: #737374;

        .col {
          padding: 0;
          text-align: center;
        }
      }

      .col {
        display: table-cell;
        width: 35rpx;
        height: 28rpx;
        padding-left: 9rpx;
        font-size: 9rpx;
        line-height: 28rpx;
        color: #171718;
        vertical-align: middle;
        border: 1rpx solid #f0f0f0;

        &.w-64 {
          width: 64rpx;
        }

        &.w-82 {
          width: 82rpx;
        }

        &.w-91 {
          width: 91rpx;
        }

        &.w-94 {
          width: 94rpx;
        }

        &.w-110 {
          width: 100rpx;
        }

        &.p-l-2 {
          padding-left: 2rpx;
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 73rpx;
          margin-left: 3rpx;
          border: 1rpx solid #ebebeb;
          border-radius: 2rpx;

          .reduce {
            display: flex;
            width: 21rpx;
            height: 21rpx;
            background: #f8f8f8;
            border-right: 1rpx solid #ebebeb;
            border-radius: 2rpx 0 0 2rpx;
            align-items: center;
            justify-content: center;
          }

          .num {
            width: 30rpx;
            height: 21rpx;
            font-size: 9rpx;
            line-height: 21rpx;
            text-align: center;
          }

          .plus {
            display: flex;
            width: 21rpx;
            height: 21rpx;
            background: #f8f8f8;
            border-left: 1rpx solid #ebebeb;
            border-radius: 2rpx 0 0 2rpx;
            align-items: center;
            justify-content: center;
          }
        }

        .remark {
          height: 19rpx;
          font-size: 9rpx;
        }

        ::v-deep.uni-select {
          height: 23rpx;
        }

        ::v-deep.uni-stat__select {
          flex: 0 auto !important;
          width: 60rpx !important;
        }

        ::v-deep.uni-select__input-placeholder {
          font-size: 9rpx;
        }

        ::v-deep.uni-select__selector-item {
          font-size: 9rpx;
        }

        ::v-deep.uniui-clear {
          font-size: 18rpx !important;
        }

        ::v-deep.uniui-calendar {
          font-size: 12rpx !important;
        }

        ::v-deep.uni-date-x,
        ::v-deep.uni-date-editor--x {
          width: 106rpx !important;
          height: 23rpx !important;
        }

        ::v-deep.uni-date-single {
          height: 21rpx !important;

          .uni-input-input,
          .uni-input-placeholder {
            font-size: 9rpx !important;
          }
        }
      }
    }
  }

  .btn {
    position: fixed;
    right: 6rpx;
    bottom: 6rpx;
    width: 80rpx;
    height: 80rpx;
    border-radius: 40rpx;
  }
}
</style>
