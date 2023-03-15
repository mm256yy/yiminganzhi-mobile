<template>
  <view class="uni-file-picker">
    <!-- <view v-if="title" class="uni-file-picker__header">
      <text class="file-title">{{ title }}</text>
      <text class="file-count">{{ filesList.length }}/{{ limit }}</text>
    </view> -->
    <upload-image
      v-if="showType === 'grid'"
      :files-list="filesList"
      :limit="limit"
      :is-preview="isPreview"
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
      :is-preview="isPreview"
      @choose="choose"
      @del-file="delFile"
      @prview-image="prviewImage"
      @update-file-list="childUpdateFilesList"
    >
      <slot></slot>
    </upload-file>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import uploadImage from './upload-image.vue'
import uploadFile from './upload-files.vue'
import { batchUploadImg } from '@/service'
import { networkCheck } from '@/utils'
import defaultImg from '@/static/images/icon_null_data.png'

interface PropsType {
  showType: 'grid' | 'list'
  limit: number
  accepts?: string[]
  fileList: string
  modelValue?: string
  title?: string
  isPreview?: boolean
}

interface FileItemType {
  url: string
  name: string
  padPath: string
  editName?: string
  isEdit?: boolean
}

const netWork = ref<boolean>(true)
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
    }
  },
  {
    immediate: true,
    deep: true
  }
)

onMounted(() => {
  networkCheck().then((res) => {
    netWork.value = res
  })
})

// 选择文件
const choose = () => {
  const fileList = JSON.parse(props.fileList)
  if (fileList.length >= Number(props.limit) && props.showType !== 'grid') {
    uni.showToast({
      title: `您最多选择 ${props.limit} 个文件`,
      icon: 'none'
    })
    return
  }
  chooseFiles()
}

const chooseFiles = () => {
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

const prviewImage = (item: any, index: number) => {
  const urls = filesList.value.map((fileItem) => {
    return fileItem.padPath ? fileItem.padPath : netWork.value ? fileItem.url : defaultImg
  })
  uni.previewImage({
    urls,
    current: index
  })
}
</script>

<style lang="scss" scoped>
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
</style>
