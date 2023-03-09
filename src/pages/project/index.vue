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

    <uni-popup ref="popup" type="center">
      <view class="popup-box">
        <view v-if="!syncStatus" class="close" @click.stop="closePup">
          <uni-icons type="closeempty" color="#979797" size="12rpx" />
        </view>
        <view class="pup-title" v-if="syncStatus">
          <uni-icons type="checkbox-filled" color="#28AF45" size="19rpx" />
          <text class="tit">数据同步成功</text>
        </view>
        <view class="pup-title" v-else>
          <uni-icons type="info-filled" color="#F75454" size="19rpx" />
          <text class="tit">数据同步失败</text>
        </view>
        <view class="pup-cont">
          <template v-if="syncStatus">
            <view class="pup-item" v-if="pushData">
              <view class="tit">上传成功:&nbsp;</view>
              <view class="txt"
                >本次共下载:&nbsp;居民户 <text class="num">{{ pushData.peasantHouseholdNum }}</text
                >个，个体户<text class="num">{{ pushData.individualNum }}</text
                >个，企业<text class="num">{{ pushData.companyNum }}</text
                >家，村集体<text class="num">{{ pushData.villageNum }}</text
                >个</view
              >
            </view>
            <view class="pup-item" v-if="pullData">
              <view class="tit">下载成功:&nbsp;</view>
              <view class="txt"
                >本次共下载:&nbsp;居民户<text class="num">{{ pullData.peasantHouseholdNum }}</text
                >个，个体户<text class="num">{{ pullData.individualNum }}</text
                >个，企业<text class="num">{{ pullData.companyNum }}</text
                >家，村集体<text class="num">{{ pullData.villageNum }}</text
                >个</view
              >
            </view>
          </template>

          <template v-else>
            <view class="pup-item" v-if="pushData && pushData.data">
              <view class="tit err">上传失败:&nbsp;</view>
              <view class="txt">
                {{ pushData.data.name }}
                <text class="err">{{ pushData.message }} </text>
              </view>
            </view>
          </template>
        </view>

        <view class="pup-btn">
          <view class="btn" @click="pupConfirm">确定</view>
        </view>
      </view>
    </uni-popup>

    <uni-popup ref="networkPup" type="center">
      <view class="popup-box">
        <div class="network">
          <image class="img" src="@/static/images/network_error.png" mode="scaleToFill" />
          <view class="txt">数据同步失败</view>
          <view class="info">网络异常，请到网络状态良好的位置再次上传</view>
        </div>
        <view class="pup-btn">
          <view class="btn" @click="closeNetworkPup">确定</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'
import { getProjectListApi } from '@/service'
import {
  routerBack,
  routerForward,
  networkCheck,
  setStorage,
  StorageKey,
  getStorage
} from '@/utils'
import { ProjectType } from '@/types/common'
import { pullInstance, pushInstance } from '@/sync'

const list = ref<any[]>([])

const currentProjectId = ref(0)
const projectId = ref()
const projectItem = ref<ProjectType | null>(null)

const intervalId = ref(0)
const count = ref(0)
// 拉取次数 一秒检测一次 总共 maxcCount 秒
const maxCount = ref(60)
const popup = ref<any>(null)
const networkPup = ref<any>(null)
const syncStatus = ref<boolean>(false)
// 同步 拉取统计信息
const pullData = ref<
  Partial<{
    peasantHouseholdNum: number
    companyNum: number
    individualNum: number
    villageNum: number
  }>
>({})
// 同步 推送统计信息
const pushData = ref<any>({})

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

const polling = () => {
  intervalId.value = setInterval(() => {
    console.log('轮询拉取状态')
    if (count.value === maxCount.value) {
      uni.hideLoading()
      clearInterval(intervalId.value)
      syncStatus.value = false
      openPup()
      return
    }
    count.value++
    if (pullInstance.getPullStatus()) {
      uni.hideLoading()
      clearInterval(intervalId.value)

      const { peasantHouseholdNum, companyNum, individualNum, villageNum } = pullInstance.state
      pullData.value = {
        peasantHouseholdNum,
        companyNum,
        individualNum,
        villageNum
      }
      syncStatus.value = true
      openPup()
    }
  }, 1000)
}

