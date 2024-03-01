<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { StorageKey, getStorage, routerForward } from './utils'
/* #ifdef APP-PLUS */
import { pullInstance } from './sync'
/* #endif */

onLaunch(() => {
  console.log('onLaunch')

  // 创建数据库
  pullInstance.init()

  // 隐藏设备顶部 WiFi、电池、日期状态栏
  plus.navigator.setFullscreen(true)

  // 启动时 需要校验token是否过期
  const token = getStorage(StorageKey.TOKEN)
  console.log(token,'token是啥')
  const loginTime = getStorage(StorageKey.LOGINTIME)
  const now = new Date().getTime()
  const expirationTime = 365 * 24 * 60 * 60 * 1000
  if (!token || !loginTime) {
    // 之前一次没登录过/卸载过
    routerForward('login', {
      replace: true
    })
  } else if (loginTime + expirationTime <= now) {
    // token过期 需要重新登录
    routerForward('login', {
      replace: true
    })
  }
    //   routerForward('home', {
    //   replace: true
    // })
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
