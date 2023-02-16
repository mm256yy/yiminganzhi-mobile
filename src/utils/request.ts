import { hideLoading, showLoading, getHeaderCommonParams, env } from '@/config'
import { isAndroid, isIos } from './platform'
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
        title: message,
        icon: 'none'
      })
      break
  }
}

const apiBaseUrl = isAndroid || isIos ? `${env.apiBaseUrl}${env.apiBasePath}` : env.apiBasePath
// 'application/x-www-form-urlencoded'

function baseRequest(method: MethodType, option: UniApp.RequestOptions) {
  const { header = {}, data = {}, url } = option
  return new Promise((resolve) => {
    if ((data as AnyObject).showLoading) {
      showLoading((data as AnyObject).loadingOptions)
    }

    delete (data as AnyObject).isLoading
    let responseDate: any
    uni.request({
      url: apiBaseUrl + url,
      method,
      timeout: 20000,
      header: {
        ...getHeaderCommonParams(),
        'content-type': 'application/json; charset=utf-8',
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
      complete: () => {
        resolve(responseDate)
        if ((data as AnyObject).showLoading) {
          hideLoading()
        }
      }
    })
  })
}

export const request = {
  get: <T = any>(option: Omit<UniApp.RequestOptions, 'method'>): Promise<T> =>
    baseRequest(MethodType.GET, option) as Promise<T>,
  post: <T = any>(option: Omit<UniApp.RequestOptions, 'method'>): Promise<T> =>
    baseRequest(MethodType.POST, option) as Promise<T>
}
