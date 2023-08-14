import { setStorage, StorageKey } from '@/utils'

/**
 * 重置本地缓存
 * 用处：退出登录 || 安装APK
 */
export const resetCache = () => {
  // 重置登录时间 重启时需要重新登录

  setStorage(StorageKey.TOKEN, '')
  setStorage(StorageKey.USERINFO, null)
  setStorage(StorageKey.LOGINTIME, '')
  setStorage(StorageKey.PROJECTID, '')
  setStorage(StorageKey.PROJECTINFO, null)
  setStorage(StorageKey.PULLTIME, '')
  // 重置同步状态
  setStorage(StorageKey.PUSHSTATUS, 'syncEnd')

  setStorage(StorageKey.USERROLE, '')
  setStorage(StorageKey.FULLUSERINFO, null)
  setStorage(StorageKey.STAGESTATUS, '')
  setStorage(StorageKey.CONTRASTPLANS, null)

  setStorage(StorageKey.DISTRICTMAP, null)
  setStorage(StorageKey.DICT, null)
}
