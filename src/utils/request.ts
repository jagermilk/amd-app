import { getToken } from '@/utils/auth'
import { tansParams,showConfirm } from '@/utils/common'
import { useAppStore, useUserStore } from '@/store'
import type { UncertainResult } from '@/types/models/base'
import type { AnyFunc } from '@/types/common'
// import { forward } from './router'


function getLanguage() {
  return uni.getStorageSync('lang') || 'en'
}

function toShowConfirm(){
  showConfirm(
    uni.getStorageSync('lang') == 'en'
      ? 'Login expired, please log in again'
      : '登录过期，请重新登录'
  ).then(() => {
    useUserStore().logout()
    //forward('Login')
  })
}
const TIMEOUT = 10000
export interface Result<T = any> {
  code: number
  msg: string
  data: T
}

type MethodType =
  | 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT'

class Request {
  public request<T = any>(
    method: MethodType,
    url: string,
    data?: Record<string, any>
  ) {
    const token = getToken()
    return new Promise<T>((resolve, reject) => {
      let result: any
      uni.request({
        url: import.meta.env.VITE_BASE_URL + url,
        
        method,
        timeout: 15000,
        dataType: 'json',
        mpserverlessComposedResponse:true,
        header: {
          'content-type': 'application/json',
          'Accept':'application/json',
          'Cache-Control':'no-cache',
          // 'x-app-lang-id': getLanguage(),
          'Authorization': token ? `Bearer ${token}` : '',
        },
        data,
        success: (res) => {
          result = res.data
          if (!result) throw new Error('[HTTP] Request has no return value')
        },
        fail: (err) => {
          reject(err)
        },
        complete: () => {
             resolve(result)
        },
      })
    })
  }

  // only support image/video, see:
  // https://uniapp.dcloud.net.cn/api/request/network-file.html#uploadfile
  public uploadFileRequest<T = any>(
    config: CustomizedOption<UniApp.UploadFileOption>
  ) {
    return new Promise<T>((resolve, reject) => {
      uni.uploadFile({
        ...this.interceptRequest(config),
        success: (res) => {
          this.interceptResponse(JSON.parse(res.data), resolve, reject)
        },
        fail: (error) => {
          reject(error)
        },
      })
    })
  }

  private get token() {
    return getToken()
  }

  private get userStore() {
    return useUserStore()
  }

  private interceptRequest(
    options: CustomizedOption<UniApp.RequestOptions | UniApp.UploadFileOption>
  ) {
    let url = import.meta.env.VITE_BASE_URL + options.url
    if (options.query) {
      url = `${url}?${tansParams(options.query)}`
    }
    return {
      ...options,
      url,
      timeout: options?.timeout || TIMEOUT,
      header: {
        ...options?.header,
        'Iidop-Source': 'iidop-web',
        'x-app-lang-id': 'zh_CN',
        'content-type': 'application/json',
        Authorization: this.token ? `Bearer ${this.token}` : '',
      },
    }
  }

  private interceptResponse(
    result: UncertainResult,
    resolve: AnyFunc,
    reject: AnyFunc
  ) {
    // if (!result) throw new Error('[HTTP] Request has no return value')
    // const { code, msg } = result
    // const hasSuccess = result && Reflect.has(result, 'code') && code === 200
    // if (hasSuccess) {
      resolve(result)
    // } else if (code === 401) {
    //   showConfirm(
    //     uni.getStorageSync('lang') == 'en'
    //       ? 'Login expired, please log in again'
    //       : '登录过期，请重新登录',
    //     '去登录'
    //   ).then(() => {
    //     useUserStore().logout()
    //     //forward('Login')
    //   })
    //   reject(new Error(msg || 'Request 401'))
    // } else {
    //   uni.showToast({ title: msg, icon: 'none' })
    //   reject(new Error(msg || 'Error'))
    // }
  }

  public get<T = any>(url: string, data?: Record<string, any>) {
    if (data) {
      url = `${url}?${tansParams(data)}`
    }
    return this.request<T>('GET', url)
  }

  public post<T = any>(
    url: string,
    data?: Record<string, any>,
    query?: Record<string, any>
  ) {
    if (query) {
      url = `${url}?${tansParams(query)}`
    }
    return this.request<T>('POST', url, data)
  }

  public put<T = any>(url: string, data?: Record<string, any>) {
    return this.request<T>('PUT', url, data)
  }

  public delete<T = any>(
    url: string,
    query?: Record<string, any>,
    data: Record<string, any> = {}
  ) {
    if (query) {
      url = `${url}/${query}`
    }
    return this.request<T>('DELETE', url, data)
  }

  public upload<T>(url: string, filePath: string, name = 'file') {
    return this.uploadFileRequest<T>({
      url,
      filePath,
      name,
    })
  }
}

export default new Request()
