import { request } from '@/utils'

// 配置信息
export const getConfigDataApi = () => {
  return request.get({
    url: '/api/pad/configPull'
  })
}

// 农户相关信息
export const getBaseDataApi = () => {
  return request.get({
    url: '/api/pad/pull'
  })
}
