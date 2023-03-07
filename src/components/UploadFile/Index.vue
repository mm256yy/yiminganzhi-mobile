<template>
  <view class="upload-file-wrapper">
    <uni-file-picker
      v-model="fileList"
      :title="title"
      :limit="limit"
      @select="select"
      @progress="progress"
      @success="success"
      @fail="fail"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  fileList: {
    type: Array as any,
    default: () => []
  },
  limit: {
    type: Number,
    default: 9
  }
})

const title = ref<string>(`最多选择${props.limit}张图片`)

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

<style></style>
