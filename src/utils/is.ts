const toString = Object.prototype.toString
export const phoneReg = /^1[3-9]\d{9}$/
const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const urlReg =
  /(((^https?:(?:\/\/)?)(?:[-:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&%@.\w_]*)#?(?:[\w]*))?)$/

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isDef(val: unknown) {
  return typeof val !== 'undefined'
}

export function isUnDef(val: unknown): val is undefined {
  return !isDef(val)
}

export function isObject(val: unknown): val is Record<string, unknown> {
  return val !== null && is(val, 'Object')
}

export function isEmpty(val: unknown) {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}

export function isDate(val: unknown) {
  return is(val, 'Date')
}

export function isNull(val: unknown): val is null {
  return val === null
}

export function isNullAndUnDef(val: unknown) {
  return isUnDef(val) && isNull(val)
}

export function isNullOrUnDef(val: unknown) {
  return isUnDef(val) || isNull(val)
}

export function isNumber(val: unknown): val is number {
  return is(val, 'Number') && !Number.isNaN(val)
}

export function isPromise(val: unknown): val is Promise<unknown> {
  return (
    is(val, 'Promise') &&
    isObject(val) &&
    isFunction(val.then) &&
    isFunction(val.catch)
  )
}

export function isFunction(val: unknown): val is (...args: any[]) => any {
  return typeof val === 'function'
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean')
}

export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp')
}

export function isArray(val: unknown): val is Array<any> {
  return Boolean(val) && Array.isArray(val)
}

export function isWindow(val: unknown): val is Window {
  return typeof window !== 'undefined' && is(val, 'Window')
}

export function isElement(val: unknown): val is Element {
  return isObject(val) && !!val.tagName
}

export function isMap(val: unknown): val is Map<string, any> {
  return is(val, 'Map')
}

export const isServer = typeof window === 'undefined'

export const isClient = !isServer

export const isUrl = (path: string) => {
  return Boolean(path) && urlReg.test(path)
}

export const isGreaterThanZero = (value: string | number) => {
  return Number(value) > 0
}
export function isString(val: any): val is string {
  return is(val, 'String')
}

export function isFile(val: any): val is File {
  return is(val, 'File')
}

export function isBlob(val: any): val is Blob {
  return is(val, 'Blob')
}

export function isEmptyObject(obj: any): boolean {
  return isObject(obj) && Object.keys(obj).length === 0
}

export function isExist(obj: any): boolean {
  return obj || obj === 0
}

export function isPhone(el: string): boolean {
  return Boolean(el) && phoneReg.test(el)
}

export function isEmail(el: string): boolean {
  return Boolean(el) && emailReg.test(el)
}
