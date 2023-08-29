<template>
  <view>
    <view class="common-head">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      <text>农业安置档案上传</text>
    </view>

    <view class="arch-box">
      <view class="arch-item">
        <view class="arch-label"><text class="red">*</text> 农业安置凭证：</view>
        <view class="arch-value">
          <uploadFiles
            v-model="agriculturePicStr"
            :file-list="agriculturePicStr"
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
            v-model="agricultureOtherPicStr"
            :file-list="agricultureOtherPicStr"
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
import { showToast } from '@/config/msg'

interface PropsType {
  immigrantDocumentation: Partial<ImmigrantDocumentationType>
}

const props = defineProps<PropsType>()
const emit = defineEmits(['submit'])
const agriculturePicStr = ref<string>('[]')
const agricultureOtherPicStr = ref<string>('[]')

watch(
  () => props.immigrantDocumentation,
  (val) => {
    if (val) {
      const { agriculturePic, agricultureOtherPic } = val
      agriculturePicStr.value = fmtPicUrl(agriculturePic)
      agricultureOtherPicStr.value = fmtPicUrl(agricultureOtherPic)
    }
  },
  { immediate: true, deep: true }
)

const submit = async () => {
  if (!agriculturePicStr.value || agriculturePicStr.value === '[]') {
    showToast('请上传确认单')
    return
  }
  emit('submit', {
    agriculturePic: agriculturePicStr.value,
    agricultureOtherPic: agricultureOtherPicStr.value
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
