/*eslint-disable */
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
            meta: {}
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
            meta: {}
        },
        {
            //仓库配置=>库位映射
            path: "/warehoseconfig/storageLocalMap",
            name: "/warehoseconfig/storageLocalMap",
            component: () => import("../views/warehoseConfig/storageLocalMap"),
            meta: {}
        },
        {
            //仓库配置=>库位映射详情页
            path: "/storageLocalMap/SLmapInfor",
            name: "/storageLocalMap/SLmapInfor",
            component: () => import("../views/warehoseConfig/SLmapInfor.vue"),
            meta: {}
        },
        {
            //仓库配置=>库位映射=>库位信息
            path: "/storageLocalMap/storageLocalDetail",
            name: "/storageLocalMap/storageLocalDetail",
            component: () => import("../views/warehoseConfig/storageLocalDetail.vue"),
            meta: {}
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
            component: () => import("../views/suppliesCenter/supplierAdmin"),
            meta: {
                Breadcrumb: "供应商管理",
                title: "供应商管理"
            }
        },
        {
            // 物料中心=>品牌管理
            path: "/suppliesCenter/brandAdmin",
            name: "/suppliesCenter/brandAdmin",
            component: () => import("../views/suppliesCenter/brandAdmin"),
            meta: {
                Breadcrumb: "品牌管理",
                title: "品牌管理"
            }
        },
        {
            // 物料中心=>规格管理
            path: "/suppliesCenter/specificationAdmin",
            name: "/suppliesCenter/specificationAdmin",
            component: () => import("../views/suppliesCenter/specificationAdmin"),
            meta: {
                Breadcrumb: "规格管理",
                title: "规格管理"
            }
        },
        {
            // 物料中心=>物料库存
            path: "/suppliesCenter/suppliesInventory",
            name: "/suppliesCenter/suppliesInventory",
            component: () => import("../views/suppliesCenter/suppliesInventory"),
            meta: {
                Breadcrumb: "物料库存",
                title: "物料库存"
            }
        },
        {
            // 物料中心=>物料管理
            path: "/suppliesCenter/materialAdmin",
            name: "/suppliesCenter/materialAdmin",
            component: () => import("../views/suppliesCenter/materialAdmin"),
            meta: {
                Breadcrumb: "物料管理",
                title: "物料管理"
            }
        },
        {
            // 物料中心=>物料记录
            path: "/suppliesCenter/suppliesRecord",
            name: "/suppliesCenter/suppliesRecord",
            component: () => import("../views/suppliesCenter/suppliesRecord"),
            meta: {
                Breadcrumb: "物料记录",
                title: "物料记录"
            }
        },
        //----------------------------------------------------------物料中心模块结束-----------------------------------------------------------------------------------------

        //----------------------------------------------------------物流公司信息模块开始-------------------------------------------------------------------------------------
        {
            // 物流公司信息=>查询物流公司
            path: "/phyDisComInfor/phyDisCom",
            name: "/phyDisComInfor/phyDisCom",
            component: () => import("../views/phyDisComInfor/phyDisCom"),
            meta: {
                Breadcrumb: "物流公司",
                title: "物流公司"
            }
        },
        {
            // 物流公司信息=>仓库物流信息模板
            path: "/phyDisComInfor/storePhyDisFreight",
            name: "/phyDisComInfor/storePhyDisFreight",
            component: () => import("../views/phyDisComInfor/storePhyDisFreight"),
            meta: {
                Breadcrumb: "仓库物流信息模板",
                title: "仓库物流信息模板"
            }
        },
        {
            // 物流公司信息=>委托公司运费模板
            path: "/phyDisComInfor/entrustComFreight",
            name: "/phyDisComInfor/entrustComFreight",
            component: () => import("../views/phyDisComInfor/entrustComFreight"),
            meta: {
                Breadcrumb: "仓库物流信息模板",
                title: "仓库物流信息模板"
            }
        },
        //----------------------------------------------------------物流公司信息模块结束-------------------------------------------------------------------------------------
        //===========================采购管理 start===============
        {
            // 物流公司信息=>委托公司运费模板
            path: "/purchasingManagement/purchasingIndex",
            name: "/purchasingManagement/purchasingIndex",
            component: () => import("../views/purchasingManagement/purchasingIndex"),
            meta: {
                Breadcrumb: "采购管理",
                title: "采购管理"
            }
        },
        //===========================采购管理 end===============
        // =================发货规则配置 start =============
        {
            // 发货规则配置
            path: "/pWarehouseRule/findRecordPage",
            name: "/pWarehouseRule/findRecordPage",
            component: () => import("../views/pWarehouseRule/findRecordPage"),
            meta: {
                Breadcrumb: "发货规则配置",
                title: "发货规则配置"
            }
        },
        // =================发货规则配置 end =============

        //----------------------------------------------------------订单管理开始-------------------------------------------------------------------------------------
        {
            // 订单管理=>无物流单号管理
            path: "/indentManagement/notLogisticsIndentManage",
            name: "/indentManagement/notLogisticsIndentManage",
            component: () => import("../views/indentManagement/notLogisticsIndentManage"),
        },
        {
            // 订单管理=>退货订单管理
            path: "/indentManagement/resalesIndentManage",
            name: "/indentManagement/resalesIndentManage",
            component: () => import("../views/indentManagement/resalesIndentManage"),
        },
        {
            // 订单管理=>退货订单管理=>退货订单详情页
            path: "/indentManagement/resalesOrderInfor",
            name: "/indentManagement/resalesOrderInfor",
            component: () => import("../views/indentManagement/resalesOrderInfor"),
        },
        {
            // 订单管理=>自提订单管理
            path: "/indentManagement/zitiIndentManage",
            name: "/indentManagement/zitiIndentManage",
            component: () => import("../views/indentManagement/zitiIndentManage"),
        },
        {
            // 订单管理=>自提订单管理=>取货确认
            path: "/indentManagement/takeGoodsVerity",
            name: "/indentManagement/takeGoodsVerity",
            component: () => import("../views/indentManagement/takeGoodsVerity"),
        },
        {
            // 订单管理=>销售订单管理
            path: "/indentManagement/sellIndentManage",
            name: "/indentManagement/sellIndentManage",
            component: () => import("../views/indentManagement/sellIndentManage"),
        },
        {
            // 订单管理=>缺货订单管理
            path: "/indentManagement/stockoutIndentManage",
            name: "/indentManagement/stockoutIndentManage",
            component: () => import("../views/indentManagement/stockoutIndentManage"),
        },
        {
            // 订单管理=>缺货订单管理=>缺货订单详情
            path: "/indentManagement/stockoutOrderInfor",
            name: "/indentManagement/stockoutOrderInfor",
            component: () => import("../views/indentManagement/stockoutOrderInfor"),
        },
        {
            // 订单管理=>订单详情页
            path: "/indentManagement/orderDetail",
            name: "/indentManagement/orderDetail",
            component: () => import("../views/indentManagement/orderDetail"),
        },
        {
            // 订单管理=>订单日志
            path: "/indentManagement/orderLog",
            name: "/indentManagement/orderLog",
            component: () => import("../views/indentManagement/orderLog"),
        },
        {
            // 订单管理=>子单详情
            path: "/indentManagement/childOrderDetail",
            name: "/indentManagement/childOrderDetail",
            component: () => import("../views/indentManagement/childOrderDetail"),
        },
        //----------------------------------------------------------订单管理结束-------------------------------------------------------------------------------------
        //----------------------------------------------------------报损管理开始-------------------------------------------------------------------------------------
        {
            // 报损管理主页面
            path: "/breakageManagement/breakageMain",
            name: "/breakageManagement/breakageMain",
            component: () => import("../views/breakageManagement/breakageMain"),
        },
        {
            // 报损管理=>创建报损单
            path: "/breakageManagement/createBreakageOrder",
            name: "/breakageManagement/createBreakageOrder",
            component: () => import("../views/breakageManagement/createBreakageOrder"),
        },
        {
            // 报损管理=>添加产品
            path: "/breakageManagement/addProduct",
            name: "/breakageManagement/addProduct",
            component: () => import("../views/breakageManagement/addProduct"),
        },
        {
            // 报损管理=>报损单详情
            path: "/breakageManagement/breakageOrderDetail",
            name: "/breakageManagement/breakageOrderDetail",
            component: () => import("../views/breakageManagement/breakageOrderDetail"),
        },
        //----------------------------------------------------------报损管理结束-------------------------------------------------------------------------------------
        //----------------------------------------------------------借调管理开始-------------------------------------------------------------------------------------
        {
            // 借调管理主页面
            path: "/borrowManagement/borrowMain",
            name: "/borrowManagement/borrowMain",
            component: () => import("../views/borrowManagement/borrowMain"),
        },
        {
            // 借调管理=>创建借调单
            path: "/borrowManagement/createBorrowOrder",
            name: "/borrowManagement/createBorrowOrder",
            component: () => import("../views/borrowManagement/createBorrowOrder"),
        },
        {
            // 借调管理=>添加借调
            path: "/borrowManagement/addBorrow",
            name: "/borrowManagement/addBorrow",
            component: () => import("../views/borrowManagement/addBorrow"),
        },
        {
            // 借调管理=>借调单详情
            path: "/borrowManagement/borrowOrderDetail",
            name: "/borrowManagement/borrowOrderDetail",
            component: () => import("../views/borrowManagement/borrowOrderDetail"),
        },
        //----------------------------------------------------------借调管理结束-------------------------------------------------------------------------------------
        //----------------------------------------------------------发货管理 start-------------------------------------------------------------------------------------
        {
            // 发货管理=>正常发货
            path: "/deliveryManagement/abnormalDelibery",
            name: "/deliveryManagement/abnormalDelibery",
            component: () => import("../views/deliveryManagement/abnormalDelibery"),
            meta: {
                Breadcrumb: "发货异常管理",
                title: "发货异常管理"
            }
        },
        {
            // 发货管理=>发货单打印
            path: "/deliveryManagement/delivetyNotePrint",
            name: "/deliveryManagement/delivetyNotePrint",
            component: () => import("../views/deliveryManagement/delivetyNotePrint"),
            meta: {
                Breadcrumb: "发货单打印",
                title: "发货单打印"
            }
        },
        {
            // 发货管理=>发货单打印
            path: "/deliveryManagement/normalDelivery",
            name: "/deliveryManagement/normalDelivery",
            component: () => import("../views/deliveryManagement/normalDelivery"),
            meta: {
                Breadcrumb: "正常发货",
                title: "正常发货"
            }
        },
        {
            // 发货管理=>发货单打印
            path: "/deliveryManagement/pickingList",
            name: "/deliveryManagement/pickingList",
            component: () => import("../views/deliveryManagement/pickingListes"),
            meta: {
                Breadcrumb: "拣货单管理",
                title: "拣货单管理"
            }
        },
        {
            // 发货管理=>发货单打印
            path: "/deliveryManagement/quetyNormal",
            name: "/deliveryManagement/quetyNormal",
            component: () => import("../views/deliveryManagement/quetyNormal"),
            meta: {
                Breadcrumb: "快速发货",
                title: "快速发货"
            }
        },
        //----------------------------------------------------------发货管理 end-------------------------------------------------------------------------------------
        {
            // 货品移位=>补货作业
            path: "/goodsShifting/jobTask",
            name: "/goodsShifting/jobTask",
            component: () => import("../views/goodsShifting/jobTask"),
            meta: {
                Breadcrumb: "货品移位",
                title: "补货作业"
            }
        },
        {
            // 货品移位=>库内移动
            path: "/goodsShifting/moveInLibrary",
            name: "/goodsShifting/moveInLibrary",
            component: () => import("../views/goodsShifting/moveInLibrary"),
            meta: {
                Breadcrumb: "货品移位",
                title: "库内移动"
            }
        },
        //----------------------------------------------------------统计模块开始-------------------------------------------------------------------------------------
        {
            // 统计=>发货统计
            path: "/statistics/shipmentStatistics",
            name: "/statistics/shipmentStatistics",
            component: () => import("../views/statistics/shipmentStatistics"),
        },
        {
            // 统计=>补货统计
            path: "/statistics/replenishSatistics",
            name: "/statistics/replenishSatistics",
            component: () => import("../views/statistics/replenishSatistics"),
        },
        {
            // 统计=>人工统计
            path: "/statistics/labourStatistics",
            name: "/statistics/labourStatistics",
            component: () => import("../views/statistics/labourStatistics"),
        },
        {
            // 统计=>拣货错误统计
            path: "/statistics/pickErrorStatistics",
            name: "/statistics/pickErrorStatistics",
            component: () => import("../views/statistics/pickErrorStatistics"),
        },
        {
            // 统计=>快递揽货量统计
            path: "/statistics/expressPickStatistics",
            name: "/statistics/expressPickStatistics",
            component: () => import("../views/statistics/expressPickStatistics"),
        },
        {
            // 统计=>物流费用明细
            path: "/statistics/logisticsFreesDetail",
            name: "/statistics/logisticsFreesDetail",
            component: () => import("../views/statistics/logisticsFreesDetail"),
        },
        {
            // 统计=>物流费用统计
            path: "/statistics/logisticsFreesStatistics",
            name: "/statistics/logisticsFreesStatistics",
            component: () => import("../views/statistics/logisticsFreesStatistics"),
        },
        //----------------------------------------------------------统计模块结束-------------------------------------------------------------------------------------
        //----------------------------------------------------------库存管理开始-------------------------------------------------------------------------------------
        {
            // 库存管理=>产品库存
            path: "/inventoryMangement/productInventory",
            name: "/inventoryMangement/productInventory",
            component: () => import("../views/inventoryMangement/productInventory"),
        },
        {
            // 库存管理=>有效期管理
            path: "/inventoryMangement/indateMangement",
            name: "/inventoryMangement/indateMangement",
            component: () => import("../views/inventoryMangement/indateMangement"),
        },
        //----------------------------------------------------------库存管理结束-------------------------------------------------------------------------------------
        //----------------------------------------------------------仓库作业 start-------------------------------------------------------------------------------------


        //----------------------------------------------------------仓库作业 end-------------------------------------------------------------------------------------
        //----------------------------------------------------------站内消息 start-------------------------------------------------------------------------------------
        {
            // 库存管理=>有效期管理
            path: "/InStationNews/newIndex",
            name: "/InStationNews/newIndex",
            component: () => import("../views/InStationNews/newIndex"),
        },
        //----------------------------------------------------------站内消息 end-------------------------------------------------------------------------------------
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
        //warehousingManagement =》手工创建入库
        // 入库管理=>出库管理
        path: "/warehouseManagement/warehouseSure",
        name: "/warehouseManagement/warehouseSure",
        component: () => import("../views/warehouseManagement/warehouseSure"),
        meta: {
            Breadcrumb: "出库确认",
            title: "出库确认"
        }
    },
    //===========================采购管理 end===============

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