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
  </view>
</template>

<script lang="ts" setup>
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
</script>

<style lang="scss" scoped>
.attachment-upload-wrapper {
  width: 100%;
  overflow-y: scroll;
}
</style>
