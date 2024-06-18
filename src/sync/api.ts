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

// 获取调查对象列表
export const getPullLandlordListApi = (id?: number | null) => {
  const time = getStorage(StorageKey.PULLTIME)
  console.log('pullBody')
  return request.get({
    url: '/pad/pullBody',
    data: {
      lastPullTime: time || '',
      lastId: id
    }
  })
}

// 自然村相关信息
export const getBaseDataApi = () => {
  const time = getStorage(StorageKey.PULLTIME)
  return request.get({
    url: '/pad/pullHead',
    data: {
      lastPullTime: time || ''
    }
  })
}

// 统计
export const getCollectApi = () => {
  const role = getStorage(StorageKey.USERROLE)
  console.log(role, '目前是什么角色')
  return request.get({
    url: '/pad/collectStatistics',
     data: {
      status: role=='assessor'?'implementation':null
    }
  })
}

// 获取打印居民户报表信息数据
export const getPrintDetailsApi = () => {
  return request.get({
    url: '/pad/printDetails',
    data: {
      status: 'review'
    }
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
