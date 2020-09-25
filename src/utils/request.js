import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import merge from 'lodash/merge'
import { clearLoginInfo } from '@/utils'

const service = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
   'Content-Type': 'application/json; charset=utf-8',
    "appNo": "F94CB9F5262F46DCB171CECD6FE1193B",
    "userType": 4,
    "X-Auth-Token": "2e9bf77a-44ae-4dfc-b670-d002cdd7b38f",
    "X-Auth-wareId": "43C86919FC7E4360838AA522B361A242",
    "X-Auth-user": "41C062F90AA246B8A67EC763329D1F21",
    "X-Auth-name":"",
    "X-Auth-wareName":"",
  }
})
//"X-Auth-orgId":"FC4AD500BE8E4B5FB58CCAE7B519FB6F",
// 'Content-Type': 'application/json; charset=utf-8',
// "appNo": "F94CB9F5262F46DCB171CECD6FE1193B",
// "userType": 4,
// "X-Auth-Token": "7ad69c50-3374-4ff7-9da8-13541f371845",
// "X-Auth-wareId": "43C86919FC7E4360838AA522B361A242"

/**
 * 请求拦截
 */
service.interceptors.request.use(config => {
  config.headers['X-Auth-Token'] = Vue.cookie.get('X-Auth-Token') // 请求头带上token
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
service.interceptors.response.use(response => {
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
service.adornUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : window.SITE_CONFIG.baseUrl) + actionName
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
service.adornParams = (params = {}, openDefultParams = true) => {
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
service.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
  var defaults = {
    't': new Date().getTime()
  }
  data = openDefultdata ? merge(defaults, data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

export default service
