<script setup lang="ts">
import useRequest from '@/server/http/index'
import { stopRequest } from '@/store/index'
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
}
const start = () => {
  stopRequest.value = true
}
</script>

<template>
  <div class="app">
    <button @click="get">发送get请求</button>
    <button @click="post">发送post请求</button>
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
