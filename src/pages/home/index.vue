<template>
  <view class="home-wrap">
    <image class="common-bg" src="@/static/images/common_bg.png" mode="widthFix" />
    <view class="home-content">
      <view class="home-header">
        <view class="header-lt">
          <image class="logo" src="@/static/images/logo.png" />
          <view class="project">移民安置综合管理服务平台V{{ appVersion }}</view>
          <view class="project" v-if="projectInfo">&nbsp;-&nbsp;{{ `${projectInfo.name}` }}</view>
          <view class="status" v-if="projectInfo">{{
            projectInfo.status && projectInfo.status === 'review' ? '（实物复核）' : '（实物采集）'
          }}</view>
        </view>

        <view class="header-rt">
          <view class="btn-item" @click="toLink('project')">
            <view class="name">项目切换</view>
            <image class="icon" src="@/static/images/project_enter.png" mode="scaleToFill" />
          </view>
          <view v-if="userInfo" class="login-out" @click="loginOutPre">退出登录</view>
        </view>
      </view>

      <view class="admin-collect">
        <view v-if="userInfo" class="admin">
          <view class="avater-box" v-if="userInfo.avatar">
            <image class="avater" :src="userInfo.avatar" mode="scaleToFill" />
          </view>
          <image v-else class="avater-box" src="@/static/images/avater.png" mode="scaleToFill" />

          <view class="info">
            <view class="name">{{ userInfo.userName || userInfo.username }}</view>
            <view class="desc">{{ userInfo.phone }}</view>
          </view>
        </view>
        <view v-else class="admin" @click="loginIn">
          <image class="avater-box" src="@/static/images/avater.png" mode="scaleToFill" />

          <view class="info">
            <view class="name">请登录</view>
          </view>
        </view>
        <view class="collect" v-if="collection">
          <view class="collect-item">
            <view class="num">{{ collection.todayReport || 0 }}</view>
            <view class="tit">今日填报</view>
          </view>
          <view class="collect-item">
            <view class="num">{{ collection.hasReport || 0 }}</view>
            <view class="tit">历史填报</view>
          </view>
          <view class="collect-item">
            <view class="num">{{ collection.noReport || 0 }}</view>
            <view class="tit">未调查</view>
          </view>
        </view>
        <view v-else />
      </view>

      <view class="main-enter">
        <view class="enter-item" @click="toLink('householdList')">
          <view class="inner">
            <view class="top">
              <image class="enter-icon" src="@/static/images/peple_enter.png" mode="scaleToFill" />
              <view class="enter-name">居民户</view>
            </view>

            <view class="enter-common">
              <text class="txt">数据填报</text>
              <image class="arrow" src="@/static/images/home_arrow_lite.png" mode="scaleToFill" />
            </view>
          </view>
        </view>

        <view class="enter-item" @click="toLink('enterpriseList')">
          <view class="inner">
            <view class="top">
              <image
                class="enter-icon"
                src="@/static/images/company_enter.png"
                mode="scaleToFill"
              />
              <view class="enter-name">企业</view>
            </view>

            <view class="enter-common">
              <text class="txt">数据填报</text>
              <image class="arrow" src="@/static/images/home_arrow_lite.png" mode="scaleToFill" />
            </view>
          </view>
        </view>

        <view class="enter-item" @click="toLink('selfPersonList')">
          <view class="inner">
            <view class="top">
              <image class="enter-icon" src="@/static/images/single_enter.png" mode="scaleToFill" />
              <view class="enter-name">个体户</view>
            </view>

            <view class="enter-common">
              <text class="txt">数据填报</text>
              <image class="arrow" src="@/static/images/home_arrow_lite.png" mode="scaleToFill" />
            </view>
          </view>
        </view>

        <view class="enter-item" @click="toLink('collectiveList')">
          <view class="inner">
            <view class="top">
              <image class="enter-icon" src="@/static/images/jt_enter.png" mode="scaleToFill" />
              <view class="enter-name">村集体</view>
            </view>

            <view class="enter-common">
              <text class="txt">数据填报</text>
              <image class="arrow" src="@/static/images/home_arrow_lite.png" mode="scaleToFill" />
            </view>
          </view>
        </view>
      </view>

      <view class="other-enter">
        <view class="other-item" @click="toLink('sync')">
          <view class="inner">
            <image class="other-icon" src="@/static/images/sync_enter.png" mode="scaleToFill" />
            <text class="other-tit">数据同步</text>
          </view>
          <image class="arrow-icon" src="@/static/images/home_arrow.png" mode="scaleToFill" />
        </view>

        <view class="other-item" @click="toLink('work')">
          <view class="inner">
            <image class="other-icon" src="@/static/images/work_enter.png" mode="scaleToFill" />
            <text class="other-tit">我的工作</text>
          </view>
          <image class="arrow-icon" src="@/static/images/home_arrow.png" mode="scaleToFill" />
        </view>

        <view class="other-item" @click="toLink('mapList')">
          <view class="inner">
            <image class="other-icon" src="@/static/images/map_enter.png" mode="scaleToFill" />
            <text class="other-tit">查看地图</text>
          </view>
          <image class="arrow-icon" src="@/static/images/home_arrow.png" mode="scaleToFill" />
        </view>
        <view class="other-item" @click="toLink('village')">
          <view class="inner">
            <image class="other-icon" src="@/static/images/yimin_enter.png" mode="scaleToFill" />
            <text class="other-tit">自然村清单</text>
          </view>
          <image class="arrow-icon" src="@/static/images/home_arrow.png" mode="scaleToFill" />
        </view>
      </view>

      <view class="other-enter self">
        <view class="other-item" @click="toLink('database')">
          <view class="inner">
            <image class="other-icon" src="@/static/images/sync_enter.png" mode="scaleToFill" />
            <text class="other-tit">数据库</text>
          </view>
          <image class="arrow-icon" src="@/static/images/home_arrow.png" mode="scaleToFill" />
        </view>
        <view class="other-item" @click="toLink('login')">
          <view class="inner">
            <image class="other-icon" src="@/static/images/sync_enter.png" mode="scaleToFill" />
            <text class="other-tit">登录页</text>
          </view>
          <image class="arrow-icon" src="@/static/images/home_arrow.png" mode="scaleToFill" />
        </view>
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
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { getStorage, routerForward, setStorage, StorageKey, networkCheck } from '@/utils'
import { loginOutApi } from './api'
import { getHomeCollectionApi, getImgListApi } from '@/service'
import { pullInstance } from '@/sync'
import { imageUrlAndBase64Map } from '@/config'