const onSync = async () => {
  const res = await networkCheck()
  if (!res) {
    openNetworkPup()
    return
  }
  uni.showLoading({
    title: '正在同步中...',
    mask: true
  })
  count.value = 0
  pushInstance
    .push()
    .then(async (res) => {
      if (res) {
        pushData.value = res
        // 重置拉取时间
        setStorage(StorageKey.PULLTIME, '')
        // 清空所有的表
        const resetStatus = await pullInstance.resetTable()

        console.log('重置表：', resetStatus)
        // 推送成功
        console.log('推送成功，开始拉取')
        // 换项目之后 需要用新的项目ID 来调用拉取接口
        currentProjectId.value = projectId.value
        setStorage(StorageKey.PROJECTID, projectId.value)
        setStorage(StorageKey.PROJECTINFO, projectItem.value)
        pullInstance
          .pullAll()
          .then(() => {
            polling()
          })
          .catch(() => {
            uni.hideLoading()
            uni.showToast({
              title: '登录失效',
              icon: 'none'
            })
            nextTick(() => {
              routerForward('login')
            })
          })
      } else {
        uni.hideLoading()
        syncStatus.value = false
        openPup()
      }
    })
    .catch((errData) => {
      uni.hideLoading()
      if (errData) {
        pushData.value = errData
        syncStatus.value = false
        openPup()
        console.log(errData, '推送服务端失败信息')
      } else {
        uni.showToast({
          title: '推送返回为空',
          icon: 'error'
        })
      }
    })
}

const openPup = () => {
  popup.value?.open()
}

const closePup = () => {
  popup.value?.close()
}

const pupConfirm = () => {
  console.log('确认')
  if (syncStatus.value) {
    // 同步成功
    closePup()
    routerForward('home')
  } else {
    closePup()
  }
}

const openNetworkPup = () => {
  networkPup.value?.open()
}

const closeNetworkPup = () => {
  networkPup.value?.close()
}

onMounted(() => {
  currentProjectId.value = getStorage(StorageKey.PROJECTID)
  getList()
})

// 项目切换
const onChangeProject = (item: ProjectType) => {
  if (currentProjectId.value === item.id) {
    return
  }
  projectId.value = item.id
  projectItem.value = item
  // 项目切换需要做数据同步
  onSync()
}

const onBack = () => {
  routerBack()
}
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

.popup-box {
  position: relative;
  width: 352rpx;
  // height: 203rpx;
  background: #ffffff;
  border-radius: 5rpx;

  .close {
    position: absolute;
    top: 0rpx;
    right: 0rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36rpx;
    height: 36rpx;
  }

  .pup-title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 28rpx 12rpx 16rpx;
    font-size: 14rpx;
    font-weight: 600;
    color: #333333;

    .tit {
      margin-left: 7rpx;
    }
  }

  .pup-cont {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .pup-item {
      display: flex;
      align-items: center;
      width: 328rpx;
      height: 33rpx;
      padding: 0 9rpx;
      margin-bottom: 9rpx;
      background: #f6f7f9;
      border-radius: 2rpx;

      .tit {
        font-size: 9rpx;
        color: #28af45;
      }

      .txt {
        font-size: 9rpx;
        color: #171718;

        .num {
          color: #3e73ec;
        }
      }

      .err {
        color: #f75454;
      }
    }
  }

  .pup-btn {
    height: 32rpx;
    border-top: 1rpx solid rgba(0, 0, 0, 0.1);

    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 9rpx;
      color: #1059ff;
    }
  }

  .network {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 23rpx 12rpx 26rpx;

    .img {
      width: 176rpx;
      height: 105rpx;
    }

    .txt {
      margin-top: 6rpx;
      font-size: 14rpx;
      font-weight: 600;
      line-height: 19rpx;
      color: #333333;
    }

    .info {
      margin-top: 6rpx;
      font-size: 9rpx;
      line-height: 13rpx;
      color: #333333;
    }
  }
}
</style>
