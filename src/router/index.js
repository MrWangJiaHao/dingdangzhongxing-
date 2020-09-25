import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/indexs',
  name: 'indexs',
  redirect: '/index',
  component: () => import('../views/indexs.vue'),
  children: [{
    //首页页面
    path: '/index',
    name: 'index',
    redirect: '/index/indexFormJH',
    component: () => import('../views/index/index.vue'),
    meta: {
      Breadcrumb: ["首页", "数据"],
      path: "/index"
    },
    children: [{
      path: '/index/indexFormFH',
      name: 'indexFormFH',
      component: () => import('../views/index/indexForm/indexFormFH.vue'),
    },
    {
      path: '/index/indexFormJH',
      name: 'indexFormJH',
      component: () => import('../views/index/indexForm/indexFormJH.vue'),
    },
    ]
  },
  {
    //用户管理页面
    path: "/systemSetting/userSetting",
    name: 'systemSetting/userSetting',
    component: () => import("../views/systemSetting/userSetting.vue"),
    meta: {
      Breadcrumb: "用户管理",
      title: "用户管理"
    }
  },

  {
    //角色管理页面
    path: "/systemSetting/userControl",
    name: 'systemSetting/userControl',
    component: () => import("../views/systemSetting/userControl.vue"),
    meta: {
      Breadcrumb: "创建用户",
      title: "用户管理"

    }
  },
  {
    //仓库配置页面
    path: '/warehouseConfig',
    name: 'warehouseConfig',
    component: () => import('../views/warehouseConfig.vue'),
    meta: {
      Breadcrumb: "仓库配置",
      title: "仓库配置"

    }
  },
  {
    //发货规则配置页面
    path: '/shipmentsRuleConfig',
    name: 'shipmentsRuleConfig',
    component: () => import('../views/shipmentsRuleConfig.vue'),
    meta: {
      Breadcrumb: "发货规则配置",
      title: "发货规则配置"
    }
  },
  {
    //仓库配置=>区域管理
    path: "/warehoseconfig/regionalManagements",
    name: "/warehoseconfig/regionalManagements",
    component: () => import("../views/warehoseConfig/regionalManagements"),
    meta: {
      Breadcrumb: "区域管理",
      title: "区域管理"
    }
  },
  {
    path: "/systemSetting/userControl/setAuthority",
    name: 'systemSetting/setAuthority',
    component: () => import("../views/systemSetting/setAuthority.vue")
  },
  {
    path: '*',
    name: 'notfount',
    component: () => import('../views/404.vue')
  },{
    //仓库配置=>区域管理=>创建子仓
    path: "/warehoseconfig/createWarehouseConfig",
    name: "/warehoseconfig/createWarehouseConfig",
    component: () => import("../views/warehoseConfig/createWarehouseConfig"),
    meta: {
      Breadcrumb: "创建子仓",
      title: "创建子仓"
    }
  },
  {
    //仓库配置=>区域管理=>编辑子仓
    path: "/warehoseconfig/editWarehouseConfig",
    name: "/warehoseconfig/editWarehouseConfig",
    component: () => import("../views/warehoseConfig/editWarehouseConfig"),
    meta: {
      Breadcrumb: "编辑子仓",
      title: "编辑子仓"
    }
  }
  ]
},
{
  path: "/footerDemo",
  name: 'footerDemo',
  component: () => import("../views/demo/demo.vue")
},
{
  path: "/systemSetting/setUserIng",
  name: 'systemSetting/setUserIng',
  component: () => import("../views/systemSetting/setUserIng.vue")
},
{
  path: "/systemSetting/editUserIng",
  name: 'systemSetting/editUserIng',
  component: () => import("../views/systemSetting/editUserIng.vue")
},
{
  path: "/systemSetting/lookUser",
  name: 'systemSetting/lookUser',
  component: () => import("../views/systemSetting/lookUser.vue")
},
{
  path: '*',
  name: 'notfount',
  component: () => import('../views/404.vue')
},
{
  path: '/',
  name: 'Login',
  component: () => import('../views/login/login.vue')
},
]
//默认进入登录页

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

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