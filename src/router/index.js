import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/indexs',
    name: 'indexs',
    component: () => import('../views//indexs.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue')
  },
  {
    path: "/footerDemo",
    name: 'footerDemo',
    component: () => import("../views/demo/demo.vue")
  },
  {
    path: '*',
    name: 'notfount',
    component: () => import('../views/404.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

// router.beforeEach((to, from, next) => {
//   if (to.path === "/login") {
//     let isWindows = /windows|win32/i.test(navigator.userAgent)
//     if (isWindows === "window") {
//       console.log(window.navigator.userAgent)
//     }
//     next()
//   }
// })