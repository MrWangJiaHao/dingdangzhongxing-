import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  getCookie
} from '../utils/validate'

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
    //仓库配置=>子仓管理
    path: "/warehoseconfig/childWarehouseAdmin",
    name: "/warehoseconfig/childWarehouseAdmin",
    component: () => import("../views/warehoseConfig/childWarehouseAdmin.vue"),
    meta: {

    }
  },
  //仓库配置=>子仓管理=>创建子仓
  {
    path: "/warehoseConfig/addChildWarehouse",
    name: '/warehoseConfig/addChildWarehouse',
    component: () => import("../views/warehoseConfig/addChildWarehouse.vue")
  },
  //仓库配置=>子仓管理=>编辑子仓
  {
    path: "/warehoseConfig/editChildWarehouse",
    name: 'editChildWarehouse',
    component: () => import("../views/warehoseConfig/editChildWarehouse.vue")
  },
  {
    //仓库配置=>库位管理
    path: "/warehoseconfig/storageLocalAdmins",
    name: "/warehoseconfig/storageLocalAdmins",
    component: () => import("../views/warehoseConfig/storageLocalAdmins"),
    meta: {

    }
  },
  {
    //仓库配置=>库位映射
    path: "/warehoseconfig/storageLocalMap",
    name: "/warehoseconfig/storageLocalMap",
    component: () => import("../views/warehoseConfig/storageLocalMap"),
    meta: {

    }
  },
  {
    //仓库配置=>库位映射详情页
    path: "/storageLocalMap/SLmapInfor",
    name: "/storageLocalMap/SLmapInfor",
    component: () => import("../views/warehoseConfig/SLmapInfor.vue"),
    meta: {

    }
  },
  {
    //仓库配置=>库位映射=>库位信息
    path: "/storageLocalMap/storageLocalDetail",
    name: "/storageLocalMap/storageLocalDetail",
    component: () => import("../views/warehoseConfig/storageLocalDetail.vue"),
    meta: {

    }
  },
  {
    //仓库配置=>区域管理=>货架设置
    path: "/warehoseconfig/shelfSetting",
    name: "/warehoseconfig/shelfSetting",
    component: () => import("../views/warehoseConfig/shelfSetting"),
    meta: {
      Breadcrumb: "区域管理",
      title: "货架设置"
    }
  },
  {
    //warehousingManagement =》手工创建入库
    // 入库管理=>创建入库
    path: "/warehousingManagement/manualManagement/:type",
    name: "/warehousingManagement/manualManagement",
    component: () => import("../views/wareHouseIngManagement/manualManagement"),
    meta: {
      Breadcrumb: "手工创建入库",
      title: "手工创建入库"
    }
  },
  //---------------------------------------------------------出库管理模块开始-------------------------------------------------------------------------------------------
  {
    //warehousingManagement =》手工创建入库
    // 入库管理=>出库管理
    path: "/warehouseManagement/warehouseIndex/:type",
    name: "/warehouseManagement/warehouseIndex",
    component: () => import("../views/warehouseManagement/warehouseIndex"),
    meta: {
      Breadcrumb: "出库管理",
      title: "出库管理"
    }
  },
  //---------------------------------------------------------出库管理模块结束-------------------------------------------------------------------------------------------

  //---------------------------------------------------------物料中心模块开始-------------------------------------------------------------------------------------------
  {
    // 物料中心=>供应商管理
    path: "/suppliesCenter/supplierAdmin",
    name: "/suppliesCenter/supplierAdmin",
    component: () => import("../views//suppliesCenter/supplierAdmin"),
    meta: {
      Breadcrumb: "供应商管理",
      title: "供应商管理"
    }
  },
  {
    // 物料中心=>品牌管理
    path: "/suppliesCenter/brandAdmin",
    name: "/suppliesCenter/brandAdmin",
    component: () => import("../views//suppliesCenter/brandAdmin"),
    meta: {
      Breadcrumb: "品牌管理",
      title: "品牌管理"
    }
  },
  {
    // 物料中心=>规格管理
    path: "/suppliesCenter/specificationAdmin",
    name: "/suppliesCenter/specificationAdmin",
    component: () => import("../views//suppliesCenter/specificationAdmin"),
    meta: {
      Breadcrumb: "规格管理",
      title: "规格管理"
    }
  },
  {
    // 物料中心=>物料库存
    path: "/suppliesCenter/suppliesInventory",
    name: "/suppliesCenter/suppliesInventory",
    component: () => import("../views//suppliesCenter/suppliesInventory"),
    meta: {
      Breadcrumb: "物料库存",
      title: "物料库存"
    }
  },
  {
    // 物料中心=>物料管理
    path: "/suppliesCenter/materialAdmin",
    name: "/suppliesCenter/materialAdmin",
    component: () => import("../views//suppliesCenter/materialAdmin"),
    meta: {
      Breadcrumb: "物料管理",
      title: "物料管理"
    }
  },
  {
    // 物料中心=>物料记录
    path: "/suppliesCenter/suppliesRecord",
    name: "/suppliesCenter/suppliesRecord",
    component: () => import("../views//suppliesCenter/suppliesRecord"),
    meta: {
      Breadcrumb: "物料记录",
      title: "物料记录"
    }
  },
    //----------------------------------------------------------物料中心模块结束-----------------------------------------------------------------------------------------
  ]
},
{
  //warehousingManagement 创建入库单
  // 入库管理 => 创建入库 =》 创建入库单
  path: "/warehousingManagement/createManagement",
  name: "/warehousingManagement/createManagement",
  component: () => import("../views/wareHouseIngManagement/createManagement"),
  meta: {
    Breadcrumb: "创建入库单",
    title: "创建入库单"
  }
},


