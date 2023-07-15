<template>
  <view class="uploads-wrapper">
    <!-- 选房确认 —— 档案上传 -->
    <view class="title">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      选房档案上传
    </view>
    <view class="row">
      <view class="label">摇号顺序号：</view>
      <input class="txt" type="text" placeholder="请输入" />
    </view>
    <view class="sub-title">摇号顺序凭证：</view>
    <upload-file
      :file-list="lotteryPic"
      :limit="20"
      show-type="list"
      :accepts="['.jpg', '.png']"
      @updateFileList="updateLotteryFileList"
    />

    <view class="row">
      <view class="label">选房顺序号：</view>
      <input class="txt" type="text" placeholder="请输入" />
    </view>
    <view class="sub-title">选房顺序凭证：</view>
    <upload-file
      :file-list="selectionPic"
      :limit="20"
      show-type="list"
      :accepts="['.jpg', '.png']"
      @updateFileList="updateSelectionFileList"
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

// 摇号顺序凭证
const lotteryPic = computed(() => {
  return '[]'
})

// 选房顺序凭证
const selectionPic = computed(() => {
  return '[]'
})

const lotteryPicUrlStr = ref<string>(lotteryPic.value)

const selectionPicUrlStr = ref<string>(selectionPic.value)

// 摇号顺序凭证已上传图片回传
const updateLotteryFileList = (fileList: string) => {
  lotteryPicUrlStr.value = fileList
}

// 选房顺序凭证已上传图片回传
const updateSelectionFileList = (fileList: string) => {
  selectionPicUrlStr.value = fileList
}

// 表单提交
const submit = () => {
  const params = {
    // ...props.dataInfo.immigrantFile,
    // doorNo: props.dataInfo.doorNo,
    lotteryPic: lotteryPicUrlStr.value,
    selectionPic: selectionPicUrlStr.value
  }
  // emit('submit', params)
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

  .row {
    display: flex;
    align-items: center;
    margin: 12rpx 0;

    .label {
      margin-right: 12rpx;
      font-size: 9rpx;
      color: #171718;
    }

    .txt {
      width: 180rpx;
      height: 23rpx;
      padding: 0 5rpx;
      font-size: 9rpx;
      border: 1rpx solid #ebebeb;
      border-radius: 2rpx;
      box-sizing: border-box;
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
