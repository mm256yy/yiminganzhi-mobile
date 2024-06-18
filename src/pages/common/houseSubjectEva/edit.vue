<template>
  <view class="form-wrapper">
    <Back :title="title" needConfirm />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="幢号"
              :label-width="150"
              label-align="right"
              name="formData.houseNo"
            >
              <uni-easyinput
                v-model="formData.houseNo"
                type="text"
                placeholder="请输入"
                :disabled="true"
              />
            </uni-forms-item>
          </uni-col>
          <!-- <uni-col :span="12">
            <uni-forms-item
              label="是否需要评估"
              :label-width="150"
              label-align="right"
              name="formData.hasEstimate"
            >
              <uni-data-select v-model="formData.hasEstimate" :localdata="dict[362]" />
            </uni-forms-item>
          </uni-col> -->
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="房屋坐落"
              :label-width="150"
              label-align="right"
              name="formData.situated"
            >
              <uni-easyinput v-model="formData.situated" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="房屋类别"
              :label-width="150"
              label-align="right"
              name="formData.houseType"
            >
              <uni-data-select v-model="formData.houseType" :localdata="dict[266]" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="结构类型"
              :label-width="150"
              label-align="right"
              name="formData.constructionType"
            >
              <uni-data-select
                v-model="formData.constructionType"
                :localdata="dict[252]"
                :disabled="true"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="层数"
              :label-width="150"
              label-align="right"
              name="formData.storeyNumber"
            >
              <view :class="['input-wrappers', focusIndex === 1 ? 'focus' : '']">
                <uni-easyinput
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.storeyNumber"
                  @focus="inputFocus(1)"
                  @blur="inputBlur"
                  disabled
                />
                <view class="unit">层</view>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="建筑面积"
              :label-width="150"
              label-align="right"
              name="formData.landArea"
            >
              <view :class="['input-wrappers', focusIndex === 2 ? 'focus' : '']">
                <uni-easyinput
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.landArea"
                  @focus="inputFocus(2)"
                  @blur="inputBlur"
                  :disabled="true"
                />
                <view class="unit">m²</view>
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="合法面积"
              :label-width="150"
              label-align="right"
              name="formData.landLegalArea"
            >
              <view :class="['input-wrappers', focusIndex === 2 ? 'focus' : '']">
                <uni-easyinput
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.landLegalArea"
                  @focus="inputFocus(2)"
                  @blur="inputBlur"
                  disabled
                />
                <view class="unit">m²</view>
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="不合法面积"
              :label-width="150"
              label-align="right"
              name="formData.landIllegalArea"
            >
              <view :class="['input-wrappers', focusIndex === 2 ? 'focus' : '']">
                <uni-easyinput
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.landIllegalArea"
                  @focus="inputFocus(2)"
                  @blur="inputBlur"
                  disabled
                />
                <view class="unit">m²</view>
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="竣工年月"
              :label-width="150"
              label-align="right"
              name="formData.completedTime"
            >
              <view class="picker-wrapper">
                <picker mode="date" :value="currentDate" :fields="'month'" @change="bindDateChange">
                  <view :class="['uni-input', formData.completedTime ? '' : 'select']">
                    {{ formData.completedTime ? formData.completedTime : '请选择' }}
                  </view>
                </picker>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="房屋高程（m）"
              :label-width="150"
              label-align="right"
              name="formData.houseHeight"
            >
              <view :class="['input-wrapper', focusIndex === 3 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.houseHeight"
                  @focus="inputFocus(3)"
                  @blur="inputBlur"
                />
                <view class="unit">m</view>
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="宅基地面积"
              :label-width="150"
              label-align="right"
              name="formData.homesteadArea"
            >
              <view :class="['input-wrappers', focusIndex === 4 ? 'focus' : '']">
                <uni-easyinput
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.homesteadArea"
                  @focus="inputFocus(4)"
                  @blur="inputBlur"
                  disabled
                />
                <view class="unit">㎡</view>
              </view>
              <!-- {{ formData.homesteadArea }} -->
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="房产所有权证编号"
              :label-width="150"
              label-align="right"
              name="formData.propertyNo"
            >
              <uni-easyinput v-model="formData.propertyNo" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="土地使用权证编号"
              :label-width="150"
              label-align="right"
              name="formData.landNo"
            >
              <uni-easyinput v-model="formData.landNo" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="结构等级"
              :label-width="150"
              label-align="right"
              name="formData.constructionLevel"
            >
              <uni-data-select v-model="formData.constructionLevel" :localdata="dict[223]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="房屋高度"
              :label-width="150"
              label-align="right"
              name="formData.buildingHeight"
            >
              <view :class="['input-wrapper', focusIndex === 5 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.buildingHeight"
                  @focus="inputFocus(5)"
                  @blur="inputBlur"
                />
                <view class="unit">m</view>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="合法成新率"
              :label-width="150"
              label-align="right"
              name="formData.newnessRate"
            >
              <uni-easyinput v-model="formData.newnessRate" type="number" placeholder="请输入"  @change="handleInput"/>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="不合法成新率"
              :label-width="150"
              label-align="right"
              name="formData.illegalNewnessRate"
            >
              <uni-easyinput
                v-model="formData.illegalNewnessRate"
                type="number"
                placeholder="请输入"
                @change="handleInputNew"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="合法面积单价"
              :label-width="150"
              label-align="right"
              name="formData.valuationPrice"
            >
              <view :class="['input-wrapper', focusIndex === 6 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.valuationPrice"
                  @focus="inputFocus(6)"
                  @blur="inputBlur"
                />
                <view class="unit">元/㎡</view>
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="不合法面积单价"
              :label-width="150"
              label-align="right"
              name="formData.illegalValuationPrice"
            >
              <view :class="['input-wrapper', focusIndex === 6 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.illegalValuationPrice"
                  @focus="inputFocus(6)"
                  @blur="inputBlur"
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
              <view :class="['input-wrappers', focusIndex === 7 ? 'focus' : '']">
                <uni-easyinput
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  :value="countPrice"
                  @focus="inputFocus(7)"
                  @blur="inputBlur"
                  disabled
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
              <view :class="['input-wrapper', focusIndex === 8 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.compensationAmount"
                  @focus="inputFocus(8)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="占地面积"
              :label-width="150"
              label-align="right"
              name="formData.occupyArea"
            >
              <view :class="['input-wrapper', focusIndex === 4 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.occupyArea"
                  @focus="inputFocus(4)"
                  @blur="inputBlur"
                />
                <view class="unit">㎡</view>
              </view>
            </uni-forms-item>
          </uni-col>
          <!-- <uni-col :span="12">
            <uni-col :span="12">
              <uni-forms-item
                label="是否合法"
                :label-width="150"
                label-align="right"
                name="formData.isCompliance"
              >
                <uni-data-select
                  v-model="formData.isCompliance"
                  :localdata="dict[371]"
                  :disabled="true"
                />
              </uni-forms-item>
            </uni-col>
          </uni-col> -->
        </uni-row>
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="备注"
              :label-width="150"
              label-align="right"
              name="formData.remark"
            >
              <uni-easyinput
                v-model="formData.remark"
                type="textarea"
                :maxlength="50"
                placeholder="请输入(50字以内)"
              />
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
import { addImpLandlordHouseApi, updateImpLandlordHouseApi, getEvaLandlordItemApi } from '@/service'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import Back from '@/components/Back/Index.vue'

