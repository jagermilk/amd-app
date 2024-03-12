<template>
    <view class="h-100vh flex flex-col">
        <l-header></l-header>
        <view class="flex-1 w-95% m-auto">
            <view class="mb-40rpx">
                <u-search placeholder="Enter VIN" v-model="keyword" @search="handleSearch"></u-search>
            </view>
            <l-step :trackList="trackList" v-if="trackList.length > 0"></l-step>
            <u-button class="mt-6" type="primary" shape="circle" size="large" :loading="loading" @click="forward('Login')">
          {{ $t('登录') }}
        </u-button>
        </view>
        <l-footer></l-footer>
    </view>
</template>
<script setup>
import { forward } from '@/utils/router'
import Orders from '@/api/orders'
const keyword = ref('')
const trackList = ref([
    // {
    //     "order_status": 1,
    //     "order_status_name": "CREATED",
    //     "time": "2024-01-10 22:48:49"
    // },
    // {
    //     "order_status": 2,
    //     "order_status_name": "SUBMITTED",
    //     "time": "2024-01-10 22:55:28"
    // },
    // {
    //     "order_status": 3,
    //     "order_status_name": "VIA_APPLIED",
    //     "time": "2024-01-17 00:57:39"
    // },
    // {
    //     "order_status": 6,
    //     "order_status_name": "VIA_GRANTED",
    //     "time": "2024-02-12 10:47:20"
    // },
    // {
    //     "order_status": 7,
    //     "order_status_name": "RVS_PROGRESSING",
    //     "time": "2024-02-26 18:04:29"
    // }
])
function handleSearch() {
    Orders.orderTracking(keyword.value).then(res => {
        if (res.status == 'success') {
            trackList.value = res.data.tracking
        }
    }).catch(err => {

    })
}
</script>