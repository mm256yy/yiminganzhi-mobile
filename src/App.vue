<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { setStorage, StorageKey, getStorage, routerForward } from './utils'

onLaunch(() => {
  console.log('App Launch')
  // 启动时 需要校验token是否过期
  uni.getNetworkType({
    success: function (res) {
      console.log(res.networkType)
      const networkType = res.networkType
      if (networkType === 'none' || networkType === '2g') {
        // 无网络 为离线状态
        setStorage(StorageKey.NETWORK, false)
      } else {
        setStorage(StorageKey.NETWORK, true)
        const loginTime = getStorage(StorageKey.LOGINTIME)
        const now = new Date().getTime()
        const expirationTime = 365 * 24 * 60 * 60 * 1000
        if (!loginTime || loginTime + expirationTime >= now) {
          // token过期 需要重新登录
          // routerForward('login')
        }
      }
    }
  })
})
onShow(() => {
  console.log('App Show', uni.getAppBaseInfo())
})
onHide(() => {
  console.log('App Hide')
})
</script>