const title = ref<string>('')
const commonParams = ref<any>({})

// 表单数据
const formData = ref<any>({
  doorNo: commonParams.value.doorNo,
  status: 'implementation',
  houseNo: '',
  hasEstimate: '',
  situated: '',
  houseType: '',
  constructionType: '',
  completedTime: '',
  houseHeight: '',
  landArea: '',
  propertyNo: '',
  landNo: '',
  constructionLevel: '',
  buildingHeight: '',
  newnessRate: '',
  valuationPrice: '',
  valuationAmount: '',
  compensationAmount: '',
  remark: '',
  occupyArea: ''
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
    let arr: any = res && res.immigrantHouseList ? res.immigrantHouseList : []
    if (arr && arr.length) {
      let obj: any = arr.filter((item: any) => item.uid === itemUid)[0]
      formData.value = {
        ...obj,
        completedTime: obj.completedTime
          ? dayjs(obj.completedTime).format('YYYY-MM')
          : obj.completedTime
      }
      currentDate.value = obj.completedTime
        ? dayjs(obj.completedTime).format('YYYY-MM')
        : obj.completedTime
    }
  })
}

// 获取年月
const getDate = () => {
  if (formData.value.completedTime) {
    return formData.value.completedTime
  } else {
    return `${dayjs().year()}-${dayjs().month() + 1}`
  }
}

