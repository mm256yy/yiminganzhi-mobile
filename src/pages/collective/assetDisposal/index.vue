<template>
  <!-- 集体资产处置方法（实施） -->
  <view class="asset-disposal-wrapper">
    <view class="title-wrapper">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      集体资产处置方法凭证
    </view>

    <upload-file
      v-model="collectiveAssetsPicStr"
      :file-list="collectiveAssetsPicStr"
      :limit="20"
      show-type="list"
      :accepts="['.jpg', '.png']"
    />

    <image
      class="submit-btn"
      src="@/static/images/icon_submit.png"
      mode="scaleToFill"
      @click="submit"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { updateImpLandlordDocumentationApi } from '@/service'
import UploadFile from '@/components/UploadFile/index.vue'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'

interface PropsType {
  dataInfo: any
  uid: string
}

const props = defineProps<PropsType>()
const collectiveAssetsPicStr = ref<string>('[]') // 评估报告照片
const emit = defineEmits(['updateData'])

watch(
  () => props.dataInfo,
  (val) => {
    if (val) {
      const { collectiveAssetsPic } = val
      if (collectiveAssetsPic) {
        collectiveAssetsPicStr.value = collectiveAssetsPic ? collectiveAssetsPic : '[]'
      }
    }
  },
  { immediate: true, deep: true }
)

// 更新档案数据
const submit = () => {
  let params = {
    ...props.dataInfo,
    collectiveAssetsPic: collectiveAssetsPicStr.value
  }
  updateImpLandlordDocumentationApi(props.uid, params)
    .then((res: any) => {
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
.asset-disposal-wrapper {
  width: 100%;
  overflow-y: scroll;

  .title-wrapper {
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
