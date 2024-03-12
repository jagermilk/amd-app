import { useUserStore } from './modules/user'
import { useFileStore } from './modules/files'
import { createPinia } from 'pinia'
const pinia = createPinia()

export { useUserStore,useFileStore }
export default pinia
