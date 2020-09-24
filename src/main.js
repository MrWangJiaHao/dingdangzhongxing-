import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import axios from 'axios'

import iView from 'iview';
import 'iview/dist/styles/iview.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/Toast.css";
import "./assets/css/index.css";
import VueCookie from 'vue-cookie'
import Lodop from './assets/js/LodopFuncs'
Vue.use(Lodop)
Vue.use(VueCookie)

Vue.use(ElementUI).use(iView)
Vue.prototype.$axios = axios


// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
