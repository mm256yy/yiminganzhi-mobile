<template>
  <view class="form-wrapper">
    <Back :title="title" />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="设施（设备）名称"
              :label-width="150"
              label-align="right"
              name="formData.facilitiesName"
            >
              <uni-easyinput v-model="formData.facilitiesName" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="设施（设备）类别"
              :label-width="150"
              label-align="right"
              name="formData.facilitiesType"
            >
              <uni-data-select v-model="formData.facilitiesType" :localdata="dict[236]" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="设施（设备）编码"
              :label-width="150"
              label-align="right"
              name="formData.facilitiesCode"
            >
              <!-- <uni-easyinput v-model="formData.facilitiesCode" placeholder="请输入" /> -->
              <view
                v-if="commonParams.type == 'add'"
                :class="['code-wrapper', focusIndex === 1 ? 'focus' : '']"
              >
                <view class="pre-txt">
                  {{ commonParams.doorNo ? 'SS' + commonParams.doorNo.replace('JT', '') : '' }}
                </view>
                <input
                  class="input-txt"
                  type="number"
                  placeholder="请输入"
                  :maxlength="4"
                  v-model="formData.suffixNo"
                  @focus="inputFocus(1)"
                  @blur="inputBlur"
                />
              </view>
              <view v-else class="code-wrapper">
                <input class="input-txt disabled" v-model="formData.facilitiesCode" disabled />
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="职工人数"
              :label-width="150"
              label-align="right"
              name="formData.workersNum"
            >
              <view :class="['input-wrapper', focusIndex === 1 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.workersNum"
                  @focus="inputFocus(1)"
                  @blur="inputBlur"
                />
                <view class="unit">人</view>
              </view>
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
              required
              label="所在位置"
              :label-width="150"
              label-align="right"
              name="formData.locationType"
            >
              <uni-data-select
                v-model="formData.locationType"
                :localdata="dict[326]"
                @change="change"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="淹没范围"
              :label-width="150"
              label-align="right"
              name="formData.inundationRang"
            >
              <uni-data-select v-model="formData.inundationRang" :localdata="dict[346]" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="主管单位"
              :label-width="150"
              label-align="right"
              name="formData.competentUnit"
            >
              <uni-easyinput v-model="formData.competentUnit" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="建成年月"
              :label-width="150"
              label-align="right"
              name="formData.completedTime"
            >
              <view class="picker-wrapper">
                <picker mode="date" :value="currentDate" :fields="'month'" @change="bindDateChange">
                  <view :class="['uni-input', formData.completedTime ? '' : 'select']">
                    {{ formData.completedTime ? formData.completedTime : '选择年月' }}
                  </view>
                </picker>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="规模"
              :label-width="150"
              label-align="right"
              name="formData.scopes"
            >
              <uni-easyinput v-model="formData.scopes" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="效益"
              :label-width="150"
              label-align="right"
              name="formData.benefit"
            >
              <uni-easyinput v-model="formData.benefit" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="固定资产原值"
              :label-width="150"
              label-align="right"
              name="formData.cost"
            >
              <view :class="['input-wrapper', focusIndex === 2 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.cost"
                  @focus="inputFocus(2)"
                  @blur="inputBlur"
                />
                <view class="unit">万元</view>
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="固定资产净值"
              :label-width="150"
              label-align="right"
              name="formData.netBal"
            >
              <view :class="['input-wrapper', focusIndex === 3 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.netBal"
                  @focus="inputFocus(3)"
                  @blur="inputBlur"
                />
                <view class="unit">万元</view>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="高程"
              :label-width="150"
              label-align="right"
              name="formData.altitude"
            >
              <view :class="['input-wrapper', focusIndex === 4 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.altitude"
                  @focus="inputFocus(4)"
                  @blur="inputBlur"
                />
                <view class="unit">米</view>
              </view>
            </uni-forms-item>
          </uni-col>

          <uni-col :span="12">
            <uni-forms-item
              label="具体位置"
              :label-width="150"
              label-align="right"
              name="formData.specificLocation"
            >
              <uni-easyinput v-model="formData.specificLocation" placeholder="请输入" />
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
        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              label="设施（设备）照片"
              :label-width="150"
              label-align="right"
              name="formData.facilitiesPic"
              required
            >
              <upload-file
                v-model="formData.facilitiesPic"
                :file-list="formData.facilitiesPic"
                :limit="20"
                show-type="list"
                :accepts="['.jpg', '.png']"
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
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import dayjs from 'dayjs'
import { addLandlordFacilitiesApi, updateLandlordFacilitiesApi } from '@/service'
import { routerBack, getStorage, StorageKey, formatNum, fmtPicUrl, setlocationType } from '@/utils'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config'
import Back from '@/components/Back/Index.vue'
import UploadFile from '@/components/UploadFile/index.vue'

