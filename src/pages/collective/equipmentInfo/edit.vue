<template>
  <view class="form-wrapper">
    <Back :title="title" />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="设备名称"
              :label-width="150"
              label-align="right"
              name="formData.facilitiesName"
            >
              <uni-easyinput v-model="formData.facilitiesName" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="设施类别"
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
              label="设施编码"
              :label-width="150"
              label-align="right"
              name="formData.facilitiesCode"
            >
              <uni-easyinput v-model="formData.facilitiesCode" placeholder="请输入" />
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
              label="所在位置"
              :label-width="150"
              label-align="right"
              name="formData.locationType"
            >
              <uni-data-select v-model="formData.locationType" :localdata="locationTypes" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="具体位置"
              :label-width="150"
              label-align="right"
              name="formData.address"
            >
              <uni-easyinput v-model="formData.address" placeholder="请输入" />
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
              <uni-datetime-picker
                type="date"
                placeholder="选择年份"
                v-model="formData.completedTime"
              />
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
import { addLandlordFacilitiesApi, updateLandlordFacilitiesApi } from '@/service'
import { routerBack, getStorage, StorageKey } from '@/utils'
import { locationTypes, ERROR_MSG, SUCCESS_MSG, showToast } from '@/config'
import Back from '@/components/Back/Index.vue'

// 表单数据
const formData = ref<any>({})

// 获得焦点的 input 框下标
const focusIndex = ref<number>(-1)
const title = ref<string>('')
const commonParams = ref<any>({})

// 获取数据字典
const dict = getStorage(StorageKey.DICT)

// 获取上个页面传递的参数，给表单赋值
onLoad((option: any) => {
  if (option) {
    commonParams.value = JSON.parse(option.commonParams)
    let params = JSON.parse(option.params)
    formData.value = { ...params }
    if (commonParams.value.type === 'edit') {
      title.value = '农村小型专项及农副业设施信息编辑'
    } else if (commonParams.value.type === 'add') {
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

// 表单提交
const submit = () => {
  const { type, uid, doorNo, householdId } = commonParams.value
  const params = {
    doorNo,
    householdId,
    ...formData.value,
    completedTime: formData.value.completedTime
      ? dayjs(formData.value.completedTime)
      : formData.value.completedTime
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
