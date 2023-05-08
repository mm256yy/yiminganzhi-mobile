<template>
  <view class="attachment-upload-wrapper">
    <upload-file
      v-model="otherPic"
      :file-list="otherPic"
      :limit="20"
      show-type="list"
      :accepts="['.jpg', '.png']"
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
  return props.dataInfo.immigrantFile.otherPic
})

// 表单提交
const submit = () => {
  const params = {
    doorNo: props.dataInfo.doorNo,
    otherPic: otherPic.value
  }
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
