import type { BaseResult } from './base'


export interface CodeResult extends BaseResult {
  img: string
  captchaOnOff: boolean
  uuid: string
}

export interface SendMailRequest {
  receiver: string
  subject: string
  content: string
}

export interface MailCheckRequest {
  mail: string
}

export interface MailCheckResult extends BaseResult {
  data: boolean
}

export interface RegisterMailCodeRequest {
  mail: string
}

export interface MailCodeResult extends BaseResult {
  data: {
    id: string
    otp: string
  }
}

export interface ChangePassRequest {
  password: string
}

export interface UpdatePassRequest {
  oldPassword: string
  newPassword: string
}

export interface LoginRequest {
  username: string
  password: string
  code: string
  uuid: string
}

export interface LoginResult extends BaseResult {
  data: {
    access_token: string
    expires_in: number
  }
}


export interface UserInfoResult extends BaseResult {
  permissions: string[]
  roles: string[]
  imUserId: string
  isAdmin: boolean
  user: any
  otherPermission: string[]
}


export type UserInfo = Omit<UserInfoResult, keyof BaseResult>

export interface UpdatePersonUserRequest {
  personName: string
  personMail: string
  personPhone: string
}

export interface PersonUserResult {
  msg: string
  code: number
  data: PersonUser
}

export interface PersonUser {
  searchValue: any
  createdBy: any
  createdTime: any
  updatedBy: any
  updatedTime: any
  delFlag: any
  version: any
  remark: any
  enabledStatus: any
  params: {
    [key: string]: any
  }
  id: string
  authUserId: string
  personId: string
  imId: string
  procIntId: any
  sysUser: any
  sysPersonResource: SysPersonResource
}

export interface SysPersonResource {
  searchValue: any
  createdBy: any
  createdTime: any
  updatedBy: any
  updatedTime: any
  delFlag: any
  version: any
  remark: any
  enabledStatus: any
  params: {
    [key: string]: any
  }
  personId: string
  personCode: string
  entId: string
  depart: any
  personName: string
  personPhone: string
  personMail: string
  photographAddr: any
  country: any
  countryPrefix: any
  province: any
  city: any
  personAddr: any
  sex: any
  workTime: any
  idcard: any
  birthday: any
  nativePlace: any
  domicilePlace: any
  nation: any
  graduateSchool: any
  major: any
  qualification: any
  maritalStatus: any
  politicalOutlook: any
  standbyPhone: any
  awarded: any
  workExperience: any
  isAdmin: any
  sortNumber: any
  sysEnterpriseResource: any
}

export interface AvatarResult extends BaseResult {
  imgUrl: string
}
