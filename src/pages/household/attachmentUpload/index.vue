<template>
  <view class="attachment-upload-wrapper">
    <uni-file-picker
      title="最多选择20张图片"
      :limit="20"
      @select="select"
      @progress="progress"
      @success="success"
      @fail="fail"
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
import { updateLandlordImmigrantFileApi } from '@/service'

const props = defineProps({
  dataInfo: {
    type: Object as any,
    default: () => {}
  }
})

// 获取上传状态
const select = (e: any) => {
  console.log('选择文件：', e)
}

// 获取上传进度
const progress = (e: any) => {
  console.log('上传进度：', e)
}

// 上传成功
const success = (e: any) => {
  console.log('上传成功')
}

// 上传失败
const fail = (e: any) => {
  console.log('上传失败：', e)
}

// 表单提交
const submit = () => {
  const otherPic = ''
  const params = {
    id: props.dataInfo.id,
    uid: props.dataInfo.uid,
    doorNo: props.dataInfo.doorNo,
    householdId: props.dataInfo.householdId,
    otherPic
  }
  updateLandlordImmigrantFileApi(props.dataInfo.uid, params).then((res) => {
    console.log('res:', res)
  })
}
</script>

<style lang="scss" scoped>
.attachment-upload-wrapper {
  width: 100%;
  overflow-y: scroll;

  .submit-btn {
    position: fixed;
    right: 6rpx;
    bottom: 6rpx;
    width: 66rpx;
    height: 66rpx;
    border-radius: 50%;
  }
}
</style>
