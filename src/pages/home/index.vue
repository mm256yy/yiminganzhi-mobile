<template>
  <view class="home-wrap">
    <image class="common-bg" src="@/static/images/common_bg.png" mode="widthFix" />
    <view class="home-content">
      <view class="home-header">
        <view class="header-lt">
          <image class="logo" src="@/static/images/logo.png" />
          <view class="project">移民安置综合管理服务平台V{{ appVersion }}</view>
          <view class="project" v-if="projectInfo">&nbsp;-&nbsp;{{ `${projectInfo.name}` }}</view>
          <view class="status" v-if="projectInfo">
            {{
              homeViewType === RoleCodeType.investigator
                ? '（实物采集）'
                : homeViewType === RoleCodeType.reviewer
                ? '（实物复核）'
                : '（移民实施）'
            }}
          </view>
        </view>

        <view class="header-rt">
          <view class="btn-item" @click="toLink('project')">
            <view class="name">项目切换</view>
            <image class="icon" src="@/static/images/project_enter.png" mode="scaleToFill" />
          </view>
          <view v-if="userInfo" class="login-out" @click="loginOutPre">退出登录</view>
        </view>
      </view>

      <!-- 根据不同的角色 展示不同的视图 -->
      <!-- 实物调查的首页 -->
      <Investigator
        v-if="homeViewType === RoleCodeType.investigator || homeViewType === RoleCodeType.reviewer"
        @to-link="toLink"
        @login-in="loginIn"
      />
      <!-- 资产评估的首页 -->
      <Assessor
        v-else-if="
          homeViewType === RoleCodeType.assessor || homeViewType === RoleCodeType.assessorland
        "
        @to-link="toLink"
        @login-in="loginIn"
      />
      <!-- 移民实施人员的首页 -->
      <Implementation
        v-else-if="homeViewType === RoleCodeType.implementation"
        @to-link="toLink"
        @to-params-link="toParamsLink"
        @login-in="loginIn"
      />
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
  </view>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { getStorage, routerForward, resetCache, StorageKey } from '@/utils'
import { loginOutApi } from './api'
import { getImgListApi } from '@/service'
import { pullInstance } from '@/sync'
import { RoleCodeType } from '@/types/common'
import { imageUrlAndBase64Map } from '@/config'
import Assessor from './components/Assessor.vue'
import Investigator from './components/Investigator.vue'
import Implementation from './components/Implementation.vue'

const userInfo = ref<any>(null)
const projectInfo = ref<any>(null)
const alertDialog = ref<any>(null)
const appVersion = ref<string>('')
/**
 * 首页视图类型
 * 不同角色不同的首页内容
 */
const homeViewType = ref<RoleCodeType>(RoleCodeType.investigator)

const toLink = (name: string) => {
  routerForward(name)
}

const toParamsLink = (params: any) => {
  const { name, type, count } = params
  routerForward(name, {
    type,
    count
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
  console.log(role, 'role')

  homeViewType.value = role
})

onMounted(() => {
  getImageObj()
  const systemInfo = uni.getSystemInfoSync()
  appVersion.value = systemInfo.appWgtVersion || '1.0.0'
})

onShow(() => {
  const user = getStorage(StorageKey.USERINFO)
  const project = getStorage(StorageKey.PROJECTINFO)
  userInfo.value = user
  projectInfo.value = project
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

      .login-out {
        margin-left: 10rpx;
        font-size: 12rpx;
        color: #ffffff;
      }
    }
  }
}
</style>
