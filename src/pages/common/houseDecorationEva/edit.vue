<template>
  <view class="form-wrapper">
    <Back :title="title" needConfirm />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
        <uni-row v-if="commonParams.type === 'add'">
          <uni-col :span="24">
            <uni-forms-item
              required
              label="新增原因"
              :label-width="150"
              label-align="right"
              name="formData.addReason"
            >
              <view :class="['input-txtarea-wrapper', focusIndex === 1 ? 'focus' : '']">
                <textarea
                  class="input-txtarea"
                  placeholder="请输入(50字以内)"
                  :maxlength="50"
                  v-model="formData.addReason"
                  @focus="inputFocus(1)"
                  @blur="inputBlur"
                ></textarea>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="幢号"
              :label-width="150"
              label-align="right"
              name="formData.houseNo"
            >
              <uni-easyinput v-model="formData.houseNo" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="是否一口价"
              :label-width="150"
              label-align="right"
              name="formData.isFixedPrice"
            >
              <uni-data-select
                v-model="formData.isFixedPrice"
                :localdata="dict[376]"
                @change="change"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="类别"
              :label-width="150"
              label-align="right"
              name="formData.fitUpType"
            >
              <uni-data-select
                v-model="formData.fitUpType"
                :localdata="dict[323]"
                :disabled="formData.isFixedPrice === '1'"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="名称"
              :label-width="150"
              label-align="right"
              name="formData.fitUpName"
            >
              <uni-easyinput
                v-model="formData.fitUpName"
                :disabled="formData.isFixedPrice === '1'"
                type="text"
                placeholder="请输入"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="单位"
              :label-width="150"
              label-align="right"
              name="formData.unit"
            >
              <uni-data-select
                v-model="formData.unit"
                :localdata="dict[268]"
                :disabled="formData.isFixedPrice === '1'"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="数量"
              :label-width="150"
              label-align="right"
              name="formData.number"
            >
              <uni-easyinput
                v-model="formData.number"
                :disabled="formData.isFixedPrice === '1'"
                type="number"
                placeholder="请输入"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="单价"
              :label-width="150"
              label-align="right"
              name="formData.price"
            >
              <view
                :class="[
                  'input-wrapper',
                  focusIndex === 2 ? 'focus' : '',
                  formData.isFixedPrice === '1' ? 'disabled' : ''
                ]"
              >
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.price"
                  :disabled="formData.isFixedPrice === '1'"
                  @focus="inputFocus(2)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="折率"
              :label-width="150"
              label-align="right"
              name="formData.discountRate"
            >
              <uni-easyinput
                v-model="formData.discountRate"
                @input="inputChange"
                :disabled="formData.isFixedPrice === '1'"
                type="number"
                placeholder="请输入"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="评估金额"
              :label-width="150"
              label-align="right"
              name="formData.valuationAmount"
            >
              <view
                :class="[
                  'input-wrapper',
                  focusIndex === 3 ? 'focus' : '',
                  formData.isFixedPrice === '1' ? 'disabled' : ''
                ]"
              >
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  disabled
                  :value="countPrice"
                  @focus="inputFocus(3)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="补偿金额"
              :label-width="150"
              label-align="right"
              name="formData.compensationAmount"
            >
              <view :class="['input-wrapper', focusIndex === 4 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.compensationAmount"
                  @focus="inputFocus(4)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
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
              <view :class="['input-txtarea-wrapper', focusIndex === 5 ? 'focus' : '']">
                <textarea
                  class="input-txtarea"
                  placeholder="请输入(50字以内)"
                  :maxlength="50"
                  v-model="formData.remark"
                  @focus="inputFocus(5)"
                  @blur="inputBlur"
                ></textarea>
              </view>
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
import { ref, nextTick, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { routerBack, getStorage, StorageKey } from '@/utils'
import {
  addImpLandlordHouseFitUpApi,
  updateImpLandlordHouseFitUpApi,
  getEvaLandlordItemApi
} from '@/service'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import Back from '@/components/Back/Index.vue'

const title = ref<string>('')
const commonParams = ref<any>({})

// 表单数据
const formData = ref<any>({
  doorNo: commonParams.value.doorNo,
  status: 'implementation',
  addReason: '',
  houseNo: '',
  isFixedPrice: '',
  fitUpType: '',
  fitUpName: '',
  unit: '',
  number: '',
  price: '',
  discountRate: '',
  valuationAmount: '',
  compensationAmount: '',
  remark: ''
})

// 获取数据字典
const dict = getStorage(StorageKey.DICT)

// 获得焦点的输入框下标
const focusIndex = ref<number>(-1)

const inputChange = (value: any) => {
  if (value) {
    console.log(value, 'val')
    var price = value.toString().replace(/(?<=\.[0-9]{2})\d+/, '')
    nextTick(() => {
      formData.value.discountRate = price
    })
  }
}
/**
 * 获取业主详情
 * @param(object) uid
 */
const getLandlordDetail = () => {
  const { uid, itemUid } = commonParams.value
  getEvaLandlordItemApi(uid).then((res: any) => {
    let arr: any = res && res.assetHouseFitUpList ? res.assetHouseFitUpList : []
    if (arr && arr.length) {
      let obj: any = arr.filter((item: any) => item.uid === itemUid)[0]
      formData.value = { ...obj }
    }
  })
}

onLoad((option: any) => {
  if (option) {
    commonParams.value = JSON.parse(option.params)
    const { type } = commonParams.value
    if (type === 'edit') {
      title.value = '房屋装修评估编辑'
      getLandlordDetail()
    } else if (type === 'add') {
      title.value = '新增房屋装修评估'
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
 * 是否一口价选项选择
 * @params {Object} val
 */
const change = (val: any) => {
  // 当选择了一口价时，以下部分字段置为空
  if (val === '1') {
    formData.value.fitUpType = ''
    formData.value.fitUpName = ''
    formData.value.unit = ''
    formData.value.number = ''
    formData.value.price = ''
    formData.value.discountRate = ''
    formData.value.valuationAmount = ''
  }
}

// 计算评估价格
const countPrice = computed(() => {
  const { number, price, discountRate } = formData.value
  if (number && price && discountRate) {
    return (number * price * discountRate).toFixed(2)
  }
  return '0'
})

// 表单提交
const submit = () => {
  const { uid, doorNo, type } = commonParams.value
  formData.value.valuationAmount = countPrice.value
  const params = {
    doorNo,
    ...formData.value
  }

  if (!formData.value.addReason && type === 'add') {
    showToast('请输入新增原因')
    return
  } else if (!formData.value.houseNo) {
    showToast('请输入幢号')
    return
  } else if (!formData.value.isFixedPrice) {
    showToast('请选择是否一口价')
    return
  } else {
    if (type === 'add') {
      addImpLandlordHouseFitUpApi(uid, params)
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
      updateImpLandlordHouseFitUpApi(uid, params)
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

      .lg-txt-wrapper {
        display: flex;
        flex-direction: column;

        .position {
          display: flex;
          width: 200rpx;
          height: 23rpx;
          margin-top: 5rpx;
          background: #ffffff;
          border: 1px solid #d9d9d9;
          border-radius: 2rpx;
          align-items: center;
          justify-content: center;

          .txt {
            margin-left: 6rpx;
            font-size: 9rpx;
            color: #171718;
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

        &.disabled {
          background-color: #f5f7fa;
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

      .input-txtarea-wrapper {
        display: flex;
        align-items: center;
        width: 570rpx;
        border: 1px solid #d9d9d9;
        border-radius: 4px;

        &.focus {
          border-color: rgb(41, 121, 255);
        }

        .input-txtarea {
          width: 570rpx;
          height: 70px;
          padding-left: 7rpx;
          font-size: 9rpx;
          line-height: 35px;
          color: #171718;
        }
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
