/**
 /** 请求工具类
 /**
 /**/
import axios, { AxiosResponse } from 'axios'


const axiosInstance = axios.create({
  timeout: 60000,
  withCredentials: true
})


// 根据不同的环境配置不同的baseUrl
let AXIOS_BASE_URL = 'http://localhost:8000'

console.log('当前axios的baseUrl路径', AXIOS_BASE_URL)
axiosInstance.defaults.baseURL = AXIOS_BASE_URL

// 随机字符串生成
function nonce () {
  return Date.now().toString().slice(5) + Math.ceil(Math.random() * 100000000)
}

// 请求的中间拦截
axiosInstance.interceptors.request.use(async function (config) {
  return config
}, function (error) {
  Promise.reject(error)
})

// 返回拦截的中间处理函数
let handlers: Array<Function> = []

// 未登录，直接跳转到登录页； 需要激活，跳转到激活页面
handlers.push(function (response: AxiosResponse) {
  // TODO: 判断未登录，需要重新登录
  if (response.status == 403) { // forbidden, need to login
    window.location.href = '/login'
    return
  }
})


// 请求返回的中间拦截, response: {data: Object, status: 200, statusText: "OK", headers: Object, config: Object, request: XMLHttpRequest }
axiosInstance.interceptors.response.use(function (response: AxiosResponse) {
  console.log('请求中间拦截', response)
  for (let i = 0; i < handlers.length; i++) {
    handlers[i](response)
  }
  return response
}, function (error) {
  console.error('Axios Error: ', error)
  return Promise.reject(error)
})

class Net {

  public get (url: string, params: any): Promise<AxiosResponse> {
    let _params = params || {}
    return axiosInstance.get(url, { params: _params })
  }

  public post (url: string, params: any, config: any): Promise<AxiosResponse> {
    let _params = params || {}
    return axiosInstance.post(url, _params, config)
  }
}

export default new Net()
