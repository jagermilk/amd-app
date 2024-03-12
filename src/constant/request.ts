export const COMMON_QUERY = { pageSize: 9999, pageNum: 1, delFlag: '0' }
export const DEFAULT_QUERY = { pageNum: 1, pageSize: 1, delFlag: '0' }
export const NORMAL_LIST_QUERY = { pageNum: 1, pageSize: 10, delFlag: 'd' }
export const NORMAL_LIST_QUERY_CREATED_DESC = {
  pageSize: 10,
  pageNum: 1,
  delFlag: '0',
  orderByColumn: 'createdTime',
  isAsc: 'desc',
}

export const COMMON_PAGE_AND_CREATED_DESC = {
  pageSize: 99999,
  pageNum: 1,
  delFlag: '0',
  orderByColumn: 'createdTime',
  isAsc: 'desc',
}

export const FETCH_REALEASED_ALL_QUERY = {
  pageSize: 9999,
  pageNum: 1,
  delFlag: '0',
  orderByColumn: 'createdTime',
  isAsc: 'desc',
  releaseStatus: '1',
}

export const FETCH_ALL_QUERY = {
  pageSize: 9999,
  pageNum: 1,
  delFlag: '0',
}

export const CLOUD_SUPERVISOR_START_ORDER = 2000
export const CLOUD_SUPERVISOR_END_ORDER = 3000

export const PURCHASE_CONTRACT = '1'
export const SALES_CONTRACT = '0'
//控制咨询是否用及时通讯
export const SWITCH_IM = 'web.switch.im'
//设置咨询发送邮箱
export const MAIL_SEND_DEFUALT = 'web.mail.send.defualt'

// 产品驳回审核状态
export const REJECTED_PRODUCT_AUDIT_STATUS = '2'
// 待报价流程key
export const PRICE_PROCESS_KEY = 'Process_1684744497951'
// 售后流程key
export const AFTER_SALE_PROCESS_KEY = 'Process_1686641669972'
// 控制Im是否启动客户端临时账号
export const IM_CUST_TEMP = 'external.im.cust.temp'
export const CONFIG_KEYS_EN = [
  'web.app.file.en',
  'web.system.privacy.policy.en',
  'web.system.user.agreement.en',
  'web.system.service.hotline.en',
  'web.system.service.time.en',
  'web.system.service.address.en',
  'wechat.official.account.en',
  'web.system.nudge.en',
  'web.system.logo.white.en',
  'web.system.logo.black.en',
  'web.system.name.white.en',
  'web.system.name.black.en',
]

export const CONFIG_KEY_MAP = {
  DOWNLOAD: 'web.app.file',
  PRIVACY: 'web.system.privacy.policy',
  AGREEMENT: 'web.system.user.agreement',
  PHONE: 'web.system.service.hotline',
  TIME: 'web.system.service.time',
  ADDRESS: 'web.system.service.address',
  WECHAT: 'wechat.official.account',
  NUDGE: 'web.system.nudge',
  ICON_LOGO_WHITE: 'web.system.logo.white',
  ICON_LOGO_BLACK: 'web.system.logo.black',
  TEXT_LOGO_WHITE: 'web.system.name.white',
  TEXT_LOGO_BLACK: 'web.system.name.black',
}
export const CONFIG_KEYS_CN = Object.values(CONFIG_KEY_MAP)
