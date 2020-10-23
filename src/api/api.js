import service from "@/utils/request.js"
import { ajaxPost, getCookie } from "../utils/validate"
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/mainPage/mainPageStatistics",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseChild/saveRecord",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseChild/delRecord",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseChild/findRecordPage",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseChild/findRecord",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseSeat/getBarCodeImg",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseSeat/findRecordPage",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseSeat/findRecord",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseSeatProd/findRecordPage",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseSeatProd/delRecord",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWareOrgProd/findWareProduct",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseArea/findRecord",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseSeatProd/saveRecord",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage//v1/pWarehouseOrg/findWareOrg",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseSeatProd/findShelfDataArea",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWareSupplier/saveRecord",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWareSupplier/findRecordPage",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWareSupplier/delRecord",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWareSupplier/findRecord",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWareBrand/saveRecord",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWareBrand/findRecordPage",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWareBrand/delRecord",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWareBrand/findRecord",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWareProdSpec/saveRecord",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWareProdSpec/findRecordPage",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWareProdSpec/delRecord",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWareProdSpec/findRecord",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWareMateriel/saveRecord",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWareMateriel/findRecordPage",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWareMateriel/delRecord",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWareMateriel/findRecord",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWareMaterielRecord/saveRecord",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWareMaterielRecord/delRecord",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWareMaterielRecord/findRecordPage",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWareMaterielRecord/findRecord",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseOrg/findWareOrg",
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
    return new Promise((res, rej) => {
        service.request({
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseOrg/findWareOrg",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseChild/findOrgChildWare",
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pOrgProducts/findOrgProductPage",
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
export const getFindRecord = function (ids) {
    return new Promise((res, rej) => {
        service.request({
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/putWarehouse/findRecord",
            method: "post",
            data: {
                ids
            }
        }).then((ok) => {
            res(ok.data)
        }).catch((err) => {
            rej(err)
        })
    })
}

/**
 * 
 * @param {*} datas /wbs-warehouse-manage/v1/putWarehouse/findWarehouseProduct
 *  
 */
export const getFindWarehouseProduct = function (id) {
    return new Promise((res, rej) => {
        service.request({
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/putWarehouse/findWarehouseProduct",
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
 * 
 * @param {*} datas  /wbs-warehouse-manage/v1/putWarehouse/saveRecord
 */
export const getSaveRecord = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/putWarehouse/saveRecord",
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
    ajaxPost("http://139.196.176.227:8902/wbs-warehouse-manage//v1/putWarehouse/findWareHouseDetailByIds", data, fn)
}
// =================出库管理 start ==============
/**
 *     获取 分页查询出库列表
 * @param {*} datas   http://localhost:8902/wbs-warehouse-manage/v1/pOutWarehouse/findRecordPage
 */
export const getPOutWarehouse = function (data) {
    return new Promise((res, rej) => {
        service.request({
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pOutWarehouse/findRecordPage",
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
export function post(datas) {
    let { url, data } = datas
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
    let { url, data } = datas
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
            url: "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseChild/findRecord",
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

