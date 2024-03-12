import type { BaseResult } from '@/types/models/base'
import request from '@/utils/request'

export default class UserApi {
  // 获取验证码
  static getToken(form) {
    return request.post('sanctum/token', form)
  }
}
