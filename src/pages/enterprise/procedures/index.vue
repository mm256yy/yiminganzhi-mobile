<template>
  <!-- 相关手续（实施） -->
  <view class="procedures-wrapper">
    <view class="title">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      上传说明：请将上传的图片进行文字命名，图片为 jpg、png 格式且图片大小需小于5M
    </view>

    <view class="row">
      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">凭证：</view>
            <view class="content">
              <upload-file
                v-model="proceduresPicStr"
                :file-list="proceduresPicStr"
                :limit="20"
                show-type="grid"
                :accepts="['.jpg', '.png']"
              />
            </view>
          </view>
        </uni-col>
      </uni-row>
    </view>

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

  .title {
    display: flex;
    height: 28rpx;
    margin-bottom: 9rpx;
    font-size: 9rpx;
    color: #171718;
    align-items: center;
    flex: 1;
    border-bottom: 1rpx solid #f0f0f0;

    .icon {
      width: 10rpx;
      height: 10rpx;
      margin-left: 6rpx;
    }
  }

  .row {
    padding: 5rpx 12rpx 12rpx 0;
    box-sizing: border-box;

    .col {
      display: flex;
      flex-direction: row;

      .label {
        width: 90rpx;
        height: 16rpx;
        margin-left: 9rpx;
        font-size: 9rpx;
        line-height: 16rpx;
        color: rgba(23, 23, 24, 0.6);
      }

      .content {
        font-size: 9rpx;
        line-height: 16rpx;
        color: #171718;

        &.blue {
          color: #3e73ec;
        }
      }
    }

    .line {
      width: 100%;
      height: 1rpx;
      margin: 9rpx 0;
      background: #ebebeb;
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
