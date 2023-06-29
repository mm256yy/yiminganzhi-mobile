<template>
  <view class="form-wrapper">
    <Back :title="title" needConfirm />
    <view class="main">
      <view class="form">
        <view class="row">
          <view class="row-wrapper">
            <view class="col w-50">序号</view>
            <view class="col">项目</view>
            <view class="col">规格</view>
            <view class="col w-50">单位</view>
            <view class="col w-50">数量</view>
            <view class="col w-342">备注</view>
          </view>
        </view>
        <view class="row"></view>
        <view class="row" v-for="(item, index) in formData" :key="item.id">
          <view class="col w-50">{{ index + 1 }}</view>
          <view class="col">{{ item.name }}</view>
          <view class="col">{{ item.size }}</view>
          <view class="col w-50">{{ item.unit }}</view>
          <view class="col w-50">
            <input class="input-txt" type="number" v-model="item.number" placeholder="请输入" />
          </view>
          <view class="col w-342">
            <input
              class="input-txt"
              v-model="item.remark"
              :maxlength="100"
              placeholder="请输入(100字以内)"
            />
          </view>
        </view>
      </view>
    </view>

    <image
      class="btn submit"
      src="@/static/images/icon_submit.png"
      mode="scaleToFill"
      @click="submit"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getAppendantListApi, updateLandlordAppendantApi } from '@/service'
import { formatNum, routerBack } from '@/utils'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import Back from '@/components/Back/Index.vue'

const formData = ref<any>([])
const uid = ref<string>('')
const title = ref<string>('附属物信息编辑')
const commonParams = {
  number: null,
  remark: ''
}

onLoad((option: any) => {
  if (option) {
    uid.value = option.uid ? option.uid : ''
    let arr = JSON.parse(option.dataList)
    if (arr && arr.length) {
      formData.value = [...arr]
    } else {
      getList()
    }
  }
})

// 获取附属物初始化列表信息
const getList = () => {
  getAppendantListApi().then((res) => {
    res.map((item: any) => {
      formData.value.push({
        surveyId: item.id,
        name: item.name,
        size: item.size,
        unit: item.unit,
        ...commonParams
      })
    })
  })
}

// 表单提交
const submit = () => {
  const arr: any = []
  formData.value.map((item: any) => {
    arr.push({
      ...item,
      number: item.number ? Number(formatNum(item.number)) : null
    })
  })
  const params = [...arr]
  updateLandlordAppendantApi(uid.value, params)
    .then((res) => {
      if (res) {
        showToast(SUCCESS_MSG)
        uni.$emit('updateData')
        routerBack()
      }
    })
    .catch(() => {
      showToast(ERROR_MSG)
    })
}
</script>

<style lang="scss" scoped>
.form-wrapper {
  display: flex;
  width: 100%;
  height: 100vh;
  padding: 6rpx;
  background: url('../../../static/images/common_bg.png') no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  flex-direction: column;

  .main {
    display: table;
    width: 100%;
    height: calc(100vh - 33rpx - 12rpx - var(--status-bar-height));
    background-color: #e7edfd;
    border-collapse: collapse;
    border-radius: 2rpx;

    .form {
      width: 100%;
      height: calc(100vh - 33rpx - 12rpx - var(--status-bar-height));
      overflow-y: scroll;
      background-color: #fff;

      .row {
        display: table-row;
        width: 100%;
        height: 28rpx;

        &:nth-child(2n) {
          background-color: #f8f8f8;
        }

        &:first-child {
          position: fixed;
          z-index: 1;
          display: table;
          width: 738rpx;
          font-size: 9rpx;
          color: #737374;
          background-color: #f8f8f8;

          .row-wrapper {
            display: table-row;

            .col {
              display: table-cell;
              width: 123rpx;
              height: 28rpx;
              padding: 0;
              font-size: 9rpx;
              line-height: 28rpx;
              color: #171718;
              text-align: center;
              vertical-align: middle;
              border: none;

              &.w-50 {
                width: 50rpx;
              }

              &.w-342 {
                width: 342rpx;
              }
            }
          }
        }

        .col {
          display: table-cell;
          width: 123rpx;
          height: 28rpx;
          padding-left: 9rpx;
          font-size: 9rpx;
          line-height: 28rpx;
          color: #171718;
          vertical-align: middle;
          border: 1rpx solid #f0f0f0;

          &.w-50 {
            width: 50rpx;
          }

          &.w-342 {
            width: 342rpx;
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

          .input-txt {
            height: 19rpx;
            font-size: 9rpx;
          }
        }
      }
    }
  }

  .btn {
    position: fixed;
    right: 25rpx;
    width: 28rpx;
    height: 28rpx;
    border-radius: 50%;

    &.submit {
      bottom: 16rpx;
    }

    &.record {
      bottom: 54rpx;
    }
  }
}
</style>
