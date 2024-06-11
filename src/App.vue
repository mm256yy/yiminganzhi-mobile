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
  // 获取设备内存信息
    var data=uni.getSystemInfoSync()
			console.log(data,'系统信息');
    
    // 监听内存警告
    uni.onMemoryWarning((res) => {
      console.error('Memory warning: ' + res.level);
    });
    //5 进程在后台LRU列表的中间；释放内存可以帮助系统保持列表中稍后运行的其他进程，以获得更好的整体性能
    //10 该进程不是可消耗的后台进程，但设备内存不足
    //15 该进程不是可消耗的后台进程，但设备运行的内存极低，即将无法保持任何后台进程运行
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
