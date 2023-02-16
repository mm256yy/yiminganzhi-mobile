import { request } from '@/utils'

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
  return request.get({
    url: '/pad/pull'
  })
}

// 统计
export const getCollectApi = () => {
  return request.get({
    url: '/pad/collectStatistics'
  })
}

// 查询主树信息
export const getMainTreeApi = () => {
  return request.get({
    url: '/pad/villageMenu'
  })
}

// 推送
export const pushDataApi = () => {
  return request.post({
    url: '/pad/push'
  })
}
