export interface BaseResult {
  code: number
  msg: string
  data?: any
}

export interface BaseListResult extends BaseResult {
  total: number
}

export interface UncertainResult<T = any> {
  code: number
  msg: string
  rows?: T[]
  data?: T
  [key: string]: unknown
}

export type ListRequest<T> = T & {
  pageNum: number
  pageSize: number
}

export type ListResult<T> = BaseListResult & {
  rows: T[]
}

export type DataResult<T> = BaseResult & {
  data: T
}
export interface addLeaveRequest {
  content: string
  pid: string
  sourceAuthUserId: string
  targetAuthUserId: string
}
