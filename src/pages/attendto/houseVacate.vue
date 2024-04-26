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
            <view class="content">
              <!-- {{ formatStr(dataInfo?.demographicList?.length) }} -->
              {{
                props.dataInfo.demographicList.filter(
                  (item: any) => item.name != '增计人口' && item.isDelete !== '1'
                ).length || 1
              }}
            </view>
          </view>
        </uni-col>
      </uni-row>

      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">迁出地址：</view>
            <view class="content">{{
              dataInfo.type == 'PeasantHousehold' || dataInfo.type == 'Village'
                ? (dataInfo.areaCodeText || '') +
                  (dataInfo.townCodeText || '') +
                  (dataInfo.villageCodeText || '')
                : formatStr(dataInfo.beforeAddress)
            }}</view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">联系方式：</view>
            <view class="content">{{ formatStr(dataInfo?.phone) }}</view>
          </view>
        </uni-col>
      </uni-row>

      <view class="title-wrapper">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        <text>房屋腾空办理情况</text>
      </view>

      <uni-row>
        <uni-col :span="24">
          <uni-forms-item
            required
            label="完成时间："
            :label-width="150"
            label-align="right"
            name="formData.houseEmptyDate"
          >
            <view class="picker-wrapper">
              <picker mode="date" :value="currentDate" :fields="'date'" @change="bindDateChange">
                <view :class="['uni-input', formData.houseEmptyDate ? '' : 'select']">
                  {{ formData.houseEmptyDate ? formData.houseEmptyDate : '请选择' }}
                </view>
              </picker>
            </view>
          </uni-forms-item>
        </uni-col>
      </uni-row>

      <uni-row>
        <uni-col :span="24">
          <uni-forms-item
            required
            :label="dataInfo?.type == 'Village' ? '村集体意见' : '移民户主意见'"
            :label-width="150"
            label-align="right"
            name="formData.houseEmptyOpinion"
          >
            <uni-easyinput
              v-model="formData.houseEmptyOpinion"
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
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { updateImpLandlordHouseEmptyApi } from '@/service'
import { ImmigrantHouseEmptyType } from '@/types/impDataFill'
import { formatStr } from '@/utils'
import { SUCCESS_MSG, showToast } from '@/config/msg'
import dayjs from 'dayjs'
import { LandlordType } from '@/types/sync'

interface PropsType {
  uid: string
  dataInfo: LandlordType
  immigrantHouseEmpty: ImmigrantHouseEmptyType
}

const props = defineProps<PropsType>()

const formData = ref<ImmigrantHouseEmptyType>({
  doorNo: props.dataInfo?.doorNo,
  status: 'implementation',
  isHouseEmpty: '',
  houseEmptyDate: '',
  houseEmptyOpinion: ''
})
const emit = defineEmits(['submit'])

// 获取年月日
const getDate = () => {
  if (formData.value.houseEmptyDate) {
    return formData.value.houseEmptyDate
  } else {
    return `${dayjs().year()}-${dayjs().month() + 1}-${dayjs().date()}`
  }
}

const currentDate = ref<any>('')

watch(
  () => props.immigrantHouseEmpty,
  (val: ImmigrantHouseEmptyType) => {
    if (val) {
      formData.value = {
        ...val,
        houseEmptyDate: val.houseEmptyDate
          ? dayjs(val.houseEmptyDate).format('YYYY-MM-DD')
          : getDate()
      }
      currentDate.value = val.houseEmptyDate
        ? dayjs(val.houseEmptyDate).format('YYYY-MM-DD')
        : getDate()
    }
  },
  { immediate: true, deep: true }
)

/**
 *日期选择
 */
const bindDateChange = (e: any) => {
  formData.value.houseEmptyDate = e.detail.value
}

const submit = async () => {
  if (!formData.value.houseEmptyDate) {
    showToast('请选择完成时间')
    return
  }
  if (!formData.value.houseEmptyOpinion) {
    showToast('请填写移民户主意见')
    return
  }

  const params: Partial<ImmigrantHouseEmptyType> = {
    ...formData.value,
    houseEmptyDate: formData.value.houseEmptyDate ? dayjs(formData.value.houseEmptyDate) : '',
    isHouseEmpty: '1'
  }
  const res = await updateImpLandlordHouseEmptyApi(props.uid, params)
  if (res) {
    // 更新相关手续
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
