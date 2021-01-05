/*eslint-disable */
/**
 * 邮箱
 * @param {*} s
 */
export function isEmail(s) {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile(s) {
    return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone(s) {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s) {
    return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 判断是否带有 ：
 * @param {*} value 判断的值
 */
export const isMaoHao = (value) => {
    return (value.includes(":") ?
        value :
        value + ":");
}
/**
 * 原生ajax post 请求
 * @param {*} url 路径
 * @param {*} data 数据
 * @param {*} fn 返回的函数
 */
export const ajaxPost = (url, data, fn) => {

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    // 添加http头，发送信息至服务器时内容编码类型
    xhr.setRequestHeader("Content-Type", "application/json");
    // setRequestHeader()
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // console.log(xhr.responseText);
                fn(xhr.responseText);
            }
        }
    };
    let str = ''
    console.log(typeof data)
    if (typeof data == 'array') {
        str = arrStr(data)
    } else {
        str = JSON.stringify(data)
    }
    xhr.send(str);
}

/* 数组转换为字符串 */
function arrStr(data) {
    let str = ''
    data.forEach(item => {
        str += '"' + item + '"' + ","
    });
    str = str.substring(0, str.length - 1)
    return "[" + str + "]"
}

/**
 * 存取sessionID
 * sessionKey:session名称
 * sessionValue:session值
 */
export const setCookie = function (sessionKey, sessionValue) {
    localStorage.setItem(sessionKey, sessionValue);
    var exp = new Date();
    exp.setTime(exp.getTime() + 24 * 60 * 60 * 1000);
    document.cookie = sessionKey + "=" + escape(sessionValue) + ";expires=" + exp.toGMTString();
}

/**
 * getCookie
 * getCookie:getCookie名称
 */
