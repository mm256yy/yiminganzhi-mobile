<template>
  <view class="upload-wrapper">
    <upload-file
      :file-list="fileList"
      :limit="20"
      show-type="list"
      :accepts="['.jpg', '.png']"
      @update-file-list="updateFilesList"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import UploadFile from '@/components/UploadFile/index.vue'

const fileList = ref<string>(
  JSON.stringify([
    {
      padPath: '_doc/uniapp_save/16787101987160.png',
      name: '16787101987160.png',
      url: 'https://zdwp.oss-cn-hangzhou.aliyuncs.com/migrate/files/image/16787101987160.png'
    }
  ])
)

const updateFilesList = (data: any) => {
  console.log(data, '------')
}
</script>
