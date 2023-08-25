<template>
  <!-- 集体资产处置方法（实施） -->
  <view class="asset-disposal-wrapper">
    <view class="title">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      集体资产处置方法
    </view>

    <view class="row">
      <uni-row class="m-t-10">
        <uni-col :span="12">
          <view class="col">
            <view class="label">凭证：</view>
            <view class="content">
              <upload-file
                v-model="collectiveAssetsPicStr"
                :file-list="collectiveAssetsPicStr"
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
      class="submit-btn"
      src="@/static/images/icon_edit.png"
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
