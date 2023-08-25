<template>
  <!-- 相关手续（实施） -->
  <view class="procedures-wrapper">
    <view class="title-wrapper">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      上传说明：请将上传的图片进行文字命名，图片为 jpg、png 格式且图片大小需小于5M
    </view>

    <upload-file
      v-model="proceduresPicStr"
      :file-list="proceduresPicStr"
      :limit="20"
      show-type="list"
      :accepts="['.jpg', '.png']"
    />

    <image
      class="btn submit"
      src="@/static/images/icon_submit.png"
      mode="scaleToFill"
      @click="submit"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { fmtPicUrl } from '@/utils'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import { updateImpLandlordDocumentationApi } from '@/service'
import UploadFile from '@/components/UploadFile/index.vue'

interface PropsType {
  uid: string
  dataInfo: any
}

const props = defineProps<PropsType>()
const emit = defineEmits(['updateData'])

const proceduresPicStr = ref<string>('[]') // 户主照片

watch(
  () => props.dataInfo,
  (val) => {
    if (val) {
      const { proceduresPic } = val
      if (proceduresPic) {
        proceduresPicStr.value = fmtPicUrl(proceduresPic)
      }
    }
  },
  { immediate: true, deep: true }
)

const submit = () => {
  const params: any = {
    ...props.dataInfo,
    proceduresPic: proceduresPicStr.value
  }
  updateImpLandlordDocumentationApi(props.uid, params)
    .then((res) => {
      if (res) {
        showToast(SUCCESS_MSG)
        emit('updateData')
      }
    })
    .catch(() => {
      showToast(ERROR_MSG)
    })
}
</script>

<style lang="scss" scoped>
.procedures-wrapper {
  width: 100%;
  overflow-y: scroll;

  .title-wrapper {
    display: flex;
    width: 100%;
    height: 28rpx;
    margin-top: 9rpx;
    font-size: 9rpx;
    font-weight: 500;
    color: #171718;
    background: #ffffff;
    border-radius: 5rpx 5rpx 0px 0px;
    flex-direction: row;
    align-items: center;

    .icon {
      width: 10rpx;
      height: 10rpx;
      margin-right: 6rpx;
    }
  }

  .btn {
    position: fixed;
    right: 25rpx;
    width: 28rpx;
    height: 28rpx;
    border-radius: 50%;

    &.submit {
      bottom: 16rpx;
    }
  }
}
</style>
