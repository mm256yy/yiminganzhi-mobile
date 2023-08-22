<template>
  <view>
    <view class="common-head">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      <text>过渡安置档案上传</text>
    </view>

    <view class="arch-box">
      <view class="arch-item">
        <view class="arch-label"><text class="red">*</text> 过渡安置确认单：</view>
        <view class="arch-value">
          <uploadFiles
            :limit="20"
            show-type="grid"
            :file-list="pic1"
            :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
            v-model="pic1"
          />
        </view>
      </view>

      <view class="arch-item">
        <view class="arch-label">过渡安置协议：</view>
        <view class="arch-value">
          <uploadFiles
            :limit="20"
            show-type="grid"
            :file-list="pic1"
            :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
            v-model="pic1"
          />
        </view>
      </view>

      <view class="arch-item">
        <view class="arch-label">其他附件：</view>
        <view class="arch-value">
          <uploadFiles
            :limit="20"
            show-type="grid"
            :file-list="pic2"
            :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
            v-model="pic2"
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

interface PropsType {
  immigrantDocumentation: Partial<ImmigrantDocumentationType>
}

const props = defineProps<PropsType>()
const emit = defineEmits(['submit'])
const pic1 = ref<string>('[]')
const pic2 = ref<string>('[]')
const pic3 = ref<string>('[]')

watch(
  () => props.immigrantDocumentation,
  (val) => {
    if (val) {
      const { excessVerifyPic, excessAgreementPic, excessVerifyOtherPic } = val
      if (excessVerifyPic) {
        pic1.value = excessVerifyPic
      }
      if (excessAgreementPic) {
        pic2.value = excessAgreementPic
      }
      if (excessVerifyOtherPic) {
        pic3.value = excessVerifyOtherPic
      }
    }
  },
  { immediate: true, deep: true }
)

const submit = async () => {
  if (!pic1.value || pic1.value === '[]') {
    uni.showToast({
      title: '请上传确认单',
      icon: 'none'
    })
    return
  }
  emit('submit', {
    excessVerifyPic: pic1.value,
    excessAgreementPic: pic2.value,
    excessVerifyOtherPic: pic3.value
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
