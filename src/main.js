/*eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import service from './utils/request'
import { DatePicker } from 'iview';
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

Vue.use(animated)
import messageSelf from "./assets/js/toast"; //自定义弹框

// import $ from 'jquery'
// Vue.prototype.$ = $
Vue.component('DatePicker', DatePicker)
Vue.use(Lodop)
Vue.use(VueCookie)

Vue.use(ElementUI).use(qrcode)
Vue.prototype.$service = service

// import 'lib-flexible'
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.prototype.$messageSelf = messageSelf

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
