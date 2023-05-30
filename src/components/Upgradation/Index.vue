<template>
  <view class="mask flex-center">
    <view class="content botton-radius">
      <view class="content-top">
        <text class="content-top-text"
          >{{ headTitle }}{{ newVersion ? `V${newVersion}` : '' }}</text
        >
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
          <text>{{ title }}</text>
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
                activeColor="#295ee6"
                show-info
                :stroke-width="10"
              ></progress>
              <view class="download-text">
                <text>{{ downLoadingText }}</text>
                <text>({{ downloadedSize }}/{{ packageFileSize }}M)</text>
              </view>
            </view>

            <button
              v-else
              class="content-button"
              style="color: #fff; border: none"
              plain
              @click="updateApp"
            >
              {{ downLoadBtnText }}
            </button>
          </template>
          <button
            v-else-if="downloadSuccess && !installed"
            class="content-button"
            style="color: #fff; border: none"
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
import { defineComponent } from 'vue'
import { resetCache } from '@/utils'
import { pullInstance } from '@/sync'
let downloadTask: any = null

export default defineComponent({
  props: {
    upgradation: {
      type: Object
    }
  },
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
      contents: '体验优化',
      is_mandatory: true, // 强制安装 默认是 否没做任何处理

      url: '', // apk下载链接

      // 可自定义属性
      headTitle: '发现新版本',
      downLoadBtnText: '立即下载更新',
      downLoadingText: '安装包下载中，请稍后'
    }
  },
  computed: {
    newVersion: (vm: any) => {
      return vm.upgradation.version
    }
  },
  mounted() {
    if (this.upgradation) {
      this.title = this.upgradation.title
      this.contents = this.upgradation.content
      this.url = this.upgradation.apkUrl
    }
  },
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
              // 关闭当前窗口
              this.$emit('close')
            }
          }
        })
        return
      }

      if (this.is_mandatory) {
        uni.showToast({
          title: '当前为强制安装更新',
          icon: 'none'
        })
      } else {
        uni.showModal({
          title: '是否跳过版本更新？',
          cancelText: '否',
          confirmText: '是',
          success: (res) => {
            if (res.confirm) {
              // 关闭当前窗口
              this.$emit('close')
            }
          }
        })
      }
    },
    updateApp() {
      this.downloadPackage()
    },

    downloadPackage() {
      if (!this.url) {
        return
      }
      this.downloading = true

      //下载包
      downloadTask = uni.downloadFile({
        url: this.url,
        success: (res) => {
          if (res.statusCode == 200) {
            this.downloadSuccess = true
            this.tempFilePath = res.tempFilePath

            // 强制更新，直接安装 --- 先手动点击安装吧
            // if (this.is_mandatory) {
            // this.installPackage()
            // }
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
      this.installing = true
      // 重置本地存储
      resetCache()
      // 重置数据库表
      pullInstance.resetTable().then(() => {
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
                title: '正在启动安装'
              })

              setTimeout(() => {
                uni.hideLoading()
                this.restart()
              }, 2000)
            }
          },
          async (err) => {
            // 安装失败需要重新下载安装包
            this.installing = false
            this.installed = false

            uni.showModal({
              title: '安装失败',
              content: err.message,
              showCancel: false
            })
          }
        )
      })
    },
    restart() {
      this.installed = false
      this.deleteSavedFile()
      //更新完重启app
      plus.runtime.restart()
    },

    deleteSavedFile() {
      return uni.removeSavedFile({
        filePath: this.tempFilePath
      })
    }
  }
})
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
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.65);
}

.botton-radius {
  border-bottom-right-radius: 15rpx;
  border-bottom-left-radius: 15rpx;
}

.content {
  position: relative;
  top: 0;
  width: 300rpx;
  padding: 0 25rpx;
  background-color: #fff;
  box-sizing: border-box;
}

.text {
  display: block;
  line-height: 20rpx;
  color: #ffffff;
  text-align: center;
}

.content-top {
  position: absolute;
  top: -97rpx;
  left: 0;
  z-index: 1001;
  width: 300rpx;
  height: 135rpx;
}

.content-top-text {
  position: absolute;
  top: 60rpx;
  left: 25rpx;
  z-index: 1002;
  font-size: 15rpx;
  font-weight: bold;
  color: #f8f8fa;
}

.content-header {
  height: 35rpx;
}

.title {
  font-size: 13rpx;
  font-weight: bold;
  line-height: 20rpx;
  color: #295ee6;
}

.footer {
  display: flex;
  height: 75rpx;
  align-items: center;
  justify-content: space-around;
}

.box-des-scroll {
  height: 120rpx;
  padding: 0 20rpx;
  text-align: left;
  box-sizing: border-box;
}

.box-des {
  font-size: 11rpx;
  color: #000000;
}

.progress-box {
  width: 100%;
}

.progress {
  width: 90%;
  height: 20rpx;
  border-radius: 10rpx;
}

.download-text {
  display: flex;
  width: 100%;
  font-size: 10rpx;
  align-items: center;
  justify-content: space-around;
}

.close-img {
  position: absolute;
  bottom: -60rpx;
  left: calc(50% - 35rpx / 2);
  z-index: 1000;
  width: 35rpx;
  height: 35rpx;
}

.content-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40rpx;
  margin: 0 9rpx;
  font-size: 13rpx;
  font-weight: 400;
  color: #ffffff;
  text-align: center;

  background: linear-gradient(to right, #295ee6, #3da7ff);
  border-radius: 20rpx;
  flex: 1;
}

.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
