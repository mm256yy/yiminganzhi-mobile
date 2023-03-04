<template>
  <view class="form-wrapper">
    <Back title="设施设备信息编辑" />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData" :rules="rules">
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="名称"
              :label-width="150"
              label-align="right"
              name="formData.name"
            >
              <uni-easyinput v-model="formData.name" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="规格型号"
              :label-width="150"
              label-align="right"
              name="formData.size"
            >
              <uni-easyinput v-model="formData.size" type="idcard" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="数量"
              :label-width="150"
              label-align="right"
              name="formData.number"
            >
              <uni-easyinput v-model="formData.number" type="number" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="单位"
              :label-width="150"
              label-align="right"
              name="formData.unit"
            >
              <uni-data-select v-model="formData.unit" :localdata="dict[268]" />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="用途"
              :label-width="150"
              label-align="right"
              name="formData.purpose"
            >
              <uni-easyinput v-model="formData.purpose" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="建造/购置年份"
              :label-width="150"
              label-align="right"
              name="formData.year"
            >
              <uni-datetime-picker
                type="date"
                placeholder="选择年份"
                v-model="formData.year"
                @change="changeDate"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="原值"
              :label-width="150"
              label-align="right"
              name="formData.amount"
            >
              <view :class="['input-wrapper', focusIndex === 1 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.amount"
                  @focus="inputFocus(1)"
                  @blur="inputBlur"
                />
                <view class="unit">万元</view>
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="搬迁方式"
              :label-width="150"
              label-align="right"
              name="formData.moveType"
            >
              <uni-data-select v-model="formData.moveType" :localdata="dict[221]" />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              label="备注"
              :label-width="150"
              label-align="right"
              name="formData.remark"
            >
              <uni-easyinput v-model="formData.remark" type="textarea" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>
      </uni-forms>

      <image
        class="submit-btn"
        src="@/static/images/icon_submit.png"
        mode="scaleToFill"
        @click="submit"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { updateLandlordEquipmentApi } from '@/service'
import { getStorage, StorageKey } from '@/utils/storage'
import Back from '@/components/Back/Index.vue'

// 表单数据
const formData = ref<any>({})

// 表单校验规则
const rules = ref<any>({})

// 获得焦点的 input 框下标
const focusIndex = ref<number>(-1)

// 获取数据字典
const dict = getStorage(StorageKey.DICT)

onLoad((option: any) => {
  if (option.params) {
    formData.value = JSON.parse(option.params)
  }
})

// 出生年月选择
const changeDate = (e: any) => {
  console.log('e:', e)
}
// 输入框获得焦点事件
const inputFocus = (index: number) => {
  focusIndex.value = index
}

// 输入框失去焦点事件
const inputBlur = () => {
  focusIndex.value = -1
}

// 表单提交
const submit = () => {
  const params = { ...formData.value }
  updateLandlordEquipmentApi(params.uid, params).then((res: any) => {
    console.log('res:', res)
  })
}
</script>

<style lang="scss" scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: url('../../../static/images/common_bg.png') no-repeat;
  background-size: 100% 100%;

  .main {
    height: calc(100vh - 33rpx);
    padding: 6rpx;
    background-color: #e7edfd;
    border-radius: 2rpx;
    box-sizing: border-box;

    .form {
      height: calc(100vh - 33rpx - 12rpx - var(--status-bar-height));
      padding: 9rpx 0;
      overflow-y: scroll;
      background-color: #fff;
      box-sizing: border-box;

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
    }

    .submit-btn {
      position: fixed;
      right: 0;
      bottom: 0;
      width: 80rpx;
      height: 80rpx;
    }
  }
}
</style>
