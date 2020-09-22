import Vue from 'vue'
import VueRouter from 'vue-router'

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
  {
    path: '*',
    name: 'notfount',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

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