
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