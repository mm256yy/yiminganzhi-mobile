<template>
  <view class="home-wrap">
    <image class="common-bg" src="@/static/images/common_bg.png" mode="widthFix" />
    <view class="home-content">
      <view class="home-header">
        <view class="header-lt">
          <image class="logo" src="@/static/images/logo.png" />
          <view class="project" v-if="roleType == RoleCodeType.investigator"
            >移民安置综合管理服务平台V{{ appVersion }}</view
          >
          <view
            class="project"
            v-if="
              (projectInfo && roleType == RoleCodeType.assessor) ||
              roleType == RoleCodeType.assessorland ||
              roleType == RoleCodeType.implementation ||
              homeViewType === RoleCodeType.implementleader
            "
          >
            {{ `${projectInfo?.name}` }}</view
          >
          <view
            class="status"
            v-if="
              (projectInfo && roleType == RoleCodeType.assessor) ||
              roleType == RoleCodeType.assessorland ||
              roleType == RoleCodeType.implementation ||
              homeViewType === RoleCodeType.implementleader
            "
          >
            {{
              homeViewType === RoleCodeType.investigator
                ? projectInfo.status && projectInfo.status === 'review'
                  ? '（实物复核）'
                  : '（实物采集）'
                : '（移民实施）'
            }}
            {{
              env.apiEnv == 'locals'
                ? '当前版本：local'
                : env.apiEnv == 'local'
                ? '当前版本：119'
                : ''
            }}
          </view>
        </view>

        <view class="header-rt">
          <view
            class="btn-item"
            @click="toLink('project')"
            v-if="
              roleType != RoleCodeType.implementation &&
              roleType != RoleCodeType.assessor &&
              roleType != RoleCodeType.assessorland &&
              roleType != RoleCodeType.implementleader
            "
          >
            <view class="name">项目切换</view>
            <image class="icon" src="@/static/images/project_enter.png" mode="scaleToFill" />
          </view>
          <view v-else class="user-name">
            {{ getStorage(StorageKey.USERINFO).username }}
          </view>
          <view v-if="userInfo" class="login-out" @click="loginOutPre">退出登录</view>
        </view>
      </view>

      <!-- 根据不同的角色 展示不同的视图 -->
      <!-- 实物调查的首页 -->
      <Investigator
        v-if="homeViewType === RoleCodeType.investigator"
        @to-link="toLink"
        @login-in="loginIn"
      />
      <!-- 资产评估-房屋首页 -->
      <Assessor
        v-else-if="homeViewType === RoleCodeType.assessor"
        @to-link="toLink"
        @to-params-links="toParamsLinks"
        @login-in="loginIn"
      />
      <!-- 资产评估-土地首页 -->
      <LandHome
        v-else-if="homeViewType === RoleCodeType.assessorland"
        @to-link="toLink"
        @login-in="loginIn"
      />

      <!-- 移民实施人员的首页 -->
      <Implementation
        v-else-if="
          homeViewType === RoleCodeType.implementation ||
          homeViewType === RoleCodeType.implementleader
        "
        @to-link="toLink"
        @to-params-link="toParamsLink"
        @login-in="loginIn"
      />

      <view
        v-if="
          homeViewType === RoleCodeType.implementation ||
          homeViewType === RoleCodeType.implementleader
        "
        class="sync-time"
        >{{ lastConfirmTime }}
      </view>
    </view>

    <uni-popup ref="alertDialog" type="dialog">
      <uni-popup-dialog
        type="warn"
        cancelText="取消"
        confirmText="确认"
        title="确认退出？"
        content="将清除本地所有数据(包含未同步数据)"
        @confirm="dialogConfirm"
        @close="dialogClose"
      />
    </uni-popup>

    <!-- 同步数据确认弹窗-->
    <uni-popup ref="confirmDialog" type="dialog">
      <uni-popup-dialog
        type="warn"
        cancelText="取消"
        confirmText="确认"
        :title="lastConfirmTime"
        content="是否确认同步数据？"
        @confirm="confirmSync"
        @close="closeConfirmDialog"
      />
    </uni-popup>

    <SyncCompont :isNeedPageJump="false" ref="syncCmt" from="sync" />
  </view>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, ref, onBeforeUnmount } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { getStorage, routerForward, resetCache, StorageKey, debounce } from '@/utils'
import { loginOutApi } from './api'
import { getImgListApi, getOtherItemApi } from '@/service'
import { pullInstance } from '@/sync'
import { RoleCodeType } from '@/types/common'
import { imageUrlAndBase64Map } from '@/config'
import Assessor from './components/Assessor.vue'
import LandHome from './components/LandHome.vue'
import Investigator from './components/Investigator.vue'
import Implementation from './components/Implementation.vue'
import { OtherDataType } from '@/database'
import dayjs from 'dayjs'
import SyncCompont from '@/components/Sync/Index.vue'
import { env } from '@/config/env'

const roleType = ref<RoleCodeType>(getStorage(StorageKey.USERROLE))
const userInfo = ref<any>(null)
const projectInfo = ref<any>(null)
const alertDialog = ref<any>(null)
const appVersion = ref<string>('')
const confirmDialog = ref<any>(null)
const pullTime = ref<string>('')
const syncing = ref<boolean>(false)
const syncCmt = ref()
const lastConfirmTime = ref('')

