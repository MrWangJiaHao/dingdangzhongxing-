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
  return (value.includes(":")
    ? value
    : value + ":");
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
  let str = arrStr(data)
  console.log(str)
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
export const removeCookie = function (sessionKey) {
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
    width: item.wareAreaLength * (10000 / 85) + "px",
    height: item.wareAreaWidth * (10000 / 85) + "px",
    position: "absolute",
    top: item.y * (10000 / 85) + "px",
    left: item.x * (10000 / 85) + "px",
    background: "#fff",
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