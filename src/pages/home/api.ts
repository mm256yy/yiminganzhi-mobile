import { request } from '@/utils'

export const getTestListApi = () => {
  return request.get({
    url: '/test',
    data: {}
  })
}
