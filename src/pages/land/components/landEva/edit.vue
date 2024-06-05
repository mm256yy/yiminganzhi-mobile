<template>
  <view class="form-wrapper">
    <Container :title="title">
      <view class="main">
        <uni-forms class="form" ref="form" :modelValue="formData">
          <uni-row>
            <uni-col :span="12">
              <uni-forms-item
                label="村民小组"
                :label-width="150"
                label-align="right"
                name="formData.villagerGroup"
              >
                <text class="label-txt">{{ formData.villagerGroup }} </text>
              </uni-forms-item>
            </uni-col>
            <uni-col :span="12">
              <uni-forms-item
                label="地块编号"
                :label-width="150"
                label-align="right"
                name="formData.landNumber"
              >
                <text class="label-txt">{{ formData.landNumber }} </text>
              </uni-forms-item>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <uni-forms-item
                label="地块名"
                :label-width="150"
                label-align="right"
                name="formData.landName"
              >
                <text class="label-txt">{{ formData.landName }} </text>
              </uni-forms-item>
            </uni-col>
            <uni-col :span="12">
              <uni-forms-item
                label="所在位置"
                :label-width="150"
                label-align="right"
                name="formData.areaText"
              >
                <text class="label-txt">{{ formData.areaText }} </text>
              </uni-forms-item>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <uni-forms-item
                label="淹没范围"
                :label-width="150"
                label-align="right"
                name="formData.inundationRangeText"
              >
                <text class="label-txt">{{ formData.inundationRangeText }} </text>
              </uni-forms-item>
            </uni-col>
            <uni-col :span="12">
              <uni-forms-item
                label="地块面积"
                :label-width="150"
                label-align="right"
                name="formData.shapeArea"
              >
                <text class="label-txt">{{ formatStr(formData.shapeArea, '㎡') }} </text>
              </uni-forms-item>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <uni-forms-item
                label="地类"
                :label-width="150"
                label-align="right"
                name="formData.landTypeText"
              >
                <text class="label-txt">{{ formData.landTypeText }} </text>
              </uni-forms-item>
            </uni-col>
            <uni-col :span="12">
              <uni-forms-item
                label="土地性质"
                :label-width="150"
                label-align="right"
                name="formData.landNatureText"
              >
                <text class="label-txt">{{ formData.landNatureText }} </text>
              </uni-forms-item>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <uni-forms-item
                label="土地权属"
                :label-width="150"
                label-align="right"
                name="formData.landOwner"
              >
                <uni-easyinput v-model="formData.landOwner" type="text" placeholder="请输入" />
              </uni-forms-item>
            </uni-col>
            <uni-col :span="12">
              <uni-forms-item
                label="获得方式"
                :label-width="150"
                label-align="right"
                name="formData.getType"
              >
                <!-- <uni-easyinput v-model="formData.getType" type="text" placeholder="请输入" /> -->
                <uni-data-select v-model="formData.getType" :localdata="dict[421]" />
              </uni-forms-item>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <uni-forms-item
                label="地块位置"
                :label-width="150"
                label-align="right"
                name="formData.landSea"
              >
                <uni-easyinput v-model="formData.landSea" type="text" placeholder="请输入" />
              </uni-forms-item>
            </uni-col>
            <uni-col :span="12">
              <uni-forms-item
                label="评估单价"
                :label-width="150"
                label-align="right"
                name="formData.valuationPrice"
              >
                <view class="input-wrapper">
                  <input
                    class="input-txt"
                    placeholder="请输入"
                    type="number"
                    v-model="formData.valuationPrice"
                    @focus="inputFocus(5)"
                    @blur="inputBlur"
                    @input="inputChange"
                  />
                  <view class="unit">元/㎡</view>
                </view>
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
                <!-- <view class="input-wrapper">
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
                </view> -->
                <text class="label-txt">{{ countPrice }}元 </text>
              </uni-forms-item>
            </uni-col>
            <uni-col :span="12">
              <uni-forms-item
                required
                label="补偿金额"
                :label-width="150"
                label-align="right"
                name="formData.compensationAmount"
              >
                <view class="input-wrapper">
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
                name="formData.remark"
              >
                <view :class="['input-txtarea-wrapper', focusIndex === 6 ? 'focus' : '']">
                  <textarea
                    class="input-txtarea"
                    placeholder="请输入(50字以内)"
                    :maxlength="50"
                    v-model="formData.remark"
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
    </Container>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed, watch, nextTick } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { routerBack, getStorage, StorageKey } from '@/utils'
