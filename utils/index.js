export function slice (...args) {
  return Array.prototype.slice.call(...args)
}

/**
* 转换成String
* @export
* @param {*} n
* @returns {String}
*/
export function toString (s) {
  return Object.prototype.toString.call(s)
}

/**
* 判断是否Number
* @export
* @param {Numer} n
* @returns {Boolean}
*/
export function isNumber (n) {
  return toString(n) === '[object Number]' && !isNaN(n)
}

/**
* 判断是否字符串
* @export
* @param {String} str
* @returns {Boolean}
*/
export function isString (str) {
  return toString(str) === '[object String]'
}

/**
* 判断是否函数
* @export
* @param {function} func
* @returns {Boolean}
*/
export function isFunction (func) {
  return toString(func) === '[object Function]'
}

/**
* 判断是否数组
* @export
* @param {function} func
* @returns {Boolean}
*/
export function isArray (func) {
  return toString(func) === '[object Array]'
}

/**
* 判断是否普通对象
*
* @export
* @param {Object} o
* @returns {Boolean}
*/
export function isObject (o) {
  return toString(o) === '[object Object]' && o.constructor instanceof Object
}

/**
*
* 对象属性值是否为空
* @export
* @param {Object} o
* @returns
*/
export function isEmptyObject (o) {
  for (let p in o) { return !1 }
  return !0
}

/**
*
* 判断值是否存在
* @export
* @param {*} v
* @returns {Boolean}
*/
export function isExisted (v) {
  return !!v || v === 0
}

/**
* 判断是否Date是否有效
* @export
* @param {Date Object} date
* @returns {Boolean}
*/
export function isDateValid (date) {
  if (date instanceof Date) {
    return !isNaN(date.getTime())
  } else {
    return false
  }
}

/**
* 小于10的数字增加前缀0
* @export
* @param {Numer} n
* @returns {String}
*/
export function zeroPrefix (num) {
  if (!isNumber(num) || num < 0) {
    return ''
  }

  return num >= 10 ? `${num}` : `0${num}`
}

/**
* 日期格式化函数
* 占位符(2017-03-01 12:30:45)：
* yyyy: 2017
* yy: 17
* MM: 03
* dd: 01
* HH: 12
* mm: 30
* ss: 45
* @export
* @param {Date|Number|String} date
* @param {String} format 格式
* @returns {Boolean}
*/
export function dateFormat (date, format = '') {
  const oDate = new Date(date)
  let str = ''

  if (isDateValid(oDate) && isString(format)) {
    const year = oDate.getFullYear()
    const month = zeroPrefix(oDate.getMonth() + 1)
    const day = zeroPrefix(oDate.getDate())
    const hours = zeroPrefix(oDate.getHours())
    const minutes = zeroPrefix(oDate.getMinutes())
    const seconds = zeroPrefix(oDate.getSeconds())

    str = format.replace(/yyyy/g, year)
    str = str.replace(/yy/g, String(year).slice(-2))
    str = str.replace(/MM/g, month)
    str = str.replace(/dd/g, day)
    str = str.replace(/HH/g, hours)
    str = str.replace(/mm/g, minutes)
    str = str.replace(/ss/g, seconds)
  }

  return str
}

export function getDayTimestamp (source) {
  const oDate = new Date(source)

  if (!isDateValid(oDate)) {
    return 0
  }

  return new Date(`${dateFormat(oDate, 'yyyy/MM/dd')}`).getTime()
}

export function getDateWidthDayOffset (offset) {
  const oDate = new Date()

  if (isNumber(offset) && offset !== 0) {
    oDate.setDate(oDate.getDate() + offset)
  }

  return oDate
}
