import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import merge from 'lodash/merge'
import { clearLoginInfo } from '@/utils'

<<<<<<< HEAD
const service = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
=======
const http = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    "appNo": "F94CB9F5262F46DCB171CECD6FE1193B",
    "userType": 4
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
  }
})

/**
 * 请求拦截
 */
<<<<<<< HEAD
service.interceptors.request.use(config => {
=======
http.interceptors.request.use(config => {
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
  config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
<<<<<<< HEAD
service.interceptors.response.use(response => {
=======
http.interceptors.response.use(response => {
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
  if (response.data && response.data.code === 401) { // 401, token失效
    clearLoginInfo()
    router.push({ name: 'login' })
  }
  return response
}, error => {
  return Promise.reject(error)
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
<<<<<<< HEAD
service.adornUrl = (actionName) => {
=======
http.adornUrl = (actionName) => {
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : window.SITE_CONFIG.baseUrl) + actionName
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
<<<<<<< HEAD
service.adornParams = (params = {}, openDefultParams = true) => {
=======
http.adornParams = (params = {}, openDefultParams = true) => {
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
  var defaults = {
    't': new Date().getTime()
  }
  return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
<<<<<<< HEAD
service.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
=======
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
  var defaults = {
    't': new Date().getTime()
  }
  data = openDefultdata ? merge(defaults, data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

export default service