export const getCookie = function (sessionKey) {
    var arr, reg = new RegExp("(^| )" + sessionKey + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return "";
}

/**
 * removeCookie
 */
export const removeCookie = function () {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}

/**
 * 对编辑区域进行了图形化
 * @param {*} item
 */
export const getConversionPx = (item) => {
    return {
        width: item.wareAreaLength ? item.wareAreaLength * (10000 / 85) + "px" : 0 + 'px',
        height: item.wareAreaWidth ? item.wareAreaWidth * (10000 / 85) + "px" : 0 + "px",
        position: "absolute",
        top: item.y ? item.y * (10000 / 85) + "px" : 0 + "px",
        left: item.x ? item.x * (10000 / 85) + "px" : 0 + "px",
        background: !item.back ? "#fff" : "rgba(221, 211, 88, 0.4)",
        cursor: "pointer",
    };
}

/**
 *
 * @param {*} item
 */

export const getzicanParent = (parent) => {
    return {
        width: parent.wareAreaLength * (10000 / 85) + "px",
        height: parent.wareAreaWidth * (10000 / 85) + "px",
    }
}

/**
 * 对区域图进行了图形化
 * @param {*} item
 */
export const getMarginConversion = (item) => {
    return {
        width: item.wareAreaLength * (10000 / 85) + "px",
        height: item.wareAreaWidth * (10000 / 85) + "px",
        lineHeight: item.wareAreaWidth * (10000 / 85) + "px",
        top: item.y * (10000 / 85) + "px",
        left: item.x * (10000 / 85) + "px",
        cursor: "pointer",
        position: "absolute",
        display: "inline-block"
    };
}

export const _getArrTarget = (arr, target) => {
    let needArr = [];
    arr.forEach((item) => {
        if (needArr.indexOf(item[target])) {
            needArr.push(item[target]);
        }
    });
    return needArr;
}

/**
 * 将后端发送的excel文件流导出为excel
 * @param {*} res axios返回的文档
 * @param {*} biaoti 因为有的字体为中文,会出现乱码，对中文进行修改
 */
export const _getExportExcels = (res, biaoti = "入库") => {
    let str = res.headers["content-disposition"];
    let fileName = str.substring(str.indexOf("filename") + 9, str.length);
    fileName = biaoti + fileName.substring(6, fileName.length);
    fileName = decodeURIComponent(fileName);
    let type = res.headers["content-type"].split(";")[0];
    let blob = new Blob([res.data], {
        type: type
    });
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = fileName;
    a.href = blobUrl;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(blobUrl);
}

/**
 * 这个函数用来解决table无法渲染的问题
 * @param {*} i
 */
export const _TableXuanRaRequest = (data) => {
    var datas = JSON.stringify(this.tabledata);
    data = [];
    data = JSON.parse(datas);
}

/**
 * @param {*} i 判断json是否为空
 */
export const _isJsonEmpty = (json) => {
    var str = "{}";
    json = JSON.stringify(json)
    return json === str ? true : false;
}

export const _isEmpty = (res) => {
    return res ? res : ""
}

/**
 * 根据数字 改变为"一"
 * @param {*} i
 */

export const isNums = (i) => {
    switch (i) {
        case 0:
            return "一";
            break;
        case 1:
            return "二";
            break;
        case 2:
            return "三";
            break;
        case 3:
            return "四";
            break;
        case 4:
            return "五";
            break;
        case 5:
            return "六";
            break;
        case 6:
            return "七";
            break;
        case 7:
            return "八";
            break;
        case 8:
            return "九";
            break;
        case 9:
            return "十";
            break;
        case 10:
            return "十一";
            break;
        default:
            return i + 1;
            break;
    }
}

//这个函数解决数组中对象去重的问题
export const reduceFun = (arr) => {
    let testObj = {};
    let res = arr.reduce((item, next) => {
        testObj[next.value] ?
            "" :
            (testObj[next.value] = true && item.push(next));
        return item;
    }, []);
    return res;
}

//这个方法清除所有输入框的内容
export const clearTimeInput = () => {
    let input = document.getElementsByClassName("ivu-input");
    for (let i = 0; i < input.length; i++) {
        input[i].value = "";
    }
    let elInput = document.querySelectorAll(
        ".el-input__inner"
    );
    for (let i = 0; i < elInput.length; i++) {
        elInput[i].value = "";
    }
}


/**
 * 删除数组
 * @param {*} data 要删除的数组
 * @param {*} target 要删除的数组里面的数组
 */
export const _removeData = (data, target, isAdd = false) => {
    data = data || [];
    target = target || [];
    target.forEach((item) => {
        let idx = data.indexOf(item);
        let json = {}
        if (!isAdd) {
            data.splice(idx, 1);
        } else {
            for (const i in item) {
                json[i] = item[i]
            }
            data.splice(idx + 1, 0, json);
        }
    });
    return data;
}


/**
 * [{id:''},[id:'']]
 * @param {*} arr 要获取json
 * @param {*} target 目标
 */
export const getJsonTarget = (arr, target = 'id', jsonTarget = 'ids') => {
    let targetArr = []
    arr.forEach(item => {
        let json = {};
        json[jsonTarget] = item[target];
        console.log(item[target])
        targetArr.push(json);
    })
    return targetArr
}

/**
 * @param {*} nums  原本的长度
 * @param {*} arr 需要为10的数组长度
 * @param {*} maxnums 最长的数字
 */
export const _addArrPush = (nums = 0, arr, maxnums = 10) => {
    if (nums == maxnums) return arr;
    let json = {}
    arr.push(json);
    nums++;
    _addArrPush(nums, arr);
}
/**
 * 判断数据类型
 */
export const _typesStr = (str) => {
    let type
    str = Object.prototype.toString.call(str)
    type = str.substring(8, str.length - 1)
    return type
}

/**
 * 数组去重
 * @param {*} array 数组
 * @param {*} key 去重的 key
 */
export const Heavy = function (array, key) {
    var result = [array[0]];
    for (var i = 1; i < array.length; i++) {
        var item = array[i];
        var repeat = false;
        for (var j = 0; j < result.length; j++) {
            if (item[key] == result[j][key]) {
                repeat = true;
                break;
            }
        }
        if (!repeat) {
            result.push(item);
        }
    }
    return result;
}

/**
 * 判断子仓类型
 * @param {*} nums 传入的waretype
 */
export const _childWareType = (nums) => {
    switch (nums) {
        case 1:
            return "销售"
            break;
        case 2:
            return "售后";
            break;
        case 3:
            return "残次品";
            break;
        default:
            return "其他"
    }
}

/**
 * 区域类型
 * @param {*} nums 需要判断的
 */
export const _WareAreaType = (nums) => {
    switch (nums) {
        case 1:
            return "存储区"
            break;
        case 2:
            return "拣货区";
            break;
        default:
            return "不知道"
    }
    // 区域类型（1-存储区；2-拣货区）
}

/**
 * 库位类型
 * @param {*} nums 需要判断的
 */
export const _seatType = (nums) => {
    switch (nums) {
        case 1:
            return "存储区"
            break;
        case 2:
            return "拣货区";
            break;
        default:
            return "不知道"
    }
    // 区域类型（1-存储区；2-拣货区）
}

/**
 * disposeStatus
 * 补货状态
 */
export const _disposeStatus = (nums) => {
    switch (nums) {
        case 1:
            return "待补货"
            break;
        case 2:
            return "补货中";
            break;
        default:
            return "已补货"
    }
}
/**
 * 删除语录
 * @param arr
 */
export const clearArr = (arr) => {
    let str
    if (
        _typesStr(arr) != "Array"
    ) {
        return new Error("不是数组")
    } else if (arr.length == 1) {
        str = "是否确定删除此信息"
    } else {
        str = "是否确定删除这" + arr.length + "条信息"
    }
    return str
}

/**
 * 创建sess
 * @param {*} name
 * @param {*} data
 */
export const setSessageItem = (name, data) => {
    sessionStorage.setItem(name, data)
}

/**
 *
 * @param {*} name 删除sess
 */
export const removeSessageItem = (name) => {
    sessionStorage.removeItem(name)
}
/**
 * @param {*} name 获取sess
 */
export const getSessageItem = (name) => {
    sessionStorage.getItem(name)
}
/**
 *
 * @param count 1
 * @param isDown 未知
 */
export const popUpCount = (count = 1, isDown = true) => {
    setSessageItem("popUpCount", count)
}

/**
 * 判断json是否等于
 */
export const popUpShow = (target = 1) => {
    let count = +sessionStorage.getItem("popUpCount")
    console.log(count, "count", target, 'target')
    if (count == target) {
        return false
    } else {
        return true
    }
}

