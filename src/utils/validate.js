/**
 * 邮箱
 * @param {*} s
 */
<<<<<<< HEAD
export function isEmail (s) {
=======
export function isEmail(s) {
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
<<<<<<< HEAD
export function isMobile (s) {
=======
export function isMobile(s) {
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
<<<<<<< HEAD
export function isPhone (s) {
=======
export function isPhone(s) {
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
<<<<<<< HEAD
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}
=======
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
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
