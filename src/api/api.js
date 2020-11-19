import service from "@/utils/request.js"
import {
    Message
} from "element-ui"
import {
    ajaxPost,
    getCookie
} from "../utils/validate"
const getHref = function () {
    let href = window.location.href
    if (href.includes("systemSetting")) {
        return "http://139.196.176.227:8801"
    } else {
        return "http://139.196.176.227:8902"
    }
}
let basurl = getHref()

export function login(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "http://139.196.176.227:8801/am/v1/pUser/login",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

export function indexRequest(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/mainPage/mainPageStatistics",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

export function jurisdicRequest(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "http://139.196.176.227:8801/am/v1/pUser/findMenuTreeByAppNoUserId",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}
//创建和编辑子仓的请求
export function add_edit_WH_Request(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWarehouseChild/saveRecord",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}
//删除子仓的请求
export function del_WH_Request(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWarehouseChild/delRecord",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//查询子仓列表请求
export function query_WH_Request(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWarehouseChild/findRecordPage",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//按条件查询子仓列表请求
export function TJquery_WH_Request(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWarehouseChild/findRecord",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//根据库位编码打印条码
export function getBarCodeImg(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWarehouseSeat/getBarCodeImg",
            method: "get",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//查询库位信息(分页)
export function querySLInfor(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWarehouseSeat/findRecordPage",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//查询库位信息(查询条件)
export function querySLInforCon(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWarehouseSeat/findRecord",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//查询库位映射关系(分页查询)
export function storeMapRelation(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWarehouseSeatProd/findRecordPage",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//删除库位映射关系
export function delStoreMapRelation(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWarehouseSeatProd/delRecord",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//查询库位信息里面产品的详情
export function queryProductInfor(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWareOrgProd/findWareProduct",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//查询子仓下面区域的id
export function queryAreaOfWS(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWarehouseArea/findRecord",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}


//产品库位映射
export function prodStoreMap(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWarehouseSeatProd/saveRecord",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}


//查询委托公司(临时)
export function queryEntrustCompany(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage//v1/pWarehouseOrg/findWareOrg",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok.data)
        }).catch((err) => {
            reject(err)
        })
    })
}



//区域货架查询
export function areaShelfQuery(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWarehouseSeatProd/findShelfDataArea",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//删除角色
export function delRole(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "http://139.196.176.227:8801/am/v1/pRole/delRecord",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}


//创建供应商
export function createSupplier(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWareSupplier/saveRecord",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//查询供应商(分页)
export function querySupplier(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWareSupplier/findRecordPage",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//删除供应商
export function delSupplier(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWareSupplier/delRecord",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//查询供应商(查询条件)
export function querySupplierCon(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWareSupplier/findRecord",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}


//创建品牌
export function createBrand(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWareBrand/saveRecord",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//查询品牌(分页)
export function queryBrand(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWareBrand/findRecordPage",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//删除供应商
export function delBrand(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWareBrand/delRecord",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//查询供应商(查询条件)
export function queryBrandCon(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWareBrand/findRecord",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}


//创建规格
export function createSpec(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWareProdSpec/saveRecord",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//查询规格(分页)
export function querySpec(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWareProdSpec/findRecordPage",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//删除规格
export function delSpec(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWareProdSpec/delRecord",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//查询规格(查询条件)
export function querySpecCon(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWareProdSpec/findRecord",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}


//创建物料管理
export function createMateAdmin(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWareMateriel/saveRecord",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//查询物料管理(分页)
export function queryMateAdmin(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWareMateriel/findRecordPage",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//删除物料管理
export function delMateAdmin(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWareMateriel/delRecord",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//查询物料管理(查询条件)
export function queryMateAdminCon(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWareMateriel/findRecord",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

// 新增/修改物料记录
export function createMateRecord(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWareMaterielRecord/saveRecord",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

// 删除物料记录
export function delMateRecord(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWareMaterielRecord/delRecord",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

// 查询物料记录（分页查询）
export function queryMateRecord(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWareMaterielRecord/findRecordPage",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

// 查询物料记录（条件查询）
export function queryMateRecordCon(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWareMaterielRecord/findRecord",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}
// 查询物流公司（分页查询）
export function queryPhyDisCom(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pExpress/findRecordPage",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}
// 查询物流公司（条件查询）
export function queryPhyDisComCon(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pExpress/findRecord",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

// 查询仓库物流运费模板（分页查询）
export function queryStorePhyDis(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWareOrgExprFee/findRecordByWareOrOrg",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}
// 查询物流公司（条件查询）
export function queryStorePhyDisCon(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWareOrgExprFee/findExprInfo",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

// 查询委托公司运费模板
export function queryEntrustComFee(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/om/v1/pWareOrgExprFee/findRecordPageOrg",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//分页查询订单信息(自提,无物流)
export function queryOrderInfor(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pOrgSubOrder/findRecordPage",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//给无物流单号的订单分配物流单号
export function getExprNo(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pOrgSubOrder/getExprNo",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//查询子订单的履历信息
export function childOrderInfor(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/orderOperation/findRecord",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//查询销售订单详情信息
export function sellOrderInfor(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pOrgSubOrderDetail/findProdByOrderId",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//分页查询缺货产品信息
export function findFailProdData(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pOrgSubOrder/findFailProdData",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//分页查询缺货订单信息
export function findFailOrderData(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pOrgSubOrder/findFailOrderData",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//分页查询缺货产品关联的缺货订单信息
export function findFailProdDetail(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pOrgSubOrder/findFailProdDetail",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//分页查询未出库退货订单信息
export function findBackOrderPage(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pOrgSubBackOrder/findBackOrderPage",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//分页查询已出库退货订单信息
export function findReturnOrderPage(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pOrgSubBackOrder/findReturnOrderPage",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//退货入库,记录实际退货数量并生成入库单
export function finishBackOrder(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pOrgSubBackOrder/finishBackOrder",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}

//分页查询报损产品
export function findDamageProductPage(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pOrgProducts/findDamageProductPage",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}
//分页查询列表
export function queryBreakageList(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/pDamageOrder/findRecordPage",
            method: "post",
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}


/**
 * 
 * @param {*}  获取查询仓库下的委托公司
 */
export function getEntrustedcompany() {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWarehouseOrg/findWareOrg",
            method: "post",
            data: {
                wareId: getCookie("X-Auth-wareId")
            }
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}

/**
 * 入库管理下面的委托公司
 * @param {*} getFindWareOrg 
 */
export function getFindWareOrg() {
    if (!getCookie("X-Auth-wareId")) return Message("该管理员没有委托公司权限")
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWarehouseOrg/findWareOrg",
            method: "post",
            data: {
                wareId: getCookie("X-Auth-wareId")
            }
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}

/**
 *  根据委托公司查询子仓名称
 *  @param {*} orgId 委托公司ordId 
 */
export function getFindOrgChildWare(orgId) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWarehouseChild/findOrgChildWare",
            method: "post",
            data: {
                orgId
            }
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}
/**
 *  委托公司子仓库产品查询 添加产品
 * http://localhost:8902/wbs-warehouse-manage/v1/pOrgProducts/findOrgProductPage
 * @param {*} datas 
 * 
 */
export const getfindOrgProductPage = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pOrgProducts/findOrgProductPage",
            method: "post",
            data
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}

/**
 * 入库单详情/打印入库单、打印收货单等
 * @param {*} datas  http://localhost:8902/wbs-warehouse-manage/v1/putWarehouse/findRecord
 */
export const getFindRecord = function (id) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/putWarehouse/findRecord",
            method: "post",
            data: {
                id
            }
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}

/**
 * @param {*} datas /wbs-warehouse-manage/v1/putWarehouse/findWarehouseProduct
 */
export const getFindWarehouseProduct = function (id) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/putWarehouse/findWarehouseProduct",
            method: "post",
            data: {
                id
            }
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}
/**
 * 寻找产品明细
 * @param {*} datas  /wbs-warehouse-manage/v1/putWarehouse/saveRecord
 */
export const getSaveRecord = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/putWarehouse/saveRecord",
            method: "post",
            data
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}

/**
 * 打印批次号
 * /wbs-warehouse-manage//v1/putWarehouse/findWareHouseDetailByIds
 * @param {*} datas 
 * ajaxPost
 */
export const getFindWareHouseDetailByIds = function (data, fn) {
    ajaxPost("" + basurl + "/wbs-warehouse-manage/v1/putWarehouse/findWareHouseDetailByIds", data, fn)
}

/**
 * 入库管理  根据id删除出库单
 * @param {*} id http://localhost:8902/wbs-warehouse-manage//v1/putWarehouse/delRecordById
 */
export const delRecordByIdArrs = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage//v1/putWarehouse/delRecordById",
            method: "post",
            data
        }).then((ok) => {
            res(ok)
        }).catch(err => {
            rej(err)
        })
    })
}

/**
 *  导出为excel v1/putWarehouse/insertExcelData
 * @param {*} data 
 */
export const insertExcelData = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/putWarehouse/insertExcelData",
            method: "post",
            data,
            responseType: 'arraybuffer'
        }).then((ok) => {
            res(ok)
        }).catch(err => {
            rej(err)
        })
    })
}

/**
 *  wbs-warehouse-manage/v1/putWarehouse/findRecordPage
 * @param {*} data 
 */
export const putWarehouseFindRecordPage = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "wbs-warehouse-manage/v1/putWarehouse/findRecordPage",
            method: "post",
            data,
        }).then((ok) => {
            res(ok.data)
        }).catch(err => {
            rej(err)
        })
    })
}

// =================出库管理 start ==============
/**
 *     获取 分页查询出库列表
 * @param {*} datas   http://localhost:8902/wbs-warehouse-manage/v1/pOutWarehouse/findRecordPage
 */
export const getPOutWarehouse = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pOutWarehouse/findRecordPage",
            method: "post",
            data
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}

/**
 * 出库管理获取推荐库位
 * @param {*} datas 区域名称 /wbs-warehouse-manage/v1/pOutWarehouse/recommendSeatByBatchNoAndQualityDate
 */
export const getRecommendSeatByBatchNoAndQualityDate = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pOutWarehouse/recommendSeatByBatchNoAndQualityDate",
            method: "post",
            data
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}
/**
 * 出库管理获取添加产品信息
 * @param {*} datas 
    ///wbs-warehouse-manage/v1/pOutWarehouse/findProdByWare
 */
export const getAddfindProdByWare = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pOutWarehouse/findProdByWare",
            method: "post",
            data
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}
/**
 * 新增修改出库单
 * @param {*} datas /wbs-warehouse-manage/v1/pOutWarehouse/saveRecord
 */
export const getpOutWarehouseSaveRecord = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pOutWarehouse/saveRecord",
            method: "post",
            data
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}
/**
 * 出库管理删除出库单
 * /wbs-warehouse-manage/v1/pOutWarehouse/delRecord
 * @param {*} data 
 */
export const getpOutWarehouseDelRecord = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pOutWarehouse/delRecord",
            method: "post",
            data
        }).then((ok) => {
            res(ok)
        }).catch((err) => {
            rej(err)
        })
    })
}
/**
 * 出库确认导出为excel
 *   //wbs-warehouse-manage/v1/pOutWarehouse/exprotExcel
 * @param {*} data 
 */
export const getpOutWarehouseExprotExcel = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pOutWarehouse/exprotExcel",
            method: "get",
            data
        }).then((ok) => {
            res(ok)
        }).catch((err) => {
            rej(err)
        })
    })
}

/**
 * 出库单详情 
 * @param {*} datas  http://localhost:8902/wbs-warehouse-manage/v1/pOutWarehouse/findOutWareDetailById
 */
export const getpOutWarehousefindOutWareDetailById = function (id) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pOutWarehouse/findOutWareDetailById",
            method: "post",
            data: {
                id
            }
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}
/**
 * 出库确认
 * @param {*} data /wbs-warehouse-manage/v1/pOutWarehouse/confirmRecord
 */
export const getpOutWarehouseconfirmRecord = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pOutWarehouse/confirmRecord",
            method: "post",
            data
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}
// =================出库管理 end ==============
//=====================================采购管理 start ==============================================

/**
 * 出库管理首页 分页and条件查询
 * /wbs-warehouse-manage/v1/pPurchaseOrder/findRecordPageByOrgAndPurcNo
 * @param {*} datas 
 */
export const getpPurchaseOrderFindRecordPageByOrgAndPurcNo = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pPurchaseOrder/findRecordPage",
            method: "post",
            data
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}
/**
 * 分页点击查询详情
 * /wbs-warehouse-manage/v1/pPurchaseOrder/findRecord
 * @param {*} datas 
 */
export const getppPurchaseOrderFindRecord = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pPurchaseOrder/findRecord",
            method: "post",
            data
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}
/**
 * 新增/修改采购单
 * /wbs-warehouse-manage/v1/pPurchaseOrder/saveRecord
 */
export const getpPurchaseOrdersaveRecord = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pPurchaseOrder/saveRecord",
            method: "post",
            data
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}

/**
 * 采购管理获取委托公司 
 * @param {*} datas 
 * /wbs-warehouse-manage/v1/pCommon/findOrgByWareId
 */
export const getpCommonFindOrgByWareId = function () {
    if (!getCookie("X-Auth-wareId")) return Message("该管理员委托公司权限")
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pCommon/findOrgByWareId",
            method: "post",
            data: {
                wareId: getCookie("X-Auth-wareId")
            }
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}
/**
 * 采购管理获取采购产品
 * @param {*} datas /wbs-warehouse-manage/v1/pWareOrgProd/findRecordPage
 */
export const getpWareOrgProdfindRecordPage = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWareOrgProd/findRecordPage",
            method: "post",
            data
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}
/**
 * 提交采购单
 * @param {*} datas /wbs-warehouse-manage/v1/pPurchaseOrder/submitRecord
 */
export const subpPurchaseOrderSubmitRecord = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pPurchaseOrder/submitRecord",
            method: "post",
            data
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}
/**
 * /wbs-warehouse-manage/v1/pSubPurchaseOrder/findRecord
 * @param {*} datas  /wbs-warehouse-manage/v1/pSubPurchaseOrder/findRecord
 */
export const pSubPurchaseOrderFindRecord = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pSubPurchaseOrder/findRecord",
            method: "post",
            data
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}
/**
 * 删除 采购单
 * @param {*} datas 
 */

export const pPurchaseOrderDeleteBatch = function (data, fn) {
    ajaxPost("" + basurl + "/wbs-warehouse-manage/v1/pPurchaseOrder/deleteBatch", data, fn)
}

//=========================================采购管理 end ========================================
//=========================================发货规则配置 start ========================================
/**
 * 分页查询发货规则配置
 * @param {*} datas 
 */
export const pWarehouseRuleFindRecordPage = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWarehouseRule/findRecordPage",
            method: "post",
            data
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}
/**
 * 创建/修改发货规则信息
 * @param {*} datas 
 */
export const pWarehouseRuleSaveRecord = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWarehouseRule/saveRecord",
            method: "post",
            data
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}
/**
 * 
 * @param {*} data 删除发货规则
 */
export const pWarehouseRuleDelRecord = function (data, fn) {
    return ajaxPost("" + basurl + "/wbs-warehouse-manage/v1/pWarehouseRule/delRecord", data, fn)
}
//=========================================发货规则配置 end ========================================
//=========================================发货管理 start ========================================
/**
 * //正常发货分页查询 
 * @param {*} datas 
 */
export const pDeliverGoodsFindNormalRecordPage = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pDeliverGoods/findNormalRecordPage",
            method: "post",
            data
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}

/**
 * 快速发货特殊商品分页查询
 * @param {*} data `/wbs-warehouse-manage/v1/pDeliverGoods/findFastRecordPage
 */
export const pDeliverGoodsFindFastRecordPage = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pDeliverGoods/findFastRecordPage",
            method: "post",
            data
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}
/**
 * 订单集计 需要ids
 * 
 * @param {*} datas /wbs-warehouse-manage/v1/pOrgSubOrder/megerOrder
 */
export const pOrgSubOrderMegerOrder = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pOrgSubOrder/megerOrder",
            method: "post",
            data
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}

