export enum StorageKey {
  TOKEN = 'Authorization',
  PROJECTID = 'Project-Id',
  USERINFO = 'UserInfo',
  LOGINTIME = 'LoginTime',
  NETWORK = 'Network',
  PROJECTINFO = 'ProjectInfo',
  DISTRICTMAP = 'DistrictMap',
  DICT = 'Dict', // 字典表
  PULLTIME = 'PullTime'
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
