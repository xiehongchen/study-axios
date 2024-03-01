import { RequstInterceptors } from './type'
import type { AxiosError } from 'axios'
import axios from 'axios'
import AxiosTest from "./Axios"
import { retry } from './axiosRetry'
import { checkErrorStatus } from './checkErrorStatus'
import staticAxiosConfig from './config'
import { stopRequest } from '@/store/index'
import AbortAxios from './AbortAxios'

const _RequstInterceptors: RequstInterceptors = {
  // 请求拦截器
  requestInterceptors(config) {
    // console.log('stopRequest', stopRequest)
    // const abortAxios = new AbortAxios()
    // abortAxios.addPending(config)
    return config
  },
  // 请求错误拦截器
  requestInterceptorsCatch(err) {
    return err
  },
  // 响应拦截器
  responseInterceptor(config) {
    return config
  },
  // 响应错误拦截器
  responseInterceptorsCatch(axiosInstance, err: AxiosError) {
    let message = err.code === 'ECONNABORTED' ? '请求超时' : undefined
    if (axios.isCancel(err)) {
      return Promise.reject(err);
    }
    console.log(err)
    checkErrorStatus((err as AxiosError).response?.status, message,  (message) => console.log(message))
    return retry(axiosInstance, err as AxiosError)
  },
}

const useRequest = new AxiosTest({
  directlyGetData: true,
  baseURL: staticAxiosConfig.baseUrl,
  timeout: 3000,
  interceptors: _RequstInterceptors,
  abortRepetitiveRequest: true,
  retryConfig: {
    count: 1,
    waitTime: 500
  }
})

export default useRequest