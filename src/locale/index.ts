import { createI18n } from 'vue-i18n'
import enUS from './en/SOA/SoaLogin'
import zhCN from './zh_cn/SOA/SoaLogin'

export const i18n = createI18n({
  locale: 'en',
  messages: {
    en: enUS,
    'zh-CN': zhCN,
  },
})
