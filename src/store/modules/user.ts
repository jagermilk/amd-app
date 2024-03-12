import { defineStore } from 'pinia'
import type {
  LoginRequest,
  UserInfo,
} from '@/types/models/user'
import UserApi from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'
  import { forward } from '@/utils/router'
import { toast } from '@/utils/common'
interface UserState extends UserInfo {
  token: string
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: getToken()
  }),
  getters: {
    getToken(): string {
      return this.token || getToken()
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token || ''
      setToken(token)
    },
    resetUserInfo() {
      removeToken()
      uni.removeStorageSync('nikeName')
      uni.removeStorageSync('userId')
    },
    // 账号密码登录
    async login(loginForm: LoginRequest) {
      let result= await UserApi.getToken({
        ...loginForm,
        password: loginForm.password,
      })
      console.log(result);
      if(!result.errors){
        const token = result
        this.setToken(token)
        forward('order-list')
      }
      
      
    },
    async logout() {
      this.resetUserInfo()
      toast('退出成功')
      forward('Login')
    }
  },
})
