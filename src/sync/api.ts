import { getStorage, request, StorageKey } from '@/utils'
import { PushStateType } from '@/types/sync'

// 项目信息
export const getProjectDataApi = () => {
  return request.get({
    url: '/pad/projectPull'
  })
}

// 配置信息
export const getConfigDataApi = () => {
  return request.get({
    url: '/pad/configPull'
  })
}

// 农户相关信息
export const getBaseDataApi = () => {
  const time = getStorage(StorageKey.PULLTIME)
  return request.get({
    url: '/pad/pull',
    data: {
      lastPullTime: time || ''
    }
  })
}

// 统计
export const getCollectApi = () => {
  return request.get({
    url: '/pad/collectStatistics'
  })
}

// 推送
export const pushDataApi = (data: PushStateType) => {
  return request.post({
    url: '/pad/push',
    data
  })
}

export const filesUpload = (data: any) => {
  return request.post({
    url: '/files',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
