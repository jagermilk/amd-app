<template>
    <view class="u-page">
        <u-list @scrolltolower="scrolltolower">
            <u-list-item v-for="(item, index) in OrderList" :key="index" class="w-100%">
                <view class="order-item flex items-stretch w-100%" @click="goOrderDetail(item)">
                    <view class="flex flex-col flex-1 pt-15rpx pb-15rpx">
                        <view class="flex w-80% justify-between m-auto text-28rpx">
                            <view class="font-600">{{ item?.compliance_order_number }}</view>
                            <view class="c-#7695be text-22rpx order-status-box">{{ item?.order_status_name }}</view>
                        </view>
                        <view class="flex w-80% justify-between m-auto text-26rpx">{{ item?.make }}</view>
                        <view class="flex w-80% justify-between m-auto text-26rpx">{{ item?.model }}</view>
                        <view class="flex w-80% justify-between m-auto text-26rpx">{{ item?.vin }}</view>
                        <view class="flex w-80% justify-between m-auto text-26rpx">{{ item?.colour }}</view>
                    </view>
                    <view class="w-130px">
                        <u-image v-if="item?.thumbnail_url" :show-loading="true" :src="item?.thumbnail_url"
                            width="130px" height="100"></u-image>
                    </view>
                </view>
            </u-list-item>
        </u-list>
    </view>
</template>

<script setup>
const props = defineProps(['OrderList'])
import { forward } from '@/utils/router'
onLoad(() => {
    //
})

function scrolltolower() {
    toast('已加载全部订单')
};
function goOrderDetail(item) {
    forward('order-detail', item)
}

</script>

<style>
.order-item {
    border-bottom: 3px solid #e0e0e0;
    height: 200rpx;
}

.order-status-box {
    background-color: #e9f9ff;
    border: 1px solid #d0e7f5;
    padding: 4rpx;
}
</style>