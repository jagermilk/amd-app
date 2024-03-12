<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import {
  LoginType,
  PASSWORD_KEY,
  SAVE_LOGIN_INFO_KEY,
  USERNAME_KEY,
} from '@/constant/user'
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { useUserStore } from '@/store'
import useLoading from '@/hooks/loading'
import UserApi from '@/api/user'
// import { forward } from '@/utils/router'
import type { LoginRequest, MailLoginRequest } from '@/types/models/user'
import { toast } from '@/utils/common'
import { CacheUtil } from '@/utils/storage'
const showPass = ref(false)
const { loading, setLoading } = useLoading()
const userStore = useUserStore()
const currentTab = ref(LoginType.Password)
const loginFormRef = ref<any>(null)
const mailLoginFormRef = ref<any>(null)
const loginForm = reactive<LoginRequest>({
  username: '',
  password: '',
})
const isSave = ref(Boolean(CacheUtil.get(SAVE_LOGIN_INFO_KEY)))
if (isSave.value) {
  loginForm.username = CacheUtil.get(USERNAME_KEY, '')
  loginForm.password = CacheUtil.get(PASSWORD_KEY, '')
}
const loginFormRules = reactive({
  username: {
    required: true,
    message: proxy.$i18n?.t('账号不能为空'),
    trigger: ['blur', 'change'],
  },
  password: {
    required: true,
    message: proxy.$i18n?.t('密码不能为空'),
    trigger: ['blur', 'change'],
  },
  code: {
    required: true,
    message: proxy.$i18n?.t('验证码不能为空'),
    trigger: ['blur', 'change'],
  },
})
const mailLoginForm = reactive<MailLoginRequest>({
  code: '',
  mail: '',
})
interface Tab {
  name: string
  value: LoginType
}
const emailname = computed(() => {
  if (uni.getStorageSync('lang') !== 'en') {
    return '邮箱登录'
  } else {
    return 'Email login'
  }
})
const passwordname = computed(() => {
  if (uni.getStorageSync('lang') !== 'en') {
    return '密码登录'
  } else {
    return 'Password login'
  }
})
const tabList = reactive<Tab[]>([
  {
    name: emailname,
    value: LoginType.Mail,
  },
  { name: passwordname, value: LoginType.Password },
])
const doLogin = async () => {
  const valid = loginFormRef.value?.validate()
  if (!valid) return
  setLoading(true)
  try {
    await userStore.login(loginForm)
    handleCache()
    handleLoginSuccess()
  } catch (err) {
  } finally {
    setLoading(false)
  }
}
function handleCache() {
  if (isSave.value) {
    CacheUtil.set(SAVE_LOGIN_INFO_KEY, true)
    CacheUtil.set(USERNAME_KEY, loginForm.username)
    CacheUtil.set(PASSWORD_KEY, loginForm.password)
  } else {
    CacheUtil.remove(SAVE_LOGIN_INFO_KEY)
    CacheUtil.remove(USERNAME_KEY)
    CacheUtil.remove(PASSWORD_KEY)
  }
}

async function doLoginByMail() {
  const valid = mailLoginFormRef.value?.validate()
  if (!valid) return
  setLoading(true)
  try {
    await userStore.loginByMail(mailLoginForm)
    handleLoginSuccess()
  } catch (err) {
  } finally {
    setLoading(false)
  }
}
function handleLoginSuccess() {
  toast(uni.getStorageSync('lang') == 'en' ? 'Login succeeded' : '登录成功')
  // forward('Home')
}
async function handleLogin() {
  if (currentTab.value === LoginType.Password) {
    doLogin()
  } else {
    doLoginByMail()
  }
}
function changeTab(tab: Tab) {
  currentTab.value = tab.value
}
function changeRemeberStatus(checked: boolean) {
  isSave.value = checked
}
</script>

<template>
  <view class="bg-white h-100vh flex flex-col">
    <!-- login banner -->
    <view class="flex-0">
    <view class="page-account-top">
      <view class="page-account-top-logo">
        <image mode="aspectFit" style="height: 160px;" src="https://demo.mycar.direct/img/logo.69765971.png" />
      </view>
      <view class="page-account-top-desc text-#808695 text-28rpx">Auto Compliance Portal</view>
    </view>
    <view class="backIcon">
      <u-icon name="map" size="21px"></u-icon>
    </view>
  </view>
    <view class="flex flex-col items-center accountForm flex-1">
      <!-- <u-tabs :list="tabList" line-color="#3c9cff" :current="1" @click="changeTab"></u-tabs> -->
      <view class="w-full">
        <u-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
          <u-form-item prop="username">
            <u-input v-model="loginForm.username" prefixIcon="account" class="noneBorderInput"
              :placeholder="$t('请输入账号')" shape="circle" clearable>
            </u-input>
          </u-form-item>
          <u-form-item prop="password">
            <u-input v-bind="$attrs" :password="!showPass" prefixIcon="lock" v-model="loginForm.password"
              class="noneBorderInput" :placeholder="$t('请输入密码')" shape="circle">
              <template #suffix>
                <u-icon :name="showPass ? 'eye-fill' : 'eye-off'" @click="showPass = !showPass"></u-icon>
              </template>
            </u-input>
          </u-form-item>
        </u-form>
        <view class="flex items-center justify-between">
          <u-checkbox-group active-color="#3c9cff" label-color="#3c9cff">
            <u-checkbox v-if="currentTab === LoginType.Password" :checked="isSave" :label="$t('记住密码')" size="12"
              label-size="12" @change="changeRemeberStatus"></u-checkbox>
          </u-checkbox-group>

          <view class="text-xs text-gray-400 inline-flex">{{ $t('没有账号，')
            }}<view class="mr-1 c-#3c9cff">{{
          $t('注册')
        }}</view>
            |
            <view class="ml-1 c-#3c9cff">{{
            $t('忘记密码?')
          }}</view>
          </view>
        </view>
        <u-button class="mt-6" type="primary" shape="circle" size="large" :loading="loading" @click="handleLogin">
          {{ $t('登录') }}
        </u-button>
      </view>
    </view>
    <view class="flex-0 mb-60rpx text-#808695">
      <view class="flex justify-around w-80% m-auto mb-20rpx text-28rpx">
          import.mycar.direct
          <i class="ivu-icon ivu-icon-md-at"></i>
          info@mycar.direct
      </view>
      <view class="w-100% flex justify-center text-28rpx">Copyright © 2023 Faytec Pty Ltd</view>
    </view>
  </view>
</template>

<style lang="scss">
.page-account-top {

  .page-account-top-logo {
    margin: 0 auto;
    max-width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    position: relative;
  }

  .page-account-top-desc {
    position: relative;
    z-index: 999;
    bottom: 30px;
    text-align: center;
  }
}


:deep(.u-form-item__body__right__message) {
  margin-left: 0 !important;
}

.backIcon {
  position: absolute;
  top: 15px;
  right: 15px;
}
</style>
