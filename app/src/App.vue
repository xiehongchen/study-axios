<script setup lang="ts">
import useRequest from '@/server/http/index'
import { stopRequest } from '@/store/index'
import AbortAxios from '@/server/http/AbortAxios'
const abortAxios = new AbortAxios()


const get = () => {
  useRequest.get({
    url: '/a'
  }).then((res) => console.log('GET:', res))
}

const post = () => {
  useRequest.post({
    url: '/b',
    data: {
      message: 'POST'
    }
  }).then((data) => console.log('POST:', data))
}

const retryGet = () => {
  useRequest.get({
    url: '/c'
  }).then((res) => console.log('GET:', res)).catch(err => {
    console.log('Err', err)
  })
}
const stop = () => {
  stopRequest.value = false
  console.log('abortAxios', abortAxios.getAllPending())
  const map = abortAxios.getAllPending()
  map.forEach((abortController) => {
    abortController.abort()
  })
  console.log('abortAxios', abortAxios.getAllPending())
}
const start = () => {
  stopRequest.value = true
}
const more = () => {
  post()
  get()
  d()
  e()
}
const d = () => {
  useRequest.post({
    url: '/d',
    data: {
      message: 'POST'
    }
  }).then((data) => console.log('POST:', data)).catch(err => {
    console.log('Err', err)
  })
}
const e = () => {
  useRequest.post({
    url: '/e',
    data: {
      message: 'POST'
    }
  }).then((data) => console.log('POST:', data)).catch(err => {
    console.log('Err', err)
  })
}
</script>

<template>
  <div class="app">
    <button @click="get">发送get请求</button>
    <button @click="post">发送post请求</button>
    <button @click="more">发送多个请求</button>
    <button @click="retryGet">重复执行GET请求</button>
    <button @click="stop">停止请求</button>
    <button @click="start">开始请求</button>
  </div>
</template>

<style scoped>
.app {
  button {
    margin: 0 5px;
  }
}
</style>
