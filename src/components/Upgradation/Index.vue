<template>
  <view class="mask flex-center">
    <view class="content botton-radius">
      <view class="content-top">
        <text class="content-top-text">{{ title }}</text>
        <image
          class="content-top"
          style="top: 0"
          width="100%"
          height="100%"
          src="@/static/images/bg_top.png"
        />
      </view>
      <view class="content-header" />
      <view class="content-body">
        <view class="title">
          <text>{{ subTitle }}</text>
          <!-- <text style="padding-left:20rpx;font-size: 0.5em;color: #666;">v.{{version}}</text> -->
        </view>
        <view class="body">
          <scroll-view class="box-des-scroll" :scroll-y="true">
            <text class="box-des">
              {{ contents }}
            </text>
          </scroll-view>
        </view>
        <view class="footer flex-center">
          <template v-if="!downloadSuccess">
            <view class="progress-box flex-column" v-if="downloading">
              <progress
                class="progress"
                border-radius="35"
                :percent="downLoadPercent"
                activeColor="#3DA7FF"
                show-info
                :stroke-width="10"
              ></progress>
              <view
                style=" display: flex;width: 100%; font-size: 28rpx; justify-content: space-around"
              >
                <text>{{ downLoadingText }}</text>
                <text>({{ downloadedSize }}/{{ packageFileSize }}M)</text>
              </view>
            </view>

            <button
              v-else
              class="content-button"
              style=" color: #fff;border: none"
              plain
              @click="updateApp"
            >
              {{ downLoadBtnText }}
            </button>
          </template>
          <button
            v-else-if="downloadSuccess && !installed"
            class="content-button"
            style=" color: #fff;border: none"
            plain
            :loading="installing"
            :disabled="installing"
            @click="installPackage"
          >
            {{ installing ? '正在安装……' : '下载完成，立即安装' }}
          </button>
        </view>
      </view>

      <image
        class="close-img"
        src="@/static/images/app_update_close.png"
        @click.stop="closeUpdate"
      />
    </view>
  </view>
</template>

<script lang="ts">
import { compareVersion } from '@/utils'
let downloadTask: any = null

export default {
  data() {
    return {
      // 从之前下载安装
      installForBeforeFilePath: '',

      // 安装
      installed: false,
      installing: false,

      // 下载
      downloadSuccess: false,
      downloading: false,

      downLoadPercent: 0,
      downloadedSize: 0,
      packageFileSize: 0,

      tempFilePath: '', // 要安装的本地包地址

      // 默认安装包信息
      title: '更新日志',
      contents: '',
      is_mandatory: true, // 强制安装 默认是 否没做任何处理

      version: '0', // 当前app的版本
      url: '', // apk下载链接

      // 可自定义属性
      subTitle: '发现新版本',
      downLoadBtnTextiOS: '立即跳转更新',
      downLoadBtnText: '立即下载更新',
      downLoadingText: '安装包下载中，请稍后'
    }
  },
  onLoad() {
    // 检查版本
  },
  onBackPress() {
    // 强制更新不允许返回
    if (this.is_mandatory) {
      return true
    }

    downloadTask && downloadTask.abort()
  },
  onHide() {},
  computed: {},
  methods: {
    async closeUpdate() {
      if (this.downloading) {
        if (this.is_mandatory) {
          return uni.showToast({
            title: '下载中，请稍后……',
            icon: 'none',
            duration: 500
          })
        }
        uni.showModal({
          title: '是否取消下载？',
          cancelText: '否',
          confirmText: '是',
          success: (res) => {
            if (res.confirm) {
              downloadTask && downloadTask.abort()
              uni.navigateBack()
            }
          }
        })
        return
      }
      // todo 关闭
    },
    updateApp() {
      this.downloadPackage()
    },

    downloadPackage() {
      this.downloading = true

      //下载包
      downloadTask = uni.downloadFile({
        url: this.url,
        success: (res) => {
          if (res.statusCode == 200) {
            this.downloadSuccess = true
            this.tempFilePath = res.tempFilePath

            // 强制更新，直接安装
            if (this.is_mandatory) {
              this.installPackage()
            }
          }
        },
        complete: () => {
          this.downloading = false

          this.downLoadPercent = 0
          this.downloadedSize = 0
          this.packageFileSize = 0

          downloadTask = null
        }
      })

      downloadTask.onProgressUpdate((res: any) => {
        this.downLoadPercent = res.progress
        this.downloadedSize = parseFloat((res.totalBytesWritten / Math.pow(1024, 2)).toFixed(2))
        this.packageFileSize = parseFloat(
          (res.totalBytesExpectedToWrite / Math.pow(1024, 2)).toFixed(2)
        )
      })
    },
    installPackage() {
      plus.runtime.install(
        this.tempFilePath,
        {
          force: false
        },
        async (res) => {
          this.installing = false
          this.installed = true

          // 强制更新安装完成重启
          if (this.is_mandatory) {
            uni.showLoading({
              mask: true,
              title: '安装成功，正在重启……'
            })

            setTimeout(() => {
              uni.hideLoading()
              this.restart()
            }, 1000)
          }
        },
        async (err) => {
          // 安装失败需要重新下载安装包
          this.installing = false
          this.installed = false

          uni.showModal({
            title: '更新失败，请重新下载',
            content: err.message,
            showCancel: false
          })
        }
      )
    },
    restart() {
      this.installed = false
      //更新完重启app
      plus.runtime.restart()
    },

    deleteSavedFile(filePath: string) {
      return uni.removeSavedFile({
        filePath
      })
    }
  }
}
</script>

<style>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.65);
}

.botton-radius {
  border-bottom-right-radius: 30rpx;
  border-bottom-left-radius: 30rpx;
}

.content {
  position: relative;
  top: 0;
  width: 600rpx;
  padding: 0 50rpx;
  background-color: #fff;
  box-sizing: border-box;
}

.text {
  display: block;
  line-height: 200px;
  color: #ffffff;
  text-align: center;
}

.content-top {
  position: absolute;
  top: -195rpx;
  left: 0;
  width: 600rpx;
  height: 270rpx;
}

.content-top-text {
  position: absolute;
  top: 120rpx;
  left: 50rpx;
  z-index: 1;
  font-size: 45rpx;
  font-weight: bold;
  color: #f8f8fa;
}

.content-header {
  height: 70rpx;
}

.title {
  font-size: 33rpx;
  font-weight: bold;
  line-height: 38px;
  color: #3da7ff;
}

.footer {
  display: flex;
  height: 150rpx;
  align-items: center;
  justify-content: space-around;
}

.box-des-scroll {
  height: 200rpx;
  padding: 0 40rpx;
  text-align: left;
  box-sizing: border-box;
}

.box-des {
  font-size: 26rpx;
  line-height: 50rpx;
  color: #000000;
}

.progress-box {
  width: 100%;
}

.progress {
  width: 90%;
  height: 40rpx;
  border-radius: 35px;
}

.close-img {
  position: absolute;
  bottom: -120rpx;
  left: calc(50% - 70rpx / 2);
  z-index: 1000;
  width: 70rpx;
  height: 70rpx;
}

.content-button {

  height: 80rpx;
  margin: 0 18rpx;
  font-size: 30rpx;
  font-weight: 400;
  line-height: 80rpx;
  color: #ffffff;
  text-align: center;

  background: linear-gradient(to right, #1785ff, #3da7ff);
  border-radius: 40rpx;
  flex: 1;
}

.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
