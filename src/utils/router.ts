import { restoreUrl } from './shared'
import { PageTypes, needAuthPath, pagesMap } from './urlMap'
import type { PageName } from '@/page-data'
import { getToken } from '@/utils/auth'
// export function onUrlPage(e: any) {
//   if (isFastClick()) return
//   const { url } = e.currentTarget.dataset
//   // url = 'http://m.dev.haoshiqi.net/v2/index?id=11&name=22'
//   // url = 'https://topic.doweidu.com/?id=a9918e941a43233211fb7a8cfc7afbbd&origin=hsq_aliptmp'
//   if (!url) return
//   const urlType = getUrlType(url)
//   const { name, path, query } = parseUrl(url)
//   if (urlType === 'topic') {
//     // 专题页
//     forward('topic', Object.assign({ url: path }, query))
//   } else if (urlType === 'h5Hsq') {
//     if (h5HsqMap.includes(name)) {
//       if (needAuthPath.includes(name)) return forward('Login')
//       // h5页面
//       forward('web-view', Object.assign({ url: path }, query))
//     } else {
//       // 原生页
//       forward(name, query)
//     }
//   } else if (urlType === 'other' && pagesMap.some((i) => i.name === name)) {
//     // 原生页
//     forward(name, query)
//   } else {
//     // 不跳转
//   }
// }

export function forward(name: PageName, query: Types.Query = {}): any {
  if (needAuthPath.includes(name)&&!getToken()) return forward('Login')
  const targetPage = pagesMap.find((i) => i.name === name)
  if (!targetPage) return
  const isReplace = query.replace
  delete query.replace
  const { type, path } = targetPage
  const url = restoreUrl(path, query)
  const params = { url }
  if (type === PageTypes.Tab) return uni.switchTab(params)
  if (!isReplace) return uni.navigateTo(params)
  uni.redirectTo(params)
}

export function back(delta: number) {
  uni.navigateBack({
    delta,
  })
}
