<template>
  <view class="project-wrap">
    <image class="bg" src="@/static/images/common_bg.png" mode="widthFix" />
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
              v-for="(project, dex) in item"
              :index="[index, dex]"
              :key="dex"
              @click="onChangeProject(project)"
            >
              <image class="img" src="@/static/images/project.png" alt=" " />
              <view class="bottom">
                <text class="txt">{{ project.name }}</text>
              </view>
              <image
                v-if="currentProjectId === project.id"
                class="tag"
                src="@/static/images/current_tag.png"
                mode="scaleToFill"
              />
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>

    <SyncCompont
      ref="syncCmt"
      from="project"
      :projectId="projectId"
      :projectItem="projectItem"
      @change-project="changeProject"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getProjectListApi } from '@/service'
import SyncCompont from '@/components/Sync/Index.vue'
import { routerBack, StorageKey, getStorage, debounce } from '@/utils'
import { ProjectType } from '@/types/common'

const list = ref<any[]>([])

const currentProjectId = ref(0)
const projectId = ref()
const projectItem = ref<ProjectType | null>(null)
const syncing = ref<boolean>(false)

const syncCmt = ref()

const spliceIntoChunks = (arr: any[], chunkSize: number) => {
  if (arr.length <= chunkSize) {
    return [arr]
  }
  const res = []
  while (arr.length > 0) {
    const chunk = arr.splice(0, chunkSize)
    res.push(chunk)
  }
  return res
}

const getList = async () => {
  const res = await getProjectListApi()
  if (res && res.length) {
    list.value = spliceIntoChunks(res, 8)
  }
}

// 项目切换
const onChangeProject = debounce((item: ProjectType) => {
  if (currentProjectId.value === item.id) {
    return
  }
  if (syncing.value) {
    return
  }
  syncing.value = true
  projectId.value = item.id
  projectItem.value = item
  // 项目切换需要做数据同步
  syncCmt.value?.onSync()
})

// 同步结束
const onSyncEnd = () => {
  syncing.value = false
}

const changeProject = () => {
  currentProjectId.value = projectId.value
}

const onBack = () => {
  routerBack()
}

onMounted(() => {
  currentProjectId.value = getStorage(StorageKey.PROJECTID)
  getList()
  uni.$on('SyncEnd', onSyncEnd)
})

onBeforeUnmount(() => {
  uni.$off('SyncEnd', onSyncEnd)
})
</script>

<style lang="scss" scoped>
.project-wrap {
  position: relative;
  width: 750rpx;
  height: 100vh;
  padding-top: var(--status-bar-height);
  overflow: hidden;
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
  height: 33rpx;
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
  height: calc(100vh - 33rpx - var(--status-bar-height));
  padding: 35rpx 43rpx 10rpx;
  box-sizing: border-box;
}

.swiper {
  height: 100%;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  height: 100%;
  overflow-y: scroll;
}

.project-item {
  position: relative;
  display: flex;
  width: 152rpx;
  height: 141rpx;
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