import {
  updateImpLandlordAssetLandApi,
  getEvaLandlordItemApi,
  updateEstimateFlag,
  getLandEstimateDtoListApi,
  updateImpLandlordImmigrantFillingApi
} from '@/service'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import Container from '@/components/Container/index.vue'
import { formatStr } from '@/utils'

const title = ref<string>('')
const commonParams = ref<any>({})
// 表单数据
const formData = ref<any>({
  doorNo: commonParams.value.doorNo,
  status: 'implementation',
  villagerGroup: '',
  landNumber: '',
  addReason: '',
  areaText: '',
  landName: '',
  locationType: '',
  inundationRangeText: '',
  shapeArea: '',
  landTypeText: '',
  landNatureText: '',
  landOwner: '',
  getType: '',
  landSea: '',
  valuationPrice: '',
  valuationAmount: '',
  compensationAmount: '', // 补偿金额
  remark: ''
})

// 获取数据字典
const dict = getStorage(StorageKey.DICT)

// 获得焦点的输入框下标
const focusIndex = ref<number>(-1)

/**
 * 获取业主详情
 * @param(object) uid
 */
const getLandlordDetail = () => {
  const { uid, id } = commonParams.value
  getEvaLandlordItemApi(uid).then((res: any) => {
    let arr: any = res.landEstimateDtoList || []
    if (arr && arr.length) {
      let obj: any = arr.filter((item: any) => {
        return item.id == id
      })
      console.log('===========================', obj, id)

      formData.value = { ...obj[0] }
    }
  })
}

onLoad((option: any) => {
  if (option) {
    commonParams.value = JSON.parse(option.params)
    console.log('传输的数据', commonParams.value)
    const { type } = commonParams.value
    if (type === 'edit') {
      title.value = '土地基本情况评估编辑'
      getLandlordDetail()
    } else if (type === 'add') {
      title.value = '新增土地基本情况评估'
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

// 计算评估价格
const countPrice = computed(() => {
  const { valuationPrice, shapeArea } = formData.value
  if (valuationPrice && shapeArea) {
    return (valuationPrice * shapeArea).toFixed(2)
  }
  return '0'
})

// watch(
//   () => formData.value.valuationPrice,
//   (val) => {
//     console.log(val, 'valuationPriceCount')
//     console.log(countPrice.value,'评估金额')
//     // if (!formData.value.compensationAmount||formData.value.compensationAmount==countPrice.value) {
//         const {shapeArea } = formData.value
//         formData.value.compensationAmount=(val * shapeArea).toFixed(2)
//     // }
//   }
// )

const inputChange = (e: any) => {
  console.log('测试通值')
  console.log(e.detail.value, '改变的值')
  const { shapeArea } = formData.value
  formData.value.compensationAmount = (e.detail.value * shapeArea).toFixed(2)
}

watch(
  () => formData.value.compensationAmount,
  (newValue) => {
    console.log(newValue, 'valuationPriceCount')
    if (!formData.value.compensationAmount) {
      formData.value.compensationAmount = newValue
      console.log(formData.value.compensationAmount, '补偿金额')
    }
  }
)

// 表单提交
const submit = () => {
  const { uid, doorNo } = commonParams.value
  formData.value.valuationAmount = countPrice.value
  const params = {
    doorNo,
    ...formData.value
  }
  if (!formData.value.compensationAmount) {
    showToast('补偿金额不能为空')
    return
  }
  console.log(params, '测试数据')
  updateImpLandlordAssetLandApi(uid, params)
    .then((res) => {
      if (res) {
        showToast(SUCCESS_MSG)
        if (params.compensationAmount > 0) {
          updateEstimateApi()
          updateImpLandlordImmigrantFillingApi(uid, {
            landStatus: '1' // 土地基本情况评估
          })
        }

        routerBack()
      }
    })
    .catch(() => {
      showToast(ERROR_MSG)
    })
}

// 更新评估状态api
const updateEstimateApi = async () => {
  try {
    await updateEstimateFlag({ uid: commonParams.value?.idStr })
  } catch (error) {
    console.log(error)
  }
}

watch(
  () => formData.value.valuationAmount,
  (newValue) => {
    if (!formData.value.compensationAmount) {
      formData.value.compensationAmount = newValue
    }
  }
)
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

  .label-txt {
    margin-left: 6rpx;
    font-size: 9rpx;
    color: #171718;
    line-height: 36px;
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    width: 240rpx;
  }
}
</style>
