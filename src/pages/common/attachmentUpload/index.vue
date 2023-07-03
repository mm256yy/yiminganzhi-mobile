<template>
  <view class="attachment-upload-wrapper">
    <upload-file
      :file-list="otherPic"
      :limit="20"
      show-type="list"
      :accepts="['.jpg', '.png']"
      @updateFileList="updateFileList"
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
import { computed, ref } from 'vue'
import UploadFile from '@/components/UploadFile/index.vue'

const props = defineProps({
  dataInfo: {
    type: Object as any,
    default: () => {}
  }
})

const emit = defineEmits(['submit'])

const otherPic = computed(() => {
  return props.dataInfo.immigrantFile.otherPic || '[]'
})

const pic = ref<string>(otherPic.value)

const updateFileList = (fileList: string) => {
  pic.value = fileList
}

// 表单提交
const submit = () => {
  const params = {
    ...props.dataInfo.immigrantFile,
    doorNo: props.dataInfo.doorNo,
    otherPic: pic.value
  }
  console.log('params:', params)
  emit('submit', params)
}
</script>

<style lang="scss" scoped>
.attachment-upload-wrapper {
  width: 100%;
  overflow-y: scroll;

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