// 表单数据
const formData = ref<any>({})

// 获得焦点的 input 框下标
const focusIndex = ref<number>(-1)
const title = ref<string>('')
const commonParams = ref<any>({})

// 获取数据字典
const dict = getStorage(StorageKey.DICT)

// 获取年月
const getDate = () => {
  if (formData.value.birthday) {
    return formData.value.birthday
  } else {
    return `${dayjs().year()}-${dayjs().month() + 1}`
  }
}

const currentDate = ref<any>('')

// 获取上个页面传递的参数，给表单赋值
onLoad((option: any) => {
  if (option) {
    commonParams.value = JSON.parse(option.commonParams)
    let params = JSON.parse(option.params)
    formData.value = { ...params, formData: '' }
    console.log(formData.value, 'params')
    currentDate.value = getDate()
    if (commonParams.value.type === 'edit') {
      title.value = '农村小型专项及农副业设施信息编辑'
    } else if (commonParams.value.type === 'add') {
      console.log(commonParams.value.doorNo, '测试户号数据')
      title.value = '添加农村小型专项及农副业设施'
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
 * 建成年月选择
 * @param{Object} e
 */
const bindDateChange = (e: any) => {
  formData.value.completedTime = e.detail.value
}
let change = (e: any) => {
  formData.value.inundationRang = setlocationType(e)
}
// 表单提交
const submit = () => {
  const { type, uid, doorNo } = commonParams.value
  const params = {
    doorNo,
    ...formData.value,
    number: formData.value.number ? Number(formData.value.number) : null,
    benefit: formData.value.benefit ? Number(formatNum(formData.value.benefit)) : null,
    cost: formData.value.cost ? Number(formatNum(formData.value.cost)) : null,
    netBal: formData.value.netBal ? Number(formatNum(formData.value.netBal)) : null,
    originalInvest: formData.value.originalInvest
      ? Number(formatNum(formData.value.originalInvest))
      : null,
    workersNum: formData.value.workersNum ? Number(formData.value.workersNum) : null,
    completedTime: formData.value.completedTime ? dayjs(formData.value.completedTime) : null,
    facilitiesPic: fmtPicUrl(formData.value.facilitiesPic),
    facilitiesCode: 'SS' + commonParams.value.doorNo.replace('JT', '') + formData.value.suffixNo,
    suffixNo: formData.value.suffixNo
  }
  console.log(params, '测试传输数据')
  if (!formData.value.facilitiesName) {
    showToast('请输入设备名称')
    return
  } else if (!formData.value.facilitiesType) {
    showToast('请输入设施类别')
    return
  } else if (!formData.value.suffixNo) {
    showToast('设施（设备）编码不全')
    return
  } else if (!formData.value.number) {
    showToast('请输入数量')
    return
  } else if (!formData.value.unit) {
    showToast('请输入单位')
    return
  } else if (!formData.value.locationType) {
    showToast('请输入所在位置')
    return
  } else if (!formData.value.inundationRang) {
    showToast('请输入淹没范围')
    return
  } else if (formData.value.facilitiesPic.length==2) {
    showToast('请上传设施设备照片')
    return
  }
  if (type === 'add') {
    addLandlordFacilitiesApi(uid, params)
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
    updateLandlordFacilitiesApi(uid, params)
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
      .code-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 200rpx;
        border: 1px solid #d9d9d9;
        border-radius: 4px;

        &.focus {
          border-color: rgb(41, 121, 255);
        }

        .pre-txt {
          width: 104rpx;
          height: 35px;
          padding-left: 7rpx;
          font-size: 9rpx;
          line-height: 35px;
          color: #171718;
          background-color: #f5f7fa;
          border-right: 1px solid #d9d9d9;
        }

        .input-txt {
          width: 84rpx;
          height: 35px;
          padding-left: 11rpx;
          font-size: 9rpx;
          line-height: 35px;
          color: #171718;

          &.disabled {
            width: 200rpx;
            background-color: #f5f7fa;
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
