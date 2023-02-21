<template>
  <view class="project-wrap">
    <image class="bg" src="@/static/images/common_bg.png" mode="widthFix" />
    <view :style="{ height: `${statusBarHeight}px` }" />
    <view class="common-header">
      <view class="back-box" @click="onBack">
        <uni-icons type="back" color="#ffffff" size="14rpx" />
      </view>

      <text class="tit">项目切换</text>
      <text />
    </view>
    <view class="content">
      <swiper class="swiper" :indicator-dots="true">
        <swiper-item v-for="(item, index) in list" :key="index">
          <view class="grid">
            <view
              class="project-item"
              v-for="(projectItem, dex) in item"
              :index="[index, dex]"
              :key="dex"
              @click="onChangeProject(projectItem)"
            >
              <image class="img" src="@/static/images/project.png" alt=" " />
              <view class="bottom">
                <text class="txt">{{ projectItem.name }}</text>
              </view>
              <image
                v-if="currentProjectId === projectItem.id"
                class="tag"
                src="@/static/images/current_tag.png"
                mode="scaleToFill"
              />
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getListApi } from './service'
import { routerBack, routerForward, setStorage, StorageKey, getStorage } from '@/utils'
import { ProjectType } from '@/types/common'
import { pullInstance, pushInstance } from '@/sync'

const list = ref<any[]>([])
const sysInfo = uni.getSystemInfoSync()
const statusBarHeight = sysInfo.statusBarHeight || 0

const currentProjectId = ref(0)

const spliceIntoChunks = (arr: any[], chunkSize: number) => {
  const res = []
  if (arr.length <= chunkSize) {
    return [[arr]]
  }
  while (arr.length > 0) {
    const chunk = arr.splice(0, chunkSize)
    res.push(chunk)
  }
  return res
}

const getList = async () => {
  const res = await getListApi()
  if (res && res.length) {
    list.value = spliceIntoChunks(res, 8)
  }
}

onMounted(() => {
  currentProjectId.value = getStorage(StorageKey.PROJECTID)
  getList()
})

// 项目切换
const onChangeProject = (item: ProjectType) => {
  currentProjectId.value = item.id
  setStorage(StorageKey.PROJECTID, item.id)
  setStorage(StorageKey.PROJECTINFO, item)
  // 项目切换需要做数据切换
  // pushInstance.push()
  pullInstance.pull()
  // routerForward('home')
}

const onBack = () => {
  routerBack()
}
</script>

<style lang="scss" scoped>
uni-page-body {
  /* #ifdef H5 */
  /* #endif */

  /* #ifdef APP-PLUS */
  height: 100%;
  flex: 1;
  /* #endif */
}

.project-wrap {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 750rpx;
  height: 100%;
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 750rpx;
  height: 100%;
}

.common-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 42rpx;
  padding: 0 6rpx;

  .back-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26rpx;
    height: 26rpx;
  }

  .tit {
    font-size: 15rpx;
    font-weight: 600;
    color: #ffffff;
  }
}

.content {
  height: 100%;
  padding: 35rpx 43rpx 10rpx;
}

.swiper {
  height: 100%;
  flex: 1;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  height: 100%;
}

.project-item {
  position: relative;
  display: flex;
  width: 152rpx;
  // height: 141rpx;
  margin: 0 13rpx 23rpx 0;
  background-color: rgba(255, 255, 255, 0.98);
  border: 1rpx solid #eeeeee;
  border-radius: 5rpx;
  box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(45, 71, 103, 0.1);
  flex-direction: column;
}

.img {
  width: 152rpx;
  height: 101rpx;
}

.bottom {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 40rpx;
  background-color: #fff;
}

.txt {
  font-size: 14rpx;
  font-weight: 600;
  color: #333333;
}

.tag {
  position: absolute;
  top: -1rpx;
  left: -1rpx;
  width: 40rpx;
  height: 35rpx;
}
</style>
