<template>
  <view class="login-wrap">
    <view class="logo" />
    <view class="form">
      <view class="form-cont">
        <view class="title">
          <image webp src="@/static/images/logo.png" class="img" />
          <view class="tit">移民安置综合管理服务平台</view>
        </view>
        <view class="tab">
          <view class="tab-item">账号密码登录</view>
        </view>
        <view class="ipt-wrap">
          <uni-icons type="person" size="12rpx" color="#295EE6" />
          <input
            @input="iptChange('name', $event)"
            class="ipt"
            type="text"
            placeholder="请输入账号"
          />
        </view>
        <view class="ipt-wrap">
          <uni-icons type="locked-filled" size="12rpx" color="#295EE6" />
          <input
            @input="iptChange('password', $event)"
            class="ipt"
            type="text"
            :password="showPassword"
            placeholder="请输入密码"
          />

          <uni-icons
            @click="changePassword"
            type="eye"
            :color="!showPassword ? '#295ee6' : '#666666'"
            size="12rpx"
          />
        </view>
        <button class="btn" :loading="loading" @click="loginIn">登录</button>
      </view>
      <view class="copy-right">Copyright©浙江省水利水电勘测设计院有限责任公司</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { nextTick, ref, unref } from 'vue'
import { loginApi, userInfoApi } from './api'
/* #ifdef APP-PLUS */
import { pullInstance } from '@/sync'
/* #endif */
import { setStorage, StorageKey, routerForward } from '@/utils'

const name = ref<string>('')
const password = ref<string>('')
const loading = ref<boolean>(false)
const showPassword = ref<boolean>(true)

const changePassword = () => {
  showPassword.value = !showPassword.value
}

const iptChange = (type: string, event: any) => {
  const { value } = event.detail
  if (type === 'name') {
    name.value = value.trim()
  } else {
    password.value = value.trim()
  }
}

const doRoute = () => {
  routerForward('project', {
    replace: true
  })
}

// 拉取项目列表
const pullProjectList = () => {
  pullInstance
    .pullProjectData()
    .then((res) => {
      if (res) {
        doRoute()
      } else {
        setStorage(StorageKey.TOKEN, '')
        setStorage(StorageKey.LOGINTIME, '')
        setStorage(StorageKey.USERINFO, null)
        uni.showToast({
          title: '获取项目信息失败，检查设备是否联网或者当前用户是否绑定项目',
          duration: 3000,
          icon: 'none'
        })
      }
    })
    .finally(() => {
      loading.value = false
    })
}

const loginIn = async () => {
  if (loading.value) {
    return
  }
  loading.value = true
  const res = await loginApi({
    userName: unref(name),
    password: unref(password)
  }).catch(() => {
    loading.value = false
  })
  if (res) {
    const { token, user } = res
    setStorage(StorageKey.TOKEN, token)
    setStorage(StorageKey.LOGINTIME, new Date().getTime())
    setStorage(StorageKey.USERINFO, user)
    // 获取全部的用户信息
    const allUserInfo = await userInfoApi()
    setStorage(StorageKey.FULLUSERINFO, allUserInfo)

    nextTick(() => {
      pullProjectList()
    })
  } else {
    loading.value = false
  }
}
</script>

<style lang="scss">
.login-wrap {
  display: flex;
  height: 100vh;
  justify-content: space-between;
  align-items: stretch;
  overflow: hidden;

  .logo {
    width: 434rpx;
    background: url('@/static/images/login_bg.png') top center no-repeat;
    background-size: cover;
  }

  .form {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 84rpx 0 25rpx;
    background: linear-gradient(1deg, #ffffff 0%, #e7edfd 100%);

    .form-cont {
      width: 216rpx;
    }

    .title {
      display: flex;
      align-items: center;

      .img {
        width: 28rpx;
        height: 28rpx;
      }

      .tit {
        font-size: 15rpx;
        font-weight: 600;
        line-height: 22rpx;
        color: #333333;
      }
    }

    .tab {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 15rpx;

      .tab-item {
        padding: 5rpx 0;
        font-size: 9rpx;
        color: #295ee6;
        text-align: center;
        border-bottom: 1rpx solid #295ee6;
      }
    }

    .ipt-wrap {
      display: flex;
      width: 216rpx;
      height: 28rpx;
      padding: 0 8rpx;
      margin-top: 14rpx;
      background: #ffffff;
      border: 1rpx solid #d9d9d9;
      border-radius: 5rpx;
      align-items: center;

      .ipt {
        margin-left: 4rpx;
        font-size: 9rpx;
        color: #000;
        flex: 1;
      }
    }

    .auto-login {
      display: block;
      margin-top: 14rpx;
      font-size: 8rpx;
      color: rgba(0, 0, 0, 0.65);

      .checkbox {
        margin-right: 6rpx;
      }
    }

    .btn {
      display: flex;
      width: 216rpx;
      height: 28rpx;
      margin-top: 14rpx;
      font-size: 9rpx;
      color: #fff;
      background-color: #295ee6;
      border-radius: 5rpx;
      align-items: center;
      justify-content: center;
    }
  }

  .copy-right {
    font-size: 8rpx;
    color: rgba(0, 0, 0, 0.45);
  }

  .uni-eye-active {
    color: #295ee6;
  }
}
</style>
