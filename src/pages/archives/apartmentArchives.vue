<template>
  <view class="apartment-archives">
    <!-- 公寓房档案上传 -->
    <view class="arch-box">
      <view class="arch-item">
        <view class="arch-label">交房协议：</view>
        <view class="arch-value">
          <uploadFiles
            v-model="flatAgreementPicStr"
            :file-list="flatAgreementPicStr"
            :limit="20"
            :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
            show-type="grid"
          />
        </view>
      </view>

      <view class="arch-item">
        <view class="arch-label"> <text class="red">*</text> 购房测算表： </view>
        <view class="arch-value">
          <uploadFiles
            v-model="flatMeasurementPicStr"
            :file-list="flatMeasurementPicStr"
            :limit="20"
            :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
            show-type="grid"
          />
        </view>
      </view>

      <view class="arch-item">
        <view class="arch-label"> 其他附件：</view>
        <view class="arch-value">
          <uploadFiles
            v-model="flatOtherPicStr"
            :file-list="flatOtherPicStr"
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
import { showToast } from '@/config/msg'
import uploadFiles from '@/components/UploadFile/index.vue'
import { ImmigrantDocumentationType } from '@/types/impDataFill'

interface PropsType {
  immigrantDocumentation: Partial<ImmigrantDocumentationType>
}

const props = defineProps<PropsType>()
const emit = defineEmits(['submit'])
const flatAgreementPicStr = ref<string>('[]') // 交房协议
const flatMeasurementPicStr = ref<string>('[]') // 购房测算表
const flatOtherPicStr = ref<string>('[]') // 其他附件

watch(
  () => props.immigrantDocumentation,
  (val) => {
    if (val) {
      const { flatAgreementPic, flatMeasurementPic, flatOtherPic } = val
      if (flatAgreementPic) {
        flatAgreementPicStr.value = flatAgreementPic
      }
      if (flatMeasurementPic) {
        flatMeasurementPicStr.value = flatMeasurementPic
      }
      if (flatOtherPic) {
        flatOtherPicStr.value = flatOtherPic
      }
    }
  },
  { immediate: true, deep: true }
)

const submit = async () => {
  if (!flatMeasurementPicStr.value || flatMeasurementPicStr.value === '[]') {
    showToast('请上传购房测算表')
    return
  } else {
    emit('submit', {
      flatAgreementPic: flatAgreementPicStr.value,
      flatMeasurementPic: flatMeasurementPicStr.value,
      flatOtherPic: flatOtherPicStr.value
    })
  }
}
</script>

<style lang="scss" scoped>
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
