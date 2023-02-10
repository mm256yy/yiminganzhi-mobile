export interface LoginParamsType {
  userName: string
  password: string
  rememberMe?: boolean
}

export interface LoginResultType {
  user: any
  token: string
  [key: string]: any
}

export interface UserInfoType {
  userName: string
  nickName: string
  systemRole: string
  sex: string
  avatar: string
  phone: string
  enabled: true
  createdDate: string
  lastLoginTime: string
  [key: string]: any
}
