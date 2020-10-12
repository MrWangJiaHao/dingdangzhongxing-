import service from "@/utils/request.js"
import { getCookie } from "../utils/validate"
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
