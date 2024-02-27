<template>
  <view class="form-wrapper">
    <uni-forms class="form">
      <view class="title-wrapper">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        <text>自建房档案上传</text>
      </view>

      <uni-row>
        <uni-col :span="24">
          <uni-forms-item
            label="自建房告知单："
            :label-width="150"
            label-align="right"
            name="buildOneselfPic"
          >
            <uploadFiles
              v-model="buildOneselfPic"
              :file-list="buildOneselfPic"
              :limit="20"
              :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
              show-type="grid"
            />
          </uni-forms-item>
        </uni-col>

        <uni-col :span="24">
          <uni-forms-item
            label="自建房验收告知单："
            :label-width="150"
            label-align="right"
            name="buildOneselfCheckPic"
          >
            <uploadFiles
              v-model="buildOneselfCheckPic"
              :file-list="buildOneselfCheckPic"
              :limit="20"
              :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
              show-type="grid"
            />
          </uni-forms-item>
        </uni-col>

        <uni-col :span="24">
          <uni-forms-item
            label="其他附件："
            :label-width="150"
            label-align="right"
            name="buildOneselfOtherPic"
          >
            <uploadFiles
              v-model="buildOneselfOtherPic"
              :file-list="buildOneselfOtherPic"
              :limit="20"
              :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
              show-type="grid"
            />
          </uni-forms-item>
        </uni-col>
      </uni-row>
    </uni-forms>

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
const buildOneselfPic = ref<string>('[]')
const buildOneselfCheckPic = ref<string>('[]')
const buildOneselfOtherPic = ref<string>('[]')

watch(
  () => props.immigrantDocumentation,
  (val) => {
    if (val) {
      buildOneselfPic.value = fmtPicUrl(val.buildOneselfPic)
      buildOneselfCheckPic.value = fmtPicUrl(val.buildOneselfCheckPic)
      buildOneselfOtherPic.value = fmtPicUrl(val.buildOneselfOtherPic)
    }
  },
  { immediate: true, deep: true }
)

const submit = async () => {
  // if (!buildOneselfPic.value || buildOneselfPic.value === '[]') {
  //   showToast('请上传自建房告知单')
  //   return
  // }
  // if (!buildOneselfCheckPic.value || buildOneselfCheckPic.value === '[]') {
  //   showToast('请上传自建房验收告知单')
  //   return
  // }
  emit('submit', {
    buildOneselfPic: buildOneselfPic.value,
    buildOneselfCheckPic: buildOneselfCheckPic.value,
    buildOneselfOtherPic: buildOneselfOtherPic.value
  })
}
</script>

<style lang="scss" scoped>
.form-wrapper {
  width: 100%;
  height: calc(100vh - 33rpx - 12rpx - var(--status-bar-height));
  padding: 6rpx;
  background-color: #fff;
  border-radius: 2rpx;
  box-sizing: border-box;

  .form {
    height: calc(100vh - 33rpx - 12rpx - 9rpx - var(--status-bar-height));
    padding: 0 0 9rpx 0;
    overflow-y: scroll;
    background-color: #fff;
    box-sizing: border-box;

    ::v-deep.uni-forms-item__label {
      font-size: 9rpx !important;
      color: rgba(23, 23, 24, 0.6) !important;
    }

    .title-wrapper {
      display: flex;
      width: 100%;
      height: 28rpx;
      margin-bottom: 9rpx;
      font-size: 9rpx;
      color: #171718;
      background: #fff;
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
