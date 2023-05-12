<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { StorageKey, getStorage, routerForward } from './utils'
/* #ifdef APP-PLUS */
import { pullInstance } from './sync'
/* #endif */

onLaunch(() => {
  console.log('onLaunch')
  /* #ifdef APP-PLUS */
  // 创建数据库
  pullInstance.init()

  // 隐藏设备顶部 WiFi、电池、日期状态栏
  plus.navigator.setFullscreen(true)
  /* #endif */

  // 启动时 需要校验token是否过期
  uni.getNetworkType({
    success: function (res) {
      // console.log(res.networkType)
      const networkType = res.networkType
      if (networkType === 'none' || networkType === '2g') {
        // 无网络 为离线状态
      } else {
        const loginTime = getStorage(StorageKey.LOGINTIME)
        const now = new Date().getTime()
        const expirationTime = 365 * 24 * 60 * 60 * 1000
        if (!loginTime) {
          // 之前一次没登录过/卸载过
          routerForward('login')
        } else if (loginTime + expirationTime <= now) {
          // token过期 需要重新登录
          routerForward('login')
        }
      }
    }
  })

  plus.geolocation.getCurrentPosition((res) => {
    console.log(res, '当前位置')
  })
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
