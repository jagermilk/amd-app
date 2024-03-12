/**
 * 显示消息提示框
 * @param content 提示的标题
 */
export function toast(content: string) {
  uni.showToast({
    icon: 'none',
    title: content,
  })
}

/**
 * 显示模态弹窗
 * @param content 提示的内容
 * @param confirmText 确认按钮
 * @param cancelText 取消按钮
 * @param title 提示的标题
 */
export function showConfirm(
  content: string,
  showCancel = true,
  confirmText = uni.getStorageSync('lang') == 'en' ? 'Ok' : '确定',
  cancelText = uni.getStorageSync('lang') == 'en' ? 'cancel' : '取消',
  title = uni.getStorageSync('lang') == 'en' ? 'Tips' : '提示',
  confirmColor = '#3c9cff'
) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      showCancel,
      title,
      content,
      confirmText,
      cancelText,
      confirmColor,
      success(res) {
        if (res.confirm) {
          resolve(res)
        } else if (res.cancel) {
          reject(res.errMsg)
        }
      },
    })
  })
}

/**
 * 参数处理
 * @param params 参数
 */
export function tansParams(params: Record<string, any>) {
  let result = ''
  if (!params) return result
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    const part = `${encodeURIComponent(propName)}=`
    if (value !== null && value !== '' && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (
            value[key] !== null &&
            value[key] !== '' &&
            typeof value[key] !== 'undefined'
          ) {
            const params = `${propName}[${key}]`
            const subPart = `${encodeURIComponent(params)}=`
            result += `${subPart + encodeURIComponent(value[key])}&`
          }
        }
      } else {
        result += `${part + encodeURIComponent(value)}&`
      }
    }
  }
  return result.replace(/&$/, '')
}

export function stopPropagation(e: Event) {
  e.stopPropagation()
}
export function baseFormatter(val: unknown) {
  return val
}
export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
