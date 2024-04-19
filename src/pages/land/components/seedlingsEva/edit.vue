<template>
  <view class="form-wrapper">
    <Container :title="title">
      <view class="main">
        <uni-forms class="form" ref="form" :modelValue="formData">
          <!-- <uni-row v-if="commonParams.type === 'add'">
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
          </uni-row> -->
          <uni-row>
            <uni-col :span="12">
              <uni-forms-item
                required
                label="青苗户主"
                :label-width="150"
                label-align="right"
                name="formData.householder"
              >
                <uni-easyinput v-model="formData.householder" type="text" placeholder="请输入" />
              </uni-forms-item>
            </uni-col>
          </uni-row>
          <uni-row>
            <uni-col :span="12">
              <uni-forms-item
                required
                label="地块编号"
                :label-width="150"
                label-align="right"
                name="formData.landNumber"
              >
                <uni-data-select
                  placeholder="请选择"
                  v-model="formData.landNumber"
                  :localdata="landNumberList"
                  @change="landNumberChange"
                />
              </uni-forms-item>
            </uni-col>
            <uni-col :span="12">
              <uni-forms-item
                label="地块名称"
                :label-width="150"
                label-align="right"
                name="formData.landName"
              >
                <text class="label-txt">{{ formData.landName }} </text>
              </uni-forms-item>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <uni-forms-item
                required
                label="品种"
                :label-width="150"
                label-align="right"
                name="formData.breed"
              >
                <uni-easyinput v-model="formData.breed" type="text" placeholder="请输入" />
              </uni-forms-item>
            </uni-col>
            <uni-col :span="12">
              <uni-forms-item
                label="规格"
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
                label="株数"
                :label-width="150"
                label-align="right"
                name="formData.number"
              >
                <view :class="['input-wrapper', focusIndex === 2 ? 'focus' : '']">
                  <input
                    class="input-txt"
                    placeholder="请输入"
                    type="number"
                    v-model="formData.number"
                    @focus="inputFocus(2)"
                    @blur="inputBlur"
                  />
                  <view class="unit"> 株 </view>
                </view>
              </uni-forms-item>
            </uni-col>
            <uni-col :span="12">
              <uni-forms-item
                label="单价"
                :label-width="150"
                label-align="right"
                name="formData.numPrice"
              >
                <view :class="['input-wrapper', focusIndex === 3 ? 'focus' : '']">
                  <input
                    class="input-txt"
                    placeholder="请输入"
                    type="number"
                    v-model="formData.numPrice"
                    @focus="inputFocus(3)"
                    @blur="inputBlur"
                  />
                  <view class="unit"> 元／株 </view>
                </view>
              </uni-forms-item>
            </uni-col>
          </uni-row>
          <uni-row>
            <uni-col :span="12">
              <uni-forms-item
                label="面积"
                :label-width="150"
                label-align="right"
                name="formData.area"
              >
                <view :class="['input-wrapper', focusIndex === 4 ? 'focus' : '']">
                  <input
                    class="input-txt"
                    placeholder="请输入"
                    type="number"
                    v-model="formData.area"
                    @focus="inputFocus(4)"
                    @blur="inputBlur"
                  />
                  <view class="unit">㎡</view>
                </view>
              </uni-forms-item>
            </uni-col>
            <uni-col :span="12">
              <uni-forms-item
                label="单价"
                :label-width="150"
                label-align="right"
                name="formData.price"
              >
                <view :class="['input-wrapper', focusIndex === 5 ? 'focus' : '']">
                  <input
                    class="input-txt"
                    placeholder="请输入"
                    type="number"
                    v-model="formData.price"
                    @focus="inputFocus(5)"
                    @blur="inputBlur"
                  />
                  <view class="unit">元／㎡</view>
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
                <view :class="['input-wrapper', focusIndex === 6 ? 'focus' : '']">
                  <input
                    class="input-txt"
                    placeholder="请输入"
                    type="number"
                    disabled
                    :value="countPrice"
                    @focus="inputFocus(6)"
                    @blur="inputBlur"
                  />
                  <view class="unit">元</view>
                </view>
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
                <view :class="['input-wrapper', focusIndex === 7 ? 'focus' : '']">
                  <input
                    class="input-txt"
                    placeholder="请输入"
                    type="number"
                    v-model="formData.compensationAmount"
                    @focus="inputFocus(7)"
                    @blur="inputBlur"
                  />
                  <view class="unit">元</view>
                </view>
              </uni-forms-item>
            </uni-col>
          </uni-row>
          <!-- <uni-row>
            <uni-col :span="12">
              <uni-forms-item
                label="青苗户主"
                :label-width="150"
                label-align="right"
                name="formData.householder"
              >
                <uni-easyinput v-model="formData.householder" type="text" placeholder="请输入" />
              </uni-forms-item>
            </uni-col>
          </uni-row> -->

          <uni-row>
            <uni-col :span="24">
              <uni-forms-item
                label="备注"
                :label-width="150"
                label-align="right"
                name="formData.remark"
              >
                <view :class="['input-txtarea-wrapper', focusIndex === 8 ? 'focus' : '']">
                  <textarea
                    class="input-txtarea"
                    placeholder="请输入(50字以内)"
                    :maxlength="50"
                    v-model="formData.remark"
                    @focus="inputFocus(8)"
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
import { ref, computed, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { routerBack, getStorage, StorageKey } from '@/utils'
import {
  addImpLandlordAssetAppendantApi,
  updateImpLandlordAssetAppendantApi,
  getEvaLandlordItemApi,
  updateEstimateFlag
} from '@/service'
import { ERROR_MSG, showToast } from '@/config/msg'
import Container from '@/components/Container/index.vue'

const title = ref<string>('')
const commonParams = ref<any>({})
const landNumberList = ref<any[]>([])
const landNumberListClone = ref<any[]>([])


// 表单数据
const formData = ref<any>({
  doorNo: commonParams.value.doorNo,
  status: 'implementation',
  // addReason: '',
  landNumber: '',
  landName: '',
  breed: '',
  size: '',
  numPrice: '',
  number: '',
  area: '',
  price: '',
  valuationAmount: '',
  compensationAmount: '',
  householder: '',
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
  const { uid, itemUid } = commonParams.value
  getEvaLandlordItemApi(uid).then((res: any) => {
    let arr: any = res && res.assetAppendantList ? res.assetAppendantList : []
    if (arr && arr.length) {
      let obj: any = arr.filter((item: any) => item.uid === itemUid)[0]
      console.log(obj,'详情数据')
      formData.value = { ...obj }
      // formData.value.landNumber = formData.value.landName
    }
  })
}

onLoad((option: any) => {
  if (option && option.params) {
    commonParams.value = JSON.parse(option.params)
    console.log(commonParams.value, 'commonParams数据')
    const { type, landEstimateDtoList } = commonParams.value
    landNumberList.value = landEstimateDtoList.map((item: any) => {
      return {
        text: item.landNumber,
        value: item.landNumber
      }
    })
    landNumberListClone.value = landEstimateDtoList.map((item: any) => {
      return {
        text: item.landNumber,
        value: item.landName
      }
    })
    console.log(landNumberList.value,'土地列表List')
    if (type === 'edit') {
      title.value = '土地青苗及附着物评估编辑'
      getLandlordDetail()
    } else if (type === 'add') {
      title.value = '土地青苗及附着物评估新增'
      formData.value.householder = commonParams.value?.name
    }
  }
})

const findLandNumber = (val: any) => {
  const name = landNumberList.value?.find((item) => item.value === val).text
  return name
}

const landNumberChange = (index:any) => {
  console.log(index,'当前的event值')
}
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
  const { number, numPrice, area, price } = formData.value
  // 评估金额＝　株树*单价（元/株） + 面积 * 单价（元/㎡）
  const result = (number * numPrice + area * price).toFixed(2)
  return result
})