/**
 * 首页视图类型
 * 不同角色不同的首页内容
 */
//const homeViewType = ref<RoleCodeType>(RoleCodeType.investigator);
const homeViewType = ref<RoleCodeType>(RoleCodeType.assessorland)

const toLink = (name: string) => {
  // 判断是否为数据同步
  if (name === 'sync') {
    if (homeViewType.value === RoleCodeType.implementation) {
      openConfirmDialog()
      return
    }
  }
  routerForward(name)
}

const toParamsLink = (params: any) => {
  const { name, type, count } = params
  routerForward(name, {
    type,
    count
  })
}
const toParamsLinks = (params: any) => {
  const { name, types } = params
  routerForward(name, {
    types
  })
}

const loginIn = () => {
  routerForward('login')
}

const loginOutPre = () => {
  alertDialog.value?.open()
}

const dialogConfirm = () => {
  loginOut()
}

const dialogClose = () => {
  alertDialog.value.close()
}

const openConfirmDialog = () => {
  confirmDialog.value?.open()
}

const closeConfirmDialog = () => {
  confirmDialog.value?.close()
}

// 处理数据同步
const onSyncHandle = debounce(() => {
  if (syncing.value) {
    return
  }
  syncing.value = true
  syncCmt.value?.onSync()
})

// 同步结束
const onSyncEnd = () => {
  syncing.value = false
}

// 确认同步
const confirmSync = () => {
  closeConfirmDialog()
  onSyncHandle()
}

const getPullTime = async () => {
  const time: string = await getOtherItemApi(OtherDataType.PullTime)
  pullTime.value = time ? dayjs(Number(time)).format('YYYY-MM-DD HH:mm:ss') : ''
  lastConfirmTime.value = `上次同步时间：${pullTime.value}`
}

const loginOut = () => {
  uni.showLoading({
    title: '正在退出...',
    mask: true
  })
  loginOutApi()
    .then(() => {
      userInfo.value = null
      projectInfo.value = null
      // 重置本地缓存
      resetCache()
      pullInstance
        .resetTable()
        .then(() => {
          uni.hideLoading()
          routerForward('login')
        })
        .catch(() => {
          uni.hideLoading()
        })
    })
    .catch(() => {
      uni.hideLoading()
    })
}

// 获取图片 url:base64 map 存储起来
const getImageObj = async () => {
  const result = await getImgListApi()
  if (result && result.length) {
    result.forEach((item) => {
      imageUrlAndBase64Map[item.url] = {
        base64: '',
        path: item.path || ''
      }
    })
  }
}

onBeforeMount(() => {
  // 不同角色展示不同的首页视图
  const role = getStorage(StorageKey.USERROLE)
  console.log(role, '目前是什么角色')
  homeViewType.value = role
})

onBeforeUnmount(() => {
  uni.$off('SyncEnd', onSyncEnd)
})

onMounted(() => {
  getImageObj()
  getPullTime()
  const systemInfo = uni.getSystemInfoSync()
  appVersion.value = systemInfo.appWgtVersion || '1.0.0'
  console.log(getStorage(StorageKey.USERINFO), '测试用户名')
  uni.$on('SyncEnd', onSyncEnd)
})

onShow(() => {
  const user = getStorage(StorageKey.USERINFO)
  const project = getStorage(StorageKey.PROJECTINFO)
  userInfo.value = user
  projectInfo.value = project
  uni.$emit('customRefresh')
})
</script>

<style lang="scss" scoped>
.home-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 750rpx;
  height: 100vh;
  overflow: hidden;

  .common-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 750rpx;
  }

  .home-content {
    position: relative;
    z-index: 1;
    padding: var(--status-bar-height) 0 20rpx;
    overflow: scroll;

    .sync-time {
      position: absolute;
      bottom: 5%;
      left: 10rpx;
      font-size: 10rpx;
    }
  }

  .home-header {
    display: flex;
    flex-direction: row;
    height: 43rpx;
    padding: 0 9rpx;
    overflow: hidden;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;

    .header-lt {
      display: flex;
      align-items: center;
      height: 33rpx;

      .logo {
        width: 22rpx;
        height: 22rpx;
        margin-right: 6rpx;
      }

      .project {
        font-size: 14rpx;
        font-weight: 600;
        color: #fff;
      }

      .status {
        font-size: 11rpx;
        font-weight: normal;
        color: #fff;
      }
    }

    .header-rt {
      display: flex;
      align-items: center;
      height: 33rpx;

      .btn-item {
        display: flex;
        height: 23rpx;
        padding: 0 6rpx 0 10rpx;
        border: 1rpx solid #ffffff;
        border-radius: 11rpx;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        .icon {
          width: 16rpx;
          height: 16rpx;
          margin-left: 6rpx;
        }

        .name {
          font-size: 12rpx;
          font-weight: 500;
          color: #fff;
        }
      }

      .user-name {
        font-size: 12rpx;
        color: #ffffff;
      }

      .login-out {
        margin-left: 10rpx;
        font-size: 12rpx;
        color: #ffffff;
      }
    }
  }

  .time-count {
    position: absolute;
    top: 20%;
    right: 50rpx;
    color: #fff;
    font-size: 10rpx;
  }
}
</style>
