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
              label="规格/型号"
              :label-width="150"
              label-align="right"
              name="formData.size"
            >
              <uni-easyinput v-model="formData.size" type="text" placeholder="请输入" />
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
              <uni-data-select v-model="formData.unit" :localdata="dict[268]" />
            </uni-forms-item>
          </uni-col>
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
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="用途"
              :label-width="150"
              label-align="right"
              name="formData.purpose"
            >
              <uni-easyinput v-model="formData.purpose" type="text" placeholder="请输入" />
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
              <view :class="['input-wrapper', focusIndex === 2 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.amount"
                  @focus="inputFocus(2)"
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
          <uni-col :span="12">
            <uni-forms-item
              label="评估单价"
              :label-width="150"
              label-align="right"
              name="formData.price"
            >
              <view :class="['input-wrapper', focusIndex === 3 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.price"
                  @focus="inputFocus(3)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="成新率"
              :label-width="150"
              label-align="right"
              name="formData.newnessRate"
            >
              <uni-easyinput v-model="formData.newnessRate" type="number" placeholder="请输入" />
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
              <view :class="['input-wrapper', focusIndex === 4 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  disabled
                  :value="countPrice"
                  @focus="inputFocus(4)"
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
              <view :class="['input-wrapper', focusIndex === 5 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.compensationAmount"
                  @focus="inputFocus(5)"
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
              name="formData.valuationRemark"
            >
              <view :class="['input-txtarea-wrapper', focusIndex === 6 ? 'focus' : '']">
                <textarea
                  class="input-txtarea"
                  placeholder="请输入(50字以内)"
                  :maxlength="50"
                  v-model="formData.valuationRemark"
                  @focus="inputFocus(6)"
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
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import dayjs from 'dayjs'
import { routerBack, getStorage, StorageKey } from '@/utils'
import {
  addImpLandlordEquipmentApi,
  updateImpLandlordEquipmentApi,
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
  name: '',
  size: '',
  unit: '',
  number: '',
  purpose: '',
  year: '',
  amount: '',
  moveType: '',
  price: '',
  newnessRate: '',
  valuationAmount: '',
  compensationAmount: '',
  valuationRemark: ''
})

// 获取数据字典
const dict = getStorage(StorageKey.DICT)

// 获得焦点的输入框下标
const focusIndex = ref<number>(-1)

const currentYear = ref<any>('')

// 获取年份
const getYear = () => {
  if (formData.value.year) {
    return dayjs(formData.value.year).format('YYYY')
  } else {
    return dayjs().year()
  }
}

/**
 * 获取业主详情
 * @param(object) uid
 */
const getLandlordDetail = () => {
  const { uid, itemUid } = commonParams.value
  getEvaLandlordItemApi(uid).then((res: any) => {
    let arr: any = res && res.immigrantEquipmentList ? res.immigrantEquipmentList : []
    if (arr && arr.length) {
      let obj: any = arr.filter((item: any) => item.uid === itemUid)[0]
      formData.value = {
        ...obj,
        year: obj.year ? dayjs(obj.year).format('YYYY') : ''
      }
      currentYear.value = obj.year ? dayjs(obj.year).format('YYYY') : ''
    }
  })
}

onLoad((option: any) => {
  if (option) {
    commonParams.value = JSON.parse(option.params)
    const { type } = commonParams.value
    if (type === 'edit') {
      title.value = '设施设备评估编辑'
      getLandlordDetail()
    } else if (type === 'add') {
      currentYear.value = getYear()
      title.value = '新增设施设备评估'
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
  console.log('KKK:::Picker ', e.detail.value)
}

// 计算评估价格
const countPrice = computed(() => {
  const { newnessRate, price, number } = formData.value
  if (newnessRate && price && number) {
    return (newnessRate * price * number).toFixed(2)
  }
  return '0'
})

// 表单提交
const submit = () => {
  const { uid, doorNo, type } = commonParams.value
  formData.value.valuationAmount = countPrice.value
  const params = {
    doorNo,
    ...formData.value,
    year: formData.value.year ? dayjs(formData.value.year) : ''
  }

  if (!formData.value.addReason && type === 'add') {
    showToast('请输入新增原因')
    return
  } else {
    if (type === 'add') {
      addImpLandlordEquipmentApi(uid, params)
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
      updateImpLandlordEquipmentApi(uid, params)
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
