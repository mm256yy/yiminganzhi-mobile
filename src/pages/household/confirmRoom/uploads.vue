<template>
  <view class="uploads-wrapper">
    <!-- 选房确认 —— 档案上传 -->
    <view class="title">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      选房档案上传
    </view>
    <view class="sub-title">选房确认单：</view>
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

// const props = defineProps({
//   dataInfo: {
//     type: Object as any,
//     default: () => {}
//   }
// })

const emit = defineEmits(['submit'])

const otherPic = computed(() => {
  // return props.dataInfo.immigrantFile.otherPic || '[]'
  return '[]'
})

const pic = ref<string>(otherPic.value)

const updateFileList = (fileList: string) => {
  pic.value = fileList
}

// 表单提交
const submit = () => {
  const params = {
    // ...props.dataInfo.immigrantFile,
    // doorNo: props.dataInfo.doorNo,
    otherPic: pic.value
  }
  emit('submit', params)
}
</script>

<style lang="scss" scoped>
.uploads-wrapper {
  width: 100%;
  padding-left: 6rpx;
  overflow-y: scroll;

  .title {
    display: flex;
    font-size: 9rpx;
    color: #171718;
    align-items: center;

    .icon {
      width: 10rpx;
      height: 10rpx;
    }
  }

  .sub-title {
    margin: 9rpx 0;
    font-size: 9rpx;
    color: #666;
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