const currentDate = ref<any>('')

onLoad((option: any) => {
  if (option) {
    commonParams.value = JSON.parse(option.params)
    const { type } = commonParams.value
    if (type === 'edit') {
      title.value = '房屋主体评估编辑'
      getLandlordDetail()
    } else if (type === 'add') {
      title.value = '新增房屋主体评估'
      currentDate.value = getDate()
    }
  }
})

/**
 *日期选择
 */
const bindDateChange = (e: any) => {
  formData.value.completedTime = e.detail.value
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
  const {
    newnessRate,
    landLegalArea,
    valuationPrice,
    landIllegalArea,
    illegalValuationPrice,
    illegalNewnessRate
  } = formData.value
  console.log(Number(newnessRate), Number(landLegalArea), Number(valuationPrice), Number(landIllegalArea), Number(illegalValuationPrice), Number(illegalNewnessRate), '数据')
  console.log(formData.value,'测试数据')
  // if (
  //   newnessRate &&
  //   landLegalArea &&
  //   valuationPrice &&landIllegalArea && illegalValuationPrice && illegalNewnessRate
  // ) {
    console.log('进入')
    return (
      Number(newnessRate) * Number(landLegalArea) * Number(valuationPrice) +
      Number(landIllegalArea) * Number(illegalValuationPrice) * Number(illegalNewnessRate)
    ).toFixed(2)
  // }
  // return '0'
})

//合法成新率
const handleInput = (newValue:any) => {
  // 将输入值转换为数字  
   console.log(newValue,'测试输入值')
  const value = parseFloat(newValue); 
      console.log(value,'测试值')  
      // 检查值是否在0到1之间（包含边界）  
      if (isNaN(value) || value < 0) {  
        formData.value.newnessRate = 0; // 如果不是数字或小于0，则设置为0  
      } else if (value > 1) {  
        formData.value.newnessRate = 1; // 如果大于1，则设置为1  
      } else {  
        formData.value.newnessRate = value; // 如果在范围内，则直接赋值  
      }  
  
      // 如果你希望限制小数位数，可以在这里做处理  
      // 例如，限制为两位小数  
  formData.value.newnessRate = parseFloat(formData.value.newnessRate.toFixed(2)); 
}
//不合法成新率
const handleInputNew = (newValue:any) => {
  // 将输入值转换为数字
   console.log(newValue,'测试输入值')
     
  const value = parseFloat(newValue);  
      console.log(value,'测试值')  
       
      // 检查值是否在0到1之间（包含边界）  
      if (isNaN(value) || value < 0) {  
        formData.value.illegalNewnessRate = 0; // 如果不是数字或小于0，则设置为0  
      } else if (value > 1) {  
        formData.value.illegalNewnessRate = 1; // 如果大于1，则设置为1    
      } else {  
        formData.value.illegalNewnessRate = value; // 如果在范围内，则直接赋值  
      }  
  
      // 如果你希望限制小数位数，可以在这里做处理  
      // 例如，限制为两位小数  
      formData.value.illegalNewnessRate = parseFloat(formData.value.illegalNewnessRate.toFixed(2)); 
}
// 表单提交
const submit = () => {
  const { uid, doorNo, type } = commonParams.value
  formData.value.valuationAmount = countPrice.value
  formData.value.compensationAmount = countPrice.value
  const params = {
    doorNo,
    ...formData.value,
    completedTime: formData.value.completedTime
      ? dayjs(formData.value.completedTime)
      : formData.value.completedTime
  }

  if (!formData.value.houseNo) {
    showToast('请输入幢号')
    return
  } else {
    if (type === 'add') {
      addImpLandlordHouseApi(uid, params)
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
      updateImpLandlordHouseApi(uid, params)
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
      .input-wrappers {
        display: flex;
        align-items: center;
        width: 200rpx;
        // border: 1px solid #d9d9d9;
        border-radius: 4px;

        &.focus {
          border-color: rgb(41, 121, 255);
        }

        .input-txt {
          width: 168rpx;
          height: 35px;
          // padding-left: 7rpx;
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
