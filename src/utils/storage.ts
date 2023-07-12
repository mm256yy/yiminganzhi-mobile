export enum StorageKey {
  TOKEN = 'Authorization',
  PROJECTID = 'Project-Id',
  USERINFO = 'UserInfo', // 基础用户信息
  LOGINTIME = 'LoginTime',
  NETWORK = 'Network',
  PROJECTINFO = 'ProjectInfo',
  DISTRICTMAP = 'DistrictMap',
  DICT = 'Dict', // 字典表
  PULLTIME = 'PullTime',
  PUSHSTATUS = 'PushStatus',
  FULLUSERINFO = 'FullUserInfo', // 全部的用户信息
  USERROLE = 'UserRole' // 用户角色
}

export const getStorage = (key: StorageKey): any => {
  try {
    const value = uni.getStorageSync(key)
    if (value) {
      return value
    }
    return null
  } catch (e) {
    return null
  }
}

export const setStorage = (key: StorageKey, val: any) => {
  try {
    uni.setStorageSync(key, val)
  } catch (e) {
    // error
  }
}

export const removeStorage = (key: StorageKey) => {
  try {
    uni.removeStorageSync(key)
  } catch (e) {
    // error
  }
}
