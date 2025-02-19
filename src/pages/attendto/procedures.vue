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
            name="formData.completeDate"
          >
            <view class="picker-wrapper">
              <picker mode="date" :value="currentDate" :fields="'date'" @change="bindDateChange">
                <view :class="['uni-input', formData.completeDate ? '' : 'select']">
                  {{ formData.completeDate ? formData.completeDate : '请选择' }}
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
            label="相关凭证："
            :label-width="150"
            label-align="right"
            name="formData.completePic"
          >
            <uploadFiles
              v-model="completePicStr"
              :file-list="completePicStr"
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
import { ref, watch } from 'vue'
import dayjs from 'dayjs'
import { SUCCESS_MSG, showToast } from '@/config/msg'
import { fmtPicUrl } from '@/utils'
import { updateImpLandlordProceduresApi } from '@/service'
import { ImmigrantProceduresType } from '@/types/impDataFill'
import uploadFiles from '@/components/UploadFile/index.vue'

interface PropsType {
  uid: string
  itemUid: string
  immigrantProceduresList: ImmigrantProceduresType[]
}

const props = defineProps<PropsType>()

const formData = ref<ImmigrantProceduresType>({
  completeDate: '',
  completePic: '',
  needHandle: '',
  isComplete: ''
})

const completePicStr = ref<string>('[]')
const currentDate = ref<any>('')
const emit = defineEmits(['submit'])

watch(
  () => props.immigrantProceduresList,
  (val) => {
    if (val) {
      const procedures = val.find((item) => item.uid === props.itemUid)
      if (procedures) {
        const { completePic, completeDate } = procedures
        currentDate.value = completeDate ? dayjs(completeDate).format('YYYY-MM-DD') : ''
        completePicStr.value = fmtPicUrl(completePic)
      }
    }
  },
  { immediate: true, deep: true }
)

/**
 *日期选择
 */
const bindDateChange = (e: any) => {
  formData.value.completeDate = e.detail.value
}

const submit = async () => {
  if (!formData.value.completeDate) {
    showToast('请选择完成时间')
    return
  }
  if (!completePicStr.value || completePicStr.value === '[]') {
    showToast('请上传相关凭证')
    return
  }
  const params = {
    completeDate: formData.value.completeDate ? dayjs(formData.value.completeDate) : '',
    completePic: completePicStr.value,
    needHandle: '1', // 是否需要办理：0 不需要，1 需要
    isComplete: '1'
  }
  const res = await updateImpLandlordProceduresApi(props.uid, props.itemUid, params)
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
