<template>
  <view class="uni-file-picker__files">
    <view v-if="props.filesList.length < props.limit" class="files-button" @click="choose">
      <slot></slot>
    </view>
    <view v-if="props.filesList.length > 0" class="uni-file-picker__lists is-text-box">
      <view
        class="uni-file-picker__lists-box"
        v-for="(item, index) in props.filesList"
        :key="index"
      >
        <view class="uni-file-picker__item">
          <view class="files__image is-text-image">
            <image
              class="header-image"
              :src="item.padPath ? item.padPath : netWork ? item.url : defaultImg"
              mode="aspectFit"
              @click.stop="prviewImage(item, index)"
            />
          </view>
          <view v-if="!item.isEdit" class="files__name">{{ item.name }}</view>
          <view v-if="item.isEdit" class="files__name rename-input">
            <input class="name" type="text" v-model="item.editName" />
            <label class="txt-btn cancel" @click.stop="cancel(item)">取消</label>
            <label class="txt-btn save" @click.stop="save(item)">保存</label>
          </view>
          <view v-if="!item.isEdit" class="icon-edit-box icon-files">
            <image
              class="icon_img"
              src="@/static/images/icon_edit_mini.png"
              mode="scaleToFill"
              @click.stop="editFileName(item)"
            />
          </view>
          <view v-if="!item.isEdit" class="icon-del-box icon-files" @click="delFile(index)">
            <image class="icon_img" src="@/static/images/icon_delete_mini.png" mode="scaleToFill" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { networkCheck } from '@/utils'
import defaultImg from '@/static/images/icon_null_data.png'

interface PropsType {
  filesList: any[]
  limit: number
}

const netWork = ref<boolean>(true)
const props = defineProps<PropsType>()
const emit = defineEmits(['choose', 'prviewImage', 'delFile', 'updateFileList'])

onMounted(() => {
  networkCheck().then((res) => {
    netWork.value = res
  })
})

const cancel = (item: any) => {
  item.isEdit = false
}

const save = (item: any) => {
  item.name = item.editName
  item.isEdit = false
  emit('updateFileList', [...props.filesList])
}

const editFileName = (item: any) => {
  item.isEdit = true
}

const choose = () => {
  emit('choose')
}

const prviewImage = (item: any, index: number) => {
  emit('prviewImage', item, index)
}

const delFile = (index: number) => {
  emit('delFile', index)
}
</script>

<style lang="scss">


/* #ifdef H5 */
@media all and (min-width: 768px) {
  .uni-file-picker__files {
    max-width: 375px;
  }
}

.uni-file-picker__files {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  justify-content: flex-start;
}

.files-button {
  // border: 1px red solid;
}

.uni-file-picker__lists {
  position: relative;
  margin-top: 5px;
  overflow: hidden;
}

.file-picker__mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* #ifndef APP-NVUE */
  display: flex;
  font-size: 14px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
  /* #endif */
  justify-content: center;
  align-items: center;
}

.uni-file-picker__lists-box {
  position: relative;
  display: flex;
  align-items: center;
  width: 48%;
  margin: 1%;
  background: #f9f7f5;
}

.uni-file-picker__item {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  align-items: center;
  padding: 8px 5px 8px 10px;
}

.files-border {
  border-top: 1px #eee solid;
}

.files__name {
  margin-right: 25px;
  font-size: 9rpx;
  color: #666;
  /* #ifndef APP-NVUE */
  word-break: break-all;
  word-wrap: break-word;
  flex: 1;
  /* #endif */
}

.icon-files {
  /* #ifndef APP-NVUE */
  position: static;
  background-color: initial;
  /* #endif */
}

.icon_img {
  width: 26rpx;
  height: 26rpx;
}

// .icon-files .icon-del {
// 	background-color: #333;
// 	width: 12px;
// 	height: 1px;
// }

.rename-input {
  display: flex;
  align-items: center;

  .name {
    width: 100rpx;
    height: 30rpx;
    padding-left: 5rpx;
    font-size: 9rpx;
    background-color: #fff;
    border-radius: 3rpx;
  }

  .txt-btn {
    margin-left: 10rpx;
    font-size: 10rpx;

    &.cancel {
      color: #de5d64;
    }

    &.save {
      color: #6691e9;
    }
  }
}

.is-list-card {
  padding: 5px;
  margin-bottom: 5px;
  border: 1px #eee solid;
  border-radius: 5px;
  box-shadow: 0 0 2px 0px rgba(0, 0, 0, 0.1);
}

.files__image {
  width: 80rpx;
  height: 80rpx;
  margin-right: 10rpx;
}

.header-image {
  width: 100%;
  height: 100%;
}

.is-text-box {
  display: flex;
  flex-wrap: wrap;
  border: 1px #eee solid;
  border-radius: 5px;
}

.is-text-image {
  width: 60rpx;
  height: 60rpx;
  margin-left: 5rpx;
}

.rotate {
  position: absolute;
  transform: rotate(90deg);
}

.icon-edit-box,
.icon-del-box {
  position: absolute;
  top: 0px;
  bottom: 0;
  z-index: 2;
  /* #ifndef APP-NVUE */
  display: flex;
  width: 26rpx;
  height: 26rpx;
  margin: auto 0;
  /* #endif */
  align-items: center;
  justify-content: center;
}

.icon-edit-box {
  right: 36rpx;
}

.icon-del-box {
  right: 5rpx;
}

.icon-del {
  width: 15rpx;
  height: 1px;
  background-color: #333;
  // border-radius: 1px;
}

/* #endif */
</style>