/**
 * 打印拣货单
 * @param {*} datas 
 */
export const pOrgPickOrderprintPick = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pOrgPickOrder/printPick",
            method: "post",
            data
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}
/**
 * 拣货单列表
 * @param {*} datas /wbs-warehouse-manage/v1/pOrgPickOrder/findRecordPage
 */
export const pOrgPickOrderfindRecordPage = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pOrgPickOrder/findRecordPage",
            method: "post",
            data
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}
//=========================================发货管理 end ========================================
export function post(datas) {
    let {
        url,
        data
    } = datas
    return new Promise((resolve, reject) => {
        service.request({
            url,
            method: "post",
            data
        }).then((ok) => {
            resolve(ok.data)
        }).catch((err) => {
            reject(err)
        })
    })
}
export function get(datas) {
    let {
        url,
        data
    } = datas
    return new Promise((resolve, reject) => {
        service.request({
            url,
            method: "get",
            data,
        }).then((ok) => {
            resolve(ok.data)
        }).catch((err) => {
            reject(err)
        })
    })
}
/**
 * 获取用户类型 数据
 */
export function getUserTypeshuju() {
    return new Promise((resolve, reject) => {
        service.request({
            url: "http://139.196.176.227:8801/am/v1/pCodeInfo/findRecord",
            method: "post",
            data: {
                "typeCode": "usertype"
            },
        }).then((ok) => {
            resolve(ok.data)
        }).catch((err) => {
            reject(err)
        })
    })
}
/**
 * 获取子仓名称
 */
export function getWarehoseConfig() {
    return new Promise((resolve, reject) => {
        service.request({
            url: "/wbs-warehouse-manage/v1/pWarehouseChild/findRecord",
            method: "post",
            data: {
                id: "",
                wareType: "",
                wardId: "43C86919FC7E4360838AA522B361A242"
            },
        }).then((ok) => {
            resolve(ok.data)
        }).catch((err) => {
            reject(err)
        })
    })
}

export function logins() {
    return new Promise((resolve, reject) => {
        service.request({
            url: "http://139.196.176.227:8801/am/v1/pUser/login",
            method: "post",
            data: {
                "loginName": "warehouse",
                "loginPwd": "123456",
                "userType": 4,
                "appNo": "F94CB9F5262F46DCB171CECD6FE1193B"
            },
        }).then((ok) => {
            resolve(ok.data)
        }).catch((err) => {
            reject(err)
        })
    })
}