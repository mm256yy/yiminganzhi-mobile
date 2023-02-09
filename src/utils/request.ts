import { hideLoading, showLoading, getHeaderCommonParams, env } from '@/config'
import { isDevelopment, isH5 } from './platform'
import { routerForward } from './router'

enum MethodType {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT'
}

function reject(err: Http.Result) {
  const { message = '正在排队中，请稍后！', code = -1 } = err
  switch (code) {
    case 401:
      // 登录失效
      routerForward('login')
      break

    default:
      uni.showToast({
        title: message
      })
      break
  }
}

// h5环境开启代理
const apiBaseUrl = isH5 && isDevelopment ? '/api' : env.apiBaseUrl

function baseRequest(method: MethodType, option: UniApp.RequestOptions): Http.Response {
  const { header = {}, data = {}, url } = option
  return new Promise((resolve) => {
    showLoading((data as AnyObject).isLoading)
    delete (data as AnyObject).isLoading
    let responseDate: any
    uni.request({
      url: apiBaseUrl + url,
      method,
      timeout: 20000,
      header: {
        ...getHeaderCommonParams(),
        'content-type':
          method === MethodType.GET
            ? 'application/json; charset=utf-8'
            : 'application/x-www-form-urlencoded',
        ...header
      },
      data,
      success: (res: any) => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          if (res.data.code === 0) {
            responseDate = res.data.data
          } else {
            reject(res.data)
          }
        } else {
          reject(res.data)
        }
      },
      fail: (err) => {
        reject({
          code: -1,
          message: '网络不给力，请检查你的网络设置~',
          data: null
        })
      },
      complete: (data) => {
        console.log(data, 'data')
        resolve(responseDate)
        hideLoading()
      }
    })
  })
}

export const request = {
  get: (option: Omit<UniApp.RequestOptions, 'method'>): Http.Response =>
    baseRequest(MethodType.GET, option),
  post: (option: Omit<UniApp.RequestOptions, 'method'>): Http.Response =>
    baseRequest(MethodType.POST, option)
}
