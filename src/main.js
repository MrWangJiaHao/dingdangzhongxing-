/*eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import service from './utils/request'
import {
  DatePicker
} from 'iview';
import 'iview/dist/styles/iview.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/Toast.css";
import "./assets/css/index.css";
import VueCookie from 'vue-cookie'
import Lodop from './assets/js/LodopFuncs'
import qrcode from './assets/js/qrcode'
import "./assets/js/rem";
import animated from 'animate.css';
import {
  _isEmpty
} from "./utils/validate"; //判断是否为空4  
Vue.use(animated)
import messageSelf from "./assets/js/toast"; //自定义弹框
import isChaXun from "./assets/js/isChaXun"; //是否要展示

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import './assets/scss/index.scss'

NProgress.configure({
  easing: 'ease', // 动画方式    
  speed: 500, // 递增进度条的速度    
  showSpinner: false, // 是否显示加载ico    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.3 // 初始化时的最小百分比
})

router.beforeEach((to, from, next) => {
  // 每次切换页面时，调用进度条
  NProgress.start();
  next();
})
router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})

// import $ from 'jquery'
// Vue.prototype.$ = $
Vue.component('DatePicker', DatePicker)
Vue.use(Lodop)
Vue.use(VueCookie)

Vue.use(ElementUI).use(qrcode)
Vue.prototype.$service = service
Vue.prototype.$isEmpty = _isEmpty

// import 'lib-flexible'
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.prototype.$messageSelf = messageSelf
Vue.prototype.$isChaXun = isChaXun

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')