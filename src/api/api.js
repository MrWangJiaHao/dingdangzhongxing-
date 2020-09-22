import service from "@/utils/request.js"
export function login(data) {
    return new Promise((resolve, reject) => {
        service.request({
            url: "http://139.196.176.227:8801/am/v1/pUser/login",
            method: "post",
            data,
            header: {},
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
            data,
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
}
