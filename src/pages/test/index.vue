<template>
  <view class="upload-wrapper">
    <!-- upload-file
      title="最多选择20张图片"
      mode="list"
      :limit="20"
      @select="selectOtherPic"
      @progress="otherPicProgress"
      @success="otherPicSuccess"
      @fail="otherPicFail"
			@update-files-list="updateFilesList"
    /> -->
  </view>

  <view @click="uploadImg">选择图片</view>
</template>

<script lang="ts" setup>
// import { batchUploadImg } from '@/service'
// import UploadFile from '@/components/UploadFile/uni-file-picker.vue'

// 获取人口其他照片上传状态
// const selectOtherPic = (e: any) => {
//   console.log('选择文件：', e.tempFilePaths)
// }

// 获取人口其他照片上传进度
// const otherPicProgress = (e: any) => {
//   console.log('上传进度：', e)
// }

// 人口其他照片上传成功
// const otherPicSuccess = (e: any) => {
//   console.log('上传成功e:', e)
// }

// 人口其他照片上传失败
// const otherPicFail = (e: any) => {
//   console.log('上传失败：', e)
// }

// 更新更改后文件名的已上传文件对象列表
// const updateFilesList = (data: any) => {
// 	console.log('data:', data)
// }

const uploadImg = () => {
  uni.chooseImage({
    count: 6,
    sizeType: ['compressed'],
    sourceType: ['album'],
    success: function (res) {
      console.log('res:', res)
    }
  })
}
</script>
