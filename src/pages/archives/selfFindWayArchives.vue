<template>
  <view class="apartment-archives">
    <!-- 自谋出路档案上传 -->
    <view class="row">
      <view class="label"> <text class="red">*</text> 自谋出路凭证： </view>
      <view class="content">
        <uploadFiles
          v-model="findOneSelfPicStr"
          :file-list="findOneSelfPicStr"
          :limit="20"
          :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
          show-type="grid"
        />
      </view>
    </view>

    <view class="row">
      <view class="label"> 其他附件：</view>
      <view class="content">
        <uploadFiles
          v-model="findOneSelfOtherPicStr"
          :file-list="findOneSelfOtherPicStr"
          :limit="20"
          :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
          show-type="grid"
        />
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
const findOneSelfPicStr = ref<string>('[]') // 交房协议
const findOneSelfOtherPicStr = ref<string>('[]') // 其他附件

watch(
  () => props.immigrantDocumentation,
  (val) => {
    if (val) {
      const { findOneSelfPic, findOneSelfOtherPic } = val
      if (findOneSelfPic) {
        findOneSelfPicStr.value = findOneSelfPic
      }
      if (findOneSelfOtherPic) {
        findOneSelfOtherPicStr.value = findOneSelfOtherPic
      }
    }
  },
  { immediate: true, deep: true }
)

const submit = async () => {
  if (!findOneSelfPicStr.value || findOneSelfPicStr.value === '[]') {
    showToast('请上传自谋出路凭证')
    return
  } else {
    emit('submit', {
      findOneSelfPic: findOneSelfPicStr.value,
      findOneSelfOtherPic: findOneSelfOtherPicStr.value
    })
  }
}
</script>

<style lang="scss" scoped>
.apartment-archives {
  height: calc(100vh - 33rpx);
  padding: 6rpx;
  background-color: #fff;
  border-radius: 2rpx;
  box-sizing: border-box;

  .row {
    display: flex;
    padding: 5rpx 12rpx;
    margin-top: 9rpx;

    .label {
      width: 80rpx;
      font-size: 9rpx;
      color: #171718;
      text-align: right;

      .red {
        color: red;
      }
    }

    .content {
      flex: 1;
      display: flex;
      align-items: center;
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
