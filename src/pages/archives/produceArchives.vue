<template>
  <view class="form-wrapper">
    <uni-forms class="form">
      <view class="title-wrapper">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        <text>生产安置档案上传</text>
      </view>

      <uni-row>
        <uni-col :span="24">
          <uni-forms-item
            required
            label="生产安置确认单（盖章/签字）："
            :label-width="150"
            label-align="right"
            name="produceVerifyPicStr"
          >
            <uploadFiles
              v-model="produceVerifyPicStr"
              :file-list="produceVerifyPicStr"
              :limit="20"
              :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
              show-type="grid"
            />
          </uni-forms-item>
        </uni-col>

        <uni-col :span="24">
          <uni-forms-item
            label="其他附件："
            :label-width="150"
            label-align="right"
            name="produceOtherPicStr"
          >
            <uploadFiles
              v-model="produceOtherPicStr"
              :file-list="produceOtherPicStr"
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
import uploadFiles from '@/components/UploadFile/index.vue'
import { ImmigrantDocumentationType } from '@/types/impDataFill'
import { fmtPicUrl } from '@/utils'

interface PropsType {
  immigrantDocumentation: Partial<ImmigrantDocumentationType>
}

const props = defineProps<PropsType>()
const emit = defineEmits(['submit'])
const produceVerifyPicStr = ref<string>('[]')
const produceOtherPicStr = ref<string>('[]')

watch(
  () => props.immigrantDocumentation,
  (val) => {
    if (val) {
      const { produceVerifyPic, produceOtherPic } = val
      produceVerifyPicStr.value = fmtPicUrl(produceVerifyPic)
      produceOtherPicStr.value = fmtPicUrl(produceOtherPic)
    }
  },
  { immediate: true, deep: true }
)

const submit = async () => {
  if (!produceVerifyPicStr.value || produceVerifyPicStr.value === '[]') {
    uni.showToast({
      title: '请上传确认单',
      icon: 'none'
    })
    return
  }
  emit('submit', {
    produceVerifyPic: produceVerifyPicStr.value,
    produceOtherPic: produceOtherPicStr.value
  })
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
