<template>
  <view>
    <view class="arch-box">
      <view class="arch-item">
        <view class="arch-label"><text class="red">*</text> 安置补偿登记卡照片：</view>
        <view class="arch-value">
          <uploadFiles
            v-model="compensationCardPicStr"
            :file-list="compensationCardPicStr"
            :limit="20"
            show-type="grid"
            :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
          />
        </view>
      </view>

      <view class="arch-item">
        <view class="arch-label">其他附件：</view>
        <view class="arch-value">
          <uploadFiles
            v-model="compensationCardOtherPicStr"
            :file-list="compensationCardOtherPicStr"
            :limit="20"
            show-type="grid"
            :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
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
const compensationCardPicStr = ref<string>('[]') // 坟墓确认单
const compensationCardOtherPicStr = ref<string>('[]') // 其他附件

watch(
  () => props.immigrantDocumentation,
  (val) => {
    if (val) {
      const { compensationCardPic, compensationCardOtherPic } = val
      if (compensationCardPic) {
        compensationCardPicStr.value = compensationCardPic
      }
      if (compensationCardOtherPic) {
        compensationCardOtherPicStr.value = compensationCardOtherPic
      }
    }
  },
  { immediate: true, deep: true }
)

const submit = async () => {
  if (!compensationCardPicStr.value || compensationCardPicStr.value === '[]') {
    uni.showToast({
      title: '请上传安置补偿登记卡照片',
      icon: 'none'
    })
    return
  }
  emit('submit', {
    compensationCardPic: compensationCardPicStr.value,
    compensationCardOtherPic: compensationCardOtherPicStr.value
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
      width: 100rpx;
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
