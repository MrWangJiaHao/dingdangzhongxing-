
/*eslint-disable */
const { Message, MessageBox } = require("element-ui");


class messageSelf {
    constructor() {
        this.jsonArr = {
            message: "",
            showClose: true,
            duration: 1500
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
}

export default new messageSelf()