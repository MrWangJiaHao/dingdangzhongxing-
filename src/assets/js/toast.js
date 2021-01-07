/*eslint-disable */
const {Message, MessageBox} = require("element-ui");


class messageSelf {
    constructor() {
        this.jsonArr = {
            message: "",
            duration: 1000,
            offset: 400,
            type: "info",
        }
    }

    /**
     * 弹框
     * @param {*} json 提示框
     */
    message(json) {
        this.isShuLeiXin(json)
        Message({
            ...this.jsonArr
        })
        return this
    }

    /**
     * 提交框
     */
    prompts(text = "确定执行此操作吗？", title = "提示", JSON = {}) {
        return MessageBox.prompt(text, title, {
            ...JSON
        })
    }

    /**
     * 判断是否成功
     */
    isCode10000(data, successMsg, errorMsg, successFun, errorFun) {
        if (data.code === '10000') {
            this.message({
                type: "success",
                message: successMsg || data.msg
            })
            successFun && successFun()
        } else {
            this.message({
                type: "error",
                message: errorMsg || data.msg
            })
            errorFun && errorFun()
        }
    }

    /**
     * 获取数据
     */
    isCodeData10000(data, successCallback, errorFun) {
        if (data.code === '10000') {
            successCallback && successCallback()
        } else {
            errorFun && errorFun()
        }
    }

    /**
     * get table
     */
    isTableCode(data, successCallback) {
        if (data.code === '10000') {
            successCallback && successCallback()
        } else {
            this.message({
                type: "error",
                message: errorMsg || data.msg
            })
        }
    }

    /**
     * 判断数据类型
     * @param {*} str
     */
    isShuLeiXin(str) {
        let isType = Object.prototype.toString.call(str)
        if (isType.includes("String")) {
            this.jsonArr.message = str
        } else {
            this.jsonArr = Object.assign({}, this.jsonArr, str)
        }
        return this
    }

    confirms(text = "确定执行此操作吗？", title = "提示", JSON = {}) {
        return MessageBox.confirm(text, title, {
            ...JSON
        })
    }

    isDataCodeExistence(data, fn) {
        if (data.code === "10000") {
            fn && fn(data)
            return data.result
        } else {
            return this.message({
                type: 'error',
                message: data.msg,
            })
        }
    }
}

export default new messageSelf()