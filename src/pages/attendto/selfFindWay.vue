<template>
  <view class="form-wrapper">
    <uni-forms class="form" ref="form" :modelValue="formData">
      <view class="title-wrapper">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        <text>办理信息</text>
      </view>

      <uni-row>
        <uni-col :span="24">
          <uni-forms-item
            required
            label="完成时间："
            :label-width="150"
            label-align="right"
            name="formData.selfSeekingDate"
          >
            <view class="picker-wrapper">
              <picker mode="date" :value="currentDate" :fields="'date'" @change="bindDateChange">
                <view :class="['uni-input', formData.selfSeekingDate ? '' : 'select']">
                  {{ formData.selfSeekingDate ? formData.selfSeekingDate : '请选择' }}
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
            label="自谋出路凭证："
            :label-width="150"
            label-align="right"
            name="formData.selfSeekingPic"
          >
            <uploadFiles
              v-model="selfSeekingPicStr"
              :file-list="selfSeekingPicStr"
              :limit="20"
              :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
              show-type="grid"
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
import { ref, onMounted } from 'vue'
import uploadFiles from '@/components/UploadFile/index.vue'
import { getImpLandlordItemApi, updateImpLandlordImmigrantSelfSeekingApi } from '@/service'
import dayjs from 'dayjs'
import { fmtPicUrl } from '@/utils'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'

interface PropsType {
  uid: string
}

const props = defineProps<PropsType>()
const formData = ref<any>({})
const emit = defineEmits(['submit'])
const currentDate = ref<string>('')
const selfSeekingPicStr = ref<string>('[]')

/**
 * 获取业主详情
 * @param(object) uid
 */
const getLandlordDetail = () => {
  const { uid } = props
  getImpLandlordItemApi(uid).then((res: any) => {
    if (res) {
      formData.value = {
        ...res.immigrantSelfSeeking,
        selfSeekingPic: fmtPicUrl(res.immigrantSelfSeeking?.selfSeekingPic),
        selfSeekingDate: res.immigrantSelfSeeking?.selfSeekingDate
          ? dayjs(res.immigrantSelfSeeking?.selfSeekingDate).format('YYYY-MM-DD')
          : ''
      }
      currentDate.value = res.immigrantSelfSeeking?.selfSeekingDate
        ? dayjs(res.immigrantSelfSeeking?.selfSeekingDate).format('YYYY-MM-DD')
        : ''
      selfSeekingPicStr.value = fmtPicUrl(res.immigrantSelfSeeking?.selfSeekingPic)
    }
  })
}

/**
 *日期选择
 */
const bindDateChange = (e: any) => {
  formData.value.selfSeekingDate = e.detail.value
}

const submit = async () => {
  if (!formData.value.selfSeekingDate) {
    showToast('请选择完成时间')
    return
  } else if (!selfSeekingPicStr.value || selfSeekingPicStr.value === '[]') {
    showToast('请上传自谋出路凭证')
    return
  } else {
    const { uid } = props
    const params = {
      ...formData.value,
      selfSeekingPic: selfSeekingPicStr.value,
      selfSeekingDate: formData.value.selfSeekingDate ? dayjs(formData.value.selfSeekingDate) : ''
    }
    updateImpLandlordImmigrantSelfSeekingApi(uid, params)
      .then((res: any) => {
        if (res) {
          showToast(SUCCESS_MSG)
          emit('submit')
        }
      })
      .catch(() => {
        showToast(ERROR_MSG)
      })
  }
}

onMounted(() => {
  getLandlordDetail()
})
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
