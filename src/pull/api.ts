import { request } from '@/utils'

export const getBaseDataApi = () => {
  return request.get({
    url: '/api/pad/pull'
  })
}
