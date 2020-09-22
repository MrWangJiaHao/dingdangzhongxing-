import service from "@/utils/request.js"
export function login() {
    return new Promise((resolve, reject) => {
        service.request({
            url: "http://127.0.0.1:8801/am/v1/pUser/login",
            method: "get",
<<<<<<< HEAD
            data:{},
            header:{},
=======
            data: {},
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
        }).then((ok) => {
            resolve(ok)
        }).catch((err) => {
            reject(err)
        })
    })
<<<<<<< HEAD
=======

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

>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
}