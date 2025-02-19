<template>
  <view class="uni-file-picker">
    <!-- <view v-if="title" class="uni-file-picker__header">
      <text class="file-title">{{ title }}</text>
      <text class="file-count">{{ filesList.length }}/{{ limit }}</text>
    </view> -->
    <upload-image v-if="showType === 'grid'" :files-list="filesList" :limit="limit" :is-preview="isPreview"
      @upload-files="updateFilesList" @choose="choose" @del-file="delFile" @prview-image="prviewImage">
      <slot>
        <view>
          <view class="is-add">
            <view class="icon-add" />
            <view class="icon-add rotate" />
          </view>
          <text class="add-txt">点击上传</text>
        </view>
      </slot>
    </upload-image>
    <upload-file v-if="showType !== 'grid'" :files-list="filesList" :limit="limit" :is-preview="isPreview"
      :uploadType="uploadType" @choose="choose" @del-file="delFile" @prview-image="prviewImage"
      @update-file-list="childUpdateFilesList">
      <slot></slot>
    </upload-file>

    <uni-popup ref="previewPup" type="center">
      <view class="popup-wrap">
        <view class="popup-head">
          <view class="left-tit">预览图片</view>
          <view class="icon-box" @click="closePreviewPup">
            <uni-icons type="clear" size="30" />
          </view>
        </view>

        <view class="popup-box">
          <image class="view-image" :src="previewUrl" mode="widthFix" />
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import uploadImage from './upload-image.vue'
import uploadFile from './upload-files.vue'
import { batchUploadImgApi, deleteImgApi } from '@/service'
import { deepClone, networkCheck } from '@/utils'
import defaultImg from '@/static/images/icon_null_data.png'
import { imageUrlAndBase64Map } from '@/config'

interface PropsType {
  showType: 'grid' | 'list'
  limit: number
  accepts?: string[]
  fileList: string
  modelValue?: string
  title?: string
  isPreview?: boolean
  notCompress?: boolean
  uploadType?: string
}

interface FileItemType {
  url: string
  name: string
  base64?: string
  path?: string
  editName?: string
  isEdit?: boolean
}

const netWork = ref<boolean>(true)
const props = defineProps<PropsType>()
const emit = defineEmits(['updateFileList', 'update:modelValue'])
const filesList = ref<FileItemType[]>([])
const previewUrl = ref<string>('')
const previewPup = ref<any>(null)

watch(
  () => props.fileList,
  (val) => {
    if (val) {
      const fileList = JSON.parse(val)
      if (fileList && fileList.length) {
        // 拿到图片map
        const list = fileList.map((item: any) => {
          item.editName = item.name || ''
          item.isEdit = false
          item.name = item.name || ''
          item.path = imageUrlAndBase64Map[item.url]?.path || ''
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
        // 拿到图片map
        const list = fileList.map((item: any) => {
          item.editName = item.name || ''
          item.isEdit = false
          item.name = item.name || ''
          item.path = imageUrlAndBase64Map[item.url]?.path || ''
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
  const list = deepClone(filesList.value)
  // 选择图片文件
  uni.chooseImage({
    count: props.limit,
    sizeType: props.notCompress ? ['original'] : ['compressed'],
    extension: props.accepts || [],
    success(res) {
      const paths = Array.isArray(res.tempFilePaths) ? res.tempFilePaths : [res.tempFilePaths]
      batchUploadImgApi(paths).then((res) => {
        // res 图片上传结果
        if (res && res.length) {
          const files = res.map((item) => {
            const name = item.path?.split('/').pop() || ''
            return {
              base64: '',
              path: item.path || '',
              editName: name,
              isEdit: false,
              name,
              url: item.url || ''
            }
          })
          // 新上传的图片存入map
          files.forEach((item) => {
            imageUrlAndBase64Map[item.url] = {
              base64: '',
              path: item.path || ''
            }
          })
          // 新增的图片
          filesList.value = [...list, ...files]
          updateFilesList()
        }
      })
    }
  })
}

const delFile = async (index: number) => {
  const deleteImg = filesList.value.splice(index, 1)
  updateFilesList()
  // 删除本地图片
  if (deleteImg && deleteImg.length) {
    const deleteItem = deleteImg[0]
    await deleteImgApi(deleteItem ? deleteItem.url : '')
  }
}

const childUpdateFilesList = (list: any) => {
  filesList.value = list
  updateFilesList()
}

const updateFilesList = () => {
  const result = filesList.value.map((item) => {
    const { isEdit, editName, base64, ...ret } = item
    return ret
  })
  const str = JSON.stringify(result)
  emit('updateFileList', str)
  // 更改后的 str
  emit('update:modelValue', str)
}

const openPreviewPup = () => {
  previewPup.value?.open()
}

const closePreviewPup = () => {
  previewPup.value?.close()
}

const prviewImage = (item: any) => {
  const url = item.path ? item.path : netWork.value ? item.url : defaultImg
  previewUrl.value = url
  openPreviewPup()
  // uni.previewImage({
  //   urls: [url],
  //   current: 0,
  //   success: function (data) {
  //     hideLoading()
  //     console.log('data:', data)
  //   },
  //   fail: function (err) {
  //     hideLoading()
  //     console.log(err)
  //   }
  // })
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
  width: 9px;
  height: 2px;
  background-color: #aebbd5;
}

.rotate {
  position: absolute;
  transform: rotate(90deg);
}

.add-txt {
  margin-top: 12rpx;
  font-size: 8rpx;
  color: #3e73ec;
}

.popup-wrap {
  position: relative;
  width: 750rpx;
  height: 100vh;

  background-color: #fff;

  .popup-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 30rpx;
    padding: 0 25rpx;
    background-color: #eee;

    .left-tit {
      font-size: 14rpx;
      color: #333;
    }

    .icon-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20rpx;
      height: 20rpx;
    }
  }

  .popup-box {
    width: 100%;
    height: calc(100vh - 30rpx);
    padding: 0 25rpx;
    overflow-x: hidden;
    overflow-y: scroll;

    .view-image {
      display: block;
      width: 700rpx;
    }
  }
}
</style>
