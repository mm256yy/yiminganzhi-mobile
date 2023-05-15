<template>
  <div>
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
                >本次共上传:&nbsp;居民户 <text class="num">{{ pushData.peasantHouseholdNum }}</text
                >个，个体户<text class="num">{{ pushData.individualNum }}</text
                >个，企业<text class="num">{{ pushData.companyNum }}</text
                >家，村集体<text class="num">{{ pushData.villageNum }}</text
                >个，自然村<text class="num">{{ pushData.virutalVillageNum }}</text
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
                >个，自然村<text class="num">{{ pushData.virutalVillageNum }}</text
                >个</view
              >
            </view>
          </template>

          <template v-else>
            <view class="pup-item" v-if="pushData && pushData.data">
              <view class="tit err">上传失败:&nbsp;</view>
              <view class="txt" @click="gotoEdit(pushData)">
                <text class="txt">{{ pushData.data.name }}</text>
                <text class="err" v-if="pushData.code === -3"
                  >户号：{{ pushData.data.doorNo }}</text
                >
                <text class="txt">{{ pushData.message }}</text>
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

    <Upgradation
      v-if="showAppVersionUpgradationPup"
      :upgradation="upgradation"
      @close="appUpgradationClose"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onBeforeUnmount } from 'vue'
import Upgradation from '@/components/Upgradation/Index.vue'
import { ProjectType, MainType } from '@/types/common'
import { pullInstance, pushInstance } from '@/sync'
import { imageUrlAndBase64Map } from '@/config'
import { getDictObjApi, getImgListApi, getProjectListApi } from '@/service'
import {
  routerForward,
  networkCheck,
  setStorage,
  getStorage,
  StorageKey,
  compareVersion
} from '@/utils'

interface PropsType {
  from: 'sync' | 'project'
  projectId?: number
  projectItem?: ProjectType | null
}

const props = defineProps<PropsType>()
const emit = defineEmits(['changeProject'])

const intervalId = ref<any>(0)
// 拉取次数 一秒检测一次 总共 maxcCount 秒
const count = ref(0)
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
    virutalVillageNum: number
  }>
>({})
// 同步 推送统计信息
const pushData = ref<any>({})
// app更新相关
const upgradation = ref<any>()
const showAppVersionUpgradationPup = ref<boolean>(false)

// 获取所有的字典表，存储为缓存变量 dict
const getDictObj = async () => {
  const result = await getDictObjApi()
  setStorage(StorageKey.DICT, result)
}

// 获取图片 url:base64 map 存储起来
const getImageObj = async () => {
  const result = await getImgListApi()
  if (result && result.length) {
    result.forEach((item) => {
      imageUrlAndBase64Map[item.url] = {
        base64: item.base64,
        path: item.path
      }
    })
  }
}

// 同步成功回调
const pollingSuccess = async () => {
  const { peasantHouseholdNum, companyNum, individualNum, villageNum, virutalVillageNum } =
    pullInstance.state
  pullData.value = {
    peasantHouseholdNum,
    companyNum,
    individualNum,
    villageNum,
    virutalVillageNum
  }
  syncStatus.value = true
  console.log('同步成功!!!')
  // 同步成功后 处理字典
  await getDictObj()
  // 同步成功后 处理图片
  await getImageObj()
  // 普通同步后 更新当前项目信息
  if (props.from === 'sync') {
    await defaultSyncHandle()
  }
  console.log('同步后逻辑')
  uni.hideLoading()
  clearInterval(intervalId.value)
  openPup()
}

// 轮询拉取状态
const polling = () => {
  intervalId.value = setInterval(() => {
    console.log('轮询拉取状态')

    // 拉取接口报错 异常 超过设定最大轮询次数 u需要结束轮询
    if (pullInstance.maxCount === -1 || count.value === pullInstance.maxCount) {
      uni.hideLoading()
      clearInterval(intervalId.value)
      syncStatus.value = false
      openPup()
      return
    }
    count.value++
    if (pullInstance.getPullStatus()) {
      pollingSuccess()
    }
  }, 1000)
}

// 切换项目 需要处理的逻辑
const projectSyncHandle = async () => {
  // 重置拉取时间
  setStorage(StorageKey.PULLTIME, '')
  // 清空所有的表
  const resetStatus = await pullInstance.resetTable()

  console.log('重置表：', resetStatus)
  // 推送成功
  console.log('推送成功，开始拉取')
  // 换项目之后 需要用新的项目ID 来调用拉取接口

  emit('changeProject')
  setStorage(StorageKey.PROJECTID, props.projectId)
  setStorage(StorageKey.PROJECTINFO, props.projectItem)
}

// 普通同步 需要处理的逻辑
const defaultSyncHandle = async () => {
  // 更新项目信息
  const projectList = await getProjectListApi()
  if (projectList && projectList.length) {
    const currentProjectId = getStorage(StorageKey.PROJECTID)
    const currentProjectItem = projectList.find((item) => item.id === currentProjectId)
    if (currentProjectItem) {
      setStorage(StorageKey.PROJECTINFO, currentProjectItem)
    }
  }
}

// 同步
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

        if (props.from === 'project') {
          await projectSyncHandle()
        }
        // 推送成功
        console.log('推送成功，开始拉取')
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

// 有错误信息 去详情 重新编辑
const gotoEdit = (data: any) => {
  if (data.code === -2) {
    // 自然村失败
    routerForward('villageEdit', {
      type: 'edit',
      uid: data.data.uid
    })
  } else if (data.code === -3) {
    // 业主失败
    // 填报
    const routerMap: any = {
      [MainType.PeasantHousehold]: 'household',
      [MainType.IndividualHousehold]: 'selfPerson',
      [MainType.Company]: 'enterprise',
      [MainType.Village]: 'collective'
    }
    routerForward(routerMap[data.data.type], {
      uid: data.data.uid,
      type: 'edit',
      expendCodes: [
        data.data.areaCode,
        data.data.townCode,
        data.data.villageCode,
        data.data.virutalVillageCode,
        data.data.code
      ]
    })
  }
}

const openPup = () => {
  popup.value?.open()
}

const closePup = () => {
  popup.value?.close()
}

// 检测app是否需要更新
const checkAppVersion = () => {
  const appVersionUpgradation = pullInstance.state.upgradation
  if (!appVersionUpgradation) {
    routerForward('home')
    return
  }
  // 赋值版本信息
  upgradation.value = appVersionUpgradation
  const currentVersion = uni.getSystemInfoSync().appWgtVersion
  if (compareVersion(currentVersion, appVersionUpgradation?.version) === -1) {
    // 当前版本小于发布版本 启动更新
    showAppVersionUpgradationPup.value = true
  } else {
    routerForward('home')
  }
}

const appUpgradationClose = () => {
  routerForward('home')
}

// 同步完成 确认
const pupConfirm = () => {
  console.log('确认')
  closePup()
  if (syncStatus.value) {
    // 同步成功 校验app版本
    checkAppVersion()
  }
}

const openNetworkPup = () => {
  networkPup.value?.open()
}

const closeNetworkPup = () => {
  networkPup.value?.close()
}

onBeforeUnmount(() => {
  clearInterval(intervalId.value)
})

// 同步方法暴露出去
defineExpose({
  onSync
})
</script>

<style lang="scss" scoped>
.popup-box {
  position: relative;
  width: 402rpx;
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
      flex-direction: row;
      align-items: center;
      width: 378rpx;
      height: 33rpx;
      padding: 0 9rpx;
      margin-bottom: 9rpx;
      background: #f6f7f9;
      border-radius: 2rpx;

      .tit {
        flex: none;
        width: 46rpx;
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