{
  path: "/indexdemo",
  name: "/indexdemo",
  component: () => import("../views/demo/indexdemo.vue")
},

{
  //warehousingManagement 入库确认
  // 入库管理 => 创建入库 =》 入库确认
  path: "/warehousingManagement/manageMentrukuSure",
  name: "/warehousingManagement/manageMentrukuSure",
  component: () => import("../views/wareHouseIngManagement/manageMentrukuSure"),
  meta: {
    Breadcrumb: "入库确认",
    title: "入库确认"
  }
},
//设置权限页面
{
  path: "/systemSetting/userControl/setAuthority",
  name: 'systemSetting/setAuthority',
  component: () => import("../views/systemSetting/setAuthority.vue")
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
  //仓库配置=>区域管理=>创建子仓
  path: "/warehoseconfig/editWarehouseConfig",
  name: "/warehoseconfig/editWarehouseConfig",
  component: () => import("../views/warehoseConfig/editWarehouseConfig"),
  meta: {
    Breadcrumb: "创建子仓",
    title: "创建子仓"
  }
},
// 
//默认进入登录页
{
  path: '/',
  name: 'Login',
  component: () => import('../views/login/login.vue')
},
//----------------------------------------------------------物料中心模块结束-----------------------------------------------------------------------------------------
{
  //warehousingManagement 创建入库单
  // 入库管理 => 创建入库 =》 创建入库单
  path: "/warehousingManagement/createManagement",
  name: "/warehousingManagement/createManagement",
  component: () => import("../views/wareHouseIngManagement/createManagement"),
  meta: {
    Breadcrumb: "创建入库单",
    title: "创建入库单"
  }
},
{
  //warehousingManagement 入库确认
  // 入库管理 => 创建入库 =》 入库确认
  path: "/warehousingManagement/manageMentrukuSure",
  name: "/warehousingManagement/manageMentrukuSure",
  component: () => import("../views/wareHouseIngManagement/manageMentrukuSure"),
  meta: {
    Breadcrumb: "入库确认",
    title: "入库确认"
  }
},
//设置权限页面
{
  path: "/systemSetting/userControl/setAuthority",
  name: 'systemSetting/setAuthority',
  component: () => import("../views/systemSetting/setAuthority.vue")
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
// /warehousingManagement/createWarehouse
{
  //warehousingManagement =》手工创建入库
  // 入库管理=>出库管理
  path: "/warehouseManagement/createWarehouse",
  name: "/warehouseManagement/createWarehouse",
  component: () => import("../views/warehouseManagement/createWarehouse"),
  meta: {
    Breadcrumb: "创建出库单",
    title: "创建出库单"
  }
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
  //仓库配置=>区域管理=>创建子仓
  path: "/warehoseconfig/editWarehouseConfig",
  name: "/warehoseconfig/editWarehouseConfig",
  component: () => import("../views/warehoseConfig/editWarehouseConfig"),
  meta: {
    Breadcrumb: "创建子仓",
    title: "创建子仓"
  }
},
// 
//默认进入登录页
{
  path: '/',
  name: 'Login',
  component: () => import('../views/login/login.vue')
},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let cookie = getCookie("userToken");
  if (cookie == "") {
    if (to.path === "/") {
      next()
    } else {
      next({
        path: "/"
      })
    }
  } else {
    next()
  }
})
export default router

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}