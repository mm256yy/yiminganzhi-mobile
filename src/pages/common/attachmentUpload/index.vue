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
      v-if="stage === MainStage.review && mainType === MainType.PeasantHousehold"
      class="btn record"
      src="@/static/images/icon_record.png"
      mode="scaleToFill"
      @click="showModifyRecord"
    />

    <image
      class="btn submit"
      src="@/static/images/icon_submit.png"
      mode="scaleToFill"
      @click="submit"
    />

    <!-- 复核修改记录 -->
    <modify-records
      v-if="showRecord"
      :doorNo="dataInfo.doorNo"
      :reviewCategory="reviewCategory"
      @close="closeModifyRecords"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { fmtPicUrl, getStorage, StorageKey } from '@/utils'
import { MainStage, MainType } from '@/types/common'
import UploadFile from '@/components/UploadFile/index.vue'
import modifyRecords from '../modifyRecords/index.vue' // 引入修改记录组件

const props = defineProps({
  dataInfo: {
    type: Object as any,
    default: () => {}
  },
  // 主体类型，如居民户、企业、个体户、村集体
  mainType: {
    type: String,
    default: ''
  },
  // 复核类目，如 人口信息、房屋信息...
  reviewCategory: {
    type: String,
    default: ''
  }
})

const projectInfo = getStorage(StorageKey.PROJECTINFO)
// 阶段，如 survey 调查填报阶段， review 复核阶段
const stage = projectInfo?.status ? projectInfo.status : MainStage.survey
const showRecord = ref<boolean>(false)

const emit = defineEmits(['submit'])
const otherPic = ref<string>(
  props.dataInfo.immigrantFile && JSON.stringify(props.dataInfo.immigrantFile) !== '{}'
    ? fmtPicUrl(props.dataInfo.immigrantFile.otherPic)
    : '[]'
)

// 展示修改记录
const showModifyRecord = () => {
  showRecord.value = true
}

// 关闭修改记录弹窗
const closeModifyRecords = () => {
  showRecord.value = false
}

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

    &.record {
      bottom: 54rpx;
    }
  }
}
</style>
