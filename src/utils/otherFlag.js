import Vue from 'vue'
import { pOrgProductsApp } from "../api/api";
import { clearArr, getJsonTarget } from "./validate"

Vue.prototype.$pOrgProductsApp = pOrgProductsApp //货品移位
Vue.prototype.$clearArr = clearArr// 删除语录
Vue.prototype.$getJsonTarget = getJsonTarget //[{id:""},{id:""}]