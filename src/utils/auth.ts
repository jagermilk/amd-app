import { CacheUtil } from './storage'
import { useUserStore } from '@/store'
import { TOKEN_KEY } from '@/constant/user'

export function getToken(): string {
  return CacheUtil.get(TOKEN_KEY)
}

export function setToken(token: string) {
  return CacheUtil.set(TOKEN_KEY, token)
}

export function removeToken() {
  return CacheUtil.remove(TOKEN_KEY)
}

export function authPermission(permission: string) {
  const all_permission = '*:*:*'
  const permissions = useUserStore().permissions
  return permissions.some((v) => {
    return all_permission === v || v === permission
  })
}