// 更新评估状态api
const updateEstimateApi = async () => {
  try {
    await updateEstimateFlag({ uid: commonParams.value?.idStr })
  } catch (error) {
    console.log(error)
  }
}

// 表单提交
const submit = () => {
  const { uid, doorNo, type } = commonParams.value
  // formData.value.valuationAmount = countPrice.value
  const params = {
    doorNo,
    ...formData.value,
    landNumber: findLandNumber(formData.value.landNumber)
  }
  console.log(params,'测试传输数据')
  if (!formData.value.householder) {
    showToast('请输入青苗户主')
    return
  }

  if (!formData.value.landNumber) {
    showToast('地块编号不能为空')
    return
  }

  if (!formData.value.breed) {
    showToast('品种不能为空')
    return
  }

  if (!formData.value.compensationAmount) {
    showToast('补偿金额不能为空')
    return
  }

  // 判断株数和面积是否都没有填写
  if (!formData.value.number && !formData.value.area) {
    showToast('株数和面积至少填写一个')
    return
  }

  if (formData.value.number && !formData.value.numPrice) {
    showToast('单价不能为空')
    return
  }

  if (formData.value.area && !formData.value.price) {
    showToast('单价不能为空')
    return
  }

  if (type === 'add') {
    addImpLandlordAssetAppendantApi(uid, params)
      .then((res) => {
        if (res) {
          showToast('新增成功')
          updateEstimateApi()
          routerBack()
        }
      })
      .catch(() => {
        showToast(ERROR_MSG)
      })
  } else if (type === 'edit') {
    updateImpLandlordAssetAppendantApi(uid, params)
      .then((res) => {
        if (res) {
          showToast('编辑成功')
          updateEstimateApi()
          routerBack()
        }
      })
      .catch(() => {
        showToast(ERROR_MSG)
      })
  }
}

watch(
  () => formData.value.landNumber,
  (val) => {
    const { type } = commonParams.value
    if (type === 'add') {
      formData.value.landName = landNumberListClone.value?.find((item) => item.text == val).value
      console.log(landNumberList.value, '1111111')
      console.log(formData.value.landName, '2222222')
    }
  },
  {
    immediate: true,
    deep: true
  }
)
watch(
  () => countPrice.value,
  (newValue) => {
    console.log(newValue, 'newValue')
    const { type } = commonParams.value
    if (type == 'add') { 
      console.log('测试走到哪儿')
      formData.value.compensationAmount = newValue
      console.log(formData.value.compensationAmount, '最终数据')
    } else {
        if (formData.value.compensationAmount == newValue) {
          formData.value.compensationAmount = newValue
        }
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
          width: 141rpx;
          height: 35px;
          padding-left: 7rpx;
          font-size: 9rpx;
          line-height: 35px;
          color: #171718;
        }

        .unit {
          width: 50rpx;
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
