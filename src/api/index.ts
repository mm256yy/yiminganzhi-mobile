import { request } from '@/utils'

export const login = () => {
  return request.post({
    url: '/sss',
    data: {}
  })
}
