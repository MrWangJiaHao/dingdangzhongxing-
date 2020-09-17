import service from "@/utils/request.js"
export function login() {
    return new Promise((resolve, reject) => {
        service.request({
            url: "http://127.0.0.1:8801/am/v1/pUser/login",
            method: "get",
            data:{},
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })

}