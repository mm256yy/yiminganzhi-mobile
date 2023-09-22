<template>
  <view class="form-wrapper">
    <uni-forms class="form" ref="form" :modelValue="formData">
      <view class="title-wrapper">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        <text>家庭情况</text>
      </view>

      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">户主姓名：</view>
            <view class="content">{{ formatStr(dataInfo?.name) }}</view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">户内人口：</view>
            <view class="content"> {{ formatStr(dataInfo?.demographicList?.length) }} </view>
          </view>
        </uni-col>
      </uni-row>

      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">迁出地址：</view>
            <view class="content">{{ formatStr(dataInfo?.address) }}</view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">联系方式：</view>
            <view class="content"> {{ formatStr(dataInfo?.phone) }} </view>
          </view>
        </uni-col>
      </uni-row>

      <view class="title-wrapper">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        <text>过渡去向情况</text>
      </view>

      <uni-row>
        <uni-col :span="24">
          <uni-forms-item
            required
            label="过渡安置地详址："
            :label-width="150"
            label-align="right"
            name="formData.excessAddress"
          >
            <uni-easyinput
              v-model="formData.excessAddress"
              type="textarea"
              :maxlength="50"
              placeholder="请输入(50字以内)"
            />
          </uni-forms-item>
        </uni-col>
      </uni-row>

      <uni-row>
        <uni-col :span="24">
          <uni-forms-item
            required
            label="过渡开始日期："
            :label-width="150"
            label-align="right"
            name="formData.excessStartDate"
          >
            <view class="picker-wrapper">
              <picker
                mode="date"
                :value="currentStartDate"
                :fields="'date'"
                @change="bindStartDateChange"
              >
                <view :class="['uni-input', formData.excessStartDate ? '' : 'select']">
                  {{ formData.excessStartDate ? formData.excessStartDate : '请选择' }}
                </view>
              </picker>
            </view>
          </uni-forms-item>
        </uni-col>
      </uni-row>

      <uni-row>
        <uni-col :span="24">
          <uni-forms-item
            label="过渡结束日期："
            :label-width="150"
            label-align="right"
            name="formData.excessEndDate"
          >
            <view class="picker-wrapper">
              <picker
                mode="date"
                :value="currentEndDate"
                :fields="'date'"
                @change="bindEndDateChange"
              >
                <view :class="['uni-input', formData.excessEndDate ? '' : 'select']">
                  {{ formData.excessEndDate ? formData.excessEndDate : '请选择' }}
                </view>
              </picker>
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
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import dayjs from 'dayjs'
import { formatStr } from '@/utils'
import { SUCCESS_MSG, showToast } from '@/config/msg'
import { updateImpLandlordExcessApi } from '@/service'
import { ImmigrantExcessType } from '@/types/impDataFill'
import { LandlordType } from '@/types/sync'

interface PropsType {
  uid: string
  dataInfo: LandlordType
  immigrantExcess: ImmigrantExcessType
}

const props = defineProps<PropsType>()

const formData = ref<ImmigrantExcessType>({
  doorNo: props.dataInfo?.doorNo,
  isExcess: '',
  excessStartDate: '',
  excessEndDate: '',
  excessAddress: ''
})

const currentStartDate = ref<any>('')
const currentEndDate = ref<any>('')
const emit = defineEmits(['submit'])

watch(
  () => props.immigrantExcess,
  (val) => {
    if (val) {
      // 基本信息
      const { excessStartDate, excessEndDate } = val
      formData.value = {
        ...val,
        excessStartDate: excessStartDate ? dayjs(excessStartDate).format('YYYY-MM-DD') : '',
        excessEndDate: excessEndDate ? dayjs(excessEndDate).format('YYYY-MM-DD') : ''
      }

      if (excessStartDate) {
        currentStartDate.value = dayjs(excessStartDate).format('YYYY-MM-DD')
      }
      if (excessEndDate) {
        currentEndDate.value = dayjs(excessEndDate).format('YYYY-MM-DD')
      }
    }
  },
  { immediate: true, deep: true }
)

/**
 *日期选择
 */
const bindStartDateChange = (e: any) => {
  formData.value.excessStartDate = e.detail.value
}

/**
 *日期选择
 */
const bindEndDateChange = (e: any) => {
  formData.value.excessEndDate = e.detail.value
}

const submit = async () => {
  if (!formData.value.excessAddress) {
    showToast('请填写过渡安置地详细地址')
    return
  }
  if (!formData.value.excessStartDate) {
    showToast('请选择开始日期')
    return
  }
  if (
    formData.value.excessStartDate &&
    formData.value.excessEndDate &&
    dayjs(formData.value.excessStartDate).valueOf() > dayjs(formData.value.excessEndDate).valueOf()
  ) {
    showToast('开始日期不得大于结束日期')
    return
  }
  const params: Partial<ImmigrantExcessType> = {
    ...formData.value,
    excessStartDate: formData.value.excessStartDate ? dayjs(formData.value.excessStartDate) : '',
    excessEndDate: formData.value.excessEndDate ? dayjs(formData.value.excessEndDate) : '',
    isExcess: '1'
  }
  const res = await updateImpLandlordExcessApi(props.uid, params)
  if (res) {
    showToast(SUCCESS_MSG)
    emit('submit')
  }
}
</script>

<style lang="scss" scoped>
.form-wrapper {
  width: 100%;
  height: calc(100vh - 33rpx - 12rpx - var(--status-bar-height));
  padding: 6rpx;
  background-color: #fff;
  border-radius: 2rpx;
  box-sizing: border-box;

  .form {
    height: calc(100vh - 33rpx - 12rpx - 9rpx - var(--status-bar-height));
    padding: 0 0 9rpx 0;
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

    .title-wrapper {
      display: flex;
      width: 100%;
      height: 28rpx;
      margin-bottom: 9rpx;
      font-size: 9rpx;
      color: #171718;
      background: #fff;
      border-bottom: 1rpx solid #f0f0f0;
      border-radius: 5rpx 5rpx 0px 0px;
      flex-direction: row;
      align-items: center;

      .icon {
        width: 10rpx;
        height: 10rpx;
        margin-right: 6rpx;
      }
    }

    .col {
      display: flex;
      align-items: center;
      flex-direction: row;
      height: 23rpx;

      .label {
        width: 100rpx;
        height: 23rpx;
        margin-right: 9rpx;
        font-size: 9rpx;
        color: rgba(23, 23, 24, 0.6);
        text-align: right;
      }

      .content {
        height: 23rpx;
        font-size: 9rpx;
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
</style>
