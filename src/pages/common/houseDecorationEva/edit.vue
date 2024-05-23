<template>
  <view class="form-wrapper">
    <Back :title="title" needConfirm />
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
              label="幢号"
              :label-width="150"
              label-align="right"
              name="formData.houseNo"
            >
              <!-- <uni-easyinput v-model="formData.houseNo" type="text" placeholder="请输入" /> -->
              <uni-data-select
                v-model="formData.houseNo"
                :localdata="buildingNumberList"
                @change="change"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="是否一口价"
              :label-width="150"
              label-align="right"
              name="formData.isBuyItNow"
            >
              <uni-data-select
                v-model="formData.isBuyItNow"
                :localdata="fixedPriceOptions"
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
              v-if="formData.isBuyItNow === '0'"
            >
              <uni-data-select
                v-model="formData.fitUpType"
                :localdata="dict[323]"
                :disabled="formData.isBuyItNow === '1'"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="名称"
              :label-width="150"
              label-align="right"
              name="formData.fitUpName"
              v-if="formData.isBuyItNow === '0'"
            >
              <uni-easyinput
                v-model="formData.fitUpName"
                :disabled="formData.isBuyItNow === '1'"
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
                :disabled="formData.isBuyItNow === '1'"
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
                :disabled="formData.isBuyItNow === '1'"
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
                  // formData.isBuyItNow === '1' ? 'disabled' : ''
                ]"
              >
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.price"
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
              v-if="formData.isBuyItNow === '0'"
            >
              <uni-easyinput
                v-model="formData.discountRate"
                @input="inputChange"
                :disabled="formData.isBuyItNow === '1'"
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
                  formData.isBuyItNow === '0' ? 'disabled' : ''
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
const list = ref<any>([])
const fixedPriceOptions = ref<any>([
  {
    text: '是',
    value: '1'
  },
  {
    text: '否',
    value: '0'
  }
])
const cfNoList = ref<any>()
const cfIsList = ref<any>()
const buildingNumberList= ref<any>([])
// 表单数据
const formData = ref<any>({
  doorNo: commonParams.value.doorNo,
  status: 'implementation',
  // addReason: '',
  houseNo: '',
  isBuyItNow: '',
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
      console.log(formData.value, '编辑的数据是什么')
      cfNoList.value.forEach((item:any) => {
      if (item.houseNo == formData.value.houseNo) {
        console.log('否')
        fixedPriceOptions.value=[  {
        text: '否',
        value: '0'
      }]
        }    
      })
          cfIsList.value.forEach((item:any) => {
      if (item == formData.value.houseNo) {
        console.log('是')
        fixedPriceOptions.value=[  {
        text: '是',
        value: '1'
      }]
        }
    })
    }
  })
}

onLoad((option: any) => {
  if (option) {
    commonParams.value =JSON.parse(option.params)
    const { type, immigrantHouseList } = commonParams.value
    console.log(commonParams.value, '传过来的数据')
    console.log(immigrantHouseList, '主体评估数据')
    list.value = JSON.parse(option.dataList)
    console.log(list.value, '房屋装修评估数据')
    let dataListIsBuyItNow = list.value.filter((item: any) => item.isBuyItNow == '1')
    let dataListNoBuyItNow = list.value.filter((item: any) => item.isBuyItNow == '0')
    cfIsList.value=dataListIsBuyItNow.map((item:any)=>{
      return item.houseNo
      // isBuyItNow: item.isBuyItNow,
    })
     cfNoList.value=dataListNoBuyItNow.map((item:any)=>{
      return {
        isBuyItNow: item.isBuyItNow,
        houseNo: item.houseNo
      }
     })
    buildingNumberList.value=immigrantHouseList.map((item: any) => {
      return {
        text: item.houseNo,
        value: item.houseNo,
      }
    })
    console.log(buildingNumberList.value,'幢号下拉数据')
    // buildingNumberList.value = buildingNumberList.value.filter((item: any) => !cfIsList.includes(item.value))
    if (type === 'edit') {
      console.log('编辑')
      title.value = '房屋装修评估编辑'
    // buildingNumberList.value=immigrantHouseList.map((item: any) => {
    //   return {
    //     text: item.houseNo,
    //     value: item.houseNo
    //   }
      // })
      getLandlordDetail()
      console.log(cfNoList.value, '测试否的数据')
      console.log(cfIsList.value,'测试是的数据')
      console.log(formData.value,'幢号是什么')
      let falg = cfNoList.value.some((item:any) => item.isBuyItNow == 1)
      console.log(falg,'判断是否存在是的数据')
      if (falg) {
      buildingNumberList.value=buildingNumberList.value.filter((item:any) => item.isBuyItNow == 0)
    }
    } else if (type === 'add') {
      title.value = '新增房屋装修评估'
      buildingNumberList.value = buildingNumberList.value.filter((item: any) => !cfIsList.value.includes(item.value))
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
  const {type } = commonParams.value
  // if (type=='add') {
  console.log(val, 'val')
  console.log( cfNoList.value,'否数据')
  cfNoList.value.forEach((item:any) => {
    if (item.houseNo == val) {
      fixedPriceOptions.value=[  {
      text: '否',
      value: '0'
    }]
    }
  });
  console.log( cfIsList.value,'是数据')
  cfIsList.value.forEach((item:any) => {
    if (item == val) {
      fixedPriceOptions.value=[  {
      text: '是',
      value: '0'
    }]
    }
  });
  // }
  if (val === '1') {
    console.log('选择了一口价,是')
    formData.value.fitUpType = ''
    formData.value.fitUpName = ''
    // formData.value.unit = ''
    formData.value.unit = '16'
    // formData.value.number = ''
    // formData.value.price = ''
    formData.value.discountRate = ''
    formData.value.valuationAmount = ''
    commonParams.value.immigrantHouseList.map((item: any) => {
      if (item.houseNo == formData.value.houseNo) {
         formData.value.number = item.landArea
      }
    })
  // buildingNumberList.value.value=buildingNumberList.value.filter((itemA:any) => {  
  //   return !fixedPriceOptions.value.some((itemB:any) => itemA.isBuyItNow == itemB.value);  
  // });
  console.log(buildingNumberList.value,'幢号数据-是')
  } else {
    console.log('选择了一口价,否')
    // formData.value.unit = 'm²'
  // buildingNumberList.value.value=buildingNumberList.value.filter((itemA:any) => {  
  //   return fixedPriceOptions.value.some((itemB:any) => itemA.isBuyItNow == itemB.value);  
  // });
  console.log(buildingNumberList.value,'幢号数据-否')
  }
}

// 计算评估价格
const countPrice = computed(() => {
  const { number, price, discountRate } = formData.value
  if (number && price && discountRate) {
    return (number * price * discountRate).toFixed(2)
  } else if (number && price) {
    return (number * price).toFixed(2)
    
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
  if (!formData.value.houseNo) {
    showToast('请选择幢号')
    return
  } else if (!formData.value.isBuyItNow) {
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
