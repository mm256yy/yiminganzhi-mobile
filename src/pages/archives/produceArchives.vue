<template>
  <view>
    <view class="common-head">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      <text>生产安置档案上传</text>
    </view>

    <view class="arch-box">
      <view class="arch-item">
        <view class="arch-label"><text class="red">*</text> 生产安置确认单：</view>
        <view class="arch-value">
          <uploadFiles
            v-model="produceVerifyPicStr"
            :file-list="produceVerifyPicStr"
            :limit="20"
            :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
            show-type="grid"
          />
        </view>
      </view>

      <view class="arch-item">
        <view class="arch-label">其他附件：</view>
        <view class="arch-value">
          <uploadFiles
            v-model="produceOtherPicStr"
            :file-list="produceOtherPicStr"
            :limit="20"
            :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
            show-type="grid"
          />
        </view>
      </view>
    </view>

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
.common-head {
  display: flex;
  width: 100%;
  height: 28rpx;
  margin-top: 9rpx;
  font-size: 9rpx;
  font-weight: 500;
  color: #171718;
  background: #ffffff;
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

.arch-box {
  .arch-item {
    display: flex;
    padding: 5rpx 12rpx;
    margin-top: 9rpx;

    .arch-label {
      width: 80rpx;
      font-size: 9rpx;
      color: #171718;
      text-align: right;

      .red {
        color: red;
      }
    }

    .arch-value {
      flex: 1;
      display: flex;
      align-items: center;
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
</style>
