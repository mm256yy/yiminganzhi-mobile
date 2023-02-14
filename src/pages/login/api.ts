import { request } from '@/utils'
import { LoginParamsType, LoginResultType, UserInfoType } from './type'

export const loginApi = (data: LoginParamsType): Promise<LoginResultType> => {
  return request.post({
    url: '/api/auth/login',
    data
  })
}

export const userInfoApi = (): Promise<UserInfoType> => {
  return request.get({
    url: '/api/auth/info'
  })
}
