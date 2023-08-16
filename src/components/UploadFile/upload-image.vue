<template>
  <view class="uni-file-picker__container">
    <view class="file-picker__box" v-for="(item, index) in props.filesList" :key="index">
      <view class="file-picker__box-content">
        <image
          class="file-image"
          :src="filterImgSrc(item)"
          mode="aspectFill"
          @click.stop="prviewImage(item, index)"
        />
        <view v-if="!props.isPreview" class="icon-del-box" @click.stop="delFile(index)">
          <view class="icon-del" />
          <view class="icon-del rotate" />
        </view>
      </view>
    </view>
    <view v-if="props.filesList.length < props.limit && !props.isPreview" class="file-picker__box">
      <view class="file-picker__box-content is-add" @click="choose">
        <slot> </slot>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { networkCheck } from '@/utils'
import defaultImg from '@/static/images/icon_null_data.png'

interface PropsType {
  filesList: any[]
  limit: number
  isPreview?: boolean
}
const netWork = ref<boolean>(true)
const props = defineProps<PropsType>()
const emit = defineEmits(['choose', 'prviewImage', 'delFile'])

onBeforeMount(() => {
  networkCheck().then((res) => {
    netWork.value = res
  })
})

const choose = () => {
  emit('choose')
}

const prviewImage = (item: any, index: number) => {
  emit('prviewImage', item, index)
}

const delFile = (index: number) => {
  emit('delFile', index)
}

const filterImgSrc = (item: any) => {
  const url = item.url.split('?')[0]
  const zipUrl = `${url}?x-oss-process=image/quality,Q_60/resize,mfit,w_200`
  return item.path ? item.path : netWork.value ? zipUrl : defaultImg
}
</script>

<style lang="scss">
.uni-file-picker__container {
  /* #ifndef APP-NVUE */
  display: flex;
  margin: -5px;
  box-sizing: border-box;
  /* #endif */
  flex-wrap: wrap;
}

.file-picker__box {
  position: relative;
  width: 87rpx;
  height: 0;
  padding-top: 87rpx;
  background: #fbfdff;
  border-radius: 2rpx;
  box-sizing: border-box;
}

.file-picker__box-content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 5px;
  overflow: hidden;
  border: 1rpx dashed #c3cbd9;
  border-radius: 5px;
}

.file-picker__mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* #ifndef APP-NVUE */
  display: flex;
  font-size: 12px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
  /* #endif */
  justify-content: center;
  align-items: center;
}

.file-image {
  width: 100%;
  height: 100%;
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

.icon-del-box {
  position: absolute;
  top: 3px;
  right: 3px;
  z-index: 2;
  /* #ifndef APP-NVUE */
  display: flex;
  width: 26px;
  height: 26px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  transform: rotate(-45deg);
  /* #endif */
  align-items: center;
  justify-content: center;
}

.icon-del {
  width: 15px;
  height: 2px;
  background-color: #fff;
  border-radius: 2px;
}
</style>
