import Vue from 'vue'
import VueRouter from 'vue-router'
<<<<<<< HEAD

Vue.use(VueRouter)

const routes = [{

    path: '/indexs',
    name: 'indexs',
    component: () => import('../views/indexs.vue'),
    children: [{
        //首页页面
        path: '/index',
        name: 'index',
        component: () => import('../views/index.vue'),
        meta:{
          Breadcrumb:["首页","数据"],
          path:"/index"
        }
      },
      {
        //仓库配置页面
        path: '/warehouseConfig',
        name: 'warehouseConfig',
        component: () => import('../views/warehouseConfig.vue'),
        meta:{
          Breadcrumb:"仓库配置"
        }
      },
      {
        //发货规则配置页面
        path: '/shipmentsRuleConfig',
        name: 'shipmentsRuleConfig',
        component: () => import('../views/shipmentsRuleConfig.vue'),
        meta:{
          Breadcrumb:"发货规则配置"
        }
      },
    ]
  },


  //默认进入登录页
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/login.vue')
  },

  //404页面
=======
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
    path: "/systemSetting/userSetting",
    name: 'systemSetting/userSetting',
    component: () => import("../views/systemSetting/userSetting.vue")
  },
  {
    path: "/systemSetting/setUserIng",
    name: 'systemSetting/setUserIng',
    component: () => import("../views/systemSetting/setUserIng.vue")
  },
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
  {
    path: '*',
    name: 'notfount',
    component: () => import('../views/404.vue')
<<<<<<< HEAD
  }
=======
  },

>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

<<<<<<< HEAD
router.beforeEach((to, from, next) => {
  if (to.path === "/") {
    let isWindows = /windows|win32/i.test(navigator.userAgent)
    if (isWindows === true) {
      console.log("这是windows系统")
    } else {
      console.log("这是mac系统")
    }
  }
  next()
})
=======
// router.beforeEach((to, from, next) => {
//   if (to.path === "/login") {
//     let isWindows = /windows|win32/i.test(navigator.userAgent)
//     if (isWindows === "window") {
//       console.log(window.navigator.userAgent)
//     }
//     next()
//   }
// })
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