interface CollectionType {
  hasReport: number
  noReport: number
  todayReport: number
}

const userInfo = ref<any>(null)
const projectInfo = ref<any>(null)
const netWork = ref<boolean>(true)
const collection = ref<CollectionType | null>(null)
const alertDialog = ref<any>(null)
const appVersion = ref<string>('')

const toLink = (name: string) => {
  routerForward(name)
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
      collection.value = null
      setStorage(StorageKey.TOKEN, '')
      setStorage(StorageKey.USERINFO, null)
      setStorage(StorageKey.LOGINTIME, '')
      setStorage(StorageKey.PROJECTID, '')
      setStorage(StorageKey.PROJECTINFO, null)
      setStorage(StorageKey.PULLTIME, '')
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
        base64: item.base64,
        path: item.path
      }
    })
  }
}

onMounted(() => {
  // getImageObj() // 5.25内存爆了
  const systemInfo = uni.getSystemInfoSync()
  appVersion.value = systemInfo.appWgtVersion || '1.0.0'
})

onShow(() => {
  const user = getStorage(StorageKey.USERINFO)
  const project = getStorage(StorageKey.PROJECTINFO)
  userInfo.value = user
  projectInfo.value = project

  console.log(projectInfo, 'projectInfo')
  networkCheck().then((res) => {
    netWork.value = res
  })

  getHomeCollectionApi().then((res) => {
    console.log(res, '统计数据')
    collection.value = res || null
  })
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

  .admin-collect {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 22rpx 24rpx 42rpx;

    .admin {
      display: flex;
      flex-direction: row;
      align-items: center;

      .avater-box {
        display: flex;
        width: 40rpx;
        height: 40rpx;
        margin-right: 6rpx;
        overflow: hidden;

        background: linear-gradient(143deg, #ffffff 0%, #a5bcff 100%);
        border-radius: 50%;
        align-items: center;
        justify-content: center;

        .avater {
          width: 36rpx;
          height: 36rpx;
          background-color: #86a3c4;
          border-radius: 50%;
        }
      }

      .info {
        display: flex;
        flex-direction: column;

        .name {
          font-size: 13rpx;
          font-weight: 600;
          line-height: 18rpx;
          color: #ffffff;
        }

        .desc {
          margin-top: 5rpx;
          font-size: 11rpx;
          line-height: 15rpx;
          color: #ffffff;
        }
      }
    }

    .collect {
      display: flex;
      flex-direction: row;

      .collect-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 53rpx;

        .num {
          font-size: 23rpx;
          font-weight: 600;
          line-height: 33rpx;
          color: #ffffff;
        }

        .tit {
          font-size: 11rpx;
          font-weight: 600;
          line-height: 15rpx;
          color: #ffffff;
        }

        &:last-child {
          margin-right: 0rpx;
        }
      }
    }
  }

  .main-enter {
    display: flex;
    flex-direction: row;
    width: 750rpx;
    justify-content: center;

    .enter-item {
      display: flex;
      width: 117rpx;
      height: 141rpx;
      margin-right: 14rpx;
      background: linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
      border-radius: 11rpx;
      box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.08);
      align-items: center;
      justify-content: center;

      .inner {
        display: flex;
        width: 115rpx;
        height: 139rpx;
        padding: 28rpx 12rpx 12rpx 22rpx;
        background: linear-gradient(180deg, #deebf6 0%, #ffffff 100%);
        border-radius: 11rpx;
        flex-direction: column;
        justify-content: space-between;
      }

      .top {
        display: flex;
        flex-direction: column;
      }

      .enter-icon {
        width: 33rpx;
        height: 33rpx;
        transform: scale(1.2);
      }

      .enter-name {
        margin-top: 5rpx;
        font-size: 13rpx;
        font-weight: 600;
        line-height: 18rpx;
        color: #171718;
      }

      .enter-common {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .txt {
          margin-right: 2rpx;
          font-size: 8rpx;
          line-height: 12rpx;
          color: #171718;
        }

        .arrow {
          width: 9rpx;
          height: 9rpx;
        }
      }

      &:last-child {
        margin-right: 0rpx;
      }
    }
  }

  .other-enter {
    display: flex;
    justify-content: center;
    width: 750rpx;
    margin-top: 36rpx;

    &.self {
      display: none;
      margin-top: 10rpx;
    }

    .other-item {
      display: flex;
      width: 117rpx;
      height: 33rpx;
      padding: 0 9rpx 0 4rpx;
      margin-right: 14rpx;
      background-color: #cfdffa;
      border-radius: 9rpx;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      .inner {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .other-icon {
        width: 26rpx;
        height: 26rpx;
      }

      .other-tit {
        margin-left: 9rpx;
        font-size: 9rpx;
        font-weight: 600;
        color: #0a54ff;
      }

      .arrow-icon {
        width: 9rpx;
        height: 9rpx;
      }

      &:last-child {
        margin-right: 0rpx;
      }
    }
  }
}
</style>
