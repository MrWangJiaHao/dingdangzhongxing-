import service from "@/utils/request.js"
export function login() {
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
            resolve(ok)
        }).catch((err) => {
            reject(err)
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
