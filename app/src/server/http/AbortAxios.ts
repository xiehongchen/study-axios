/*
 * @Author: xiehongchen 1754581057@qq.com
 * @Date: 2024-03-01 11:59:46
 * @LastEditors: xiehongchen 1754581057@qq.com
 * @LastEditTime: 2024-03-01 18:27:40
 * @FilePath: /study-axios/app/src/server/http/AbortAxios.ts
 * @Description: 
 * 认真学习每一天
 */
import { AxiosRequestConfig } from "axios"

/**
 * 用于存储控制器
 */
const pendingMap = new Map<string, AbortController>()

/**
 * 创建各请求唯一标识
 * @param config 
 * @returns 
 */
const getUrl = (config: AxiosRequestConfig) => {
  return [config.url, config.method].join(':')
}

class AbortAxios {
  /**
   * 添加请求
   * @param config 请求配置
   */
  addPending(config: AxiosRequestConfig) {
    console.log('pendingMap---before', Object.fromEntries(pendingMap))
    this.removePending(config)
    const url = getUrl(config)
    const abortController = new AbortController()
    config.signal = abortController.signal
    if (!pendingMap.has(url)) {
      pendingMap.set(url, abortController)
    }
    console.log('pendingMap---after', Object.fromEntries(pendingMap))
  }

  /**
   * 删除指定的请求
   * @param config 请求配置
   */
  removePending(config: AxiosRequestConfig) {
    const url = getUrl(config)
    if (pendingMap.has(url)) {
      const abortController = pendingMap.get(url)
      abortController?.abort()
      pendingMap.delete(url)
    }
  }

  /**
   * 清除所有等待中的请求
   */
  removeAllPending() {
    pendingMap.forEach((abortController) => {
      abortController.abort()
    })
    this.clear()
  }

  /**
   * 重置
   */
  clear() {
    pendingMap.clear()
  }

  getAllPending() {
    return pendingMap
  }
}

export default AbortAxios