import { request } from '@/utils'
import { LoginParamsType } from './type'

export const loginApi = (data: LoginParamsType) => {
  return request.get({
    url: '/user/login',
    data
  })
}
