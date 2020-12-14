import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import merge from 'lodash/merge'
import { clearLoginInfo } from '@/utils'
import { getCookie } from './validate'

const getHref = function () {
  let href = window.location.href
  if (href.includes("systemSetting")) {
    return "http://139.196.176.227:8801"
  } else {
    return "http://139.196.176.227:8902"
  }
}
const service = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  baseURL: getHref(),
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    "appNo": "F94CB9F5262F46DCB171CECD6FE1193B",
    "userType": 4,
    "X-Auth-wareId": getCookie("X-Auth-wareId"),
    "X-Auth-user": getCookie("X-Auth-user"),
    "X-Auth-name": getCookie("userName"),
    "X-Auth-wareName": "",
    "X-Auth-Id": "AA4EBC35E2544E7688E2F4230F3F5E30",
    "X-Auth-orgId": "FC4AD500BE8E4B5FB58CCAE7B519FB6F"
  }
})

/**
 * 请求拦截
 */
service.interceptors.request.use(config => {
  config.baseURL = getHref()
  config.headers['X-Auth-Token'] = Vue.cookie.get('userToken') // 请求头带上token
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
    router.push({ name: '/' })
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
