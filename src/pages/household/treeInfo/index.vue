<template>
  <view class="tree-info-wrapper">
    <view class="tree-container">
      <view class="row">
        <view class="col">序号</view>
        <view class="col w-63">品种名称</view>
        <view class="col w-63">用途</view>
        <view class="col w-64">规格</view>
        <view class="col w-64">单位</view>
        <view class="col w-94">数量</view>
        <view class="col w-100">备注</view>
        <view class="col w-29">操作</view>
      </view>

      <view class="row">
        <view class="col">1</view>
        <view class="col w-63">苹果树</view>
        <view class="col w-63 p-l-2">
          <uni-data-select
            v-model="formData.purpose"
            :localdata="purposeData"
            @change="changePurpose"
          />
        </view>
        <view class="col w-64 p-l-2">
          <uni-data-select v-model="formData.spec" :localdata="specData" @change="changeSpec" />
        </view>
        <view class="col w-64 p-l-2">
          <uni-data-select v-model="formData.unit" :localdata="unitData" @change="changeUnit" />
        </view>
        <view class="col w-94">
          <view class="input-wrapper">
            <label class="reduce">—</label>
            <input class="num" />
            <label class="plus">+</label>
          </view>
        </view>
        <view class="col w-100">
          <input class="remark" placeholder="请输入内容" />
        </view>
        <view class="col w-29 p-l-7">
          <label class="icon-wrapper" @click="deleteData">
            <image class="icon" src="@/static/images/icon_delete.png" />
          </label>
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

// 用途数据列表
const purposeData = ref<any>([
  {
    text: '果树',
    value: 0
  },
  {
    text: '经济树',
    value: 1
  },
  {
    text: '用材树',
    value: 2
  }
])

// 规格数据列表
const specData = ref<any>([
  {
    text: '小树',
    value: 0
  },
  {
    text: '中树',
    value: 1
  },
  {
    text: '大树',
    value: 2
  }
])

// 单位数据列表
const unitData = ref<any>([
  {
    text: '株',
    value: 0
  },
  {
    text: '平方米',
    value: 1
  }
])

// 用途选择
const changePurpose = (data: any) => {
  console.log('data:', data)
}

// 用途选择
const changeSpec = (data: any) => {
  console.log('data:', data)
}

// 单位选择
const changeUnit = (data: any) => {
  console.log('data:', data)
}

// 删除当前行信息
const deleteData = () => {}
</script>

<style lang="scss" scoped>
.tree-info-wrapper {
  width: 100%;
  overflow-y: scroll;

  .tree-container {
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

        &.w-29 {
          width: 29rpx;
        }

        &.w-63 {
          width: 63rpx;
        }

        &.w-64 {
          width: 64rpx;
        }

        &.w-94 {
          width: 94rpx;
        }

        &.w-100 {
          width: 100rpx;
        }

        &.p-l-2 {
          padding-left: 2rpx;
        }

        &.p-l-7 {
          padding-left: 7rpx;
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

        .icon-wrapper {
          display: flex;
          align-items: center;

          .icon {
            width: 15rpx;
            height: 15rpx;
          }
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
