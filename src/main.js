import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueCookie from 'vue-cookie'
Vue.use(VueCookie)
<<<<<<< HEAD

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import axios from 'axios'
Vue.prototype.$axios = axios

// import '@/element-ui'
// import '@/element-ui-theme'


=======
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/Toast.css";
import "./assets/css/index.css";
Vue.use(ElementUI).use(iView)
import axios from 'axios'

Vue.prototype.$axios = axios
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
