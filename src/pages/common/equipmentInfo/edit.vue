<template>
  <view class="form-wrapper">
    <Back :title="title" />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
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
              <uni-easyinput v-model="formData.size" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
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
              required
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
              <view class="picker-wrapper">
                <!-- 当选择的日期颗粒度为year时，start 和 end 必须赋值（空字符串也可以），否则会在控制台报警告信息 -->
                <picker
                  mode="date"
                  start=""
                  end=""
                  :value="currentYear"
                  :fields="'year'"
                  @change="dateChange"
                >
                  <view :class="['uni-input', formData.year ? '' : 'select']">
                    {{ formData.year ? formData.year : '选择年份' }}
                  </view>
                </picker>
              </view>
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
import dayjs from 'dayjs'
import { addLandlordEquipmentApi, updateLandlordEquipmentApi } from '@/service'
import { routerBack, getStorage, StorageKey, formatNum } from '@/utils'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import Back from '@/components/Back/Index.vue'

// 表单数据
const formData = ref<any>({})
const form = ref<any>(null)
const commonParams = ref<any>({})
const title = ref<string>('')

// 获得焦点的 input 框下标
const focusIndex = ref<number>(-1)

// 获取数据字典
const dict = getStorage(StorageKey.DICT)

// 获取年份
const getYear = () => {
  if (formData.value.year) {
    return formData.value.year
  } else {
    return dayjs().year()
  }
}

const currentYear = ref<any>('')

onLoad((option: any) => {
  if (option) {
    let params = JSON.parse(option.params)
    formData.value = { ...params }
    commonParams.value = JSON.parse(option.commonParams)
    currentYear.value = getYear()
    if (commonParams.value.type === 'edit') {
      title.value = '设施设备信息编辑'
    } else if (commonParams.value.type === 'add') {
      title.value = '新增设施设备'
    }
  }
})

// 输入框获得焦点事件
const inputFocus = (index: number) => {
  focusIndex.value = index
}

// 输入框失去焦点事件
const inputBlur = () => {
  focusIndex.value = -1
}

/**
 * 建造/购置年份选择
 * @param {Object} e
 */
const dateChange = (e: any) => {
  formData.value.year = e.detail.value
}

// 表单提交
const submit = () => {
  const { uid, type, doorNo } = commonParams.value
  const params = {
    doorNo,
    ...formData.value,
    number: formData.value.number ? Number(formData.value.number) : null,
    amount: formData.value.amount ? Number(formatNum(formData.value.amount)) : null,
    year: formData.value.year ? dayjs(formData.value.year) : null
  }
  form.value?.validate().then((valid: any) => {
    if (valid) {
      if (!formData.value.number) {
    showToast('请输入数量')
    return
  } else if (!formData.value.unit) {
    showToast('请选择单位')
    return
  } else if (!formData.value.name) {
    showToast('请输入名称')
    return
  }else if (type === 'add') {
        addLandlordEquipmentApi(uid, params)
          .then((res) => {
            if (res) {
              showToast(SUCCESS_MSG)
              routerBack()
            }
          })
          .catch(() => {
            showToast(ERROR_MSG)
          })
      } else if (type === 'edit') {
        updateLandlordEquipmentApi(uid, params)
          .then((res) => {
            if (res) {
              showToast(SUCCESS_MSG)
              routerBack()
            }
          })
          .catch(() => {
            showToast(ERROR_MSG)
          })
      }
    }
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

      .picker-wrapper {
        display: flex;
        width: 200rpx;
        height: 23rpx;
        padding-left: 7rpx;
        overflow: hidden;
        font-size: 9rpx;
        line-height: 23rpx;
        color: #171718;
        text-overflow: ellipsis;
        white-space: nowrap;
        border: 1px solid #d9d9d9;
        border-radius: 4px;

        .uni-input {
          width: 180rpx;

          &.select {
            color: #999;
          }
        }
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
      right: 25rpx;
      bottom: 20rpx;
      width: 36rpx;
      height: 36rpx;
      border-radius: 50%;
    }
  }
}
</style>
