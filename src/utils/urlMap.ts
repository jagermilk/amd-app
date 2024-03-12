import pagesJson from '../pages.json'

export enum PageTypes {
  Tab,
  Normal,
}

// pages
const allPages = pagesJson.pages.map((i) => {
  return {
    type: 'Normal',
    name: i.name,
    path: `/${i.path}`,
  }
})

// 二级页面
const subPagesMap =
  pagesJson.subPackages?.flatMap((i) => {
    return i.pages.map((x) => {
      return {
        type: 'subPage',
        name: x.name,
        path: `/${i.root}/${x.path}`,
      }
    })
  }) || []

// h5页面
export const h5HsqMap = ['member-center']

export const pagesMap = [...allPages, ...subPagesMap]

// 需要登录权限的页面
export const needAuthPath = ['Order']

const types = {
  h5Hsq: /(m(\.dev|\.beta)?\.haoshiqi\.net\/v2)/i,
  topicType: /(topic(\.dev|\.beta)?\.doweidu\.com)/i,
  h5: /^(https|http):\/\//i,
}

export function getUrlType(url: string) {
  if (types.h5Hsq.test(url)) return 'h5Hsq'
  if (types.topicType.test(url)) return 'topic'
  if (types.h5.test(url)) return 'h5' // 暂时笼统判断都是hsq Url
  return 'other'
}
export const loginPage = pagesJson.pages.find((item) => item.name === 'Login')
  ?.path
