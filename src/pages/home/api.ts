import { request } from '@/utils'

export const loginOutApi = (): Promise<any> => {
  return request.post({
    url: '/auth/logout'
  })
}
