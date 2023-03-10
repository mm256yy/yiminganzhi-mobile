import { hideLoading, showLoading, getHeaderCommonParams, env } from '@/config'
import { isAndroid, isIos } from './platform'
import { routerForward } from './router'

enum MethodType {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT'
}

function rejectHandle(err: Http.Result, reject: any) {
  console.log('rejectHandle :', err)
  switch (err.code) {
    case 401:
      console.log('登录失效')
      // 登录失效
      routerForward('login')
      reject(err)
      break
    default:
      uni.showToast({
        title: err.message || '正在排队中，请稍后！',
        icon: 'none'
      })
      reject(err)
      break
  }
}

const apiBaseUrl = isAndroid || isIos ? `${env.apiBaseUrl}${env.apiBasePath}` : env.apiBasePath
// 'application/x-www-form-urlencoded'

function baseRequest(method: MethodType, option: UniApp.RequestOptions) {
  const { header = {}, data = {}, url } = option
  return new Promise((resolve, reject) => {
    if ((data as AnyObject).showLoading) {
      showLoading((data as AnyObject).loadingOptions)
    }

    delete (data as AnyObject).isLoading
    console.log('接口参数：', data)
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
        console.log('接口返回 suc', res)
        if (res.statusCode >= 200 && res.statusCode < 400) {
          if (res.data.code === 0) {
            resolve(res.data.data)
          } else {
            console.log('-1')
            rejectHandle(res.data, reject)
          }
        } else if (res.statusCode === 400) {
          if (res.data.code === -2 || res.data.code === -3) {
            console.log('-2, -3')
            reject(res.data)
          } else {
            rejectHandle(res.data, reject)
          }
        } else {
          rejectHandle(res.data, reject)
        }
      },
      fail: (err) => {
        console.log('接口返回 err：', err)
        rejectHandle(
          {
            code: -1,
            message: '网络不给力，请检查你的网络设置~',
            data: null
          },
          reject
        )
      },
      complete: () => {
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
