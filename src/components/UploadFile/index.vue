<template>
  <view class="uni-file-picker">
    <upload-image
      v-if="showType === 'grid'"
      :files-list="filesList"
      :limit="limit"
      @upload-files="updateFilesList"
      @choose="choose"
      @del-file="delFile"
      @prview-image="prviewImage"
    >
      <slot>
        <view class="is-add">
          <view class="icon-add" />
          <view class="icon-add rotate" />
        </view>
      </slot>
    </upload-image>
    <upload-file
      v-if="showType !== 'grid'"
      :files-list="filesList"
      :limit="limit"
      @choose="choose"
      @del-file="delFile"
      @prview-image="prviewImage"
      @update-file-list="childUpdateFilesList"
    >
      <slot
        ><button type="primary"> <text class="txt">选择文件</text></button></slot
      >
    </upload-file>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import uploadImage from './upload-image.vue'
import uploadFile from './upload-file.vue'
import { batchUploadImg } from '@/service'

interface PropsType {
  showType: 'grid' | 'list'
  limit: number
  accepts?: string[]
  fileList: string
  modelValue?: string
}

interface FileItemType {
  url: string
  name: string
  padPath: string
  editName?: string
  isEdit?: boolean
}

const props = defineProps<PropsType>()
const emit = defineEmits(['updateFileList', 'update:modelValue'])
const filesList = ref<FileItemType[]>([])

watch(
  () => props.fileList,
  (val) => {
    if (val) {
      const fileList = JSON.parse(val)
      if (fileList && fileList.length) {
        const list = fileList.map((item: any) => {
          item.editName = item.name || ''
          item.isEdit = false
          item.name = item.name || ''
          return item
        })
        filesList.value = list
      }
    } else {
      filesList.value = []
    }
  },
  {
    immediate: true,
    deep: true
  }
)

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      const fileList = JSON.parse(val)
      if (fileList && fileList.length) {
        const list = fileList.map((item: any) => {
          item.editName = item.name || ''
          item.isEdit = false
          item.name = item.name || ''
          return item
        })
        filesList.value = list
      }
    } else {
      filesList.value = []
    }
  },
  {
    immediate: true,
    deep: true
  }
)

const choose = () => {
  // 选择图片文件

  uni.chooseImage({
    count: props.limit,
    extension: props.accepts || [],
    success(res) {
      const paths = Array.isArray(res.tempFilePaths) ? res.tempFilePaths : [res.tempFilePaths]
      batchUploadImg(paths).then((res) => {
        console.log(res, '图片上传结果')
        if (res && res.length) {
          const files = res.map((item) => {
            const name = item.split('/').pop() || ''
            return {
              padPath: item,
              editName: name,
              isEdit: false,
              name,
              url: `https://zdwp.oss-cn-hangzhou.aliyuncs.com/migrate/files/image/${name}`
            }
          })

          // 新增的图片
          filesList.value = [...filesList.value, ...files]
          updateFilesList()
        }
      })
    }
  })
}

const delFile = (index: number) => {
  filesList.value.splice(index, 1)
  updateFilesList()
}

const childUpdateFilesList = (list: any) => {
  filesList.value = list
  updateFilesList()
}

const updateFilesList = () => {
  const result = filesList.value.map((item) => {
    const { isEdit, editName, ...ret } = item
    return ret
  })
  const str = JSON.stringify(result)
  emit('updateFileList', str)
  emit('update:modelValue', str)
}

const prviewImage = (item: any) => {
  uni.previewImage({
    urls: item.url || item.padPath,
    current: 0
  })
}
</script>

<style>
.uni-file-picker {
  width: 100%;
  overflow: hidden;
  /* #ifndef APP-NVUE */
  box-sizing: border-box;
  /* #endif */
  flex: 1;
}

.uni-file-picker__header {
  /* #ifndef APP-NVUE */
  display: flex;
  padding-top: 5px;
  padding-bottom: 10px;
  /* #endif */
  justify-content: space-between;
}

.file-title {
  font-size: 14px;
  color: #333;
}

.file-count {
  font-size: 14px;
  color: #999;
}

.is-add {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  align-items: center;
  justify-content: center;
}

.icon-add {
  width: 50px;
  height: 5px;
  background-color: #f1f1f1;
  border-radius: 2px;
}

.rotate {
  position: absolute;
  transform: rotate(90deg);
}

.txt {
  font-size: 10rpx;
  color: #333;
}
</style>
